import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const hygraphSecret = Deno.env.get('Hygraph_endoint_secret');
    if (!hygraphSecret) {
      throw new Error('Hygraph secret not found');
    }

    // Parse the secret to get endpoint and token
    const { endpoint, token } = JSON.parse(hygraphSecret);

    // Content model definitions
    const contentModels = [
      {
        name: "State",
        apiId: "State",
        apiIdPlural: "states",
        fields: [
          { apiId: "name", displayName: "Name", type: "STRING", isRequired: true },
          { apiId: "code", displayName: "Code", type: "STRING", isUnique: true },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "isActive", displayName: "Is Active", type: "BOOLEAN", defaultValue: { Boolean: true } }
        ]
      },
      {
        name: "Department",
        apiId: "Department", 
        apiIdPlural: "departments",
        fields: [
          { apiId: "name", displayName: "Name", type: "STRING", isRequired: true },
          { apiId: "fullName", displayName: "Full Name", type: "STRING" },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "description", displayName: "Description", type: "RICHTEXT" },
          { apiId: "officialWebsite", displayName: "Official Website", type: "STRING" },
          { apiId: "isActive", displayName: "Is Active", type: "BOOLEAN", defaultValue: { Boolean: true } }
        ]
      },
      {
        name: "JobCategory",
        apiId: "JobCategory",
        apiIdPlural: "jobCategories", 
        fields: [
          { apiId: "name", displayName: "Name", type: "STRING", isRequired: true },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "description", displayName: "Description", type: "RICHTEXT" },
          { apiId: "isActive", displayName: "Is Active", type: "BOOLEAN", defaultValue: { Boolean: true } }
        ]
      },
      {
        name: "Results",
        apiId: "Results",
        apiIdPlural: "results",
        fields: [
          { apiId: "title", displayName: "Title", type: "STRING", isRequired: true },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "examDate", displayName: "Exam Date", type: "DATE" },
          { apiId: "resultDate", displayName: "Result Date", type: "DATE" },
          { apiId: "resultUrl", displayName: "Result URL", type: "STRING" },
          { apiId: "description", displayName: "Description", type: "RICHTEXT" },
          { apiId: "status", displayName: "Status", type: "ENUMERATION", enumValues: ["Draft", "Published", "Expired"] }
        ]
      },
      {
        name: "Admits", 
        apiId: "Admits",
        apiIdPlural: "admits",
        fields: [
          { apiId: "title", displayName: "Title", type: "STRING", isRequired: true },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "examDate", displayName: "Exam Date", type: "DATE" },
          { apiId: "admitCardUrl", displayName: "Admit Card URL", type: "STRING" },
          { apiId: "downloadStartDate", displayName: "Download Start Date", type: "DATETIME" },
          { apiId: "downloadEndDate", displayName: "Download End Date", type: "DATETIME" },
          { apiId: "instructions", displayName: "Instructions", type: "RICHTEXT" },
          { apiId: "status", displayName: "Status", type: "ENUMERATION", enumValues: ["Draft", "Published", "Expired"] }
        ]
      },
      {
        name: "Syllabus",
        apiId: "Syllabus", 
        apiIdPlural: "syllabi",
        fields: [
          { apiId: "title", displayName: "Title", type: "STRING", isRequired: true },
          { apiId: "slug", displayName: "Slug", type: "STRING", isUnique: true },
          { apiId: "subjects", displayName: "Subjects", type: "RICHTEXT" },
          { apiId: "examPattern", displayName: "Exam Pattern", type: "RICHTEXT" },
          { apiId: "lastUpdated", displayName: "Last Updated", type: "DATETIME" },
          { apiId: "isActive", displayName: "Is Active", type: "BOOLEAN", defaultValue: { Boolean: true } }
        ]
      }
    ];

    // Create each content model
    const results = [];
    for (const model of contentModels) {
      console.log(`Creating content model: ${model.name}`);
      
      const mutation = `
        mutation {
          createModel(data: {
            apiId: "${model.apiId}"
            apiIdPlural: "${model.apiIdPlural}"
            displayName: "${model.name}"
          }) {
            id
            apiId
            displayName
          }
        }
      `;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      
      if (result.errors) {
        console.error(`Error creating model ${model.name}:`, result.errors);
        results.push({ model: model.name, success: false, errors: result.errors });
        continue;
      }

      const modelId = result.data.createModel.id;
      console.log(`Created model ${model.name} with ID: ${modelId}`);

      // Add fields to the model
      for (const field of model.fields) {
        const fieldMutation = `
          mutation {
            createSimpleField(data: {
              modelId: "${modelId}"
              apiId: "${field.apiId}"
              displayName: "${field.displayName}"
              type: ${field.type}
              ${field.isRequired ? 'isRequired: true' : ''}
              ${field.isUnique ? 'isUnique: true' : ''}
              ${field.defaultValue ? `defaultValue: ${JSON.stringify(field.defaultValue)}` : ''}
              ${field.enumValues ? `enumValues: ${JSON.stringify(field.enumValues)}` : ''}
            }) {
              id
              apiId
              displayName
            }
          }
        `;

        const fieldResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ query: fieldMutation }),
        });

        const fieldResult = await fieldResponse.json();
        
        if (fieldResult.errors) {
          console.error(`Error creating field ${field.apiId} for model ${model.name}:`, fieldResult.errors);
        } else {
          console.log(`Created field ${field.apiId} for model ${model.name}`);
        }
      }

      results.push({ model: model.name, success: true, modelId });
    }

    // Create relationships
    console.log('Creating relationships...');
    
    // JobCategory -> Department relationship
    const relationMutation1 = `
      mutation {
        createRelationalField(data: {
          modelId: "${results.find(r => r.model === 'JobCategory')?.modelId}"
          apiId: "department"
          displayName: "Department"
          reverseField: {
            modelId: "${results.find(r => r.model === 'Department')?.modelId}"
            apiId: "jobCategories" 
            displayName: "Job Categories"
          }
        }) {
          id
        }
      }
    `;

    // Results -> Department relationship  
    const relationMutation2 = `
      mutation {
        createRelationalField(data: {
          modelId: "${results.find(r => r.model === 'Results')?.modelId}"
          apiId: "department"
          displayName: "Department"
          reverseField: {
            modelId: "${results.find(r => r.model === 'Department')?.modelId}"
            apiId: "results"
            displayName: "Results"
          }
        }) {
          id
        }
      }
    `;

    // Admits -> Department relationship
    const relationMutation3 = `
      mutation {
        createRelationalField(data: {
          modelId: "${results.find(r => r.model === 'Admits')?.modelId}"
          apiId: "department" 
          displayName: "Department"
          reverseField: {
            modelId: "${results.find(r => r.model === 'Department')?.modelId}"
            apiId: "admits"
            displayName: "Admits"
          }
        }) {
          id
        }
      }
    `;

    // Syllabus -> Department relationship
    const relationMutation4 = `
      mutation {
        createRelationalField(data: {
          modelId: "${results.find(r => r.model === 'Syllabus')?.modelId}"
          apiId: "department"
          displayName: "Department" 
          reverseField: {
            modelId: "${results.find(r => r.model === 'Department')?.modelId}"
            apiId: "syllabi"
            displayName: "Syllabi"
          }
        }) {
          id
        }
      }
    `;

    // Syllabus -> JobCategory relationship
    const relationMutation5 = `
      mutation {
        createRelationalField(data: {
          modelId: "${results.find(r => r.model === 'Syllabus')?.modelId}"
          apiId: "jobCategory"
          displayName: "Job Category"
          reverseField: {
            modelId: "${results.find(r => r.model === 'JobCategory')?.modelId}"
            apiId: "syllabi"
            displayName: "Syllabi"
          }
        }) {
          id
        }
      }
    `;

    const relationships = [relationMutation1, relationMutation2, relationMutation3, relationMutation4, relationMutation5];
    
    for (const relationMutation of relationships) {
      const relationResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: relationMutation }),
      });

      const relationResult = await relationResponse.json();
      if (relationResult.errors) {
        console.error('Error creating relationship:', relationResult.errors);
      } else {
        console.log('Relationship created successfully');
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Hygraph content models created successfully',
      models: results 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating Hygraph schema:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
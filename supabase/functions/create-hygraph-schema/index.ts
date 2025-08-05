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
    console.log('Starting Hygraph schema creation...');
    
    const hygraphSecret = Deno.env.get('Hygraph_endpoint_secret');
    if (!hygraphSecret) {
      console.error('Hygraph_endpoint_secret environment variable not found');
      throw new Error('Hygraph credentials not configured. Please add the Hygraph_endpoint_secret in Supabase secrets.');
    }

    console.log('Hygraph secret found, parsing credentials...');
    
    // Parse the secret to get endpoint and token
    let endpoint, token;
    try {
      const parsed = JSON.parse(hygraphSecret);
      endpoint = parsed.endpoint;
      token = parsed.token;
      
      if (!endpoint || !token) {
        throw new Error('Invalid secret format: missing endpoint or token');
      }
      
      console.log('Credentials parsed successfully');
      console.log('Testing connection to Hygraph...');
      
      // Test connection with a simple query
      const testQuery = `
        query {
          __schema {
            queryType {
              name
            }
          }
        }
      `;
      
      const testResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: testQuery }),
      });
      
      console.log('Test response status:', testResponse.status);
      const testResult = await testResponse.json();
      
      if (!testResponse.ok || testResult.errors) {
        console.error('Connection test failed:', testResult);
        throw new Error(`Failed to connect to Hygraph Management API: ${JSON.stringify(testResult)}`);
      }
      
      console.log('Connection test successful');
    } catch (parseError) {
      console.error('Error parsing Hygraph secret:', parseError);
      throw new Error('Invalid Hygraph secret format. Expected JSON with "endpoint" and "token" fields.');
    }

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
        console.log(`Creating field ${field.apiId} of type ${field.type} for model ${model.name}`);
        
        let fieldMutation;
        
        if (field.type === 'ENUMERATION') {
          // Handle enumeration fields with createEnumerableField
          fieldMutation = `
            mutation {
              createEnumerableField(data: {
                modelId: "${modelId}"
                apiId: "${field.apiId}"
                displayName: "${field.displayName}"
                enumerations: [${field.enumValues.map(val => `"${val}"`).join(', ')}]
                ${field.isRequired ? 'isRequired: true' : ''}
              }) {
                id
                apiId
                displayName
              }
            }
          `;
        } else {
          // Handle simple fields
          const fieldData = {
            modelId: modelId,
            apiId: field.apiId,
            displayName: field.displayName,
            type: field.type
          };
          
          // Add optional properties
          if (field.isRequired) fieldData.isRequired = true;
          if (field.isUnique) fieldData.isUnique = true;
          if (field.defaultValue) fieldData.defaultValue = field.defaultValue;
          
          fieldMutation = `
            mutation {
              createSimpleField(data: {
                modelId: "${modelId}"
                apiId: "${field.apiId}"
                displayName: "${field.displayName}"
                type: ${field.type}
                ${field.isRequired ? 'isRequired: true' : ''}
                ${field.isUnique ? 'isUnique: true' : ''}
                ${field.defaultValue ? `defaultValue: ${JSON.stringify(field.defaultValue)}` : ''}
              }) {
                id
                apiId
                displayName
              }
            }
          `;
        }

        const fieldResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ query: fieldMutation }),
        });

        console.log(`Field ${field.apiId} response status:`, fieldResponse.status);
        const fieldResult = await fieldResponse.json();
        
        if (fieldResult.errors) {
          console.error(`Error creating field ${field.apiId} for model ${model.name}:`, JSON.stringify(fieldResult.errors, null, 2));
          console.error('Field mutation that failed:', fieldMutation);
        } else {
          console.log(`Successfully created field ${field.apiId} for model ${model.name}`);
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
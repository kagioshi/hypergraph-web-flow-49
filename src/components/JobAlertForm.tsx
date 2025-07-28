import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Bell } from 'lucide-react';
import { useJobAlerts } from '@/hooks/useJobAlerts';

export const JobAlertForm = () => {
  const { addAlert } = useJobAlerts();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.length === 0) return;

    addAlert({
      keywords,
      location,
      department,
      type,
      email
    });

    // Reset form
    setKeywords([]);
    setLocation('');
    setDepartment('');
    setType('');
    setEmail('');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Create Job Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="keywords">Keywords (Required)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="keywords"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Enter keyword..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" onClick={addKeyword} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {keywords.map(keyword => (
                <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Delhi, Mumbai, Bangalore..."
            />
          </div>

          <div>
            <Label htmlFor="department">Department (Optional)</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                <SelectItem value="Administrative">Administrative</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Defense">Defense</SelectItem>
                <SelectItem value="Banking">Banking</SelectItem>
                <SelectItem value="Railway">Railway</SelectItem>
                <SelectItem value="Police">Police</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Job Type (Optional)</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Permanent">Permanent</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <Button type="submit" className="w-full" disabled={keywords.length === 0}>
            Create Alert
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    description: '',
    location: '',
    authority: '',
    files: []
  });

  const localAuthorities = [
    'Police Department',
    'Municipal Corporation',
    'Public Works',
    'Health Department',
    'Environmental Agency'
  ];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setComplaint(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint Submitted:', complaint);
    // Implement actual submission logic
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Complaint Now</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Complaint Description</Label>
          <Textarea
            placeholder="Describe your complaint in detail"
            value={complaint.description}
            onChange={(e) => setComplaint(prev => ({
              ...prev, 
              description: e.target.value
            }))}
            className="min-h-[100px]"
          />
        </div>

        <div className="mb-4">
          <Label>Location</Label>
          <Input
            placeholder="Enter specific location"
            value={complaint.location}
            onChange={(e) => setComplaint(prev => ({
              ...prev, 
              location: e.target.value
            }))}
          />
        </div>

        <div className="mb-4">
          <Label>Local Authority</Label>
          <Select 
            onValueChange={(value) => setComplaint(prev => ({
              ...prev, 
              authority: value
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Authority" />
            </SelectTrigger>
            <SelectContent>
              {localAuthorities.map(authority => (
                <SelectItem key={authority} value={authority}>
                  {authority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label>Upload Photos/Videos</Label>
          <Input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {complaint.files.length > 0 && (
            <div className="mt-2">
              <p>Uploaded Files: {complaint.files.length}</p>
              {complaint.files.map((file, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit Complaint
        </Button>
      </form>
    </div>
  );
};

export default ComplaintForm;

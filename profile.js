import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ProfileRegistration = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    additionalDetails: ''
  });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { userType, ...formData });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Registration</h2>
      
      <RadioGroup 
        className="flex justify-between mb-6"
        onValueChange={handleUserTypeSelect}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="people" id="people" />
          <Label htmlFor="people">General People</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="authority" id="authority" />
          <Label htmlFor="authority">Local Authority Rep</Label>
        </div>
      </RadioGroup>

      {userType && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Full Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <Label>Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>

          {userType === 'authority' && (
            <div className="mb-4">
              <Label>Department/Designation</Label>
              <Input
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="Enter department or designation"
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Create Profile
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProfileRegistration;

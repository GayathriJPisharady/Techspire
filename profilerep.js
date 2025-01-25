import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AuthorityProfileRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    position: '',
    phoneNumber: '',
    email: '',
    password: '',
    emailOTP: '',
    phoneOTP: '',
    profilePhoto: null
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState({
    email: false,
    phone: false
  });
  const fileInputRef = useRef(null);

  const positions = [
    'Municipal Commissioner',
    'City Engineer',
    'Health Officer',
    'Public Works Director',
    'Environmental Manager',
    'Chief of Police',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: URL.createObjectURL(file)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation logic similar to previous form
    if (!formData.username) newErrors.username = 'Username required';
    if (!formData.position) newErrors.position = 'Position required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.password) newErrors.password = 'Password required';
    if (!formData.emailOTP) newErrors.emailOTP = 'Email OTP required';
    if (!formData.phoneOTP) newErrors.phoneOTP = 'Phone OTP required';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOTP = (type) => {
    if (type === 'email' && formData.email) {
      setOtpSent(prev => ({ ...prev, email: true }));
    }
    if (type === 'phone' && formData.phoneNumber) {
      setOtpSent(prev => ({ ...prev, phone: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Authority Profile Registration:', formData);
      // Implement registration logic
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Authority Profile Registration</h2>
      
      {/* Profile Photo Upload */}
      <div className="mb-4 flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          accept="image/*"
          className="hidden"
        />
        {formData.profilePhoto ? (
          <img 
            src={formData.profilePhoto} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            No Photo
          </div>
        )}
        <Button 
          type="button" 
          variant="outline"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Profile Photo
        </Button>
        {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <Label>Username</Label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose username"
            className={errors.username ? 'border-red-500' : ''}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Position */}
        <div className="mb-4">
          <Label>Position</Label>
          <Select 
            onValueChange={(value) => setFormData(prev => ({
              ...prev, 
              position: value
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map(pos => (
                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div>

        {/* Phone Number & OTP */}
        <div className="mb-4">
          <Label>Phone Number</Label>
          <div className="flex">
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="10 digit phone number"
              className={`flex-grow ${errors.phoneNumber ? 'border-red-500' : ''}`}
            />
            <Button 
              type="button" 
              variant="outline" 
              className="ml-2"
              onClick={() => sendOTP('phone')}
            >
              Send OTP
            </Button>
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {otpSent.phone && (
          <div className="mb-4">
            <Label>Phone OTP</Label>
            <Input
              name="phoneOTP"
              value={formData.phoneOTP}
              onChange={handleChange}
              placeholder="Enter Phone OTP"
              className={errors.phoneOTP ? 'border-red-500' : ''}
            />
            {errors.phoneOTP && <p className="text-red-500 text-sm">{errors.phoneOTP}</p>}
          </div>
        )}

        {/* Email & OTP */}
        <div className="mb-4">
          <Label>Email</Label>
          <div className="flex">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`flex-grow ${errors.email ? 'border-red-500' : ''}`}
            />
            <Button 
              type="button" 
              variant="outline" 
              className="ml-2"
              onClick={() => sendOTP('email')}
            >
              Send OTP
            </Button>
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {otpSent.email && (
          <div className="mb-4">
            <Label>Email OTP</Label>
            <Input
              name="emailOTP"
              value={formData.emailOTP}
              onChange={handleChange}
              placeholder="Enter Email OTP"
              className={errors.emailOTP ? 'border-red-500' : ''}
            />
            {errors.emailOTP && <p className="text-red-500 text-sm">{errors.emailOTP}</p>}
          </div>
        )}

        {/* Password */}
        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full">
          Create Profile
        </Button>
      </form>
    </div>
  );
};

export default AuthorityProfileRegistration;

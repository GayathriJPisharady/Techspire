import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    emailOTP: '',
    phoneOTP: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) newErrors.username = 'Username is required';

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // OTP validations
    if (!formData.emailOTP) newErrors.emailOTP = 'Email OTP is required';
    if (!formData.phoneOTP) newErrors.phoneOTP = 'Phone OTP is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Implement login logic here
      console.log('Form submitted', formData);
    }
  };

  const sendOTP = (type) => {
    // Implement OTP sending logic
    console.log(`Sending OTP to ${type}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Secure Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className={errors.username ? 'border-red-500' : ''}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

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

        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <Label>Email OTP</Label>
          <Input
            type="text"
            name="emailOTP"
            value={formData.emailOTP}
            onChange={handleChange}
            placeholder="Enter email OTP"
            className={errors.emailOTP ? 'border-red-500' : ''}
          />
          {errors.emailOTP && <p className="text-red-500 text-sm">{errors.emailOTP}</p>}
        </div>

        <div className="mb-4">
          <Label>Phone OTP</Label>
          <Input
            type="text"
            name="phoneOTP"
            value={formData.phoneOTP}
            onChange={handleChange}
            placeholder="Enter phone OTP"
            className={errors.phoneOTP ? 'border-red-500' : ''}
          />
          {errors.phoneOTP && <p className="text-red-500 text-sm">{errors.phoneOTP}</p>}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

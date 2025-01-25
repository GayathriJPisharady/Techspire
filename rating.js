import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

const ComplaintTracking = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      description: 'Broken Road Near City Center',
      authority: 'Public Works Department',
      status: 'in-progress',
      rating: 3,
      upvotes: 45,
      downvotes: 12,
      updates: [
        { date: '2024-01-15', note: 'Survey completed' },
        { date: '2024-01-22', note: 'Repair materials ordered' }
      ]
    }
  ]);

  const statusColors = {
    'not-started': 'bg-red-500',
    'in-progress': 'bg-yellow-500',
    'completed': 'bg-green-500'
  };

  const handleVote = (complaintId, voteType) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? {
              ...complaint, 
              [voteType]: complaint[voteType] + 1
            } 
          : complaint
      )
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        color={index < rating ? 'gold' : 'gray'} 
        fill={index < rating ? 'gold' : 'none'}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complaint Tracking</h2>
      
      {complaints.map(complaint => (
        <div 
          key={complaint.id} 
          className="border rounded-lg p-4 mb-4 shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {complaint.description}
            </h3>
            <div className="flex items-center space-x-2">
              <div 
                className={`h-4 w-4 rounded-full ${statusColors[complaint.status]}`}
              />
              <span>{complaint.status.replace('-', ' ')}</span>
            </div>
          </div>

          <Progress 
            value={
              complaint.status === 'not-started' ? 10 : 
              complaint.status === 'in-progress' ? 50 : 
              100
            } 
            className="mb-4"
          />

          <div className="mb-4">
            <h4>Authority: {complaint.authority}</h4>
            <div className="flex items-center">
              <span>Rating: </span>
              {renderStars(complaint.rating)}
            </div>
          </div>

          <div className="mb-4">
            <h4>Updates:</h4>
            {complaint.updates.map((update, index) => (
              <div key={index} className="text-sm text-gray-600">
                {update.date}: {update.note}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleVote(complaint.id, 'upvotes')}
                variant="outline"
              >
                👍 {complaint.upvotes}
              </Button>
              <Button 
                onClick={() => handleVote(complaint.id, 'downvotes')}
                variant="outline"
              >
                👎 {complaint.downvotes}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintTracking;

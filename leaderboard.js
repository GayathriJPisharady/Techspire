import React, { useState } from 'react';
import { Star } from 'lucide-react';

const AuthorityLeaderboard = () => {
  const [representatives, setRepresentatives] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Municipal Commissioner',
      department: 'City Administration',
      profilePhoto: '/api/placeholder/200/200',
      averageRating: 4.7,
      totalRatings: 245
    },
    {
      id: 2,
      name: 'Sarah Smith',
      position: 'Public Works Director',
      department: 'Infrastructure',
      profilePhoto: '/api/placeholder/200/200',
      averageRating: 4.5,
      totalRatings: 189
    },
    {
      id: 3,
      name: 'Michael Brown',
      position: 'Health Officer',
      department: 'Public Health',
      profilePhoto: '/api/placeholder/200/200',
      averageRating: 4.3,
      totalRatings: 156
    }
  ]);

  // Sort representatives by average rating in descending order
  const sortedRepresentatives = [...representatives].sort((a, b) => b.averageRating - a.averageRating);

  // Featured representative (top-rated)
  const featuredRepresentative = sortedRepresentatives[0];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={20}
        color={index < Math.floor(rating) ? 'gold' : 'gray'}
        fill={index < Math.floor(rating) ? 'gold' : 'none'}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Local Authority Representatives Leaderboard</h2>

      {/* Featured Representative of the Month */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Representative of the Month</h3>
        <div className="flex flex-col items-center">
          <img 
            src={featuredRepresentative.profilePhoto} 
            alt={featuredRepresentative.name}
            className="w-48 h-48 rounded-full object-cover mb-4"
          />
          <h4 className="text-lg font-bold">{featuredRepresentative.name}</h4>
          <p className="text-gray-600">{featuredRepresentative.position}</p>
          <div className="flex items-center mt-2">
            {renderStars(featuredRepresentative.averageRating)}
            <span className="ml-2">{featuredRepresentative.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-500">Total Ratings: {featuredRepresentative.totalRatings}</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {sortedRepresentatives.map((rep, index) => (
            <div 
              key={rep.id} 
              className="border rounded-lg p-4 flex items-center"
            >
              <div className="mr-4">
                <img 
                  src={rep.profilePhoto} 
                  alt={rep.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">{rep.name}</h4>
                <p className="text-sm text-gray-600">{rep.position}</p>
                <p className="text-sm text-gray-500">{rep.department}</p>
                <div className="flex items-center mt-2">
                  {renderStars(rep.averageRating)}
                  <span className="ml-2">{rep.averageRating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Total Ratings: {rep.totalRatings}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorityLeaderboard;

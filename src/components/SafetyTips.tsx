import React from 'react';

const SafetyTips: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Tips</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>• Travel in groups when possible, especially at night</p>
        <p>• Stay in well-lit areas and avoid shortcuts through alleys</p>
        <p>• Keep valuables secure and bikes properly locked</p>
        <p>• Use UW's SafeCampus escort service after dark</p>
        <p>• Report emergencies to 911, non-emergencies to campus security</p>
      </div>
    </div>
  );
};

export default SafetyTips; 
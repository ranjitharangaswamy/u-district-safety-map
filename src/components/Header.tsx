import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-purple-700 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-8 h-8" />
          U-District Community Safety Map
        </h1>
        <p className="text-purple-100 mt-1">Report and track safety concerns around UW campus</p>
      </div>
    </div>
  );
};

export default Header; 
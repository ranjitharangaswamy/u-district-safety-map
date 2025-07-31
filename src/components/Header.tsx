import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-purple-700 text-white p-4 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-8 h-8" />
          U-District Community Safety Map
        </h1>
        <p className="text-purple-100 mt-1">Report and track safety concerns around UW campus</p>
      </div>
      <div className="absolute bottom-2 right-4">
        <a 
          href="https://ranjitharangaswamy.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-200 text-xs hover:text-white transition-colors"
        >
          Created by Ranjitha Rangaswamy
        </a>
      </div>
    </div>
  );
};

export default Header; 
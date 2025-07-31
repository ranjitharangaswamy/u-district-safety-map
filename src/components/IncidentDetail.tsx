import React from 'react';
import { Plus } from 'lucide-react';
import type { Incident } from '../types';
import { getSeverityColor, getTypeInfo, ensureDateObject } from '../utils/incidentUtils';

interface IncidentDetailProps {
  incident: Incident | null;
  onClose: () => void;
  onMarkResolved: (incident: Incident) => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onClose, onMarkResolved }) => {
  if (!incident) return null;

  // Check if this is a default incident (IDs 1, 2, 3)
  const isDefaultIncident = incident.id <= 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{incident.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                  {incident.severity} priority
                </span>
                {incident.verified && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Verified
                  </span>
                )}
                {isDefaultIncident && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Demo
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Plus className="w-6 h-6 transform rotate-45" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Description</h4>
              <p className="text-gray-600 mt-1">{incident.description}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Reported</h4>
              <p className="text-gray-600 mt-1">
                {ensureDateObject(incident.timestamp).toLocaleString()}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Type</h4>
              <p className="text-gray-600 mt-1">{getTypeInfo(incident.type).label}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => onMarkResolved(incident)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isDefaultIncident 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              disabled={isDefaultIncident}
            >
              {isDefaultIncident ? 'Demo - Cannot Resolve' : 'Mark as Resolved'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail; 
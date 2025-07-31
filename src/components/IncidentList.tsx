import React from 'react';
import { Clock } from 'lucide-react';
import type { Incident } from '../types';
import { getSeverityColor, getTypeInfo, sortIncidentsByDate } from '../utils/incidentUtils';
import { AlertTriangle, Shield, Users, Navigation } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
}

const iconMap = {
  AlertTriangle,
  Shield,
  Users,
  Navigation
};

const IncidentList: React.FC<IncidentListProps> = ({ incidents, onIncidentClick }) => {
  const sortedIncidents = sortIncidentsByDate(incidents);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Reports
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto incidents-scroll">
        {sortedIncidents.map(incident => {
          const typeInfo = getTypeInfo(incident.type);
          const IconComponent = iconMap[typeInfo.iconName as keyof typeof iconMap] || AlertTriangle;
          
          return (
            <div
              key={incident.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onIncidentClick(incident)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm">{incident.title}</h4>
                          <p className="text-gray-600 text-xs mt-1">{incident.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </span>
                            {incident.verified && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Verified
                              </span>
                            )}
                            {incident.id <= 3 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Demo
                              </span>
                            )}
                          </div>
                        </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentList; 
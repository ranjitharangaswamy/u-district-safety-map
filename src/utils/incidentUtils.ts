import type { Incident } from '../types';

export const defaultIncidents: Incident[] = [
  {
    id: 1,
    type: 'lighting',
    title: 'Poor lighting on 45th St',
    description: 'Street lights are out between 15th and 17th Ave',
    location: { lat: 47.6615, lng: -122.3121 },
    timestamp: new Date('2025-07-30T14:30:00'),
    severity: 'medium',
    verified: false
  },
  {
    id: 2,
    type: 'incident',
    title: 'Bike theft reported',
    description: 'Multiple bikes stolen from HUB bike racks',
    location: { lat: 47.6556, lng: -122.3035 },
    timestamp: new Date('2025-07-29T09:15:00'),
    severity: 'high',
    verified: true
  },
  {
    id: 3,
    type: 'hazard',
    title: 'Broken glass on sidewalk',
    description: 'Glass debris near Ave Food Court entrance',
    location: { lat: 47.6608, lng: -122.3142 },
    timestamp: new Date('2025-07-27T16:45:00'),
    severity: 'low',
    verified: false
  }
];

// Note: These are just for reference, actual icons are imported in components
export const incidentTypeConfigs = [
  { id: 'incident', label: 'Safety Incident', iconName: 'AlertTriangle', color: 'red' },
  { id: 'hazard', label: 'Environmental Hazard', iconName: 'Navigation', color: 'orange' },
  { id: 'lighting', label: 'Lighting Issue', iconName: 'Shield', color: 'yellow' },
  { id: 'maintenance', label: 'Maintenance Needed', iconName: 'Users', color: 'blue' }
];

export const severityColors: Record<string, string> = {
  low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  medium: 'bg-orange-100 text-orange-800 border-orange-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

export const severityMarkerColors: Record<string, string> = {
  low: '#fbbf24',
  medium: '#f97316',
  high: '#ef4444'
};

export const getSeverityColor = (severity: string): string => {
  return severityColors[severity] || severityColors.medium;
};

export const getSeverityMarkerColor = (severity: string): string => {
  return severityMarkerColors[severity] || severityMarkerColors.medium;
};

export const getTypeInfo = (type: string) => {
  return incidentTypeConfigs.find(t => t.id === type) || incidentTypeConfigs[0];
};

// Utility function to safely convert timestamps to Date objects
export const ensureDateObject = (timestamp: Date | string): Date => {
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
};

export const sortIncidentsByDate = (incidents: Incident[]): Incident[] => {
  return [...incidents].sort((a, b) => {
    // Ensure timestamps are Date objects
    const dateA = ensureDateObject(a.timestamp);
    const dateB = ensureDateObject(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
};

export const createNewIncident = (
  id: number,
  type: string,
  title: string,
  description: string,
  location: { lat: number; lng: number },
  severity: string
): Incident => {
  return {
    id,
    type: type as Incident['type'],
    title,
    description,
    location,
    timestamp: new Date(),
    verified: false,
    severity: severity as 'low' | 'medium' | 'high'
  };
}; 
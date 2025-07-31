export interface Incident {
  id: number;
  type: 'incident' | 'hazard' | 'lighting' | 'maintenance';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  verified: boolean;
}

export interface NewReport {
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface IncidentType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

 
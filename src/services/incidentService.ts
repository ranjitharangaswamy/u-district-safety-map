import type { Incident } from '../types';
import { createNewIncident } from '../utils/incidentUtils';

export class IncidentService {
  private static STORAGE_KEY = 'u-district-safety-incidents';

  static loadIncidents(): Incident[] {
    try {
      const savedIncidents = localStorage.getItem(this.STORAGE_KEY);
      if (savedIncidents) {
        const parsedIncidents = JSON.parse(savedIncidents);
        // Convert timestamp strings back to Date objects
        return parsedIncidents.map((incident: any) => ({
          ...incident,
          timestamp: new Date(incident.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading incidents from localStorage:', error);
    }
    return [];
  }

  static saveIncidents(incidents: Incident[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(incidents));
    } catch (error) {
      console.error('Error saving incidents to localStorage:', error);
    }
  }

  static addIncident(
    incidents: Incident[],
    type: string,
    title: string,
    description: string,
    location: { lat: number; lng: number },
    severity: string
  ): Incident[] {
    const newIncident = createNewIncident(
      incidents.length + 1,
      type,
      title,
      description,
      location,
      severity
    );
    
    const updatedIncidents = [...incidents, newIncident];
    this.saveIncidents(updatedIncidents);
    return updatedIncidents;
  }

  static markIncidentAsResolved(incidents: Incident[], incidentId: number): Incident[] {
    // Check if this is one of the default incidents (IDs 1, 2, 3)
    const isDefaultIncident = incidentId <= 3;
    
    if (isDefaultIncident) {
      // For default incidents, do nothing (button is disabled)
      return incidents;
    } else {
      // For user-created incidents, remove them from the list
      const updatedIncidents = incidents.filter(inc => inc.id !== incidentId);
      this.saveIncidents(updatedIncidents);
      return updatedIncidents;
    }
  }

  static getNextIncidentId(incidents: Incident[]): number {
    return incidents.length > 0 ? Math.max(...incidents.map(inc => inc.id)) + 1 : 1;
  }
} 
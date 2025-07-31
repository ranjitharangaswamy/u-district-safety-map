import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG } from './constants';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  incidents: Array<{
    id: number;
    title: string;
    description: string;
    location: { lat: number; lng: number };
    severity: string;
    type: string;
    verified: boolean;
  }>;
  onIncidentClick: (incident: any) => void;
  onMapClick?: (location: { lat: number; lng: number }) => void;
  showClickToAdd?: boolean;
  clearTempMarker?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  incidents, 
  onIncidentClick, 
  onMapClick,
  showClickToAdd = false,
  clearTempMarker = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const tempMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView(
      [MAP_CONFIG.DEFAULT_CENTER.lat, MAP_CONFIG.DEFAULT_CENTER.lng], 
      MAP_CONFIG.DEFAULT_ZOOM
    );

    // Add CartoDB Voyager tiles for enhanced street view
    L.tileLayer(MAP_CONFIG.TILE_LAYER_URL, {
      attribution: MAP_CONFIG.TILE_LAYER_ATTRIBUTION,
      subdomains: MAP_CONFIG.TILE_LAYER_SUBDOMAINS,
      maxZoom: MAP_CONFIG.MAX_ZOOM
    }).addTo(mapInstance.current);

    // Add navigation controls
    const zoomControl = L.control.zoom({
      position: 'topright'
    });
    zoomControl.addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Add click handler for creating new markers
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove existing click handler
    mapInstance.current.off('click');

    // Add click handler for creating new markers
    if (showClickToAdd) {
      mapInstance.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Remove any existing temporary marker
        if (tempMarkerRef.current) {
          tempMarkerRef.current.remove();
        }

        // Create a temporary marker to show the clicked location
        const tempIcon = L.divIcon({
          className: 'temp-marker',
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background-color: #8b5cf6;
              border-radius: 50%;
              border: 3px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              animation: pulse 1.5s infinite;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 2v3M12 19v3M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2 12h3M19 12h3M4.6 19.4l1.4-1.4M18 6l1.4-1.4"/>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        tempMarkerRef.current = L.marker([lat, lng], { icon: tempIcon })
          .addTo(mapInstance.current!);

        // Call the callback with the clicked location
        if (onMapClick) {
          onMapClick({ lat, lng });
        }
      });
    }
  }, [showClickToAdd, onMapClick]);

  // Clear temporary marker when requested
  useEffect(() => {
    if (clearTempMarker && tempMarkerRef.current) {
      tempMarkerRef.current.remove();
      tempMarkerRef.current = null;
    }
  }, [clearTempMarker]);

  // Update markers when incidents change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    incidents.forEach(incident => {
      const severityColors: Record<string, string> = {
        low: '#fbbf24',
        medium: '#f97316',
        high: '#ef4444'
      };

      const color = severityColors[incident.severity] || severityColors.medium;

      // Create custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background-color: ${color};
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([incident.location.lat, incident.location.lng], { icon: customIcon })
        .addTo(mapInstance.current!);

      // Create popup
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">${incident.title}</h3>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${incident.description}</p>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: ${color}20;
              color: ${color};
              border: 1px solid ${color}40;
            ">${incident.severity}</span>
            ${incident.verified ? '<span style="padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;">Verified</span>' : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click handler
      marker.on('click', () => {
        onIncidentClick(incident);
      });

      markersRef.current.push(marker);
    });
  }, [incidents, onIncidentClick]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default MapComponent; 
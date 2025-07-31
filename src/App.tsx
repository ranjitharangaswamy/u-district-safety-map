import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Incident, NewReport } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultIncidents } from './utils/incidentUtils';
import { IncidentService } from './services/incidentService';
import MapComponent from './MapComponent';
import Header from './components/Header';
import IncidentList from './components/IncidentList';
import SafetyTips from './components/SafetyTips';
import ReportForm from './components/ReportForm';
import IncidentDetail from './components/IncidentDetail';

import './App.css';

function App() {
  // Load incidents from localStorage or use defaults
  const [incidents, setIncidents] = useLocalStorage<Incident[]>(
    'u-district-safety-incidents',
    defaultIncidents
  );

  // UI State
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showClickToAdd, setShowClickToAdd] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [clearTempMarker, setClearTempMarker] = useState(false);
  const [newReport, setNewReport] = useState<NewReport>({
    type: '',
    title: '',
    description: '',
    severity: 'medium'
  });

  // Event Handlers
  const handleMapClick = (location: { lat: number; lng: number }) => {
    setClickedLocation(location);
    setShowReportForm(true);
  };

  const handleSubmitReport = () => {
    if (!newReport.type || !newReport.title) return;

    const location = clickedLocation || { 
      lat: 47.6584 + Math.random() * 0.01, 
      lng: -122.3088 + Math.random() * 0.01 
    };

    const updatedIncidents = IncidentService.addIncident(
      incidents,
      newReport.type,
      newReport.title,
      newReport.description,
      location,
      newReport.severity
    );

    setIncidents(updatedIncidents);
    setNewReport({ type: '', title: '', description: '', severity: 'medium' });
    setShowReportForm(false);
    setClickedLocation(null);
    setShowClickToAdd(false);
    setClearTempMarker(true);
    setTimeout(() => setClearTempMarker(false), 100);
  };

  const handleCloseReportForm = () => {
    setShowReportForm(false);
    setClickedLocation(null);
    setShowClickToAdd(false);
    setClearTempMarker(true);
    setTimeout(() => setClearTempMarker(false), 100);
  };

  const handleMarkResolved = (incident: Incident) => {
    const updatedIncidents = IncidentService.markIncidentAsResolved(incidents, incident.id);
    setIncidents(updatedIncidents);
    setSelectedIncident(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[calc(100vh-200px)] relative" style={{ zIndex: 1 }}>
                <MapComponent 
                  incidents={incidents}
                  onIncidentClick={setSelectedIncident}
                  onMapClick={handleMapClick}
                  showClickToAdd={showClickToAdd}
                  clearTempMarker={clearTempMarker}
                />
              </div>

              {/* Map Controls */}
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={() => setShowClickToAdd(!showClickToAdd)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    showClickToAdd 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {showClickToAdd ? 'Click on Map to Add Report' : 'Add Safety Report'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <IncidentList 
              incidents={incidents}
              onIncidentClick={setSelectedIncident}
            />
            <SafetyTips />
          </div>
        </div>

        {/* Modals */}
        <ReportForm
          isOpen={showReportForm}
          onClose={handleCloseReportForm}
          onSubmit={handleSubmitReport}
          newReport={newReport}
          setNewReport={setNewReport}
        />

        <IncidentDetail
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onMarkResolved={handleMarkResolved}
        />
      </div>
    </div>
  );
}

export default App;
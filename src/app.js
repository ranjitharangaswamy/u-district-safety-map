import React, { useState } from 'react';
import { MapPin, AlertTriangle, Shield, Plus, Users, Clock, Navigation } from 'lucide-react';

const UDistrictSafetyMap = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: 'lighting',
      title: 'Poor lighting on 45th St',
      description: 'Street lights are out between 15th and 17th Ave',
      location: { lat: 47.6615, lng: -122.3121 },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'medium',
      verified: false
    },
    {
      id: 2,
      type: 'incident',
      title: 'Bike theft reported',
      description: 'Multiple bikes stolen from HUB bike racks',
      location: { lat: 47.6556, lng: -122.3035 },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      severity: 'high',
      verified: true
    },
    {
      id: 3,
      type: 'hazard',
      title: 'Broken glass on sidewalk',
      description: 'Glass debris near Ave Food Court entrance',
      location: { lat: 47.6608, lng: -122.3142 },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: 'low',
      verified: false
    }
  ]);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [newReport, setNewReport] = useState({
    type: '',
    title: '',
    description: '',
    severity: 'medium'
  });

  const incidentTypes = [
    { id: 'incident', label: 'Safety Incident', icon: AlertTriangle, color: 'red' },
    { id: 'hazard', label: 'Environmental Hazard', icon: Navigation, color: 'orange' },
    { id: 'lighting', label: 'Lighting Issue', icon: Shield, color: 'yellow' },
    { id: 'maintenance', label: 'Maintenance Needed', icon: Users, color: 'blue' }
  ];

  const handleSubmitReport = () => {
    if (!newReport.type || !newReport.title) return;

    const report = {
      id: incidents.length + 1,
      ...newReport,
      location: { lat: 47.6584 + Math.random() * 0.01, lng: -122.3088 + Math.random() * 0.01 },
      timestamp: new Date(),
      verified: false
    };

    setIncidents([...incidents, report]);
    setNewReport({ type: '', title: '', description: '', severity: 'medium' });
    setShowReportForm(false);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity] || colors.medium;
  };

  const getTypeInfo = (type) => {
    return incidentTypes.find(t => t.id === type) || incidentTypes[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8" />
            U-District Community Safety Map
          </h1>
          <p className="text-purple-100 mt-1">Report and track safety concerns around UW campus</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative">
                {/* Simulated Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Interactive Map View</h3>
                    <p className="text-gray-500 mt-2">U-District & UW Campus Area</p>
                  </div>
                </div>

                {/* Incident Markers */}
                {incidents.map((incident, index) => {
                  const TypeIcon = getTypeInfo(incident.type).icon;
                  return (
                    <div
                      key={incident.id}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        incident.severity === 'high' ? 'bg-red-500' : 
                        incident.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                      } text-white shadow-lg hover:scale-110 transition-transform`}
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 15}%`
                      }}
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <TypeIcon className="w-4 h-4" />
                    </div>
                  );
                })}
              </div>

              {/* Map Controls */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {incidentTypes.map(type => (
                    <div key={type.id} className="flex items-center gap-1 text-sm">
                      <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                      <span className="text-gray-600">{type.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowReportForm(true)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Report Safety Concern
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Reports
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {incidents.sort((a, b) => b.timestamp - a.timestamp).map(incident => {
                  const TypeIcon = getTypeInfo(incident.type).icon;
                  return (
                    <div
                      key={incident.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getSeverityColor(incident.severity)}`}>
                          <TypeIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm">{incident.title}</h4>
                          <p className="text-gray-600 text-xs mt-1 line-clamp-2">{incident.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </span>
                            {incident.verified && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Verified
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

            {/* Safety Tips */}
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

          </div>
        </div>

        {/* Report Form Modal */}
        {showReportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Safety Concern</h3>
                <div className="space-y-4">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Concern</label>
                    <select
                      value={newReport.type}
                      onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select type...</option>
                      {incidentTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newReport.title}
                      onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newReport.description}
                      onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                      placeholder="Provide more details about the location and nature of the concern"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                    <select
                      value={newReport.severity}
                      onChange={(e) => setNewReport({...newReport, severity: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low - Minor issue</option>
                      <option value="medium">Medium - Moderate concern</option>
                      <option value="high">High - Immediate attention needed</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitReport}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Submit Report
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For emergencies, call 911. For immediate campus security needs, contact UW Police at (206) 685-8973.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Incident Detail Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedIncident.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedIncident.severity)}`}>
                        {selectedIncident.severity} priority
                      </span>
                      {selectedIncident.verified && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIncident(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-6 h-6 transform rotate-45" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Description</h4>
                    <p className="text-gray-600 mt-1">{selectedIncident.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700">Reported</h4>
                    <p className="text-gray-600 mt-1">{selectedIncident.timestamp.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700">Type</h4>
                    <p className="text-gray-600 mt-1">{getTypeInfo(selectedIncident.type).label}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelectedIncident(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UDistrictSafetyMap;

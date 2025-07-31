import React from 'react';
import type { NewReport } from '../types';
import { incidentTypeConfigs } from '../utils/incidentUtils';

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newReport: NewReport;
  setNewReport: (report: NewReport) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newReport,
  setNewReport
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto shadow-2xl">
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
                {incidentTypeConfigs.map(type => (
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
                onChange={(e) => setNewReport({...newReport, severity: e.target.value as 'low' | 'medium' | 'high'})}
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
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
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
  );
};

export default ReportForm; 
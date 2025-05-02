import React from 'react';
import { Building, Mail, Globe, MapPin, Users, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CompanyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <Building className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Company Profile</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="contact@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://www.company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Manufacturing</option>
                <option>Retail</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Size</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>501-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                placeholder="Tell us about your company..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Internship Preferences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Skills</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="List the skills you typically look for in interns..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Environment</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>On-site only</option>
                  <option>Remote only</option>
                  <option>Hybrid</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
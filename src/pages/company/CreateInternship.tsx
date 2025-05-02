import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Clock, DollarSign, Calendar, Users, Plus, X } from 'lucide-react';

const CreateInternship: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [skills, setSkills] = useState<string[]>(['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/company/manage-internships');
    } catch (error) {
      console.error('Error creating internship:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addListItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList([...list, '']);
  };

  const removeListItem = (index: number, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const updateListItem = (
    index: number,
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Internship</h1>
        <p className="text-gray-600">
          Post a new internship opportunity and find talented students.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Internship Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Frontend Developer Intern"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe the internship opportunity..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Tokyo, Japan"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="workType" className="block text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="workType"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="onsite">On-site only</option>
                    <option value="remote">Remote only</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Duration and Schedule */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Duration and Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  required
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  required
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700">
                Hours per Week
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="hoursPerWeek"
                  required
                  min="1"
                  max="40"
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                Application Deadline
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="applicationDeadline"
                  required
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Compensation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="salary"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="salaryPeriod" className="block text-sm font-medium text-gray-700">
                Payment Period
              </label>
              <select
                id="salaryPeriod"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="hourly">Per Hour</option>
                <option value="monthly">Per Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Requirements</h2>
            <button
              type="button"
              onClick={() => addListItem(requirements, setRequirements)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Requirement
            </button>
          </div>
          <div className="space-y-3">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => updateListItem(index, e.target.value, requirements, setRequirements)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a requirement"
                />
                {requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(index, requirements, setRequirements)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Responsibilities</h2>
            <button
              type="button"
              onClick={() => addListItem(responsibilities, setResponsibilities)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Responsibility
            </button>
          </div>
          <div className="space-y-3">
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => updateListItem(index, e.target.value, responsibilities, setResponsibilities)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a responsibility"
                />
                {responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(index, responsibilities, setResponsibilities)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Required Skills</h2>
            <button
              type="button"
              onClick={() => addListItem(skills, setSkills)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </button>
          </div>
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateListItem(index, e.target.value, skills, setSkills)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a skill"
                />
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem(index, skills, setSkills)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/company/manage-internships')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Internship'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInternship;
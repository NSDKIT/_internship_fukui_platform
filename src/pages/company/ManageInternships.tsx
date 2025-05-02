import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Clock, DollarSign, Plus, Eye, User, CheckCircle, X, Filter } from 'lucide-react';
import { Internship, Application } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ManageInternships: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        const mockInternships: Internship[] = [
          {
            id: '101',
            companyId: 'c1',
            title: 'Frontend Developer Intern',
            description: 'Join our team as a frontend developer intern...',
            requirements: ['React', 'JavaScript', 'CSS'],
            responsibilities: ['Building user interfaces', 'Implementing responsive designs'],
            location: 'Tokyo',
            isRemote: false,
            salary: {
              amount: 20,
              period: 'hourly',
            },
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
            hoursPerWeek: 20,
            applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            industry: 'Technology',
            skills: ['React', 'TypeScript', 'Tailwind CSS'],
            status: 'published',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          // Add more mock internships as needed
        ];

        const mockApplications: Application[] = [
          {
            id: 'a1',
            internshipId: '101',
            studentId: 's1',
            status: 'pending',
            appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          // Add more mock applications as needed
        ];

        // Simulate loading delay
        setTimeout(() => {
          setInternships(mockInternships);
          setApplications(mockApplications);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getApplicationsForInternship = (internshipId: string) => {
    return applications.filter(app => app.internshipId === internshipId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Internships</h1>
          <p className="text-gray-600">
            View and manage your internship postings and applications.
          </p>
        </div>
        <Link
          to="/company/create-internship"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Internship
        </Link>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Internships</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {internships.map((internship) => {
          const internshipApplications = getApplicationsForInternship(internship.id);
          
          return (
            <div key={internship.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {internship.title}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{internship.location}</span>
                      {internship.isRemote && (
                        <span className="ml-2 text-green-600">(Remote available)</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/internship/${internship.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Applications</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {internshipApplications.length}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatDate(internship.applicationDeadline)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        internship.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : internship.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Applications</h3>
                  {internshipApplications.length > 0 ? (
                    <div className="space-y-3">
                      {internshipApplications.slice(0, 3).map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Student Name</p>
                              <p className="text-xs text-gray-500">
                                Applied {formatDate(application.appliedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                              Review
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No applications yet</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {internships.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No internships found</h3>
            <p className="mt-1 text-gray-500">
              Get started by creating your first internship posting.
            </p>
            <div className="mt-6">
              <Link
                to="/company/create-internship"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Internship
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInternships;
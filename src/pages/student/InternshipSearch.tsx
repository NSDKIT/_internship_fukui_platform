import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building, Clock, DollarSign, Filter, X } from 'lucide-react';

const InternshipSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const internships = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'Tokyo',
      isRemote: true,
      salary: '¥2000/hour',
      deadline: '2025-04-01',
      description: 'Join our dynamic team as a frontend developer intern...',
      skills: ['React', 'TypeScript', 'CSS'],
      industry: 'Technology'
    },
    {
      id: '2',
      title: 'Marketing Intern',
      company: 'GlobalBrand',
      location: 'Osaka',
      isRemote: false,
      salary: '¥1800/hour',
      deadline: '2025-03-15',
      description: 'Assist in developing and implementing marketing strategies...',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      industry: 'Marketing'
    },
    // Add more mock internships as needed
  ];

  const industries = [
    'Technology',
    'Marketing',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Design',
    'Research'
  ];

  const locations = [
    'Tokyo',
    'Osaka',
    'Kyoto',
    'Fukuoka',
    'Sapporo',
    'Nagoya',
    'Yokohama'
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !location || internship.location === location;
    const matchesIndustry = !industry || internship.industry === industry;
    const matchesRemote = !isRemote || internship.isRemote;

    return matchesSearch && matchesLocation && matchesIndustry && matchesRemote;
  });

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Internship</h1>
        <p className="text-gray-600">
          Search through hundreds of internship opportunities that match your skills and interests.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, company, or keywords"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">All Industries</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                    Remote Available
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {filteredInternships.map((internship) => (
          <div key={internship.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {internship.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{internship.company}</span>
                  </div>
                </div>
                <Link
                  to={`/internship/${internship.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {internship.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{internship.salary}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
                {internship.isRemote && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Remote Available
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {internship.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredInternships.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria to find more opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipSearch;
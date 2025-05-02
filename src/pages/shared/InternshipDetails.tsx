import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Calendar, Users, Globe, ChevronRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Internship } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const InternshipDetails: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration
  React.useEffect(() => {
    const fetchInternship = async () => {
      try {
        // Simulate API call
        const mockInternship: Internship = {
          id: '101',
          companyId: 'c1',
          title: 'Frontend Developer Intern',
          description: 'Join our dynamic team as a frontend developer intern. You will work closely with senior developers to build and maintain modern web applications using React and TypeScript. This is a great opportunity to gain hands-on experience in a fast-paced startup environment.',
          requirements: [
            'Currently pursuing a degree in Computer Science or related field',
            'Strong understanding of HTML, CSS, and JavaScript',
            'Familiarity with React and modern frontend development practices',
            'Good problem-solving skills and attention to detail',
            'Ability to work both independently and as part of a team',
            'Basic understanding of version control systems (Git)'
          ],
          responsibilities: [
            'Develop and maintain frontend components using React and TypeScript',
            'Collaborate with the design team to implement user interfaces',
            'Write clean, maintainable, and efficient code',
            'Participate in code reviews and team meetings',
            'Help identify and fix bugs',
            'Document code and development processes'
          ],
          location: 'Tokyo',
          isRemote: true,
          salary: {
            amount: 2000,
            period: 'hourly'
          },
          startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
          hoursPerWeek: 20,
          applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          industry: 'Technology',
          skills: ['React', 'TypeScript', 'HTML', 'CSS', 'Git', 'REST APIs'],
          status: 'published',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Simulate loading delay
        setTimeout(() => {
          setInternship(mockInternship);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching internship:', error);
        setIsLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasApplied(true);
    } catch (error) {
      console.error('Error applying to internship:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!internship) {
    return (
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Internship Not Found</h1>
            <p className="mt-2 text-gray-600">
              The internship you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/student/search"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Internships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/student/search" className="text-gray-500 hover:text-gray-700">
                Internships
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li className="text-gray-900 font-medium truncate">
              {internship.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {internship.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Building className="h-5 w-5 mr-2" />
                <span className="font-medium">TechCorp Inc.</span>
              </div>
            </div>
            {user?.userType === 'student' && (
              <div>
                {hasApplied ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Applied</span>
                  </div>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-gray-400" />
              <span>{internship.location}</span>
              {internship.isRemote && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Remote Available
                </span>
              )}
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
              <span>¥{internship.salary.amount}/{internship.salary.period}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{internship.hoursPerWeek} hours/week</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              <span>
                {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-red-500" />
            <span className="text-red-600 font-medium">
              Application Deadline: {formatDate(internship.applicationDeadline)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About the Internship</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {internship.description}
          </p>
        </div>

        {/* Requirements and Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-3">
              {internship.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {internship.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-600">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {internship.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        {user?.userType === 'student' && !hasApplied && (
          <div className="bg-gray-50 border-t fixed bottom-0 left-0 right-0 p-4">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={handleApply}
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Applying...' : 'Apply for this Internship'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDetails;
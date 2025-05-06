import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Building, MapPin, DollarSign, CheckCircle, X, Eye, User, ChevronDown } from 'lucide-react';
import { Application, Internship } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Applications: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);

  // Mock data for demonstration
  const mockInternships: Record<string, Internship> = {
    '101': {
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
    '102': {
      id: '102',
      companyId: 'c2',
      title: 'Data Analyst Intern',
      description: 'Work with our data science team...',
      requirements: ['Python', 'SQL', 'Data visualization'],
      responsibilities: ['Analyzing user data', 'Creating reports'],
      location: 'Osaka',
      isRemote: true,
      salary: {
        amount: 25,
        period: 'hourly',
      },
      startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 135 * 24 * 60 * 60 * 1000).toISOString(),
      hoursPerWeek: 15,
      applicationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      industry: 'Finance',
      skills: ['Python', 'SQL', 'Tableau'],
      status: 'published',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };

  const mockCompanies: Record<string, { name: string; logoUrl?: string }> = {
    c1: { name: 'TechCorp Inc.' },
    c2: { name: 'DataFlow Analytics' },
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Simulate API call
        const mockApplications: Application[] = [
          {
            id: 'a1',
            internshipId: '101',
            studentId: 's1',
            status: 'pending',
            appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'a2',
            internshipId: '102',
            studentId: 's1',
            status: 'reviewing',
            appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];

        // Simulate loading delay
        setTimeout(() => {
          setApplications(mockApplications);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'reviewing':
        return <Eye className="h-5 w-5 text-blue-500" />;
      case 'interview':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '審査待ち';
      case 'reviewing':
        return '審査中';
      case 'interview':
        return '面接段階';
      case 'accepted':
        return '合格';
      case 'rejected':
        return '不合格';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredApplications = applications.filter(application => {
    if (selectedFilter === 'all') return true;
    return application.status === selectedFilter;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">応募履歴</h1>
        <p className="text-gray-600">
          インターンシップへの応募状況を確認できます。
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            審査待ち
          </button>
          <button
            onClick={() => setSelectedFilter('reviewing')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'reviewing'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            審査中
          </button>
          <button
            onClick={() => setSelectedFilter('interview')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedFilter === 'interview'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            面接
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {filteredApplications.length} 件の応募
          </span>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">応募履歴がありません</h3>
          <p className="mt-1 text-sm text-gray-500">インターンシップに応募して、キャリアの第一歩を踏み出しましょう。</p>
          <div className="mt-6">
            <Link
              to="/student/search"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              インターンシップを探す
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredApplications.map(application => {
              const internship = mockInternships[application.internshipId];
              const company = mockCompanies[internship.companyId];
              
              return (
                <li key={application.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Building className="h-6 w-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">
                            {internship.title}
                          </h4>
                          <p className="text-sm text-gray-500">{company.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{getStatusText(application.status)}</span>
                        </span>
                        <button
                          onClick={() => setExpandedApplication(expandedApplication === application.id ? null : application.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <ChevronDown className={`h-5 w-5 transform transition-transform ${expandedApplication === application.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {expandedApplication === application.id && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>{internship.location}{internship.isRemote ? ' (リモート可)' : ''}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>時給 {internship.salary.amount}円</span>
                          </div>
                        </div>
                        <div className="sm:col-span-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>応募日: {formatDate(application.appliedAt)}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>最終更新: {formatDate(application.updatedAt)}</span>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="flex space-x-3">
                            <Link
                              to={`/internship/${internship.id}`}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              詳細を見る
                            </Link>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              企業に問い合わせる
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Applications;
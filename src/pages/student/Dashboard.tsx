import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, CheckCircle, XCircle, Briefcase, ArrowUpRight, User, BookOpen, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Application, Internship, Scout } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock data for the dashboard
const mockApplications: Application[] = [
  {
    id: '1',
    internshipId: '101',
    studentId: '123',
    status: 'pending',
    appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    internshipId: '102',
    studentId: '123',
    status: 'reviewing',
    appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    internshipId: '103',
    studentId: '123',
    status: 'interview',
    appliedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

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
  {
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
  {
    id: '103',
    companyId: 'c3',
    title: 'Marketing Intern',
    description: 'Assist with digital marketing campaigns...',
    requirements: ['Social media', 'Content creation', 'Analytics'],
    responsibilities: ['Managing social media', 'Creating content'],
    location: 'Kyoto',
    isRemote: false,
    salary: {
      amount: 18,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 25,
    applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    industry: 'Marketing',
    skills: ['Social Media Marketing', 'Content Creation', 'Google Analytics'],
    status: 'published',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockCompanies: Record<string, { name: string; logoUrl?: string }> = {
  c1: { name: 'TechNova Inc.' },
  c2: { name: 'DataFlow Analytics' },
  c3: { name: 'MarketBurst' },
  c4: { name: 'EcoSolutions' },
};

const mockScouts: Scout[] = [
  {
    id: 's1',
    companyId: 'c1',
    studentId: '123',
    internshipId: '101',
    message: 'We were impressed by your profile and think you would be a great fit for our Frontend Developer internship.',
    status: 'sent',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 's2',
    companyId: 'c4',
    studentId: '123',
    message: 'We have an upcoming internship opportunity that matches your skills in sustainability. Would you be interested?',
    status: 'sent',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [scouts, setScouts] = useState<Scout[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  const [industryFilter, setIndustryFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  
  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        setApplications(mockApplications);
        setScouts(mockScouts);
        setRecommendedInternships(mockInternships);
        
        // Simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
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
        return <XCircle className="h-5 w-5 text-red-500" />;
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

  const getInternshipById = (id: string) => {
    return mockInternships.find(internship => internship.id === id);
  };

  const getCompanyById = (id: string) => {
    return mockCompanies[id] || { name: 'Unknown Company' };
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };

  // フィルタリングされたインターンシップを取得
  const filteredInternships = recommendedInternships.filter(internship => {
    const matchesIndustry = !industryFilter || internship.industry === industryFilter;
    const matchesSkill = !skillFilter || internship.skills.includes(skillFilter);
    return matchesIndustry && matchesSkill;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8" role="main" aria-label="学生ダッシュボード">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" role="heading" aria-level={1}>
          ようこそ、{user?.name}さん！
        </h1>
        <p className="text-gray-600">
          インターンシップの応募状況と新着情報をご確認ください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100" role="region" aria-label="応募状況サマリー">
          <div className="flex items-center text-blue-600 mb-3">
            <Briefcase className="h-5 w-5 mr-2" aria-hidden="true" />
            <h3 className="font-semibold">応募状況</h3>
          </div>
          <p className="text-3xl font-bold" aria-label={`${applications.length}件の応募`}>{applications.length}</p>
          <p className="text-sm text-gray-600">応募中のインターンシップ</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-100" role="region" aria-label="面接状況サマリー">
          <div className="flex items-center text-purple-600 mb-3">
            <User className="h-5 w-5 mr-2" aria-hidden="true" />
            <h3 className="font-semibold">面接</h3>
          </div>
          <p className="text-3xl font-bold" aria-label={`${applications.filter(app => app.status === 'interview').length}件の面接`}>
            {applications.filter(app => app.status === 'interview').length}
          </p>
          <p className="text-sm text-gray-600">面接段階の応募</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 border border-green-100" role="region" aria-label="スカウトサマリー">
          <div className="flex items-center text-green-600 mb-3">
            <BookOpen className="h-5 w-5 mr-2" aria-hidden="true" />
            <h3 className="font-semibold">新着スカウト</h3>
          </div>
          <p className="text-3xl font-bold" aria-label={`${scouts.length}件のスカウト`}>{scouts.length}</p>
          <p className="text-sm text-gray-600">企業からのスカウトメッセージ</p>
        </div>
      </div>

      <div className="mb-10" role="region" aria-label="最近の応募一覧">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900" role="heading" aria-level={2}>
            最近の応募
          </h2>
          <Link 
            to="/student/applications" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            aria-label="すべての応募を見る"
          >
            すべて見る
            <ArrowUpRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Link>
        </div>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg border p-6 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">応募履歴がありません</h3>
            <p className="text-gray-600 mb-4">興味のあるインターンシップに応募して、キャリアの第一歩を踏み出しましょう。</p>
            <Link 
              to="/student/search" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              インターンシップを探す
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {applications.slice(0, 3).map(application => {
                const internship = getInternshipById(application.internshipId);
                const company = internship ? getCompanyById(internship.companyId) : { name: 'Unknown Company' };
                
                return (
                  <li key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <Link to={`/internship/${application.internshipId}`} className="block p-4">
                      <div className="sm:flex sm:justify-between sm:items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {internship?.title || 'Untitled Internship'}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{company.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Applied on {formatDate(application.appliedAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex items-center">
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span className="ml-2 text-sm font-medium">
                              {getStatusText(application.status)}
                            </span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 ml-3 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">スカウトメッセージ</h2>
        </div>
        
        {scouts.length === 0 ? (
          <div className="bg-white rounded-lg border p-6 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">スカウトはまだありません</h3>
            <p className="text-gray-600 mb-4">
              プロフィールを充実させて、企業からのスカウトを待ちましょう。
            </p>
            <Link 
              to="/student/profile" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              プロフィールを編集
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {scouts.map(scout => {
                const company = getCompanyById(scout.companyId);
                const internship = scout.internshipId ? getInternshipById(scout.internshipId) : null;
                
                return (
                  <li key={scout.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="sm:flex sm:items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        {company.logoUrl ? (
                          <img src={company.logoUrl} alt={company.name} className="w-12 h-12 rounded-full" />
                        ) : (
                          <Building className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {company.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(scout.createdAt)}
                          </p>
                        </div>
                        
                        {internship && (
                          <p className="text-sm font-medium text-blue-600 mt-1">
                            For: {internship.title}
                          </p>
                        )}
                        
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {scout.message}
                        </p>
                        
                        <div className="mt-3 flex gap-2">
                          <button className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            詳細を見る
                          </button>
                          <button className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            返信する
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div role="region" aria-label="おすすめのインターンシップ">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900" role="heading" aria-level={2}>
            おすすめのインターンシップ
          </h2>
          <div className="flex items-center gap-4">
            <select
              className="rounded-md border-gray-300 text-sm"
              aria-label="業界でフィルター"
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">すべての業界</option>
              {Array.from(new Set(recommendedInternships.map(i => i.industry))).map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <select
              className="rounded-md border-gray-300 text-sm"
              aria-label="スキルでフィルター"
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="">すべてのスキル</option>
              {Array.from(new Set(recommendedInternships.flatMap(i => i.skills))).map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
            <Link 
              to="/student/search" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              aria-label="すべてのインターンシップを見る"
            >
              すべて見る
              <ArrowUpRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map(internship => {
            const company = getCompanyById(internship.companyId);
            
            return (
              <div 
                key={internship.id} 
                className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow duration-200"
                role="article"
                aria-label={`${company.name}の${internship.title}`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <Building className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      {formatDate(internship.createdAt)}
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-3 mb-1">
                    {internship.title}
                  </h3>
                  <p className="text-sm text-gray-600">{company.name}</p>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{internship.location}{internship.isRemote ? ' (Remote available)' : ''}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>週{internship.hoursPerWeek}時間</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>時給{internship.salary.amount}円</span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {internship.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        role="tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link
                      to={`/internship/${internship.id}`}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      aria-label={`${internship.title}の詳細を見る`}
                    >
                      詳細を見る
                    </Link>
                    <Link
                      to={`/internship/${internship.id}/apply`}
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      aria-label={`${internship.title}に応募する`}
                    >
                      応募する
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
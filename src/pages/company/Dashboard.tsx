import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, CheckCircle, XCircle, Briefcase, ArrowUpRight, User, Building, MapPin, DollarSign, Users } from 'lucide-react';
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
    title: 'フロントエンド開発インターン',
    description: '当社のチームに参加し、フロントエンド開発インターンとして...',
    requirements: ['React', 'JavaScript', 'CSS'],
    responsibilities: ['ユーザーインターフェースの構築', 'レスポンシブデザインの実装'],
    location: '東京',
    isRemote: false,
    salary: {
      amount: 20,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 20,
    applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    industry: 'テクノロジー',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    status: 'published',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '102',
    companyId: 'c2',
    title: 'データアナリストインターン',
    description: 'データサイエンスチームと協力して...',
    requirements: ['Python', 'SQL', 'データ可視化'],
    responsibilities: ['ユーザーデータの分析', 'レポート作成'],
    location: '大阪',
    isRemote: true,
    salary: {
      amount: 25,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 135 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 15,
    applicationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    industry: '金融',
    skills: ['Python', 'SQL', 'Tableau'],
    status: 'published',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '103',
    companyId: 'c3',
    title: 'マーケティングインターン',
    description: 'デジタルマーケティングキャンペーンのサポート...',
    requirements: ['SNS', 'コンテンツ作成', '分析'],
    responsibilities: ['SNS運営', 'コンテンツ作成'],
    location: '京都',
    isRemote: false,
    salary: {
      amount: 18,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 25,
    applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    industry: 'マーケティング',
    skills: ['SNSマーケティング', 'コンテンツ作成', 'Google Analytics'],
    status: 'published',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockCompanies: Record<string, { name: string; logoUrl?: string }> = {
  c1: { name: 'テックノバ株式会社' },
  c2: { name: 'データフロー・アナリティクス' },
  c3: { name: 'マーケットバースト' },
  c4: { name: 'エコソリューションズ' },
};

const mockScouts: Scout[] = [
  {
    id: 's1',
    companyId: 'c1',
    studentId: '123',
    internshipId: '101',
    message: 'あなたのプロフィールに感銘を受け、当社のフロントエンド開発インターンシップに最適な候補者だと考えています。',
    status: 'sent',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 's2',
    companyId: 'c4',
    studentId: '123',
    message: 'あなたのサステナビリティに関するスキルに合った新しいインターンシップの機会があります。ご興味はありますか？',
    status: 'sent',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [scouts, setScouts] = useState<Scout[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  
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
    return mockCompanies[id] || { name: '不明な企業' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ようこそ、{user?.name}様！
        </h1>
        <p className="text-gray-600">
          インターンシップの掲載状況と応募者の概要をご確認ください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center text-blue-600 mb-3">
            <Briefcase className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">掲載中のインターンシップ</h3>
          </div>
          <p className="text-3xl font-bold">{applications.length}</p>
          <p className="text-sm text-gray-600">現在公開中</p>
          <div className="mt-3">
            <Link 
              to="/company/create-internship" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + 新規インターンシップを掲載
            </Link>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
          <div className="flex items-center text-purple-600 mb-3">
            <Users className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">応募</h3>
          </div>
          <p className="text-3xl font-bold">{applications.length}</p>
          <p className="text-sm text-gray-600">{applications.filter(app => app.status === 'pending').length}件の審査待ち</p>
          <div className="mt-3">
            <Link 
              to="/company/manage-internships" 
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              応募を確認
            </Link>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
          <div className="flex items-center text-amber-600 mb-3">
            <Clock className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">次回の締切</h3>
          </div>
          {mockInternships.length > 0 ? (
            <>
              <p className="text-3xl font-bold">14日</p>
              <p className="text-sm text-gray-600 truncate">{mockInternships[0].title}</p>
              <div className="mt-3">
                <Link 
                  to={`/internship/${mockInternships[0].id}`}
                  className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                >
                  掲載を確認
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold">-</p>
              <p className="text-sm text-gray-600">締切予定なし</p>
              <div className="mt-3">
                <Link 
                  to="/company/create-internship" 
                  className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                >
                  インターンシップを作成
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">最近の応募</h2>
          <Link 
            to="/company/manage-internships" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            すべて見る
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg border p-6 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">応募はまだありません</h3>
            <p className="text-gray-600 mb-4">
              学生からの応募があると、ここに表示されます。
            </p>
            <Link 
              to="/company/create-internship" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              インターンシップを掲載
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {applications.map(application => {
                const internship = getInternshipById(application.internshipId);
                
                return (
                  <li key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <div className="p-4">
                      <div className="sm:flex sm:justify-between sm:items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {internship?.title || '無題のインターンシップ'}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>応募日: {formatDate(application.appliedAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                            application.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{getStatusText(application.status)}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                          応募を確認
                        </button>
                        {application.status === 'pending' && (
                          <button className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            審査を開始
                          </button>
                        )}
                        {application.status === 'reviewing' && (
                          <button className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            面接を設定
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">インターンシップ一覧</h2>
          <Link 
            to="/company/manage-internships" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            すべて見る
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {recommendedInternships.length === 0 ? (
          <div className="bg-white rounded-lg border p-6 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">インターンシップがありません</h3>
            <p className="text-gray-600 mb-4">
              最初のインターンシップを作成して、優秀な学生からの応募を受け付けましょう。
            </p>
            <Link 
              to="/company/create-internship" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              インターンシップを作成
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedInternships.map(internship => {
              const company = getCompanyById(internship.companyId);
              const internshipApplications = applications.filter(app => app.internshipId === internship.id);
              
              return (
                <div key={internship.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{internship.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        internship.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {internship.status === 'published' ? '公開中' : '下書き'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{company.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{internship.location}{internship.isRemote && ' (リモート可)'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>¥{internship.salary.amount.toLocaleString()}/{internship.salary.period}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>応募締切: {formatDate(internship.applicationDeadline)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">応募者数</p>
                          <p className="text-lg font-semibold">{internshipApplications.length}名</p>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/internship/${internship.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            詳細
                          </Link>
                          <Link
                            to={`/company/manage-internships?id=${internship.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            管理
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
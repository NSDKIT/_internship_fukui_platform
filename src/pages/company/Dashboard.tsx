import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, CheckCircle, XCircle, Briefcase, ArrowUpRight, User, Building, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Application, Internship } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock data for the dashboard
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
    companyId: 'c1',
    title: 'バックエンド開発インターン',
    description: 'サーバーインフラストラクチャとAPIの開発...',
    requirements: ['Node.js', 'Express', 'MongoDB'],
    responsibilities: ['APIの構築', 'データベース管理'],
    location: '東京',
    isRemote: true,
    salary: {
      amount: 22,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 135 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 20,
    applicationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    industry: 'テクノロジー',
    skills: ['Node.js', 'Express', 'MongoDB'],
    status: 'published',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '103',
    companyId: 'c1',
    title: 'プロダクトデザインインターン',
    description: 'ユーザーインターフェースとエクスペリエンスのデザイン...',
    requirements: ['Figma', 'UI/UX', 'デザイン思考'],
    responsibilities: ['ワイヤーフレーム作成', 'ユーザーリサーチ'],
    location: '東京',
    isRemote: false,
    salary: {
      amount: 18,
      period: 'hourly',
    },
    startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
    hoursPerWeek: 15,
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    industry: 'デザイン',
    skills: ['Figma', 'UI/UX', 'ワイヤーフレーム'],
    status: 'draft',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
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
  {
    id: 'a2',
    internshipId: '101',
    studentId: 's2',
    status: 'reviewing',
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a3',
    internshipId: '101',
    studentId: 's3',
    status: 'interview',
    appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a4',
    internshipId: '102',
    studentId: 's4',
    status: 'pending',
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a5',
    internshipId: '102',
    studentId: 's5',
    status: 'pending',
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockStudents: Record<string, { name: string; university: string; avatarUrl?: string }> = {
  s1: { name: '田中 優希', university: '東京大学' },
  s2: { name: '佐藤 遥斗', university: '京都大学' },
  s3: { name: '山本 愛莉', university: '大阪大学' },
  s4: { name: '中村 陸', university: '東北大学' },
  s5: { name: '小林 美桜', university: '早稲田大学' },
};

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  
  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        setInternships(mockInternships);
        setApplications(mockApplications);
        
        // Simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('ダッシュボードデータの取得に失敗:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const getInternshipById = (id: string) => {
    return internships.find(internship => internship.id === id);
  };

  const getStudentById = (id: string) => {
    return mockStudents[id] || { name: '不明な学生', university: '不明な大学' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate metrics
  const activeInternships = internships.filter(i => i.status === 'published').length;
  const draftInternships = internships.filter(i => i.status === 'draft').length;
  const totalApplications = applications.length;
  const pendingApplications = getApplicationsByStatus('pending').length;
  const interviewApplications = getApplicationsByStatus('interview').length;

  // Calculate days until next application deadline
  const getNextDeadline = () => {
    const publishedInternships = internships.filter(i => i.status === 'published');
    if (publishedInternships.length === 0) return null;
    
    const sortedByDeadline = [...publishedInternships].sort(
      (a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
    );
    
    const nextDeadline = sortedByDeadline[0];
    const daysUntilDeadline = Math.ceil(
      (new Date(nextDeadline.applicationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return {
      internship: nextDeadline,
      daysRemaining: daysUntilDeadline
    };
  };
  
  const nextDeadline = getNextDeadline();

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
          <p className="text-3xl font-bold">{activeInternships}</p>
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
          <p className="text-3xl font-bold">{totalApplications}</p>
          <p className="text-sm text-gray-600">{pendingApplications}件の審査待ち</p>
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
          {nextDeadline ? (
            <>
              <p className="text-3xl font-bold">{nextDeadline.daysRemaining}日</p>
              <p className="text-sm text-gray-600 truncate">{nextDeadline.internship.title}</p>
              <div className="mt-3">
                <Link 
                  to={`/internship/${nextDeadline.internship.id}`}
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

      {draftInternships > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                {draftInternships}件の下書き{draftInternships === 1 ? 'が' : 'が'}まだ公開されていません。
              </p>
              <p className="text-sm mt-2">
                <Link to="/company/manage-internships" className="font-medium text-amber-700 underline hover:text-amber-600">
                  完成させて公開し、応募の受付を開始しましょう。
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

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
              {applications.slice(0, 5).map(application => {
                const internship = getInternshipById(application.internshipId);
                const student = getStudentById(application.studentId);
                
                return (
                  <li key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <div className="p-4">
                      <div className="sm:flex sm:justify-between sm:items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            {student.avatarUrl ? (
                              <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <span className="text-sm font-medium text-gray-500">
                                {student.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-600">{student.university}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          <p className="text-sm font-medium text-gray-900">
                            {internship?.title || '無題のインターンシップ'}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>応募日: {formatDate(application.appliedAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 flex items-center">
                          {application.status === 'pending' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              審査待ち
                            </span>
                          )}
                          {application.status === 'reviewing' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Eye className="h-3 w-3 mr-1" />
                              審査中
                            </span>
                          )}
                          {application.status === 'interview' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              <User className="h-3 w-3 mr-1" />
                              面接段階
                            </span>
                          )}
                          {application.status === 'accepted' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              合格
                            </span>
                          )}
                          {application.status === 'rejected' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              不合格
                            </span>
                          )}
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
                        {application.status === 'interview' && (
                          <button className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            結果を通知
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
          <h2 className="text-xl font-bold text-gray-900">インターンシップ掲載一覧</h2>
          <Link 
            to="/company/manage-internships" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            すべて見る
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {internships.length === 0 ? (
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
            {internships.map(internship => {
              const internshipApplications = applications.filter(app => app.internshipId === internship.id);
              
              return (
                <div key={internship.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="border-b px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-medium text-gray-900">{internship.title}</h3>
                    </div>
                    {internship.status === 'published' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        公開中
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        下書き
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                        {internship.location}
                        {internship.isRemote && <span className="ml-1">(リモート可)</span>}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(internship.applicationDeadline) > new Date() 
                          ? `締切: ${formatDate(internship.applicationDeadline)}`
                          : '締切済み'}
                      </div>
                    </div>
                    
                    <div className="border-t border-b py-4 my-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">応募数</p>
                          <p className="text-xl font-semibold">{internshipApplications.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">審査待ち</p>
                          <p className="text-xl font-semibold">
                            {internshipApplications.filter(app => app.status === 'pending').length}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between space-x-3">
                      <Link
                        to={`/internship/${internship.id}`}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        詳細を見る
                      </Link>
                      <Link
                        to={`/company/manage-internships?id=${internship.id}`}
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        応募を管理
                      </Link>
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
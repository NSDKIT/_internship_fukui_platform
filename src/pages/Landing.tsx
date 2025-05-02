import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, BookOpen, Building, Search, Heart, Award, Clock, DollarSign } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                学生と企業をつなぐインターンシップマッチング
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                あなたのキャリア目標に合った完璧なインターンシップを見つけましょう。または、企業として才能ある学生を発見しましょう。
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
                >
                  無料で登録
                </Link>
                <Link 
                  to="/login" 
                  className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
                >
                  ログイン
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Students and professionals collaborating" 
                className="rounded-lg shadow-lg object-cover h-80 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">サービスの特徴</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              シンプルで効率的なプロセスで、大学の学生と質の高いインターンシップを提供する企業をつなぎます。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">学生の方へ</h3>
              <p className="text-gray-600 mb-4">プロフィールを作成し、スキルに合ったインターンシップを閲覧し、直接応募できます。</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">プロフェッショナルなプロフィール作成</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">関連するインターンシップへの応募</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">企業からのメッセージ受信</span>
                </li>
              </ul>
            </div>
            
            {/* For Companies */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">企業の方へ</h3>
              <p className="text-gray-600 mb-4">インターンシップの機会を投稿し、才能ある学生を検索し、採用プロセスを簡単に管理できます。</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">インターンシップの機会を投稿</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">学生データベースの検索</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">応募状況の追跡</span>
                </li>
              </ul>
            </div>
            
            {/* Find Matches */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">マッチング機能</h3>
              <p className="text-gray-600 mb-4">インテリジェントなマッチングアルゴリズムが、適切な学生と企業をつなぎます。</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">高度なフィルタリングオプション</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">スキルベースのマッチング</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">ダイレクトメッセージングシステム</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">InternMatchを選ぶ理由</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              質の高いインターンシップを通じて、学生と企業の間に意味のあるつながりを作ることに専念しています。
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Heart className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">質の高いマッチング</h3>
              <p className="text-gray-600">インテリジェントなマッチングシステムが、学生と企業の両方にとって完璧な組み合わせを見つけます。</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">検証済みの機会</h3>
              <p className="text-gray-600">当プラットフォームのすべてのインターンシップは、貴重な学習体験を提供することを確認しています。</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">時間効率</h3>
              <p className="text-gray-600">効率化されたプロセスと直感的なインターフェースで、学生と企業の両方の時間を節約します。</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">有給インターンシップ</h3>
              <p className="text-gray-600">学生の時間と貢献を評価する有給の機会に焦点を当てています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">成功事例</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              当プラットフォームを通じて成功を収めた学生と企業の声をお聞きください。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  Y
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">田中 優希</h4>
                  <p className="text-gray-600 text-sm">コンピュータサイエンス専攻</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                「InternMatchを通じて、キャリア目標にぴったり合った素晴らしいインターンシップを見つけることができました。応募プロセスはスムーズで、プロジェクトやスキルを効果的にアピールできました。」
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  T
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">テックノバ株式会社</h4>
                  <p className="text-gray-600 text-sm">ソフトウェア開発会社</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                「InternMatchを通じて、素晴らしい人材を見つけることができました。プラットフォームのおかげで、必要なスキルを持つ学生を簡単に特定でき、コミュニケーションツールにより採用プロセスが大幅に効率化されました。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">完璧なマッチングを見つける準備はできましたか？</h2>
          <p className="text-xl opacity-90 mb-8">
            すでに完璧なマッチングを見つけた何千人もの学生と企業に参加しましょう。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              始める
            </Link>
            <Link 
              to="/login" 
              className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-white font-bold text-lg">InternMatch</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                2025年から、大学の学生と質の高い有給インターンシップをつなげています。
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">学生の方へ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">インターンシップを閲覧</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">プロフィールを作成</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">キャリアリソース</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">成功事例</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">企業の方へ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">インターンシップを投稿</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">学生を検索</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">採用ツール</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">成功事例</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">会社情報</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">会社概要</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">ブログ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">プライバシーポリシー</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 InternMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
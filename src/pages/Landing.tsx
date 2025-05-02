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
                Connect Students with Meaningful Internships
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Find the perfect internship opportunity that aligns with your career goals, or discover talented students for your company.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
                >
                  Sign Up Free
                </Link>
                <Link 
                  to="/login" 
                  className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
                >
                  Login
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect university students with companies offering quality internships through a simple, streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">For Students</h3>
              <p className="text-gray-600 mb-4">Create your profile, browse internships that match your skills, and apply directly through our platform.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Create professional profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Apply to relevant internships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Receive company messages</span>
                </li>
              </ul>
            </div>
            
            {/* For Companies */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">For Companies</h3>
              <p className="text-gray-600 mb-4">Post internship opportunities, search for talented students, and manage your hiring process easily.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Post internship opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Search student database</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Track application progress</span>
                </li>
              </ul>
            </div>
            
            {/* Find Matches */}
            <div className="bg-blue-50 rounded-lg p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Find Matches</h3>
              <p className="text-gray-600 mb-4">Our intelligent matching algorithm connects the right students with the right companies.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Advanced filtering options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Skill-based matching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Direct messaging system</span>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose InternMatch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to creating meaningful connections between students and companies through quality internships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Heart className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Matches</h3>
              <p className="text-gray-600">Our intelligent matching system helps find the perfect fit for both students and companies.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Verified Opportunities</h3>
              <p className="text-gray-600">All internships on our platform are verified to ensure they provide valuable learning experiences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Time Efficient</h3>
              <p className="text-gray-600">Streamlined processes and intuitive interfaces save time for both students and companies.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Paid Internships</h3>
              <p className="text-gray-600">We focus on paid opportunities that value students' time and contributions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students and companies who've found success through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  Y
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Yuki Tanaka</h4>
                  <p className="text-gray-600 text-sm">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Through InternMatch, I found a fantastic internship at a tech startup that aligned perfectly with my career goals. The application process was smooth, and I was able to showcase my projects and skills effectively."
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  T
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">TechNova Inc.</h4>
                  <p className="text-gray-600 text-sm">Software Development Company</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We've found exceptional talent through InternMatch. The platform makes it easy to identify students with the exact skills we need, and the communication tools have streamlined our hiring process significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect match?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students and companies who have already found their perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Learn More
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
                Connecting university students with quality, paid internships since 2025.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Browse Internships</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Create Profile</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Career Resources</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Post Internships</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Search Students</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Recruitment Tools</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
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
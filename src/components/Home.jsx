import { useState, useEffect } from 'react';
import pic1 from '../assets/pic1.jpeg';

const Home = ({ isLoggedIn, user, onNavigateToSignup, isDashboard = false, onNavigateToReminders }) => {
  const [motivationQuote, setMotivationQuote] = useState('');
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [hasData, setHasData] = useState(false); // Track if user has any data

  // Mock motivation quotes
  const quotes = [
    "Study hard, your future self will thank you 💪",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
  ];

  useEffect(() => {
    // Set random motivation quote
    setMotivationQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // For demo purposes, we'll simulate a new user with no data
    // In a real app, this would check if user has any reminders, tasks, etc.
    setHasData(false);
    setUpcomingReminders([]);
  }, []);

  // Not Logged In User View - Hero Section + Features
  const NotLoggedInView = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Take Control of Your Academic Journey{' '}
                <span className="text-indigo-600">💼✨</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Deadlines, Notes, Progress & AI Guidance — All in One Place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onNavigateToSignup}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started for Free
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={pic1}
                alt="Academic Success"
                className="w-full max-w-md rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                📚
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                🎯
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools designed for modern students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Reminder System */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Reminder System
            </h3>
            <p className="text-gray-600">
              Never miss a deadline again with smart notifications and calendar integration.
            </p>
          </div>

          {/* AI Study Companion */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Study Companion
            </h3>
            <p className="text-gray-600">
              Your personal assistant, 24/7. Get instant help with homework and study guidance.
            </p>
          </div>

          {/* Focus Sessions */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Focus Sessions
            </h3>
            <p className="text-gray-600">
              Work in deep sessions and prioritize your work with Pomodoro technique.
            </p>
          </div>

          {/* Smart Insights */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Smart Insights
            </h3>
            <p className="text-gray-600">
              See where you're winning & where to grow with detailed analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  // Logged In User - Clean Home Page (not dashboard)
  const LoggedInHomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Welcome back, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to continue your academic journey? Access your tools and resources below.
          </p>
          <p className="text-gray-500 italic text-lg">
            "{motivationQuote}"
          </p>
        </section>

        {/* Quick Access Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Your Dashboard
            </h3>
            <p className="text-gray-600 mb-6">
              View your progress, reminders, and insights in one place.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Go to Dashboard
            </button>
          </div>

          {/* Reminders Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Manage Reminders
            </h3>
            <p className="text-gray-600 mb-6">
              Create and track your deadlines and important tasks.
            </p>
            <button 
              onClick={onNavigateToReminders}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Reminders
            </button>
          </div>

          {/* AI Companion Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Study Companion
            </h3>
            <p className="text-gray-600 mb-6">
              Get instant help with your studies and homework.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Start Chat
            </button>
          </div>
        </section>
      </div>
    </div>
  );

  // Dashboard View - Full dashboard with data
  const DashboardView = () => {
    // Get reminders from localStorage
    const [reminders, setReminders] = useState([]);
    
    useEffect(() => {
      const savedReminders = localStorage.getItem('reminders');
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    }, []);

    // Get top 3 upcoming reminders
    const upcomingReminders = reminders
      .filter(reminder => !reminder.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    };

    const getTimeUntil = (dueDate) => {
      const now = new Date();
      const due = new Date(dueDate);
      const diff = due - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (diff < 0) return 'Overdue';
      if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
      return 'Due today';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Hey {user?.name || 'there'} 👋, welcome aboard!
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  Your space is ready. Start by adding your first reminder or goal.
                </p>
                <p className="text-gray-500 italic">
                  "{motivationQuote}"
                </p>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reminder Snapshot */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Reminders</h2>
                  <button 
                    onClick={onNavigateToReminders}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span>➕</span>
                    Add Reminder
                  </button>
                </div>
                
                {upcomingReminders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">⏰</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No reminders yet! Stay ahead by adding your first one.
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create reminders to never miss important deadlines.
                    </p>
                    <button 
                      onClick={onNavigateToReminders}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add Your First Reminder
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                          <p className="text-sm text-gray-600">{reminder.subject} • {formatDate(reminder.dueDate)}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Due in</div>
                          <div className="text-sm font-medium text-indigo-600">{getTimeUntil(reminder.dueDate)}</div>
                        </div>
                      </div>
                    ))}
                    
                    {reminders.filter(r => !r.completed).length > 3 && (
                      <div className="text-center pt-4">
                        <button 
                          onClick={onNavigateToReminders}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          View All Reminders →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* AI Study Companion Quick Access */}
            <section>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Study Companion</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="text-2xl mb-2">🤖</div>
                    <h3 className="font-semibold mb-2">Hi! I'm your study buddy</h3>
                    <p className="text-sm opacity-90 mb-4">Ask me anything to get started.</p>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <span>💬</span>
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Progress & Insights */}
          <section className="mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress & Insights</h2>
              
              {!hasData ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Track your tasks to unlock insights here
                  </h3>
                  <p className="text-gray-600">
                    Complete tasks and build habits to see your progress analytics
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Focus Time */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2.5 hours</div>
                    <h3 className="font-semibold text-gray-900">Daily Focus Time</h3>
                    <p className="text-sm text-gray-600">Average this week</p>
                  </div>

                  {/* Most Productive Day */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">Wednesday</div>
                    <h3 className="font-semibold text-gray-900">Most Productive Day</h3>
                    <p className="text-sm text-gray-600">This week</p>
                  </div>

                  {/* Tasks Completed */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">12</div>
                    <h3 className="font-semibold text-gray-900">Tasks Completed</h3>
                    <p className="text-sm text-gray-600">This week</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  };

  // Main render logic - determine what to show based on login state and isDashboard prop
  if (!isLoggedIn) {
    // Not logged in - always show landing page
    return <NotLoggedInView />;
  } else {
    // Logged in - check if it's dashboard or home
    if (isDashboard) {
      // Dashboard mode - show full dashboard with data
      return <DashboardView />;
    } else {
      // Home mode - show clean home page without dashboard UI
      return <LoggedInHomeView />;
    }
  }
};

export default Home; 
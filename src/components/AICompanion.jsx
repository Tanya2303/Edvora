import React, { useState, useEffect, useRef } from 'react';
import { useReminders } from '../hooks/useReminders';

const AICompanion = ({ user, onNavigateToHome, onNavigateToDashboard, onNavigateToLogin, onNavigateToSignup }) => {
  // If not logged in, show friendly teaser UI
  if (!user || !user.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
        {/* Animated AI Avatar (SVG or PNG fallback) */}
        <div className="mb-8 animate-bounce">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#6366F1" stroke="#A5B4FC" strokeWidth="4" />
            <ellipse cx="50" cy="60" rx="28" ry="18" fill="#EEF2FF" />
            <circle cx="40" cy="50" r="6" fill="#fff" />
            <circle cx="60" cy="50" r="6" fill="#fff" />
            <ellipse cx="40" cy="52" rx="2" ry="2.5" fill="#6366F1" />
            <ellipse cx="60" cy="52" rx="2" ry="2.5" fill="#6366F1" />
            <ellipse cx="50" cy="67" rx="7" ry="3.5" fill="#6366F1" opacity="0.4" />
          </svg>
        </div>
        {/* Welcome Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Meet your personal AI Companion
          <span className="ml-2">🤖</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Here to help you stay organized, focused, and productive! Unlock smart reminders, daily summaries, and more.
        </p>
        {/* Feature Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">📌</span>
            <span className="text-gray-800 font-medium">Set reminders and get intelligent suggestions</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">💬</span>
            <span className="text-gray-800 font-medium">Chat about your tasks and goals</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">🔄</span>
            <span className="text-gray-800 font-medium">Get daily summaries and progress reports</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">📈</span>
            <span className="text-gray-800 font-medium">Track habits and build routines</span>
          </div>
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={onNavigateToLogin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all"
          >
            Login
          </button>
          <button
            onClick={onNavigateToSignup}
            className="bg-white border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all"
          >
            Create Account
          </button>
        </div>
        {/* Access Notice */}
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg max-w-xl text-center text-base">
          <span className="font-semibold">Restricted Access:</span> You need to be logged in to start chatting with your AI companion.
        </div>
      </div>
    );
  }
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { getUpcomingReminders, getStats } = useReminders();

  // Suggested prompts
  const suggestedPrompts = [
    "Help me plan my study schedule",
    "Give me a motivational quote",
    "Remind me of upcoming deadlines",
    "Summarize today's tasks",
    "Generate a timetable for tomorrow",
    "How can I improve my productivity?",
    "Give me study tips for exams",
    "Help me with time management"
  ];

  // Motivational quotes
  const motivationalQuotes = [
    "The future depends on what you do today. Keep going! 💪",
    "Success is the sum of small efforts repeated day in and day out. ✨",
    "Don't watch the clock; do what it does. Keep going! ⏰",
    "The expert in anything was once a beginner. You've got this! 🌟",
    "Your only limit is your mind. Push through! 🚀",
    "Dream big, work hard, stay focused! 🎯"
  ];

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: `Hey ${user?.name || 'there'}! 👋 I'm your AI study companion. I'm here to help you stay productive, motivated, and organized. How can I assist you today?`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);

    // Check for upcoming reminders and proactively mention them
    const upcomingReminders = getUpcomingReminders(3);
    if (upcomingReminders.length > 0) {
      setTimeout(() => {
        const reminderMessage = {
          id: Date.now() + 1,
          text: `📅 Quick heads up! You have ${upcomingReminders.length} upcoming reminder${upcomingReminders.length > 1 ? 's' : ''}: ${upcomingReminders.map(r => r.title).join(', ')}. Stay on top of your goals! 🎯`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reminderMessage]);
      }, 2000);
    }
  }, [user, getUpcomingReminders]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI Response Generator (placeholder for actual AI API)
  const generateAIResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const upcomingReminders = getUpcomingReminders();
    const stats = getStats();

    // Handle different types of queries
    if (lowerMessage.includes('motivat') || lowerMessage.includes('quote')) {
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }

    if (lowerMessage.includes('deadline') || lowerMessage.includes('reminder')) {
      if (upcomingReminders.length === 0) {
        return "You're all caught up! 🎉 No upcoming deadlines right now. Great job staying organized!";
      }
      const reminderList = upcomingReminders.slice(0, 5).map(r => {
        const dueDate = new Date(r.dueDate);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return `⚠️ ${r.title} - Overdue!`;
        if (diffDays === 0) return `🔥 ${r.title} - Due today!`;
        if (diffDays === 1) return `📅 ${r.title} - Due tomorrow`;
        return `📋 ${r.title} - Due in ${diffDays} days`;
      }).join('\n');
      
      return `Here are your upcoming deadlines:\n\n${reminderList}\n\nYou've got this! 💪`;
    }

    if (lowerMessage.includes('task') || lowerMessage.includes('summary')) {
      return `📊 Here's your task summary:\n\n✅ Completed: ${stats.completed}\n⏳ Pending: ${stats.pending}\n⚠️ Overdue: ${stats.overdue}\n📝 Total: ${stats.total}\n\nKeep up the great work! ${stats.completed > 0 ? '🌟' : '💪'}`;
    }

    if (lowerMessage.includes('schedule') || lowerMessage.includes('plan') || lowerMessage.includes('timetable')) {
      return `📅 Here's a study planning framework:\n\n🌅 Morning (9-12 PM): Deep work & complex subjects\n🌞 Afternoon (1-4 PM): Review & practice problems\n🌆 Evening (6-8 PM): Light reading & planning\n\n💡 Pro tips:\n• Use 25-min focused sessions (Pomodoro)\n• Take 5-min breaks between sessions\n• Plan your most important task first\n• Review your progress daily\n\nWould you like me to help you create a specific schedule?`;
    }

    if (lowerMessage.includes('productivity') || lowerMessage.includes('tips')) {
      return `🚀 Here are my top productivity tips:\n\n1. 🎯 Start with your most important task\n2. ⏰ Use time-blocking for focused work\n3. 📱 Minimize distractions (phone, social media)\n4. 🍅 Try the Pomodoro Technique (25 min work, 5 min break)\n5. 📝 Write down your goals daily\n6. 🌙 Get enough sleep (7-8 hours)\n7. 💧 Stay hydrated and take breaks\n\nRemember: Progress over perfection! 💪`;
    }

    if (lowerMessage.includes('time management')) {
      return `⏰ Time Management Strategies:\n\n🎯 Priority Matrix:\n• Urgent + Important = Do first\n• Important + Not Urgent = Schedule\n• Urgent + Not Important = Delegate\n• Neither = Eliminate\n\n📅 Daily Planning:\n• Plan your day the night before\n• Block time for deep work\n• Leave buffer time between tasks\n• Review and adjust regularly\n\nYou're taking the right steps by asking! 🌟`;
    }

    if (lowerMessage.includes('exam') || lowerMessage.includes('study')) {
      return `📚 Study Tips for Success:\n\n🧠 Active Learning:\n• Teach concepts to someone else\n• Create mind maps & flashcards\n• Practice with past papers\n• Form study groups\n\n📖 Study Techniques:\n• Spaced repetition for memory\n• Active recall over re-reading\n• Mix different subjects (interleaving)\n• Take regular breaks\n\n🎯 Exam Prep:\n• Start early, avoid cramming\n• Create a study schedule\n• Practice under timed conditions\n• Get enough sleep before exams\n\nYou've got this! 💪`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello ${user?.name || 'there'}! 😊 Great to see you! How's your day going? I'm here to help you stay productive and motivated. What would you like to work on today?`;
    }

    if (lowerMessage.includes('how are you') || lowerMessage.includes('feeling')) {
      return `I'm doing great, thanks for asking! 😊 I'm energized and ready to help you crush your goals today! How are YOU feeling? Ready to tackle some productive work together? 💪✨`;
    }

    // Default response
    const defaultResponses = [
      `That's an interesting question! 🤔 I'm here to help you with study planning, motivation, reminders, and productivity tips. Could you tell me more about what you'd like to work on?`,
      `I'd love to help you with that! 😊 I specialize in study planning, motivation, task management, and productivity. What specific area would you like to focus on today?`,
      `Great question! 💡 I'm your study companion, so I can help with scheduling, reminders, motivation, study tips, and keeping you organized. What would be most helpful right now?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (messageText = null) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      try {
        const aiResponse = await generateAIResponse(text);
        
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        const errorMessage = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble thinking right now! 😅 Please try again in a moment.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const clearChat = () => {
    setMessages([]);
    const welcomeMessage = {
      id: Date.now(),
      text: `Chat cleared! 🧹 I'm still here to help you stay productive and motivated. What would you like to work on?`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* AI Avatar */}
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Companion</h1>
                <p className="text-gray-600">Your personal study assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={clearChat}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              🧹 Clear Chat
            </button>
            <button
              onClick={onNavigateToDashboard}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              📊 Dashboard
            </button>
            <button
              onClick={onNavigateToHome}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              🏠 Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Suggested Prompts Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                💡 Quick Prompts
              </h3>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-gray-700 text-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      }`}>
                        {message.sender === 'user' ? '👤' : '🤖'}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center flex-shrink-0">
                        🤖
                      </div>
                      <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex space-x-4">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about studying, productivity, or your reminders..."
                    disabled={isLoading}
                    className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    rows="2"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        📤 Send
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;

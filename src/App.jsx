import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Reminders from './components/Reminders'
import AICompanion from './components/AICompanion'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'login', 'signup', 'dashboard', 'reminders', 'ai-companion'

  // Load login state from localStorage on app initialization
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn')
    const savedUser = localStorage.getItem('user')
    const savedPage = localStorage.getItem('currentPage')
    
    if (savedLoginState === 'true' && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
      // Restore the page if it was dashboard, reminders, or ai-companion, otherwise go to home
      if (savedPage && (savedPage === 'dashboard' || savedPage === 'reminders' || savedPage === 'ai-companion')) {
        setCurrentPage(savedPage)
      } else {
        setCurrentPage('home')
      }
    }
  }, [])

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      localStorage.removeItem('currentPage')
    }
  }, [isLoggedIn, user])

  // Save current page to localStorage whenever it changes (for logged in users)
  useEffect(() => {
    if (isLoggedIn && (currentPage === 'dashboard' || currentPage === 'reminders' || currentPage === 'ai-companion')) {
      localStorage.setItem('currentPage', currentPage)
    }
  }, [currentPage, isLoggedIn])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({})
    setCurrentPage('home')
    // Clear all stored data on logout
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('currentPage')
  }

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
    setCurrentPage('home')
  }

  const handleSignup = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
    setCurrentPage('home')
  }

  const switchToLogin = () => {
    setCurrentPage('login')
  }

  const switchToSignup = () => {
    setCurrentPage('signup')
  }

  const switchToHome = () => {
    setCurrentPage('home')
  }

  const switchToDashboard = () => {
    if (isLoggedIn) {
      setCurrentPage('dashboard')
    } else {
      // If not logged in, redirect to login
      setCurrentPage('login')
    }
  }

  const switchToReminders = () => {
    setCurrentPage('reminders');
  }

  const switchToAICompanion = () => {
    setCurrentPage('ai-companion');
  }

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
      case 'signup':
        return <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
      case 'dashboard':
        // Dashboard shows the logged-in version of Home
        return <Home 
          isLoggedIn={true} 
          user={user} 
          onNavigateToSignup={switchToSignup}
          onNavigateToReminders={switchToReminders}
          onNavigateToAICompanion={switchToAICompanion}
          onNavigateToDashboard={switchToDashboard}
          isDashboard={true}
        />
      case 'reminders':
        // Reminders page - only accessible when logged in
        return <Reminders user={user} onNavigateToLogin={switchToLogin} onNavigateToSignup={switchToSignup} />
      case 'ai-companion':
        // AI Companion page - only accessible when logged in
        return <AICompanion 
          user={user} 
          onNavigateToHome={switchToHome}
          onNavigateToDashboard={switchToDashboard}
          onNavigateToLogin={switchToLogin}
          onNavigateToSignup={switchToSignup}
        />
      case 'home':
      default:
        // Home page - shows different content based on login state
        return <Home 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onNavigateToSignup={switchToSignup}
          onNavigateToReminders={switchToReminders}
          onNavigateToAICompanion={switchToAICompanion}
          onNavigateToDashboard={switchToDashboard}
          isDashboard={false}
        />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar always visible on all pages */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout}
        onNavigateToLogin={switchToLogin}
        onNavigateToSignup={switchToSignup}
        onNavigateToHome={switchToHome}
        onNavigateToDashboard={switchToDashboard}
        onNavigateToReminders={switchToReminders}
        onNavigateToAICompanion={switchToAICompanion}
        currentPage={currentPage}
      />
      {renderPage()}
    </div>
  )
}

export default App

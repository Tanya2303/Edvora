import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Reminders from './components/Reminders'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'login', 'signup', 'dashboard', 'reminders'

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({})
    setCurrentPage('home')
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
    if (isLoggedIn) {
      setCurrentPage('reminders')
    } else {
      // If not logged in, redirect to login
      setCurrentPage('login')
    }
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
          isDashboard={true}
        />
      case 'reminders':
        // Reminders page - only accessible when logged in
        return <Reminders user={user} />
      case 'home':
      default:
        // Home page - shows different content based on login state
        return <Home 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onNavigateToSignup={switchToSignup}
          onNavigateToReminders={switchToReminders}
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
        currentPage={currentPage}
      />
      {renderPage()}
    </div>
  )
}

export default App

import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing reminders with localStorage persistence
export const useReminders = () => {
  const [reminders, setReminders] = useState([]);

  // Load reminders from localStorage on hook initialization
  useEffect(() => {
    const loadReminders = () => {
      try {
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
          const parsedReminders = JSON.parse(savedReminders);
          setReminders(parsedReminders);
        }
      } catch (error) {
        console.error('Error loading reminders from localStorage:', error);
        setReminders([]);
      }
    };

    loadReminders();

    // Listen for localStorage changes from other tabs/components
    const handleStorageChange = (e) => {
      if (e.key === 'reminders') {
        loadReminders();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('reminders', JSON.stringify(reminders));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('remindersUpdated', { detail: reminders }));
    } catch (error) {
      console.error('Error saving reminders to localStorage:', error);
    }
  }, [reminders]);

  // Add a new reminder
  const addReminder = useCallback((newReminder) => {
    setReminders(prev => [...prev, newReminder]);
  }, []);

  // Update an existing reminder
  const updateReminder = useCallback((updatedReminder) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
  }, []);

  // Delete a reminder
  const deleteReminder = useCallback((reminderId) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  }, []);

  // Toggle reminder completion
  const toggleComplete = useCallback((reminderId) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

  // Get upcoming reminders (not completed, sorted by due date)
  const getUpcomingReminders = useCallback((limit = null) => {
    const upcoming = reminders
      .filter(reminder => !reminder.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    return limit ? upcoming.slice(0, limit) : upcoming;
  }, [reminders]);

  // Get completed reminders
  const getCompletedReminders = useCallback(() => {
    return reminders.filter(reminder => reminder.completed);
  }, [reminders]);

  // Get reminders statistics
  const getStats = useCallback(() => {
    const total = reminders.length;
    const completed = reminders.filter(r => r.completed).length;
    const pending = total - completed;
    const overdue = reminders.filter(r => 
      !r.completed && new Date(r.dueDate) < new Date()
    ).length;

    return { total, completed, pending, overdue };
  }, [reminders]);

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleComplete,
    getUpcomingReminders,
    getCompletedReminders,
    getStats
  };
};

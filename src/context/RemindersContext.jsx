import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  // Load reminders from localStorage on provider mount
  useEffect(() => {
    try {
      const savedReminders = localStorage.getItem('reminders');
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      setReminders([]);
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('reminders', JSON.stringify(reminders));
      window.dispatchEvent(new CustomEvent('remindersUpdated', { detail: reminders }));
    } catch (error) {}
  }, [reminders]);

  const addReminder = useCallback((newReminder) => {
    setReminders(prev => [...prev, newReminder]);
  }, []);

  const updateReminder = useCallback((updatedReminder) => {
    setReminders(prev => prev.map(reminder => reminder.id === updatedReminder.id ? updatedReminder : reminder));
  }, []);

  const deleteReminder = useCallback((reminderId) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  }, []);

  const toggleComplete = useCallback((reminderId) => {
    setReminders(prev => prev.map(reminder => reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder));
  }, []);

  const getUpcomingReminders = useCallback((limit = null) => {
    const upcoming = reminders.filter(r => !r.completed).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return limit ? upcoming.slice(0, limit) : upcoming;
  }, [reminders]);

  const getCompletedReminders = useCallback(() => reminders.filter(r => r.completed), [reminders]);

  const getStats = useCallback(() => {
    const total = reminders.length;
    const completed = reminders.filter(r => r.completed).length;
    const pending = total - completed;
    const overdue = reminders.filter(r => !r.completed && new Date(r.dueDate) < new Date()).length;
    return { total, completed, pending, overdue };
  }, [reminders]);

  return (
    <RemindersContext.Provider value={{
      reminders,
      addReminder,
      updateReminder,
      deleteReminder,
      toggleComplete,
      getUpcomingReminders,
      getCompletedReminders,
      getStats
    }}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useRemindersContext = () => useContext(RemindersContext);

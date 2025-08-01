import React from 'react';

const ReminderOverview = ({ user, reminders = [] }) => {
  // Calculate stats from reminders
  const totalReminders = reminders.length;
  const completedReminders = reminders.filter(reminder => reminder.completed).length;
  const pendingReminders = totalReminders - completedReminders;
  
  // Find next due reminder
  const now = new Date();
  const nextDueReminder = reminders
    .filter(reminder => !reminder.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const formatTimeUntil = (dueDate) => {
    const diff = new Date(dueDate) - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Due now';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Greeting */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hello, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your reminder overview for today
          </p>
        </div>

        {/* Total Reminders */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Reminders</p>
              <p className="text-2xl font-bold">{totalReminders}</p>
            </div>
            <div className="text-3xl">📋</div>
          </div>
        </div>

        {/* Completed vs Pending */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Completed</p>
              <p className="text-2xl font-bold">{completedReminders}</p>
              <p className="text-xs opacity-90">{pendingReminders} pending</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
      </div>

      {/* Next Due Reminder */}
      {nextDueReminder && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Next Due</h3>
              <p className="text-gray-700">{nextDueReminder.title}</p>
              <p className="text-sm text-gray-600">
                Due in {formatTimeUntil(nextDueReminder.dueDate)}
              </p>
            </div>
            <div className="text-2xl">⏰</div>
          </div>
        </div>
      )}

      {/* Streak */}
      <div className="mt-4 flex items-center justify-center">
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
          🔥 {completedReminders > 0 ? `${completedReminders} day streak` : 'Start your streak today!'}
        </div>
      </div>
    </div>
  );
};

export default ReminderOverview; 
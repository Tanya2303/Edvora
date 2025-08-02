import React, { useState } from 'react';
import ReminderOverview from './ReminderOverview';
import ReminderList from './ReminderList';
import AddReminderModal from './AddReminderModal';
import { useRemindersContext } from '../context/RemindersContext.jsx';

const Reminders = ({ user, onNavigateToLogin, onNavigateToSignup }) => {
  // Not logged in UI
  if (!user || !user.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
        {/* Illustration */}
        <div className="mb-8 animate-bounce">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="20" width="84" height="60" rx="12" fill="#6366F1" />
            <rect x="30" y="32" width="60" height="36" rx="6" fill="#EEF2FF" />
            <rect x="38" y="40" width="44" height="8" rx="3" fill="#6366F1" opacity="0.7" />
            <rect x="38" y="54" width="24" height="6" rx="3" fill="#6366F1" opacity="0.4" />
            <circle cx="90" cy="70" r="8" fill="#F59E42" />
            <rect x="78" y="62" width="10" height="4" rx="2" fill="#F59E42" />
            {/* Mascot placing sticky note */}
            <ellipse cx="60" cy="100" rx="30" ry="6" fill="#E0E7FF" />
            <circle cx="60" cy="90" r="8" fill="#6366F1" />
            <rect x="55" y="82" width="10" height="6" rx="2" fill="#F59E42" />
          </svg>
        </div>
        {/* Hero Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Stay on top of your tasks with smart reminders!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Never miss a deadline again. Organize your assignments, exams, and goals with powerful reminders.
        </p>
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl w-full">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">⏰</span>
            <span className="text-gray-800 font-medium">Set deadlines for assignments, exams, and personal goals</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">🔔</span>
            <span className="text-gray-800 font-medium">Get notifications and nudges</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">✅</span>
            <span className="text-gray-800 font-medium">Mark tasks as complete and track your progress</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <span className="text-2xl">📊</span>
            <span className="text-gray-800 font-medium">Visual overview of your upcoming reminders</span>
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
          <span className="font-semibold">Reminder features are only available for logged-in users.</span> Please sign in to view, add, or manage your reminders.
        </div>
      </div>
    );
  }
  const {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleComplete
  } = useRemindersContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const handleAddReminder = (newReminder) => {
    addReminder(newReminder);
  };

  const handleToggleComplete = (reminderId) => {
    toggleComplete(reminderId);
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleDelete = (reminderId) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(reminderId);
    }
  };

  const handleSaveEdit = (updatedReminder) => {
    updateReminder(updatedReminder);
    setEditingReminder(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reminders</h1>
            <p className="text-gray-600 mt-2">
              Manage your academic deadlines and tasks
            </p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">➕</span>
            Add Reminder
          </button>
        </div>

        {/* Overview Panel */}
        <ReminderOverview user={user} reminders={reminders} />

        {/* Reminder List */}
        <ReminderList
          reminders={reminders}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add/Edit Reminder Modal */}
        <AddReminderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={editingReminder ? handleSaveEdit : handleAddReminder}
          editingReminder={editingReminder}
        />

        {/* Empty State - Show when no reminders exist */}
        {reminders.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-8xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              You haven't added any reminders yet.
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start organizing your academic life by creating your first reminder. 
              Never miss a deadline again!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add Your First Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders; 
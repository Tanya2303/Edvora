import React, { useState, useEffect } from 'react';
import ReminderOverview from './ReminderOverview';
import ReminderList from './ReminderList';
import AddReminderModal from './AddReminderModal';

const Reminders = ({ user }) => {
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (newReminder) => {
    setReminders(prev => [...prev, newReminder]);
  };

  const handleToggleComplete = (reminderId) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleDelete = (reminderId) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
    }
  };

  const handleSaveEdit = (updatedReminder) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
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
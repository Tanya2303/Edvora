import React, { useState, useEffect } from 'react';

const AddReminderModal = ({ isOpen, onClose, onSave, editingReminder }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science',
    'Economics',
    'Psychology',
    'Other'
  ];

  const priorities = [
    { value: 'high', label: 'High', color: 'text-red-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'text-green-600' }
  ];

  // Populate form when editing
  useEffect(() => {
    if (editingReminder) {
      const dueDate = new Date(editingReminder.dueDate);
      setFormData({
        title: editingReminder.title,
        subject: editingReminder.subject,
        dueDate: dueDate.toISOString().split('T')[0],
        dueTime: dueDate.toTimeString().slice(0, 5),
        priority: editingReminder.priority,
        notes: editingReminder.notes || ''
      });
    } else {
      // Reset form for new reminder
      setFormData({
        title: '',
        subject: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        notes: ''
      });
    }
    setErrors({});
  }, [editingReminder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!formData.dueTime) {
      newErrors.dueTime = 'Due time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create reminder object
    const reminder = {
      id: editingReminder ? editingReminder.id : Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      dueDate: `${formData.dueDate}T${formData.dueTime}`,
      priority: formData.priority,
      notes: formData.notes,
      completed: editingReminder ? editingReminder.completed : false,
      createdAt: editingReminder ? editingReminder.createdAt : new Date().toISOString()
    };

    onSave(reminder);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      subject: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter reminder title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.subject ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>

            {/* Due Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                    errors.dueDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Time *
                </label>
                <input
                  type="time"
                  id="dueTime"
                  name="dueTime"
                  value={formData.dueTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                    errors.dueTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.dueTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueTime}</p>
                )}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingReminder ? 'Update Reminder' : 'Save Reminder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReminderModal; 
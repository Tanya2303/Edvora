import React, { useState, useMemo } from 'react';

const ReminderList = ({ reminders = [], onToggleComplete, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Get unique subjects from reminders
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(reminders.map(reminder => reminder.subject))];
    return uniqueSubjects.sort();
  }, [reminders]);

  // Filter and search reminders
  const filteredReminders = useMemo(() => {
    return reminders.filter(reminder => {
      const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = !filterSubject || reminder.subject === filterSubject;
      const matchesPriority = !filterPriority || reminder.priority === filterPriority;
      const matchesDate = !filterDate || reminder.dueDate.startsWith(filterDate);
      
      return matchesSearch && matchesSubject && matchesPriority && matchesDate;
    });
  }, [reminders, searchTerm, filterSubject, filterPriority, filterDate]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntil = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff < 0) return 'Overdue';
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Due now';
  };

  const getTimeUntilColor = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    
    if (diff < 0) return 'text-red-600';
    if (diff < 24 * 60 * 60 * 1000) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredReminders.length} of {reminders.length} reminders
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {reminders.length === 0 ? 'No reminders yet' : 'No reminders match your filters'}
            </h3>
            <p className="text-gray-600">
              {reminders.length === 0 
                ? 'Create your first reminder to get started!' 
                : 'Try adjusting your search or filters'
              }
            </p>
          </div>
        ) : (
          filteredReminders.map(reminder => (
            <div
              key={reminder.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                reminder.completed 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Left side - Checkbox and content */}
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={reminder.completed}
                    onChange={() => onToggleComplete(reminder.id)}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className={`font-medium text-gray-900 ${
                      reminder.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {reminder.title}
                    </h3>
                    
                    {/* Subject and Priority */}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">{reminder.subject}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(reminder.priority)}`}>
                        {getPriorityIcon(reminder.priority)} {reminder.priority}
                      </span>
                    </div>
                    
                    {/* Due date and time */}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>📅 {formatDate(reminder.dueDate)}</span>
                      <span>🕐 {formatTime(reminder.dueDate)}</span>
                      <span className={`font-medium ${getTimeUntilColor(reminder.dueDate)}`}>
                        ⏰ {getTimeUntil(reminder.dueDate)}
                      </span>
                    </div>
                    
                    {/* Notes */}
                    {reminder.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        "{reminder.notes}"
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Right side - Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onEdit(reminder)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Edit reminder"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => onDelete(reminder.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete reminder"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReminderList; 
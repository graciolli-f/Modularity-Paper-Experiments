const Todo = require('../models/todo');

/**
 * Pure utility functions for counting and analyzing todo statistics
 * No side effects, deterministic outputs
 */

// Helper constants
const STATUS_TYPES = {
  COMPLETED: 'completed',
  PENDING: 'pending'
};

/**
 * Validates that the input is a proper array of Todo objects
 * @param {unknown} value - Value to validate
 * @returns {boolean} True if valid todo array
 */
function validateTodoArray(value) {
  if (!Array.isArray(value)) {
    return false;
  }
  
  return value.every(item => 
    item && 
    typeof item === 'object' &&
    typeof item.id !== 'undefined' &&
    typeof item.title === 'string' &&
    typeof item.completed === 'boolean'
  );
}

/**
 * Counts todos by status (completed vs pending)
 * @param {Todo[]} todos - Array of todo objects
 * @returns {{completed: number, pending: number, total: number}} Status counts
 */
function countByStatus(todos) {
  // Defensive programming - validate inputs
  if (!validateTodoArray(todos)) {
    throw new Error('Invalid todos array provided');
  }
  
  const completed = todos.filter(todo => todo.completed === true).length;
  const pending = todos.filter(todo => todo.completed === false).length;
  const total = todos.length;
  
  return {
    completed,
    pending,
    total
  };
}

/**
 * Calculates completion percentage of todos
 * @param {Todo[]} todos - Array of todo objects
 * @returns {number} Completion percentage (0-100)
 */
function getCompletionPercentage(todos) {
  // Defensive programming - validate inputs
  if (!validateTodoArray(todos)) {
    throw new Error('Invalid todos array provided');
  }
  
  if (todos.length === 0) {
    return 0;
  }
  
  const counts = countByStatus(todos);
  return Math.round((counts.completed / counts.total) * 100);
}

/**
 * Separates todos into completed and pending arrays
 * @param {Todo[]} todos - Array of todo objects
 * @returns {{completed: Todo[], pending: Todo[]}} Separated todo arrays
 */
function getStatusBreakdown(todos) {
  // Defensive programming - validate inputs
  if (!validateTodoArray(todos)) {
    throw new Error('Invalid todos array provided');
  }
  
  const completed = todos.filter(todo => todo.completed === true);
  const pending = todos.filter(todo => todo.completed === false);
  
  return {
    completed,
    pending
  };
}

// Export all public functions and constants
module.exports = {
  countByStatus,
  getCompletionPercentage,
  getStatusBreakdown,
  validateTodoArray,
  STATUS_TYPES
};

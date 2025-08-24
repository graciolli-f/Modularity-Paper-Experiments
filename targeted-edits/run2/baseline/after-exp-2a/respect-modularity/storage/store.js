const Todo = require('../models/todo'); 

class TodoStore {
  constructor() {
    this._todos = new Map(); 
    this._nextId = 1;
  }
  
  add(title) {
    const todo = new Todo(this._nextId++, title);
    this._todos.set(todo.id, todo);
    return todo;
  }
  
  get(id) {
    return this._todos.get(id);
  }
  
  getAll() {
    return Array.from(this._todos.values());
  }
  
  /**
   * Filter todos by a specific field and value
   * @param {string} field - The field name to filter by
   * @param {*} value - The value to match
   * @returns {Array} Array of todos matching the filter
   */
  filterBy(field, value) {
    return this.getAll().filter(todo => todo[field] === value);
  }
  
  /**
   * Filter todos by multiple field-value pairs
   * @param {Object} filters - Object with field-value pairs to filter by
   * @returns {Array} Array of todos matching all filters
   */
  filterByMultiple(filters) {
    return this.getAll().filter(todo => {
      return Object.entries(filters).every(([field, value]) => todo[field] === value);
    });
  }
  
  /**
   * Filter todos using a custom predicate function
   * @param {Function} predicate - Function that takes a todo and returns boolean
   * @returns {Array} Array of todos matching the predicate
   */
  filterByPredicate(predicate) {
    if (typeof predicate !== 'function') {
      throw new Error('Predicate must be a function');
    }
    return this.getAll().filter(predicate);
  }
  
  /**
   * Generic filter method that supports different filter types
   * @param {string|Object|Function} filter - Field name, filters object, or predicate function
   * @param {*} value - Value to match (only used when filter is a string)
   * @returns {Array} Array of filtered todos
   */
  filter(filter, value) {
    if (typeof filter === 'string') {
      return this.filterBy(filter, value);
    } else if (typeof filter === 'object' && filter !== null) {
      return this.filterByMultiple(filter);
    } else if (typeof filter === 'function') {
      return this.filterByPredicate(filter);
    } else {
      throw new Error('Filter must be a string (field name), object (filters), or function (predicate)');
    }
  }
  
  delete(id) {
    return this._todos.delete(id);
  }
}

module.exports = TodoStore;
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
   * Filter todos by any field(s) with flexible criteria
   * @param {Object|Function} criteria - Either an object with field filters or a custom function
   * @returns {Array} Filtered todos
   * 
   * Examples:
   * store.filter({ completed: true }) - Get completed todos
   * store.filter({ title: { contains: 'paper' } }) - Get todos with 'paper' in title
   * store.filter({ id: { gt: 5 } }) - Get todos with id > 5
   * store.filter(todo => todo.completed && todo.title.includes('urgent')) - Custom function
   */
  filter(criteria) {
    const todos = this.getAll();
    
    // If criteria is a function, use it directly
    if (typeof criteria === 'function') {
      return todos.filter(criteria);
    }
    
    // If criteria is an object, build filter function
    if (typeof criteria === 'object' && criteria !== null) {
      return todos.filter(todo => {
        return Object.entries(criteria).every(([field, condition]) => {
          const todoValue = todo[field];
          
          // Simple equality check
          if (typeof condition !== 'object' || condition === null) {
            return todoValue === condition;
          }
          
          // Complex condition with operators
          return this._evaluateCondition(todoValue, condition);
        });
      });
    }
    
    // Invalid criteria, return all todos
    return todos;
  }
  
  /**
   * Evaluate a condition against a value
   * @private
   */
  _evaluateCondition(value, condition) {
    const operators = {
      equals: (v, target) => v === target,
      eq: (v, target) => v === target,
      notEquals: (v, target) => v !== target,
      ne: (v, target) => v !== target,
      contains: (v, target) => String(v).toLowerCase().includes(String(target).toLowerCase()),
      startsWith: (v, target) => String(v).toLowerCase().startsWith(String(target).toLowerCase()),
      endsWith: (v, target) => String(v).toLowerCase().endsWith(String(target).toLowerCase()),
      greaterThan: (v, target) => Number(v) > Number(target),
      gt: (v, target) => Number(v) > Number(target),
      lessThan: (v, target) => Number(v) < Number(target),
      lt: (v, target) => Number(v) < Number(target),
      greaterThanOrEqual: (v, target) => Number(v) >= Number(target),
      gte: (v, target) => Number(v) >= Number(target),
      lessThanOrEqual: (v, target) => Number(v) <= Number(target),
      lte: (v, target) => Number(v) <= Number(target),
      in: (v, target) => Array.isArray(target) && target.includes(v),
      notIn: (v, target) => Array.isArray(target) && !target.includes(v)
    };
    
    // Check each operator in the condition
    return Object.entries(condition).every(([operator, target]) => {
      const operatorFn = operators[operator];
      if (!operatorFn) {
        console.warn(`Unknown operator: ${operator}`);
        return true; // Unknown operators are ignored
      }
      return operatorFn(value, target);
    });
  }
  
  /**
   * Filter todos by multiple criteria with AND logic
   * @param {...Object} criteria - Multiple filter criteria objects
   * @returns {Array} Filtered todos
   * 
   * Example:
   * store.filterBy({ completed: false }, { title: { contains: 'urgent' } })
   */
  filterBy(...criteria) {
    return this.filter(todo => {
      return criteria.every(criterion => {
        return Object.entries(criterion).every(([field, condition]) => {
          const todoValue = todo[field];
          
          if (typeof condition !== 'object' || condition === null) {
            return todoValue === condition;
          }
          
          return this._evaluateCondition(todoValue, condition);
        });
      });
    });
  }
  
  /**
   * Get todos by completion status
   * @param {boolean} completed - Whether to get completed or incomplete todos
   * @returns {Array} Filtered todos
   */
  getByStatus(completed) {
    return this.filter({ completed });
  }
  
  /**
   * Search todos by title content
   * @param {string} searchTerm - Term to search for in title
   * @returns {Array} Filtered todos
   */
  searchByTitle(searchTerm) {
    return this.filter({ title: { contains: searchTerm } });
  }
  
  delete(id) {
    return this._todos.delete(id);
  }
}

module.exports = TodoStore;
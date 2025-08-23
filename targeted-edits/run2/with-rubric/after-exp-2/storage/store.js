const Todo = require('../models/todo'); 

class TodoStore {
  constructor() {
    this._todos = new Map(); 
    this._nextId = 1;
    this._activeFilters = new Map();
  }
  
  add(title) {
    // Input validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title must be a non-empty string');
    }
    
    const todo = new Todo(this._nextId++, title);
    this._todos.set(todo.id, todo);
    return todo;
  }
  
  get(id) {
    // Input validation
    if (id === null || id === undefined) {
      return undefined;
    }
    
    return this._todos.has(id) ? this._todos['get'](id) : undefined;
  }
  
  getAll() {
    return Array.from(this._todos.values());
  }
  
  delete(id) {
    // Input validation
    if (id === null || id === undefined) {
      return false;
    }
    
    return this._todos.delete(id);
  }
  
  // Dynamic filtering methods
  setFilter(field, value, operation = 'equals') {
    // Input validation
    if (!field || typeof field !== 'string') {
      throw new Error('Field must be a non-empty string');
    }
    
    if (value === null || value === undefined) {
      throw new Error('Filter value cannot be null or undefined');
    }
    
    const validOperations = ['equals', 'contains', 'startsWith', 'endsWith', 'greaterThan', 'lessThan'];
    if (!validOperations.includes(operation)) {
      throw new Error(`Invalid operation. Must be one of: ${validOperations.join(', ')}`);
    }
    
    // Immutable update - create new Map
    const newFilters = new Map(this._activeFilters);
    newFilters.set(field, { value, operation });
    this._activeFilters = newFilters;
  }
  
  removeFilter(field) {
    // Input validation
    if (!field || typeof field !== 'string') {
      throw new Error('Field must be a non-empty string');
    }
    
    // Immutable update - create new Map
    const newFilters = new Map(this._activeFilters);
    newFilters.delete(field);
    this._activeFilters = newFilters;
  }
  
  clearFilters() {
    // Immutable update
    this._activeFilters = new Map();
  }
  
  filter(criteria) {
    // Input validation
    if (!criteria || typeof criteria !== 'object') {
      throw new Error('Criteria must be an object');
    }
    
    if (!criteria.field || typeof criteria.field !== 'string') {
      throw new Error('Criteria must have a valid field property');
    }
    
    if (criteria.value === null || criteria.value === undefined) {
      throw new Error('Criteria must have a valid value property');
    }
    
    const operation = criteria.operation || 'equals';
    const validOperations = ['equals', 'contains', 'startsWith', 'endsWith', 'greaterThan', 'lessThan'];
    if (!validOperations.includes(operation)) {
      throw new Error(`Invalid operation. Must be one of: ${validOperations.join(', ')}`);
    }
    
    const allTodos = this.getAll();
    return allTodos.filter(todo => this._matchesCriteria(todo, criteria));
  }
  
  getFiltered() {
    if (this._activeFilters.size === 0) {
      return this.getAll();
    }
    
    const allTodos = this.getAll();
    return allTodos.filter(todo => {
      // All active filters must match
      for (const [field, filterDef] of this._activeFilters) {
        const criteria = {
          field,
          value: filterDef.value,
          operation: filterDef.operation
        };
        
        if (!this._matchesCriteria(todo, criteria)) {
          return false;
        }
      }
      return true;
    });
  }
  
  _matchesCriteria(todo, criteria) {
    const { field, value, operation } = criteria;
    
    // Check if field exists on todo
    if (!(field in todo)) {
      return false;
    }
    
    const todoValue = todo[field];
    
    switch (operation) {
      case 'equals':
        return todoValue === value;
        
      case 'contains':
        if (typeof todoValue === 'string' && typeof value === 'string') {
          return todoValue.toLowerCase().includes(value.toLowerCase());
        }
        return false;
        
      case 'startsWith':
        if (typeof todoValue === 'string' && typeof value === 'string') {
          return todoValue.toLowerCase().startsWith(value.toLowerCase());
        }
        return false;
        
      case 'endsWith':
        if (typeof todoValue === 'string' && typeof value === 'string') {
          return todoValue.toLowerCase().endsWith(value.toLowerCase());
        }
        return false;
        
      case 'greaterThan':
        return todoValue > value;
        
      case 'lessThan':
        return todoValue < value;
        
      default:
        return false;
    }
  }
}

module.exports = TodoStore;
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
  
  filter(field, value) {
    if (!field) {
      return this.getAll();
    }
    
    return this.getAll().filter(todo => {
      if (!(field in todo)) {
        return false;
      }
      
      // Support both exact match and partial string matching for title
      if (typeof todo[field] === 'string' && typeof value === 'string') {
        return todo[field].toLowerCase().includes(value.toLowerCase());
      }
      
      // Exact match for other types (id, completed, etc.)
      return todo[field] === value;
    });
  }
  
  delete(id) {
    return this._todos.delete(id);
  }
}

module.exports = TodoStore;
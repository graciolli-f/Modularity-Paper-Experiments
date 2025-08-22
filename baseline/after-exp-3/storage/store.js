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
  
  delete(id) {
    return this._todos.delete(id);
  }
  
  getStatistics() {
    const todos = Array.from(this._todos.values());
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      pending,
      completionRate
    };
  }
}

module.exports = TodoStore;
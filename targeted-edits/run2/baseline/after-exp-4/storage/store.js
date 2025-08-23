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
}

module.exports = TodoStore;
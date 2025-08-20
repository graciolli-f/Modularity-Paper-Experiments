class Todo {
    constructor(id, title, completed = false) {
      if (!title || title.trim() === '') {
        throw new Error('Title is required');
      }

      this.id = id;
      this.title = title;
      this.completed = completed;

    }
    
    toggle() {
      this.completed = !this.completed;
    }
  }
  
  module.exports = Todo;
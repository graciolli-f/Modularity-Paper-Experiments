class Todo {
    constructor(id, title, completed = false, priority = 'medium') {
      if (!title || title.trim() === '') {
        throw new Error('Title is required');
      }

      // Validate priority field
      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority.toLowerCase())) {
        throw new Error('Priority must be one of: low, medium, high');
      }

      this.id = id;
      this.title = title;
      this.completed = completed;
      this.priority = priority.toLowerCase();

    }
    
    toggle() {
      this.completed = !this.completed;
    }
  }
  
  module.exports = Todo;
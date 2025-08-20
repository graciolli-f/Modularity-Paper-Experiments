class Todo {
    constructor(id, title, completed = false, priority = 'medium') {
      if (!title || title.trim() === '') {
        throw new Error('Title is required');
      }

      if (!Todo.isValidPriority(priority)) {
        throw new Error(`Invalid priority: ${priority}. Must be one of: ${Todo.VALID_PRIORITIES.join(', ')}`);
      }

      this.id = id;
      this.title = title;
      this.completed = completed;
      this.priority = priority.toLowerCase().trim();
    }
    
    static get VALID_PRIORITIES() {
      return ['low', 'medium', 'high'];
    }
    
    static isValidPriority(priority) {
      if (!priority || typeof priority !== 'string') {
        return false;
      }
      return Todo.VALID_PRIORITIES.includes(priority.toLowerCase().trim());
    }
    
    validatePriority(priority) {
      return Todo.isValidPriority(priority);
    }
    
    toggle() {
      this.completed = !this.completed;
    }
  }
  
  module.exports = Todo;
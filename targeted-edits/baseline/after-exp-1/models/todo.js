class Todo {
    constructor(id, title, completed = false, priority = 'medium') {
      if (!title || title.trim() === '') {
        throw new Error('Title is required');
      }

      // Validate priority field
      const validPriorities = ['low', 'medium', 'high'];
      if (priority !== null && priority !== undefined) {
        if (typeof priority !== 'string') {
          throw new Error('Priority must be a string');
        }
        if (!validPriorities.includes(priority.toLowerCase())) {
          throw new Error(`Priority must be one of: ${validPriorities.join(', ')}`);
        }
        this.priority = priority.toLowerCase();
      } else {
        this.priority = 'medium';
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
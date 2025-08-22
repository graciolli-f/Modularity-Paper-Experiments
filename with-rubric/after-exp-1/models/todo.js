class Todo {
    constructor(id, title, completed = false, priority = 'medium') {
      // Input validation - defensive programming
      if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a non-empty string');
      }
      
      if (typeof completed !== 'boolean') {
        throw new Error('Completed must be a boolean value');
      }
      
      // Validate priority using dedicated method
      if (!this.validatePriority(priority)) {
        throw new Error('Priority must be one of: low, medium, high');
      }

      // Assign properties (immutable approach - don't mutate inputs)
      this.id = id;
      this.title = title.trim(); // Create new string, don't mutate input
      this.completed = completed;
      this.priority = priority;
    }
    
    toggle() {
      this.completed = !this.completed;
    }
    
    validatePriority(priority) {
      // Input validation - ensure we have a string
      if (typeof priority !== 'string') {
        return false;
      }
      
      // Valid priority values
      const validPriorities = ['low', 'medium', 'high'];
      return validPriorities.includes(priority.toLowerCase());
    }
  }
  
  module.exports = Todo;
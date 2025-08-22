class TodoStats {
  constructor(todoStore) {
    this.todoStore = todoStore;
  }
  
  /**
   * Count todos by their completion status
   * @returns {Object} Object with counts for completed, incomplete, and total todos
   */
  countByStatus() {
    const todos = this.todoStore.getAll();
    const stats = {
      completed: 0,
      incomplete: 0,
      total: todos.length
    };
    
    todos.forEach(todo => {
      if (todo.completed) {
        stats.completed++;
      } else {
        stats.incomplete++;
      }
    });
    
    return stats;
  }
  
  /**
   * Get completion percentage
   * @returns {number} Percentage of completed todos (0-100)
   */
  getCompletionPercentage() {
    const stats = this.countByStatus();
    if (stats.total === 0) {
      return 0;
    }
    return Math.round((stats.completed / stats.total) * 100);
  }
  
  /**
   * Get a formatted stats summary
   * @returns {string} Human-readable stats summary
   */
  getSummary() {
    const stats = this.countByStatus();
    const percentage = this.getCompletionPercentage();
    
    return `Stats: ${stats.completed} completed, ${stats.incomplete} incomplete (${percentage}% done) - Total: ${stats.total}`;
  }
}

module.exports = TodoStats;

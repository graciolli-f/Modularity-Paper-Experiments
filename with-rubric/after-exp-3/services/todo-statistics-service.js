/**
 * Todo Statistics Service
 * Business logic for todo statistics calculations
 * Orchestrates todo data analysis and provides statistical insights
 */

class TodoStatisticsService {
  /**
   * Get total count of todos
   * @param {Array} todos - Array of todo objects
   * @returns {number} Total count of todos
   */
  static getTotalCount(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }
    return todos.length;
  }

  /**
   * Get count of completed todos
   * @param {Array} todos - Array of todo objects
   * @returns {number} Count of completed todos
   */
  static getCompletedCount(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }
    return todos.filter(todo => todo && todo.completed === true).length;
  }

  /**
   * Get count of pending (incomplete) todos
   * @param {Array} todos - Array of todo objects
   * @returns {number} Count of pending todos
   */
  static getPendingCount(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }
    return todos.filter(todo => todo && todo.completed === false).length;
  }

  /**
   * Calculate completion rate as percentage
   * @param {Array} todos - Array of todo objects
   * @returns {number} Completion rate (0-100)
   */
  static getCompletionRate(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }
    
    const total = this.getTotalCount(todos);
    if (total === 0) {
      return 0;
    }
    
    const completed = this.getCompletedCount(todos);
    return Math.round((completed / total) * 100);
  }

  /**
   * Get comprehensive statistics object
   * @param {Array} todos - Array of todo objects
   * @returns {Object} Statistics object with all metrics
   */
  static getStatistics(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }

    return {
      total: this.getTotalCount(todos),
      completed: this.getCompletedCount(todos),
      pending: this.getPendingCount(todos),
      completionRate: this.getCompletionRate(todos)
    };
  }

  /**
   * Generate formatted summary for display
   * @param {Array} todos - Array of todo objects
   * @returns {Object} Formatted summary object
   */
  static generateSummary(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }

    const stats = this.getStatistics(todos);
    return {
      message: `${stats.completed}/${stats.total} todos completed (${stats.completionRate}%)`,
      details: {
        totalTodos: stats.total,
        completedTodos: stats.completed,
        pendingTodos: stats.pending,
        completionPercentage: stats.completionRate
      }
    };
  }

  /**
   * Analyze progress and provide insights
   * @param {Array} todos - Array of todo objects
   * @returns {Object} Progress analysis with insights
   */
  static analyzeProgress(todos) {
    if (!Array.isArray(todos)) {
      throw new Error('Invalid input: todos must be an array');
    }

    const stats = this.getStatistics(todos);
    let status = 'none';
    let insight = 'No todos available';

    if (stats.total > 0) {
      if (stats.completionRate === 100) {
        status = 'excellent';
        insight = 'All todos completed! Great job!';
      } else if (stats.completionRate >= 75) {
        status = 'good';
        insight = 'Most todos completed. Keep up the good work!';
      } else if (stats.completionRate >= 50) {
        status = 'moderate';
        insight = 'Making progress. Consider focusing on remaining tasks.';
      } else if (stats.completionRate > 0) {
        status = 'needs_attention';
        insight = 'Many todos still pending. Time to focus!';
      } else {
        status = 'starting';
        insight = 'Ready to begin! Start tackling those todos.';
      }
    }

    return {
      status,
      insight,
      statistics: stats
    };
  }
}

module.exports = TodoStatisticsService;

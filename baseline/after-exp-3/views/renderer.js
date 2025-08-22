class ConsoleRenderer {
    render(todos) {
      console.log('\n=== TODOS ===');
      todos.forEach(todo => {
        const status = todo.completed ? '[✓]' : '[ ]';
        console.log(`${status} ${todo.id}: ${todo.title}`);
      });
    }
    
    renderStatistics(stats) {
      console.log('\n=== STATISTICS ===');
      console.log(`Total todos: ${stats.total}`);
      console.log(`Completed: ${stats.completed}`);
      console.log(`Pending: ${stats.pending}`);
      console.log(`Completion rate: ${stats.completionRate}%`);
    }
  }
  module.exports = ConsoleRenderer;
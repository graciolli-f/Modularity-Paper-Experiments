const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');
const TodoStatisticsService = require('./services/todo-statistics-service');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
  }
  
  run() {
    // Simple demo
    this.store.add('Write paper');
    this.store.add('Run experiments');
    this.store.add('Review results');
    
    // Mark one as completed for demo
    const todos = this.store.getAll();
    if (todos.length > 0) {
      todos[0].toggle(); // Complete first todo
    }
    
    // Render todos
    this.renderer.render(todos);
    
    // Show statistics
    const stats = TodoStatisticsService.getStatistics(todos);
    const summary = TodoStatisticsService.generateSummary(todos);
    const analysis = TodoStatisticsService.analyzeProgress(todos);
    
    console.log('\n=== TODO STATISTICS ===');
    console.log(`Total: ${stats.total}`);
    console.log(`Completed: ${stats.completed}`);
    console.log(`Pending: ${stats.pending}`);
    console.log(`Completion Rate: ${stats.completionRate}%`);
    console.log(`\nSummary: ${summary.message}`);
    console.log(`Analysis: ${analysis.insight} (Status: ${analysis.status})`);
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
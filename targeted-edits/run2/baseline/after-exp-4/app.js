const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');
const TodoStats = require('./stats/stats');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
    this.stats = new TodoStats(this.store);
  }
  
  run() {
    // Simple demo
    this.store.add('Write paper');
    this.store.add('Run experiments');
    
    // Mark one todo as completed to show stats
    const firstTodo = this.store.get(1);
    if (firstTodo) {
      firstTodo.toggle();
    }
    
    this.renderer.render(this.store.getAll());
    
    // Display stats
    console.log('\n=== STATS ===');
    console.log(this.stats.getSummary());
    
    const detailedStats = this.stats.countByStatus();
    console.log(`Detailed breakdown:`);
    console.log(`- Completed: ${detailedStats.completed}`);
    console.log(`- Incomplete: ${detailedStats.incomplete}`);
    console.log(`- Total: ${detailedStats.total}`);
    console.log(`- Completion rate: ${this.stats.getCompletionPercentage()}%`);
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
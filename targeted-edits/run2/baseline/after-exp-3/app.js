const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
  }
  
  run() {
    // Simple demo
    this.store.add('Write paper');
    this.store.add('Run experiments');
    this.store.add('Review code');
    
    // Mark some todos as completed
    const firstTodo = this.store.get(1);
    if (firstTodo) {
      firstTodo.toggle();
    }
    
    // Render todos and statistics
    this.renderer.render(this.store.getAll());
    this.renderer.renderStatistics(this.store.getStatistics());
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
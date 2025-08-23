const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
  }
  
  run() {
    // Simple demo with different priorities
    this.store.add('Write paper', 'high');
    this.store.add('Run experiments', 'medium');
    this.store.add('Review literature', 'low');
    this.store.add('Submit deadline'); // Should default to medium
    this.renderer.render(this.store.getAll());
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
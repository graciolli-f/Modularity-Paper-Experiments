const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
  }
  
  run() {
    // Add sample todos
    const todo1 = this.store.add('Write paper');
    const todo2 = this.store.add('Run experiments');
    const todo3 = this.store.add('Review code');
    const todo4 = this.store.add('Write unit tests');
    const todo5 = this.store.add('Update documentation');
    
    // Mark some todos as completed
    todo1.toggle(); // Complete "Write paper"
    todo3.toggle(); // Complete "Review code"
    
    console.log('\n=== ALL TODOS ===');
    this.renderer.render(this.store.getAll());
    
    console.log('\n=== FILTERING EXAMPLES ===');
    
    // Filter by completion status
    console.log('\n--- Completed todos ---');
    this.renderer.render(this.store.getByStatus(true));
    
    console.log('\n--- Incomplete todos ---');
    this.renderer.render(this.store.getByStatus(false));
    
    // Filter by title content
    console.log('\n--- Todos containing "write" ---');
    this.renderer.render(this.store.searchByTitle('write'));
    
    // Advanced filtering examples
    console.log('\n--- Todos with id > 2 ---');
    this.renderer.render(this.store.filter({ id: { gt: 2 } }));
    
    console.log('\n--- Todos with title starting with "Run" ---');
    this.renderer.render(this.store.filter({ title: { startsWith: 'Run' } }));
    
    // Multiple criteria filtering
    console.log('\n--- Incomplete todos with id <= 3 ---');
    this.renderer.render(this.store.filterBy(
      { completed: false }, 
      { id: { lte: 3 } }
    ));
    
    // Custom function filtering
    console.log('\n--- Todos with even ids ---');
    this.renderer.render(this.store.filter(todo => todo.id % 2 === 0));
    
    // Complex criteria
    console.log('\n--- Todos with title containing "e" and not completed ---');
    this.renderer.render(this.store.filter({
      title: { contains: 'e' },
      completed: false
    }));
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
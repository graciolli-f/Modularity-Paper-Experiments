const TodoStore = require('./storage/store');
const ConsoleRenderer = require('./views/renderer');

class TodoApp {
  constructor() {
    this.store = new TodoStore();
    this.renderer = new ConsoleRenderer();
  }
  
  run() {
    // Add sample todos with different properties
    const todo1 = this.store.add('Write paper');
    const todo2 = this.store.add('Run experiments');
    const todo3 = this.store.add('Review results');
    
    // Toggle some todos to create different completion states
    todo1.toggle(); // completed = true
    todo3.toggle(); // completed = true
    
    console.log('\n=== ALL TODOS ===');
    this.renderer.render(this.store.getAll());
    
    // Demonstrate filtering by field and value
    console.log('\n=== COMPLETED TODOS (using filterBy) ===');
    this.renderer.render(this.store.filterBy('completed', true));
    
    console.log('\n=== INCOMPLETE TODOS (using filterBy) ===');
    this.renderer.render(this.store.filterBy('completed', false));
    
    // Demonstrate filtering by specific ID
    console.log('\n=== TODO WITH ID 2 (using filterBy) ===');
    this.renderer.render(this.store.filterBy('id', 2));
    
    // Demonstrate filtering with multiple criteria
    console.log('\n=== COMPLETED TODOS WITH ID > 1 (using filterByMultiple) ===');
    this.renderer.render(this.store.filterByMultiple({ completed: true }));
    
    // Demonstrate filtering with custom predicate
    console.log('\n=== TODOS WITH "experiment" IN TITLE (using filterByPredicate) ===');
    this.renderer.render(this.store.filterByPredicate(todo => 
      todo.title.toLowerCase().includes('experiment')
    ));
    
    // Demonstrate generic filter method with different inputs
    console.log('\n=== USING GENERIC FILTER METHOD ===');
    
    console.log('\nFilter by string field:');
    this.renderer.render(this.store.filter('completed', true));
    
    console.log('\nFilter by object:');
    this.renderer.render(this.store.filter({ completed: false }));
    
    console.log('\nFilter by predicate function:');
    this.renderer.render(this.store.filter(todo => todo.id >= 2));
  }
}

// Run the app if this file is executed directly
if (require.main === module) {
  new TodoApp().run();
}

module.exports = TodoApp;
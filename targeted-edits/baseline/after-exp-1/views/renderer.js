class ConsoleRenderer {
    render(todos) {
      console.log('\n=== TODOS ===');
      todos.forEach(todo => {
        const status = todo.completed ? '[✓]' : '[ ]';
        const priorityIcon = this._getPriorityIcon(todo.priority);
        console.log(`${status} ${priorityIcon} ${todo.id}: ${todo.title}`);
      });
    }

    _getPriorityIcon(priority) {
      switch(priority) {
        case 'high': return '🔴';
        case 'medium': return '🟡';
        case 'low': return '🟢';
        default: return '⚪';
      }
    }
  }
  module.exports = ConsoleRenderer;
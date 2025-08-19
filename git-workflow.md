# Git Workflow

## Baseline Setup 

### Initialize git
git init
git checkout -b main

### Create directory structure
mkdir -p baseline/initial
mkdir -p with-rubric/initial

### Create the baseline todo app in each initial folder

### Add Rubric and .cursorrules to with-rubric/initial

### Module Structure
- models/todo.js: Todo class with validation only
- storage/store.js: CRUD operations, private _todos Map  
- views/renderer.js: Display logic only
- app.js: Controller coordinating modules

### Commit initial state
git add .
git commit -m "Initial setup with baseline todo app"
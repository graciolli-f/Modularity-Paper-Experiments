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

## Experiment Workflow

### Experiment X (replace "X" with experiment nummber or name)
git checkout -b experiment-X

#### Baseline
cd baseline
cp -r initial working
cd working && cursor .
**Prompt**: "[prompt X]"
cd ..
cp -r working/* after-exp-X/
rm -rf working
git add after-exp-X
git commit -m "[commit message]"

#### With Rubric
cd ../with-rubric
cp -r initial working
cp -r .rubric working/
cd working && cursor .
*Ensure Cursor has access to rubric folder and .cursorrules file*
**Prompt**: "[prompt X]"
cd ..
cp -r working/* after-exp-X/
rm -rf working
git add after-exp-X
git commit -m "[commit message]"

# Done with Experiment X
cd ..
git checkout main
git merge experiment-X
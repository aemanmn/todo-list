
class Task {
    constructor(id, text, completed = false) {
      this.id = id;
      this.text = text;
      this.completed = completed;
    }
  }
  
  
  const getTasks = () => {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  };
  
  
  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  
  const renderTasks = (tasks) => {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = ''; 
  
    tasks.forEach((task) => {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {  
        task.completed = !task.completed;
        
        saveTasks(tasks);
        renderTasks(tasks);
      });
  
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
  
      
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = task.text;
        listItem.replaceChild(editInput, taskText);
  
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
          const newText = editInput.value.trim();
          if (!newText) return;
  
          task.text = newText;
          saveTasks(tasks);
          renderTasks(tasks);
        });
  
        listItem.appendChild(saveButton);
        editButton.disabled = true; 
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const newTasks = tasks.filter((t) => t.id !== task.id);
        saveTasks(newTasks);
        renderTasks(newTasks);
      });
  
      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      tasksList.appendChild(listItem);
    });
  };
  
  
  const addTask = () => {
    const newTaskInput = document.getElementById('new-task');
    const newText = newTaskInput.value.trim();
    if (!newText) return;
  
    const tasks = getTasks();
    const newTask = new Task(tasks.length ? tasks[tasks.length - 1].id + 1 : 1, newText);
    tasks.push(newTask);
    saveTasks(tasks);
    newTaskInput.value = ''; 
  
    renderTasks(tasks);
  };
  
  const addTaskButton = document.getElementById('add-task');
  addTaskButton.addEventListener('click', addTask);
  
  
  renderTasks(getTasks());
  
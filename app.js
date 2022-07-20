const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  //DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task
  form.addEventListener('submit', addTask);
  //Remove Task
  taskList.addEventListener('click', removeTask);
  // Clear Task
  clearBtn.addEventListener('click', clearTasks);
  //Filter Task
  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item'

    li.appendChild(document.createTextNode(task))

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  })
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  }
  const li = document.createElement('li');
  li.className = 'collection-item'

  li.appendChild(document.createTextNode(taskInput.value))

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content'

  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  // //store in LS
  storeTaskInLocalStorage(taskInput.value);


  //Clear Input
  taskInput.value = '';
  e.preventDefault();
}

// Update Task----------------------------
function updateTask(){
  link.className = 'update-item secondary-content';

  link.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
}



// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //removefrom localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
  }
}

//Remove from localStorage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  // taskList.innerHTML = ''; 

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();

}
//clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}
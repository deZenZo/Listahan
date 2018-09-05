var todolist = {
  tasks:[],
  addTask: function(inputTitle, inputText){
    this.tasks.push({
      title: inputTitle,
      description: inputText,
      completed: false
    }); // adds the object already.
  },
  changeTask: function(pos, inputTitle, inputText){
    this.tasks[pos].description = inputText;
    this.tasks[pos].title = inputTitle;
  },
  toggleCompletion: function(pos){
    let task = this.tasks[pos];
    task.completed = !task.completed;
  },
  deleteTask: function(pos){
    this.tasks.splice(pos, 1);
  },
  toggleAll: function(){
    //if everything is completed, otherwise make everything true
    let totalTasks = this.tasks.length;
    let completedTasks = 0;

    this.tasks.forEach(function(task){
      if (task.completed === true){
          completedTasks++;
      }
    });
    //Case 1: If all tasks are true turn everything falls.
    if (completedTasks === this.tasks.length){
      this.tasks.forEach(function(task){
        task.completed = false;
      });
    }
    //Case 2: Otherwise, make everything true.
    else{
      this.tasks.forEach(function(task){
        task.completed = true;
      });
    }
  }
};

var buttonHandlers = {
  addTask: function(){
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descInput").value;
    todolist.addTask(title, description);
    title.value = '';
    description.value = '';
    view.displayTasks();
  },
  changeTask: function(){
    var id = document.getElementById("changePositionInput").value;
    var title = document.getElementById("changeTitle").value;
    var description = document.getElementById("changeDesc").value;
    todolist.changeTask(id, title, description);
    title.value = '';
    description.value = '';
    view.displayTasks();
  },
  toggleCompletion: function(pos){
    todolist.toggleCompletion(pos);
    view.displayTasks();
  },
  deleteTask: function(pos){
    todolist.deleteTask(pos);
    view.displayTasks();
  },
  toggleAll: function(){
    todolist.toggleAll();
    view.displayTasks();
  }
};


var view = {
  displayTasks: function(){
    var taskUl = document.querySelector('ul');
    taskUl.innerHTML = ''; //clears list
    todolist.tasks.forEach(function(task, position){
      let taskLi = document.createElement('li');
      let taskText = '';
      taskLi.id = position;

      if (task.completed === true){
        taskText = task.title + ": " + task.description + "  ";
      }
      else{
        taskText = task.title + ": " + task.description + "  ";
      }
      //  Title
      //  (): Desc
      taskLi.textContent = taskText;
      taskLi.appendChild(this.createDeleteButton());
      taskLi.appendChild(this.createToggleButton(task.completed));
      taskUl.appendChild(taskLi);
    }, this);
  },
  createDeleteButton: function(){
    //create delete button
    var deleteButton = document.createElement('Button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleButton: function(completed){
    debugger;
    var toggleButton = document.createElement('Button');
    toggleButton.className = 'toggleButton';

    if (completed === true){
      toggleButton.textContent = "(X)";
    }
    else{
      toggleButton.textContent = "( )";
    }
    return toggleButton;
  },
  setUpEventListeners: function(){
    var taskUl = document.querySelector('ul');


    taskUl.addEventListener('click', function(event){
      let theEvent = event.target
      let pos = parseInt(theEvent.parentNode.id);
      //Delete Listener
      if (theEvent.className === 'deleteButton'){
        buttonHandlers.deleteTask(pos);
      }
      //Toggle Listener
      else if (theEvent.className === 'toggleButton'){
        buttonHandlers.toggleCompletion(pos);
      }
    });
  }
};
view.setUpEventListeners(); // listens for incoming events

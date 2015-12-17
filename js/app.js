//Problem User interaction doesnt work
//solution add interactivity

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New ask list item
var createNewTaskElement = function(taskString){
	//Creates new List Item
	var listItem = document.createElement("li");
	var label = document.createElement("label");
	var checkBox = document.createElement("input");
	var editInput = document.createElement("input");
	var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.className = "edit";
	editButton.innerText = "Edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}
//Adds a new task
var addTask = function(){
	var listItem = createNewTaskElement(taskInput.value);
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);	
	taskInput.value = "";
	
}

//Edit Existing Task
var editTask = function(){
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var containClass = listItem.classList.contains("editMode");
	if(containClass){
		label.innerText = editInput.value;
	}else{
		editInput.value = label.innerText;
	}
	listItem.classList.toggle("editMode");
}

//Delete existing task
var deleteTask = function(){
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}

//mark task as complete
var taskCompleted = function(){
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//mark task as incomplete
var taskIncomplete = function(){
  	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

//set the click handler to the addTask function
addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	//select its children
	console.log("binded...");
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	//bind edit task to edit button
    editButton.onclick = editTask;
	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;
	//bind checkboxeventhandler to  check box
	checkBox.onchange = checkBoxEventHandler;

}
//cycle over incompleteTaskHolder ul list item
for(i = 0; i < incompleteTasksHolder.children.length; i++){
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
   
//cycle over completeTaskHolder ul list item
for(i = 0; i < completedTasksHolder.children.length; i++){
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
    //bind events to list items children(taskincomplete)

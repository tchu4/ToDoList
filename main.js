//Elements
const InputTask = document.querySelector('.inputtask_task');	//Input Items
const InputDate = document.querySelector('.inputtask_date');
const submitButton = document.querySelector('.button_addtask');
var toDoList = document.querySelector('.todo_list');			//Item List

submitButton.addEventListener("click", addItem)
toDoList.addEventListener("click", editItem)

//Functions
function resort(){
	//Get uncompleted li + star, uncompleted li + no star, completed li
	var new_ul = [];
	var star_lis = [];
	var nostar_lis = [];
	var completed_lis = [];

	for (var i = 0; i< toDoList.childNodes.length;i++){
		//Completed
		if (toDoList.childNodes[i].classList[1] === "completedItem"){
			completed_lis.push(toDoList.childNodes[i]);
		}
		else if (toDoList.childNodes[i].children[3].className === "star_btn_inactive"){
			nostar_lis.push(toDoList.childNodes[i]);
		}
		else{
		  	star_lis.push(toDoList.childNodes[i]);
		}
		
	}
	//Sort each by date if possible
	
	
	//Add back
	for (var i = 0; i < star_lis.length;i++){
		new_ul.push(star_lis[i]);
	}
	for (var i = 0; i < nostar_lis.length;i++){
		new_ul.push(nostar_lis[i]);
	}
	for (var i = 0; i < completed_lis.length;i++){
		new_ul.push(completed_lis[i]);
	}

	//Replace
	for (var i = 0; i < new_ul.length;i++){
		toDoList.appendChild(new_ul[i]);
	}

}


function addItem(event) {
	event.preventDefault();
	//If blank return
	if(InputTask.value === ""){
		console.log("Nothing added");
		return null
	}
	
	//Else Create task item bullet point
	const div_item = document.createElement('div');
	div_item.classList.add('todo');
	
	//Add task to bullet point
	const newItem = document.createElement('li');
	newItem.innerText = InputTask.value;
	newItem.classList.add('todo_item');
	div_item.appendChild(newItem);
	
	//Add Date if possible
	const date = document.createElement('p');
	date.innerText = InputDate.value;
	if (date.innerText === ""){
		date.innerText = "No Due Date";
	}
	date.classList.add('todo_item');
	div_item.appendChild(date);
	
	//Add Edit BUTTON
	const editButton = document.createElement('button');
	editButton.innerHTML = '<i class="fa fa-info-circle"></i>';
	editButton.classList.add('edit_btn')
	div_item.appendChild(editButton);
	
	//Add Priority BUTTON
	const starButton = document.createElement('button');
	starButton.innerHTML = '<i class="fa fa-star"></i>';
	starButton.classList.add('star_btn_inactive')
	div_item.appendChild(starButton);
	
	//Add Delete BUTTON
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add('delete_btn')
	div_item.appendChild(deleteButton);
	


	
	
	//Append to list
	toDoList.appendChild(div_item);
	resort();
	
	//Clear input values
	InputTask.value = ""
	InputDate.value = ""
	
	
}

//Edit List Item
function editItem(event) {
	const item = event.target.parentElement;
	
	//Cross Out
	if (item.classList[0] === "todo" && item.classList[1] != "completedItem"){
		item.classList.toggle("completedItem");
		resort();
	}
	
	//Edit
	else if (item.classList[0] === "edit_btn") {
		var newinput = prompt("Change task");
		if (newinput != null){
			var task = item.parentElement;
			task.firstChild.innerText = newinput;
		}
	}
	
	//Change priority
	else if (item.classList[0] === "star_btn_inactive") {
		item.className = "star_btn_active";
		resort();
	}
	else if (item.classList[0] === "star_btn_active") {
		item.className = "star_btn_inactive";
		resort();
	}
	
	//Delete
	else if (item.classList[0] === "delete_btn") {
		const todo_task = item.parentElement;
		toDoList.removeChild(todo_task);
	}
	


	
}


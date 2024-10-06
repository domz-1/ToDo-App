
let dateElement = document.querySelector("p#date")
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds()

dateElement.innerText = `Today's Date : ${year}-${month}-${day}`;


let tasksList = document.querySelector(".mytasks-list")
let doneList = document.querySelector(".done-list")
let addTaskInput = document.querySelector(".add-task input")
let addTaskBtn =  document.querySelector(".add-task button")

function saveData(){
    let tasks = [];
    let allTasks = document.querySelectorAll('.mytasks-list li, .done-list li')

    allTasks.forEach((task)=>{
        let checkbox = task.querySelector("input[type='checkbox']");
        let taskText = task.querySelector("span");
        tasks.push({ text: taskText ? taskText.innerText : checkbox.value, done: task.parentElement.className === 'done-list' });
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadData(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks){
        tasks.forEach((task)=>{
            let li = document.createElement("li");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = task.text;
            let taskText = document.createElement("span");
            taskText.innerText = task.text;
            li.append(checkbox);
            li.append(taskText);
            if(task.done){
                checkbox.checked = true
                document.querySelector('.done-list').append(li);
            }else{
                document.querySelector(".mytasks-list").append(li);
            }
        })
    }else{
        console.log("No tasks saved");
    }
}

function addTask(){
    if(addTaskInput.value !== ""){
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let taskText = document.createElement("span");
        taskText.innerText = addTaskInput.value;
        li.append(checkbox);
        li.append(taskText);
        tasksList.append(li);
        addTaskInput.value = ""; // clear the input field
        checkbox.addEventListener('click', ()=>{
            if(checkbox.checked){
                doneList.append(li);
            }else{
                tasksList.append(li);
            }
            saveData();
        })
        saveData();
    }else{
        console.log(saveData());
    }
}

function themeChange() {
    if (document.body.style.backgroundColor === "white" && document.body.style.color == "black") {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        localStorage.setItem('theme', 'light');
    }
}

// Load theme preference
function loadTheme() {
    let theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
}

// Call loadTheme when the page loads
window.addEventListener('load', loadTheme);

function deletAll(){
    localStorage.removeItem('tasks')
    document.querySelector('.done-list').innerHTML = '';
    document.querySelector('.mytasks-list').innerHTML = '';
}

window.addEventListener('load', loadData);

const inputBox=document.getElementById("input-box");
const listcontainer=document.getElementById("list-box");
function addTask(){
    if(inputBox.value=== ''){
        alert("You must write something!");
    }
    else{
        let li =document.createElement("li");
        li.classList.add("task-item"); 
        li.innerHTML=inputBox.value;
        listcontainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
        updateProgress();
        
    }
    inputBox.value="";
    saveData();
    checkAllTasksCompleted();
    checkAllTasks();
}

listcontainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateProgress();
        checkAllTasksCompleted();
        checkAllTasks();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.classList.add("removed");
        setTimeout(() => {
            e.target.parentElement.remove();
            saveData();
            updateProgress();
            checkAllTasksCompleted();
            checkAllTasks();
        }, 300);
    }
},false);

function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function showData() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listcontainer.innerHTML = savedData;
    } else {
        listcontainer.innerHTML = "";
    }
    updateProgress();
    checkAllTasksCompleted();
    checkAllTasks();
}


const progressBar = document.getElementById("progress-bar");
const taskCounter = document.getElementById("task-counter");
function updateProgress() {
    const tasks = document.querySelectorAll("#list-box li");
    const completedTasks = document.querySelectorAll("#list-box li.checked");
    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;
    const progress = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;

    progressBar.value = progress;
    taskCounter.textContent = `${completedCount}/${totalTasks} tasks completed`;
}


const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
function checkAllTasksCompleted() {
    const tasks = document.querySelectorAll("#list-box li");
    const completedTasks = document.querySelectorAll("#list-box li.checked");
    if (tasks.length > 0 && tasks.length === completedTasks.length) {
        showModal();
    }
}

function showModal() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function checkAllTasks() {
    const tasks = document.querySelectorAll("#list-box li");
    const completedTasks = document.querySelectorAll("#list-box li.checked");
    if (tasks.length > 0 && tasks.length === completedTasks.length) {
        popCrackers();
    }
}

function popCrackers() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}



showData();
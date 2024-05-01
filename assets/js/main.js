const task = document.querySelector('.task')
const tasks = document.querySelector('.tasks')
const newTask = document.querySelector('.newTask')

function createTableTr() {
  const tr = document.createElement('tr')
  return tr
}

function createTableTd() {
  const td = document.createElement('td')
  return td
}

function insertItemTask(name) {
  const trTask = createTableTr()
  const tdText = createTableTd()
  const tdAct = createTableTd()
  tdAct.setAttribute('class', 'action')

  tdText.innerHTML = name
  trashTask(tdAct)

  trTask.appendChild(tdText)
  trTask.appendChild(tdAct)
  tasks.appendChild(trTask)

  clearTaskInput()
}

function clearTaskInput() {
  task.value = ''
  task.focus()
}

function trashTask(td) {
  const trashBtn = document.createElement('span')
  const img = document.createElement('img')
  img.setAttribute('src', './assets/img/trash_16.png')
  img.setAttribute('class', 'trash')
  trashBtn.setAttribute('title', 'Remover esta task')
  trashBtn.appendChild(img)
  
  td.appendChild(trashBtn)
}

function saveTasks() {
  let tasksList = []
  let trsTasks = tasks.querySelectorAll('tr')

  for(let tr of trsTasks) {
    let td = tr.querySelector('td')
    let name = td.innerHTML
    tasksList.push(name)
  }

  const tasksJSON = JSON.stringify(tasksList)
  localStorage.setItem('thetasks', tasksJSON)
}

function loadTasks() {
  const tasks = localStorage.getItem('thetasks')
  const tasksList = JSON.parse(tasks)

  for (let tdTask of tasksList) {
    insertItemTask(tdTask)
  }
}

task.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!task.value) return

    insertItemTask(task.value)
    saveTasks()
  }
})

newTask.addEventListener('click', function(e) {
  if (!task.value) return

  insertItemTask(task.value)
  saveTasks()
})

document.addEventListener('click', function(e) {
  const el = e.target

  if (el.classList.contains('trash')) {
    const td = el.parentElement
    const tr = td.parentElement
    tr.parentElement.remove()
    saveTasks()
  }
})

loadTasks()

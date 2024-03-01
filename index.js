const addToDoButton = document.querySelector('.add__todo__btn')
const textInput = document.querySelector('.todo__input')
const todoContainer = document.querySelector('.todo__list__container')
let todos = JSON.parse(localStorage.getItem('todos')) || []
addToDoButton.addEventListener('click', addToDo)

function addToDo() {
    if (!textInput.value) {
        return
    } else {
        const todo = {
            text: textInput.value
        }
        todos.push(todo)
        textInput.value = ''
        displayToDos()
        saveToLocalStorage()
    }
  }

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function displayToDos() {
    todoContainer.innerHTML = ''
    todos.forEach((todo, index) => {
        todo.id = index
        const newToDoElement = document.createElement('div')
        newToDoElement.classList.add('todo__element')
        newToDoElement.setAttribute("id", `${index}`)
        newToDoElement.innerHTML = `
            <p>${todo.text}</p>
            <button class="delete__todo__btn" onclick="deleteToDo(${index})">del</button>
            <button class="editToDo" onclick="editToDo(this, ${index})">edit</button>`
        todoContainer.appendChild(newToDoElement)
    })
}

function deleteToDo(id) {
    todos = todos.filter(todo => todo.id !== id)
    displayToDos()
    saveToLocalStorage()
}

function editToDo(element, id) {
    const todoText = todos[id].text
    const inputField = document.createElement('input')
    const todoElement = element.parentNode
    
    inputField.type = 'text'
    inputField.value = todoText
    todoElement.replaceChild(inputField, todoElement.firstChild)
    
    inputField.focus()
    inputField.addEventListener('blur', function(e) {
        e.preventDefault()
        const newText = inputField.value.trim()
        if(newText !== '') {
            for(let i = 0; i < todos.length; i++) {
                if(todos[i].id === id) {
                    todos[i].text = newText
                }
            }
            displayToDos()
        } else {
            inputField.value = todoText
        }
    })
}
displayToDos()
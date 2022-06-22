// *Методы 

// Создать новую задачу
function createTodoItem(title) {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'checkbox';

	const label = document.createElement('label');
	label.innerText = title;
	label.className = 'title';

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.className = 'textfield';

	const editButton = document.createElement('button');
	editButton.innerText = 'Изменить';
	editButton.className = 'edit';

	const deleteButton = document.createElement('button');
	deleteButton.innerText = 'Удалить';
	deleteButton.className = 'delete';

	const listItem = document.createElement('li');
	listItem.className = 'todo-item';

	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	bindEvents(listItem);
	
	return listItem;

}

// Привязать событие
function bindEvents(todoItem) {
	const checkbox = todoItem.querySelector('.checkbox');
	const editButton = todoItem.querySelector('.edit');
	const deleteButton = todoItem.querySelector('.delete');

	checkbox.addEventListener('change', toggleTodoItem);
	editButton.addEventListener('click', editTodoItem);
	deleteButton.addEventListener('click', deleteTodoItem);
}

// Добавить задачу
function addTodoItem(event) {
	event.preventDefault();

	if (addInput.value === '') return alert('Необходимо ввести название задачи.');

	const todoItem = createTodoItem(addInput.value);
	todoList.appendChild(todoItem);
	addInput.value = '';
}

// Отметить выполнение задачи
function toggleTodoItem() {
	const listItem = this.parentNode;
	listItem.classList.toggle('completed');
}

// Редактировать задачу
function editTodoItem() {
	const listItem = this.parentNode;
	const title = listItem.querySelector('.title');
	const editInput = listItem.querySelector('.textfield');
	const isEditing = listItem.classList.contains('editing');

	if (isEditing) {
		title.innerText = editInput.value;
		this.innerText = 'Изменить';
	} else {
		editInput.value = title.innerText;
		this.innerText = 'Сохранить';
	}

	listItem.classList.toggle('editing');
}

// Удалить задачу
function deleteTodoItem() {
	const listItem = this.parentNode;
	todoList.removeChild(listItem);
}

// *Переменные
// Получить DOM элементы для взаимодействия
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

// Повесить обработчик событий на отправку формы
todoForm.addEventListener('submit', addTodoItem);
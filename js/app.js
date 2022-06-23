// *Методы 

// Создать элементы
function createElement(tag, props, ...children) {
	const element = document.createElement(tag);

	Object.keys(props).forEach(key => element[key] = props[key]);

	if (children.length > 0) {
		children.forEach(child => {
			if (typeof child === 'string') {
				child = document.createTextNode(child);
			}
			element.appendChild(child);
		})
	}
	
	return element;
}

// Создать новую задачу
function createTodoItem(title) {
	const checkbox = createElement('input', {type:'checkbox', className:'checkbox'} );
	const label = createElement('label', {className:'title'}, title);
	const editInput = createElement('input', {type:'text', className:'textfield'});
	const editButton = createElement('button', {className:'edit'}, 'Изменить');
	const deleteButton = createElement('button', {className:'delete'}, 'Удалить');
	const listItem = createElement('li', {className:'todo-item'}, checkbox, label, editInput, editButton, deleteButton);
	
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

// Функция для запуска приложения
function main() {
	// Повесить обработчик событий на отправку формы
	todoForm.addEventListener('submit', addTodoItem);
	todoItems.forEach(item => bindEvents(item));
}

main();


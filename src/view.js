// *Представление (взаимодействие с дом)

import { createElement, EventEmitter } from './helpers.js';

class View extends EventEmitter {
	constructor() {
		super();
		this.form = document.getElementById('todo-form');
		this.input = document.getElementById('add-input');
		this.list = document.getElementById('todo-list');
		

		this.form.addEventListener('submit', this.handleAdd.bind(this));
	}

	createElement(todo) {
		const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : '' });
		const label = createElement('label', {className: 'title'}, todo.title);
		const editInput = createElement('input', {type: 'text', className: 'textfield'});
		const editButton = createElement('button', {className: 'edit'}, 'Изменить');
		const removeButton = createElement('button', {className: 'remove'}, 'Удалить');
		const item = createElement('li', {className: `todo-item${todo.completed ? ' completed' : ''}`, 'dataId': todo.id}, checkbox, label, editInput, editButton, editButton, removeButton);
		
		return this.addEventListeners(item);
	}

	addEventListeners(listItem) {
		const checkbox = listItem.querySelector('.checkbox');
		const editButton = listItem.querySelector('button.edit');
		const removeButton = listItem.querySelector('button.remove');

		checkbox.addEventListener('change', this.handleToggle.bind(this));
		editButton.addEventListener('click', this.handleEdit.bind(this));
		removeButton.addEventListener('click', this.handleRemove.bind(this));

		return listItem;
	}

	handleAdd(event) {
		event.preventDefault();

		if (!this.input.value) return alert('Необходимо ввести название задачи');

		const value = this.input.value;

		// add item to model
		this.emit('add', value);
	
	}

	handleToggle({target}) {
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');
		
		const completed = target.checked;

		// update model
		this.emit('toggle', {id, completed});
	}

	handleEdit({target}) {
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
			
		const editButton = listItem.querySelector('button.edit');
		let title = input.value;
			
		const isEditing = listItem.classList.contains('editing');

		if(isEditing) {
			// update model
			this.emit('edit', {id, title});
			
		} else {
			input.value = label.textContent;
			title = input.value;
			editButton.textContent = 'Сохранить';
			listItem.classList.add('editing');
		}
	}

	handleRemove({target}) {
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');

		//remove item from model
		this.emit('remove', id);
	}
	
	show(todos) {
		todos.forEach(todo => {
			const listItem = this.createElement(todo);

			this.list.appendChild(listItem);
		});
	}

	findListItem(id) {
		const item = this.list.querySelector(`[data-id="${id}"]`);
		
		return item ;
	}

	addItem(todo) {
		const listItem = this.createElement(todo);

		this.input.value = '';
		this.list.appendChild(listItem);
	}

	toggleItem(todo) {
		const listItem = this.findListItem(todo.id);
		const checkbox = listItem.querySelector('.checkbox');

		checkbox.checked = todo.completed;

		if (todo.completed) {
			listItem.classList.add('completed');
		} else {
			listItem.classList.remove('completed');
		}
	}

	editItem(todo) {
		const listItem = this.findListItem(todo.id);
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
		const editButton = listItem.querySelector('button.edit');

		label.textContent = todo.title;
			
		editButton.textContent = 'Изменить';
		listItem.classList.remove('editing');

	}

	removeItem(id) {
		const listItem = this.findListItem(id);

		this.list.removeChild(listItem);
	}

}

export default View;
// Создать новый элемент дом дерева

function createElement(tag, props, ...children) {
	const element = document.createElement(tag);
 
	Object.keys(props).forEach(key => {
		if(key.includes('data')) {
			element.dataset.id = props.dataId;
		} else {
			element[key] = props[key];
		}	
	});
	

	children.forEach(child => {
		if (typeof child === 'string') {
			child = document.createTextNode(child);
		}

		element.appendChild(child);
	});

	return element;
}

// Транслятор собственных событий

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(type, callback) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(callback);
	}

	emit(type, arg) {
		if (this.events[type]) {
			this.events[type].forEach(callback => callback(arg));
		}
	}
}

// Сохранение данных в Local Storage

function save(data) {
	const string = JSON.stringify(data);

	localStorage.setItem('todos', string);
}

function load() {
	const string = localStorage.getItem('todos');
	const data = JSON.parse(string);

	return data;
}

export {createElement, EventEmitter, save, load};
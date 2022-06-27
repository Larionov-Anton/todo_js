class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		view.on('add', this.addTodo.bind(this));
	}

	addTodo(title) {
		const todo = this.model.addItem({
			id: Date.now(),
			title: title,
			completed: false
		});

		this.view.addItem(todo);
	}
}
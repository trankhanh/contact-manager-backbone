var App = {
	Model: {},
	Collection: {},
	View: {}
};

var vent = _.extend({}, Backbone.Events);

App.Model.Task = Backbone.Model.extend({
	initialize: function() {

	},

	validate: function(attrs) {
		if(!trim(attrs.title)) {
			return " A title mustn't be empty!";
		}
	}
});


App.Collection.Tasks = Backbone.Collection.extend({
	
	model: App.Model.Task

});


App.View.Task = Backbone.View.extend({

	initialize: function() {
		this.model.on('change:title', this.render, this);	

		this.model.on('destroy', this.remove, this);
	},

	tagName: 'li',

	template: _.template($("#taskTemplate").html()),

	events: {
		'click .edit': 'editTask',
		'click .delete': 'destroy'
	},

	editTask: function() {
		var newTitle = prompt("Enter a new title");
		this.model.set('title', newTitle, {validate: true});
	},

	destroy: function() {
		this.model.destroy();
	},

	remove: function() {
		this.$el.remove();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
})

App.View.AddTask = Backbone.View.extend({
	
	el: "#addTask",

	events: {
		'submit': 'addTask'
	},

	addTask: function(e) {
		e.preventDefault();
		var newTask = new App.Model.Task({title: this.$el.find('input[type="text"]').val()});
		this.collection.add(newTask);
		console.log(this.collection);
	},

	initialize: function() {
		// console.log(this.$el.html());
	}

})

App.View.Tasks = Backbone.View.extend({

	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	// addTask: function(task) {
	// 	this.addOne(task);
	// },

	tagName: 'ul',

	render: function() {

		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(task) {
		// create an instance of single task
		var taskView = new App.View.Task({model: task});

		// append a task view to root element
		this.$el.append(taskView.render().$el);
	}
})

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'show': 'show',
		'appointment/:id': 'appointment'
	},

	index: function() {
		console.log("index page");
	},

	show: function() {
		console.log("show page");
	},

	appointment: function(id) {
		console.log("Go in!");
		vent.trigger('appointment:show', id);
	}
})

App.View.Appointment = Backbone.View.extend({
	initialize: function() {
		vent.on("appointment:show", this.show, this);
	},

	show: function() {
		alert("");
	}
});

appointment = new App.View.Appointment;



// appointment = new App.View.Appointment;

var tasks = new App.Collection.Tasks([
	{
		title: "Go to store"
	},
	{
		title: "Go to beach"
	}
]);

var tasksView = new App.View.Tasks({
	collection: tasks
});

newTask = new App.View.AddTask({collection: tasks});

tasksView.render();

$('body').append(tasksView.$el);

new App.Router;

Backbone.history.start();

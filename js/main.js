var App = {
	Model: {},
	Collection: {},
	View: {}
};

App.Model.Task = Backbone.Model.extend({

});


App.Collection.Tasks = Backbone.Collection.extend({
	
	model: App.Model.Task

});


App.View.Task = Backbone.View.extend({
	
	tagName: 'li',

	template: _.template($("#taskTemplate").html()),

	events: {
		'click .edit': 'editTask'
	},

	editTask: function() {
		alert('')
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
})

App.View.Tasks = Backbone.View.extend({

	tagName: 'ul',

	render: function() {

		this.collection.each(function(task){
			// create an instance of single task
			var taskView = new App.View.Task({model: task});

			// append a task view to root element
			this.$el.append(taskView.render().$el);


		}, this);

		return this;
	}
})

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

tasksView.render();

$('body').append(tasksView.$el);


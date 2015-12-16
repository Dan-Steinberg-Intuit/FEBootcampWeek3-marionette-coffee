var App = new Marionette.Application();

// Create Model
App.Coffee = Backbone.Model.extend();

// Create Model Collection
App.CoffeeCollection = Backbone.Collection.extend({
	model: App.Coffee
});

// Create Coffee ItemView
App.CoffeeCupView = Marionette.ItemView.extend({
	template: "#template",
});

// Create Form ItemView
App.FormView = Marionette.ItemView.extend({
	template: "#form-template",
	el: ".form-target",

	events: {
		"submit": "handleSubmit"
	},

	ui: {
		type: "input[name='type']",
		description: "input[name='desc']",
		img: "input[name='img']"
	},

	handleSubmit: function(e) {
		e.preventDefault();

		// Add the new model to the collection
		App.coffees.add({
			type: this.ui.type.val(),
			description: this.ui.description.val(),
			img: this.ui.img.val()
		});

		// Clear the form fields
		this.ui.type.val("");
		this.ui.description.val("");
		this.ui.img.val("");
	}
});

// Create CollectionView
App.CoffeeMenu = Marionette.CollectionView.extend({
	el: ".target",
	childView: App.CoffeeCupView
});


// What should happen on Start
App.on("start", function() {

	// Instantiate some Models
	App.mocha = new App.Coffee({type: "Mocha", description: "Coffee with chocolate", img: "mocha"});

	// Instantiate and populate the Collection
	App.coffees = new App.CoffeeCollection([App.mocha]);

	// Instantiate and populate the CollectionView
	App.coffeeMenu = new App.CoffeeMenu({collection: App.coffees});

	// Render the CollectionView and the Form
	App.coffeeMenu.render();
	new App.FormView().render();
});

App.start();


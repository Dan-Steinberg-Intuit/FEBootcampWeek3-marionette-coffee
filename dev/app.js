var App = new Marionette.Application();

// Create Model
App.Coffee = Backbone.Model.extend();

// Create Model Collection
App.CoffeeCollection = Backbone.Collection.extend({
	model: App.Coffee
});

// Create Coffee ItemView
App.CoffeeCup = Marionette.ItemView.extend({
	template: "#template",
});

// Create Form ItemView
App.FormView = Marionette.ItemView.extend({
	template: "#form-template",
	el: ".form-target",

	events: {
		"submit": "handleSubmit"
	},

	handleSubmit: function(e) {
		e.preventDefault();

		// Grab the form's data
		App.newCoffee = {};
		App.newCoffee.type = $("input[name='type']").val();
		App.newCoffee.description = $("input[name='desc']").val();
		App.newCoffee.img = $("input[name='img']").val();

		// Add the new model to the collection
		App.coffees.add(App.newCoffee);
	}
});

// Create CollectionView
App.CoffeeMenu = Marionette.CollectionView.extend({
	el: ".target",
	childView: App.CoffeeCup
});


// What should happen on Start
App.on("start", function() {

	// Instantiate the Form
	App.formView = new App.FormView();

	// Instantiate some Models
	App.mocha = new App.Coffee({type: "Mocha", description: "Coffee with chocolate", img: "mocha"});

	// Instantiate and populate the Collection
	App.coffees = new App.CoffeeCollection([App.mocha]);

	// Instantiate and populate the CollectionView
	App.coffeeMenu = new App.CoffeeMenu({collection: App.coffees});

	// Render the Form and CollectionView
	App.formView.render();
	App.coffeeMenu.render();
});

App.start();


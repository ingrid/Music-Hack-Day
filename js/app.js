define([], function () {
	var App = {
		start_time : null,
		stage : new Kinetic.Stage({
		    container : 'screenContainer',
		    width : 1024,
		    height : 768
		}),
		notes_layer : new Kinetic.Layer(),
		background_layer : new Kinetic.Layer(),
		avatar_layer : new Kinetic.Layer()
	};

	App.stage.add(App.background_layer);
	App.stage.add(App.avatar_layer);
	App.stage.add(App.notes_layer);

	return App;
});
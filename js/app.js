define([], function () {
	var App = {
		tuner : null,
		current_score : 0,
		game_difficulty_prefs : {
			scoring_range : 400,
			note_is_good : 140
		},
		start_time : null,
		all_notes : [],
		future_note_idx : 0,
		notes_to_score : [],
		stage : new Kinetic.Stage({
		    container : 'screenContainer',
		    width : 1024,
		    height : 768
		}),
		notes_layer : new Kinetic.Layer(),
		background_layer : new Kinetic.Layer(),
		avatar_layer : new Kinetic.Layer()
	};

	var bg = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : App.stage.getWidth(),
		height : App.stage.getHeight(),
		fill : "rgb(255,92,92)"
	});
	
	App.background_layer.add(bg);

	App.stage.add(App.background_layer);
	App.stage.add(App.avatar_layer);
	App.stage.add(App.notes_layer);

	return App;
});
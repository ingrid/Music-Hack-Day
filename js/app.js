define([], function () {
	var App = {
		time_offset : null,
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
		avatar_layer : new Kinetic.Layer(),
		effects_layer : new Kinetic.Layer()
	};

	App.time_offset = App.stage.getWidth()/3;

	var bg = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : App.stage.getWidth(),
		height : App.stage.getHeight(),
		fill : "rgb(255,92,92)"
	});

	var fade_effect = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : App.time_offset,
		height : App.stage.getHeight(),
		fill : "rgba(0,0,0,0.5)"
	});

	fade_effect.setFill({
	start: {
	  x: 0,
	  y: 0
	},
	end: {
	  x: App.time_offset,
	  y: 0
	},
	colorStops: [0, 'rgba(0,0,0,0.9)', 1, 'rgba(0,0,0,0.1)']
	});

	App.background_layer.add(bg);
	App.effects_layer.add(fade_effect);

	App.stage.add(App.background_layer);
	App.stage.add(App.avatar_layer);
	App.stage.add(App.notes_layer);
	App.stage.add(App.effects_layer);

	return App;
});
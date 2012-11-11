define(["helpers"], function (helpers) {
	var App = {
		time_offset : null,
		tuner : null,
		current_score : 0,
		game_difficulty_prefs : {
			scoring_range : 200,
			note_is_good : 10
		},
		start_time : null,
		all_notes : [],
		future_note_idx : 0,
		notes_to_score : [],
		stage : new Kinetic.Stage({
		    container : 'screenContainer',
		    width : 1024,
		    height : 768-50-25
		}),
		notes_layer : new Kinetic.Layer(),
		background_layer : new Kinetic.Layer(),
		avatar_layer : new Kinetic.Layer(),
		effects_layer : new Kinetic.Layer(),
		scoring_rect : null
	};

	App.scoring_rect = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : App.stage.getWidth(),
		height : App.stage.getHeight(),
		fill : "#ff5c5c"
	});

	App.time_offset = posToTime(App.stage.getWidth()/3);

	var fade_effect = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : timeToPos(App.time_offset),
		height : App.stage.getHeight(),
		fill : "rgba(0,0,0,0.5)"
	});

	fade_effect.setFill({
	start: {
	  x: 0,
	  y: 0
	},
	end: {
	  x: timeToPos(App.time_offset),
	  y: 0
	},
	colorStops: [0, 'rgba(0,0,0,0.9)', 1, 'rgba(0,0,0,0.05)']
	});

	App.background_layer.add(App.scoring_rect);
	App.effects_layer.add(fade_effect);

	App.stage.add(App.background_layer);
	App.stage.add(App.avatar_layer);
	App.stage.add(App.notes_layer);
	App.stage.add(App.effects_layer);

	return App;
});
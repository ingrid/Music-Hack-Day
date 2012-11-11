define([], function () {
	var App = {
		current_score : 0,
		game_difficulty_prefs : {
			scoring_range : 400,
			note_is_good : 40
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

	App.stage.add(App.background_layer);
	App.stage.add(App.avatar_layer);
	App.stage.add(App.notes_layer);

	return App;
});
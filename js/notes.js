define(["app", "helpers"], function(App, helpers) {
    var note_template = {
        x : 0,
        y : 0,
        radius : 20,
        fill : 'rgb(0,255,168)',
        stroke : 'rgb(146,255,217)',
        strokeWidth: 3
    };
    
    var makeNote = function(pitch, time){
        note = new Kinetic.Group();
        note.scoring_dist = null;
        note.time = time;
        note.pitch = pitch;
        note.update_score = function (pitch, time_elapsed) {
            var p1 = {
                x : this.time,
                y : this.pitch
            };
            var p2 = {
                x : time_elapsed,
                y : pitch
            };
            if (this.scoring_dist === null) {
                this.scoring_dist = dist_2d(p1, p2);
            } else {
                var new_scoring_dist = dist_2d(p1, p2);
                this.scoring_dist = Math.min(new_scoring_dist, this.scoring_dist);
            }
        }
        note.score = function () {
            if (App.game_difficulty_prefs.note_is_good >= this.scoring_dist) {
                App.current_score += 10;
                console.log(App.current_score);
            }
        };
        note.add(new Kinetic.Circle(note_template));
        note.setAbsolutePosition(timeToPos(time), pitch);
        return note;
    };
    
    var notes = {
        layer : new Kinetic.Layer(),
        group : new Kinetic.Group(),
        bg_path : new Kinetic.Line({
            points : [0,0],
            stroke: 'white',
            strokeWidth: 3
        }),
        addNote : function(pitch, time) {
            var note = makeNote(pitch, time);
            this.group.add(note);
            App.all_notes.push(note);
        },
        move : function (t_since_start) {
            this.group.setAbsolutePosition({x: -timeToPos(t_since_start), y: 0});
        },
        updateBackground : function (t_since_start) {
            var bg_layer = App.background_layer;
            var pts = [];
            var note_idx;
            if (App.all_notes.length > 0) {
                var last_pos = App.all_notes[0].getPosition();
                last_pos.x -= timeToPos(t_since_start);
                pts.push(last_pos);
                for (note_idx = Math.max(1, App.future_note_idx-2); note_idx < App.all_notes.length; note_idx++) {
                    var curr_note = App.all_notes[note_idx];
                    var c_pos = curr_note.getPosition();
                    var c_pos = {x: c_pos.x-timeToPos(t_since_start), y: c_pos.y};
                    var i;
                    for (i = 0; i < 5; i++) {
                        var y_delta = Math.random()*(c_pos.y-last_pos.y);
                        var rand_pos = {x: (c_pos.x - last_pos.x)/5*(i+1) + last_pos.x, y: (last_pos.y+c_pos.y)/2 + y_delta};
                        pts.push(rand_pos);
                    }
                    last_pos = c_pos;
                    pts.push(last_pos);
                    if (c_pos.x > App.stage.getWidth()) {
                        note_idx = App.all_notes.length;
                    };
                }
            }
            this.bg_path.setPoints(pts);
        }
    };
    
    App.background_layer.add(notes.bg_path);

    App.notes_layer.add(notes.group);
    return notes;
});



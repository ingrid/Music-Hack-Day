define(["app", "helpers"], function(App, helpers) {
    var note_template = {
        x : 0,
        y : 0,
        radius : 20,
        fill : 'black'
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
            //console.log(this.scoring_dist);
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
        addNote : function(pitch, time) {
            var note = makeNote(pitch, time);
            this.group.add(note);
            App.all_notes.push(note);
        },
        addNotes : function() {
        }
    };
    
    App.notes_layer.add(notes.group);
    return notes;
});



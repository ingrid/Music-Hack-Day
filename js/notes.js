define(["app"], function(App) {
    var note_template = {
        x : 0,
        y : 0,
        radius : 20,
        fill : 'black'
    };
    
    var makeNote = function(x, y){
        note = new Kinetic.Group();
        note.scoring_dist = null;
        note.score = function (avatar_pos) {
            if (note.scoring_dist === null) {
                var curr_pos = note.getPosition();
                note.scoring_dist = dist_2d(curr_pos, avatar_pos);
            } else {
                var new_scoring_dist = dist_2d(curr_pos, avatar_pos);
                note.scoring_dist = Math.min(new_scoring_dist, note.scoring_dist);
            }
        }
        note.add(new Kinetic.Circle(note_template));
        note.setAbsolutePosition(x, y);
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



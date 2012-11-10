define(["app"], function(App) {
    var note_template = {
        x : 0,
        y : 0,
        radius : 20,
        fill : 'black'
    };
    
    var makeNote = function(x, y){
        note = new Kinetic.Group();
        note.add(new Kinetic.Circle(note_template));
        note.setAbsolutePosition(x, y);
        return note;
    };
    
    var notes = {
        layer : new Kinetic.Layer(),
        group : new Kinetic.Group(),
        addNote : function(x, y){
            var note = makeNote(x, y);
            this.group.add(note);
        }
    };
    
    App.notes_layer.add(notes.group);
    return notes;
});



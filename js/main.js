require(["notes", "helpers", "app"], function(notes, helpers, App){
    var avatar_layer, avatar, background_layer, loop, stage, string;
    
    var createAvatar = function () {
        var size = 20;
        var a_grp = new Kinetic.Group();
        a_grp.setPosition(20, App.stage.getHeight()/2);
        
        var a = {
            obj: a_grp,
            size : size,
            move : function (pitch) {
                // Converts pitch into a y position
                this.goal_height = pitch;
            },
            update : function () {
                // Smoothly moves the avatar to the goal position
                
                var curr_pos = this.obj.getAbsolutePosition();
                
                var offset = this.goal_height - curr_pos.y;
                
                if (offset != 0) {
                    this.acceleration = Math.abs(100/offset);
                } else {
                    this.acceleration = 0
                }
                
                this.acceleration = Math.min(this.max_acceleration, this.acceleration);
                
                var dir_sign = sign(offset);
                
                this.velocity += (dir_sign*this.acceleration);
                
                // Terminal velocity              
                this.velocity = Math.min(this.max_velocity, Math.abs(this.velocity));
                
                var delta_height = (this.velocity * dir_sign);
                if (Math.abs(offset) < Math.abs(delta_height)) {
                    delta_height = Math.abs(Math.abs(delta_height)-Math.abs(delta_height)) * dir_sign;
                }
                
                this.obj.setAbsolutePosition({x: curr_pos.x, y: curr_pos.y + delta_height});
            },
            velocity : 0,
            acceleration : 0,
            max_velocity : 10,
            max_acceleration : 30,
            goal_height : App.stage.getHeight()
        }
        
        var main_circle = new Kinetic.Circle({
            x : 0,
            y : 0,
            radius : size,
            fill: 'red'
        });
        
        a.obj.add(main_circle);
        
        return a;
    };
    
    
    var setup = function () {
        var note_idx;
        App.start_time = new Date();
        avatar = createAvatar();
        App.avatar_layer.add(avatar.obj);

        for (note_idx = 0; note_idx < 300; note_idx++) {
            var r = Math.random()*App.stage.getHeight()/2+App.stage.getHeight()*0.4;
            notes.addNote(timeToPos((note_idx+1)*1000), r);
        }
    };
    
    setup();
    
    loop = setInterval(function(){
        var note_idx;
        var time_elapsed = new Date() - App.start_time;
        notes.group.setAbsolutePosition({x: -timeToPos(time_elapsed), y: 0});
        
        // Moves notes from future note array to scoring array when they come in range
        for (note_idx = App.future_note_idx; note_idx < App.future_notes.length; note_idx ++) {
            var note = App.future_notes[note_idx];
            var x_to_avatar = Math.abs(avatar.obj.getPosition().x - note.getPosition().x);
            if (x_to_avatar < App.game_difficulty_prefs.scoring_range) {
                App.future_note_idx = note_idx;
                App.notes_to_score.push(note);
            } else {
                note_idx = App.future_notes.length; // Break out of the loop
            }
        }

        // Score notes in the scoring array. Move them out when they leave the array
        for (note_idx = 0; note_idx < App.notes_to_score.length; note_idx ++) {
            var note = App.notes_to_score[note_idx];
            var x_to_avatar = Math.abs(avatar.obj.getPosition().x - note.getPosition().x);
            note.score(avatar.obj.getPosition());
            if (x_to_avatar > App.game_difficulty_prefs.scoring_range) {

            } else {
                note_idx = App.future_notes.length; // Break out of the loop
            }
        }
        avatar.update();
        App.avatar_layer.draw();
        App.notes_layer.draw();
    }, 20);
    
    // Randomly generate pitches for data
    setInterval(function(){
        var r = Math.random()*App.stage.getHeight()/2+App.stage.getHeight()*0.4;
        avatar.move(r);
    }, 500);
    
});

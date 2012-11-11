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
                
                //this.obj.setAbsolutePosition({x: curr_pos.x, y: curr_pos.y + delta_height});

                this.obj.setAbsolutePosition({x: curr_pos.x, y: this.goal_height});
            },
            getPitch : function () {
                return this.obj.getPosition().y;
            },
            velocity : 0,
            acceleration : 0,
            max_velocity : 10,
            max_acceleration : 30,
            goal_height : App.stage.getHeight()
        }
        
        var main_rect = new Kinetic.Rect({
            x : 0,
            y : -25,
            width: 20,
            height: 50,
            fill: 'rgb(146, 255, 217)'
        });
        
        a.obj.add(main_rect);
        
        return a;
    };
    
    
    var setup = function () {
        App.tuner = Tuner(function () {
            // First success.
            var note_idx;
            var initial_offset = 3000;
            
            avatar = createAvatar();
            App.avatar_layer.add(avatar.obj);

            for (note_idx = 0; note_idx < 100; note_idx++) {
                var r = App.stage.getHeight()/12 * Math.round(Math.random()*12);

                //App.stage.getHeight()/2+App.stage.getHeight()*0.4;
                notes.addNote(r, (note_idx + 1) * 300 + initial_offset);
            }

            beginMainLoop();
        },function (note_data) {
            //console.log(note_data);

            var r = App.stage.getHeight()/12 * (12-note_data.Num); //Math.random()*App.stage.getHeight()/2+App.stage.getHeight()*0.4;
            avatar.move(r);
        });
    };
    
    setup();
    
    var beginMainLoop = function() {
        App.start_time = new Date();
        loop = setInterval(function(){
            //var nte = App.tuner.note_data;
            //console.log(nte);
            //avatar.move(r);
    
            var note_idx;
            var time_elapsed = new Date() - App.start_time;
            notes.move(time_elapsed);
            
            // Moves notes from future note array to scoring array when they come in range
            for (note_idx = App.future_note_idx; note_idx < App.all_notes.length; note_idx ++) {
                var note = App.all_notes[note_idx];
                var time_window = Math.abs(time_elapsed - note.time);
                if (time_window < App.game_difficulty_prefs.scoring_range) {
                    App.future_note_idx = note_idx + 1;
                    App.notes_to_score.push(note);
                } else {
                    note_idx = App.all_notes.length; // Break out of the loop
                }
                if (posToTime(App.stage.getWidth()) > time_window) {
                    note_idx = App.all_notes.length;
                }
            }
    
            // Score notes in the scoring array. Move them out when they leave the array
            var amount_to_remove = 0;
            for (note_idx = 0; note_idx < App.notes_to_score.length; note_idx ++) {
                var note = App.notes_to_score[note_idx];
                var time_window = Math.abs(time_elapsed - note.time);
                var pitch = avatar.getPitch();
    
                note.update_score(pitch, time_elapsed);
                if (time_window > App.game_difficulty_prefs.scoring_range) {
                    // Actually score!
                    note.score();
                    amount_to_remove ++;
                } else {
                    note_idx = App.notes_to_score.length; // Break out of the loop
                }
            }
            for (note_idx = 0; note_idx < amount_to_remove; note_idx ++) {
                App.notes_to_score.shift();
            }
    
            avatar.update();
            notes.updateBackground(time_elapsed);
            App.background_layer.draw();
            App.avatar_layer.draw();
            App.notes_layer.draw();
        }, 20);
    };    
});

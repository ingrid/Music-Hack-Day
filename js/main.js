require(["notes", "helpers", "app"], function(notes, helpers, App){
    var avatar_layer, avatar, background_layer, loop, stage, string;
    notes.addNote(50, 50);
    notes.addNote(150, 50);
    notes.addNote(50, 150);
    notes.addNote(150, 150);
    
    loop = setTimeout(function(){
        
    });
    
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
        avatar = createAvatar();
        App.avatar_layer.add(avatar.obj);
    };
    
    setup();
    
    loop = setInterval(function(){
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

(function(){
    var avatar_layer, avatar, background_layer, loop, stage, string;

    require(["helpers"], function(helpers) {
        console.log("Tried to load helpers.");
    });

    stage = new Kinetic.Stage({
        container :'screenContainer',
        width : 1024,
        height : 768
    });
    background_layer = new Kinetic.Layer();
    notes_layer = new Kinetic.Layer();
    avatar_layer = new Kinetic.Layer();


    stage.add(background_layer);
    stage.add(notes_layer);
    stage.add(avatar_layer);

    loop = setTimeout(function(){
        
    });

    var createAvatar = function () {
        var size = 20;
        var a_grp = new Kinetic.Group();
        a_grp.setPosition(20, stage.getHeight()/2);

        var a = {
            obj: a_grp,
            size : size,
            move : function (pitch) {
                // Converts pitch into a y position
                this.goal_height = pitch;
            },
            update : function () {
                // Smoothly moves the avatar to the goal position

                var curr_pos = this.obj.getPosition();

                var dir = this.goal_height - curr_pos.y;

                var dir_sign = sign(dir);

                this.velocity *= dir_sign;

                // Terminal velocity
                var vel_sign = 0;
                if (this.velocity !== 0) {
                    vel_sign = Math.abs(this.velocity)/this.velocity;
                }
                
                this.velocity = Math.min(this.max_velocity, Math.abs(this.velocity)) * vel_sign;

                this.obj.setAbsolutePosition({x: curr_pos.x, y: curr_pos.y + this.velocity});
            },
            velocity : 5,
            acceleration : 0,
            max_velocity : 20,
            max_acceleration : 5,
            goal_height : 384
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
        avatar_layer.add(avatar.obj);
    };

    setup();


    loop = setInterval(function(){
        avatar.update();
        avatar_layer.draw();
    }, 20);

    setInterval(function(){
        var r = Math.random()*stage.getHeight();
        avatar.move(r);
    }, 1000);

})();

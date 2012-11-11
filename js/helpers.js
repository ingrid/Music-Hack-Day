var sign = function (n) {
	if (n === 0) {
		return 0;
	}
	return Math.abs(n)/n;
};

var CONVERSION_FACTOR = 1;
var timeToPos = function(t) {
	return t*CONVERSION_FACTOR;
};

var posToTime = function (p) {
	return p*(1/CONVERSION_FACTOR);
};

var linear_interp_y = function (p1, p2, x) {
    var denom = (p2.x-p1.x);
    if (denom !== 0) {
       return p1.y + (x - p1.x)*(p2.y-p1.y)/denom;
    } else {
        return (p1.y+p2.y)/2;
    }
}

var height_from_pitch = function (pitch, stage_height) {
	return linear_interp_y({x: 0, y:stage_height/16},{x: 11, y:stage_height/16*14},(12-pitch));
}

var dist_2d = function (pos1, pos2) {
	// TODO: check if this is a performance problem
	return Math.sqrt(Math.pow(pos1.x-pos2.x, 2) + Math.pow(pos1.y-pos2.y, 2));
};
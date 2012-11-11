var sign = function(n) {
	if (n === 0) {
		return 0;
	}
	return Math.abs(n)/n;
};

var CONVERSION_FACTOR = 1;
var timeToPos = function(t) {
	return t*CONVERSION_FACTOR;
};

var posToTime = function(p) {
	return p*(1/CONVERSION_FACTOR);
};

var dist_2d = function (pos1, pos2) {
	// TODO: check if this is a performance problem
	return Math.sqrt(Math.pow(pos1.x-pos2.x, 2) + Math.pow(pos1.y-pos2.y, 2));
};
var sign = function(n) {
	if (n === 0) {
		return 0;
	}
	return Math.abs(n)/n;
};

var timeToPos = function(t) {
	return t/5;
}

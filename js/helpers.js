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
	return linear_interp_y({x: 0, y:stage_height*2/16},{x: 11, y:stage_height*14/16},(11-pitch));
}

var dist_2d = function (pos1, pos2) {
	// TODO: check if this is a performance problem
	return Math.sqrt(Math.pow(pos1.x-pos2.x, 2) + Math.pow(pos1.y-pos2.y, 2));
};

// positive value > darker
// negative value > lighter
function getTintedColor(color, v) {
    if (color.length >6) { color= color.substring(1,color.length)}
    var rgb = parseInt(color, 16); 
    var r = Math.abs(((rgb >> 16) & 0xFF)+v); if (r>255) r=r-(r-255);
    var g = Math.abs(((rgb >> 8) & 0xFF)+v); if (g>255) g=g-(g-255);
    var b = Math.abs((rgb & 0xFF)+v); if (b>255) b=b-(b-255);
    r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16); 
    if (r.length == 1) r = '0' + r;
    g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16); 
    if (g.length == 1) g = '0' + g;
    b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16); 
    if (b.length == 1) b = '0' + b;
    return "#" + r + g + b;
}

var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }

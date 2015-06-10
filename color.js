/**
 * Barebones color class.
 *
 * @module  color/color
 */
module.exports = Color;



var	parse = require('color-parse');
var	stringify = require('color-stringify');
var spaces = require('color-space');

var slice = require('sliced');
var pad = require('left-pad');
var isString = require('mutype/is-string');
var isObject = require('mutype/is-object');
var isArray = require('mutype/is-array');
var isNumber = require('mutype/is-number');
var loop = require('mumath/loop');
var round = require('mumath/round');
var between = require('mumath/between');
var capfirst = require('mustring/capfirst');



/**
 * Color class.
 * It innerly keeps updated xyz/rgb values on order to preserve quality.
 * @constructor
 */
function Color (cstr) {
	if (!(this instanceof Color)) return new Color(cstr);

	var self = this;

	//actual values
	self._values = [0,0,0];
	self._alpha = 1;
	self._space = 'rgb';

	//parse argument
	self.parse(cstr);
}



/** Static parser/stringifier */
Color.parse = function (cstr) {
	return new Color(cstr);
};

Color.stringify = function (color, space) {
	return color.toString(space);
};



/** API */
var proto = Color.prototype;


/** Universal setter, detecting the type of argument */
proto.parse = function (arg, space) {
	var self = this;

	//Color instance
	if (arg instanceof Color) {
		self.fromArray(arg._values, arg._space);
	}
	//[0,0,0]
	else if (isArray(arg)) {
		self.fromArray(arg, space);
	}
	//'rgb(0,0,0)'
	else if (isString(arg)) {
		self.fromString(arg);
	}
	//{r:0, g:0, b:0}
	else if (isObject(arg)) {
		self.fromJSON(arg);
	}
	//123445
	else if (isNumber(arg)) {
		self.fromNumber(arg);
	}

	return self;
};


/** String parser/stringifier */
proto.fromString = function (cstr) {
	var res = parse(cstr);
	this.setValues(res.values, res.space);
	this.setAlpha(res.alpha);
	return this;
};

proto.toString = function (type) {
	type = type || this.getSpace();
	var values = this.getValues(spaces[type] ? type : 'rgb');
	values = round(values);
	if (this._alpha < 1) values.push(this.getAlpha());
	return stringify(values, type);
};


/** Array setter/getter */
proto.fromArray = function (arr, space) {
	this.setValues(space.name, space || this.getSpace(), slice(arr));
	return this;
};

proto.toArray = function (space) {
	if (space && space !== this._space) this.setSpace(space);
	return slice(this._values);
};


/** JSON setter/getter */
proto.fromJSON = function (obj, spaceName) {
	var space;

	if (spaceName) {
		space = spaces[spaceName];
	} else {
		//find space by the most channel match
		var maxChannelsMatched = 0, channelsMatched = 0;
		for ( var key in spaces ) {
			channelsMatched = spaces[key].channel.reduce(function (prev, curr) {
				if (obj[curr] !== undefined || obj[curr[0]] !== undefined) return prev+1;
				else return prev;
			}, 0);

			if (channelsMatched > maxChannelsMatched) {
				maxChannelsMatched = channelsMatched;
				space = spaces[key];
			}

			if (channelsMatched >= 3) break;
		}
	}

	//if no space for a JSON found
	if (!space) throw Error('Cannot find space for color object');

	//for the space found set values
	this.setValues(space.channel.map(function (channel, i) {
		return obj[channel] !== undefined ? obj[channel] : channel === 'black' ? obj.k : obj[channel[0]];
	}), space.name);

	var alpha = obj.a !== undefined ? obj.a : obj.alpha;
	if (alpha !== undefined) this.setAlpha(alpha);

	return this;
};

proto.toJSON = function (spaceName) {
	var space = spaces[spaceName || this._space];
	var result = {};
	var values = this.getValues();

	result.alpha = this._alpha;

	//go by channels, create properties
	space.channel.forEach(function (channel, i) {
		result[channel[0]] = values[i];
	});

	//{red:10, green:20, blue:30, alpha: 0.2}
	return result;
};


/** HEX number getter/setter */
proto.fromNumber = function (int) {
	var str = '#' + pad(int.toString(16), 6, 0);
	return this.fromString(str);
};

proto.toNumber = function () {
	return (this._rgb[0] << 16) | (this._rgb[1] << 8) | this._rgb[2];
};


/**
 * Universal component setter and getter
 *
 * @param {string} component Whether space or channel identifier
 * @param {number|array|object|string} value A value for the component
 */
proto.set = function (component, value) {
	xxx
};

proto.get = function (component) {
	xxx
};


/**
 * Current space values
 */
proto.values = function () {
	if (arguments.length) return this.setValues.apply(this, arguments);
	return this.getValues.apply(this, arguments);
};

/**
 * Return values for a passed state
 * Or for current state
 *
 * @param {string} space A space to calculate values for
 *
 * @return {Array} List of values
 */
proto.getValues = function (space) {
	var values;

	//convert values to a target space
	if (space && space !== this._space) {
		values = spaces.xyz[space](this._xyz);
	} else {
		values = slice(this._values);
	}

	return values;
};

/**
 * Set values for a space passed
 *
 * @param {Array} values List of values to set
 * @param {string} spaceName Space indicator
 */
proto.setValues = function(values, spaceName) {
	if (arguments.length && isNumber(values)) return this.setValues(slice(arguments));

	if (!spaceName || !spaces[spaceName]) spaceName = this._space;

	this._space = spaceName;

	var space = spaces[spaceName];

	//walk by values list, cap them
	var isArr = isArray(values);
	this._values = space.channel.map(function (channel, i) {
		var value = isArr ? values[i] : values[channel] !== undefined ? values[channel] : values[channel[0]];

		if (channel === 'hue') return loop(value, space.min[i], space.max[i]);
		return between(value, space.min[i], space.max[i]);
	});

	var alpha = isArr && values.length > space.channel.length ? values[space.channel.length] : values.a !== undefined ? values.a : values.alpha;
	if (alpha !== undefined) this.setAlpha(alpha);

	//update xyz cache
	this._xyz = spaces[spaceName].xyz(this._values);

	return this;
};


/**
 * Current space
 */
proto.space = function () {
	if (arguments.length) return this.setSpace.apply(this, arguments);
	return this.getSpace.apply(this, arguments);
};

/** Return current space */
proto.getSpace = function () {
	return this._space;
};

/** Switch to a new space with optional new values */
proto.setSpace = function (space, values) {
	if (!space || !spaces[space]) throw Error('Cannot set space ' + space);

	if (space === this._space) return this;

	if (values) return this.setValues(values, space);

	//just convert current values to a new space
	this._values = spaces.xyz[space](this._xyz);
	this._space = space;

	return this;
};


/** Channel getter/setter */
proto.channel = function () {
	if (arguments.length > 1) return this.setChannel.apply(this, arguments);
	return this.getChannel.apply(this, arguments);
};

/** Get channel value */
proto.getChannel = function (channel) {
	return this[channel]();
};

/** Set current channel value */
proto.setChannel = function (channel, value) {
	this[channel](value);
};


/** Define named set of methods for a space */
proto.defineSpace = function (name, space) {
	var setName = 'set' + capfirst(name);
	var getName = 'get' + capfirst(name);
	var precision = Math.abs(space.max[0] - space.min[0]) > 1 ? 1 : 0.01;

	// .rgb()
	proto[name] = function (values) {
		if (arguments.length) {
			return this[setName].apply(this, arguments);
		} else {
			return this[getName].apply(this, arguments);
		}
	};

	// .setRgb()
	proto[setName] = function (values) {
		if (arguments.length > 1) values = slice(arguments);
		return this.setValues(values, name);
	};
	// .getRgb()
	proto[getName] = function () {
		//a special kind of short JSON - to be compliant with color
		var result = {};
		var values = this.getValues(name);

		//go by channels, create properties
		space.channel.forEach(function (channel, i) {
			result[channel === 'black' ? 'k' : channel[0]] = round(values[i], precision);
		});

		if (this._alpha < 1) result.a = this._alpha;

		//{red:10, green:20, blue:30, alpha: 0.2}
		return result;
	};

	// .rgbString()
	proto[name + 'String'] = function (cstr) {
		if (cstr) return this.fromString(cstr);
		return this.toString(name);
	};

	// .rgbArray()
	proto[name + 'Array'] = function (values) {
		if (arguments.length) return this.fromArray(values);
		return this.toArray(name);
	};

	// .red(), .green(), .blue()
	space.channel.forEach(function (cname, cidx) {
		if (proto[cname]) return;
		proto[cname] = function (value) {
			this.setSpace(name);
			var values = this.getValues();
			if (value !== undefined) {
				values[cidx] = value;
				return this.setValues(values);
			}
			else {
				return round(values[cidx], precision);
			}
		};
	});
};


/**
 * Create per-space per-channel API
 */
Object.keys(spaces).forEach(function (name) {
	proto.defineSpace(name, spaces[name]);
});


/**
 * Alpha getter / setter
 */
proto.alpha = function () {
	if (arguments.length) return this.setAlpha.apply(this, arguments);
	return this.getAlpha();
};
proto.setAlpha = function (value) {
	this._alpha = between(value, 0, 1);
	return this;
};

proto.getAlpha = function () {
	return this._alpha;
};


/**
 * Rgba, hsla getter/setter. Specific array wrappers to add alpha.
 */
proto.defineSpace('rgba', spaces.rgb);
proto.defineSpace('hsla', spaces.hsl);

proto.rgbaArray = function () {
	var res = this.rgbArray.apply(this, arguments);
	res.push(this.getAlpha());
	return res;
};
proto.hslaArray = function () {
	var res = this.rgbArray.apply(this, arguments);
	res.push(this.getAlpha());
	return res;
};

/** Hex string parser is the same as simple parser */
proto.hexString = function (values) {
	if (arguments.length) return this.fromString(values, 'hex');
	return this.toString('hex').toUpperCase();
};

/** Percent string formatter */
proto.percentString = function () {
	var vals = this.getValues();
	var a = this.getAlpha();
	return 'rgb' + ( a < 1 ? 'a' : '' ) + '(' + vals.map(function (val) {
		return round(val * 100 / 255) + '%';
	}).join(', ') + ( a < 1 ? ', ' + a : '' ) + ')';
};

//keyword
//gray
//toFilter
//isValid
//getFormat
//random
// ie-hex-str($color)
//is(otherColor)
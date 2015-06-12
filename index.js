/**
 * Barebones color class.
 *
 * @module color
 */

module.exports = Color;


var parse = require('color-parse');
var stringify = require('color-stringify');
var spaces = require('color-space');
var names = require('color-name');
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
 * It innerly keeps updated xyz values on order to preserve quality.
 * @constructor
 */
function Color (arg, space) {
	if (!(this instanceof Color)) return new Color(arg);

	var self = this;

	//init model
	self._values = [0,0,0];
	self._space = 'rgb';
	self._alpha = 1;
	self._xyz = [0,0,0];

	//parse argument
	self.parse(arg, space);
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

	if (!arg) {
		return self;
	}

	//[0,0,0]
	else if (isArray(arg)) {
		self.fromArray(arg, space);
	}
	else if (isNumber(arg)) {
		//12, 25, 47 [, space]
		if (arguments.length > 2) {
			var args = slice(arguments);
			if (isString(args[args.length - 1])) space = args.pop();
			self.parse(args, space);
		}
		//123445 [, space]
		else {
			self.fromNumber(arg, space);
		}
	}
	//'rgb(0,0,0)'
	else if (isString(arg)) {
		self.fromString(arg, space);
	}
	//Color instance
	else if (arg instanceof Color) {
		self.fromArray(arg._values, arg._space);
	}
	//{r:0, g:0, b:0}
	else if (isObject(arg)) {
		self.fromJSON(arg, space);
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
	var values = this.toArray(spaces[type] ? type : 'rgb');
	values = round(values);
	if (this._alpha < 1) values.push(this.getAlpha());
	return stringify(values, type);
};


/** Array setter/getter */
proto.fromArray = function (values, spaceName) {
	if (!spaceName || !spaces[spaceName]) spaceName = this._space;

	this._space = spaceName;

	var space = spaces[spaceName];

	//get alpha
	if (values.length > space.channel.length) {
		this.setAlpha(values[space.channel.length]);
		values = slice(values, 0, space.channel.length);
	}

	//walk by values list, cap them
	this._values = values.map(function (value, i) {
		return cap(value, space.name, i);
	});

	//update raw xyz cache
	this._xyz = spaces[spaceName].xyz(this._values);

	return this;
};

proto.toArray = function (space) {
	var values;

	//convert values to a target space
	if (space && space !== this._space) {
		//enhance calc precision, like hsl ←→ hsv ←→ hwb or lab ←→ lch ←→ luv
		if (this._space[0] === space[0]) {
			values = spaces[this._space][space](this._values);
		}
		else {
			values = spaces.xyz[space](this._xyz);
		}
	} else {
		values = this._values;
	}

	values = values.map(function (value, i) {
		return round(value, spaces[space].precision[i]);
	});

	return values;
};


/** JSON setter/getter */
proto.fromJSON = function (obj, spaceName) {
	var space;

	if (spaceName) {
		space = spaces[spaceName];
	}

	//find space by the most channel match
	if (!space) {
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
	if (!space) throw Error('Cannot detect space.');

	//for the space found set values
	this.fromArray(space.channel.map(function (channel, i) {
		return obj[channel] !== undefined ? obj[channel] : obj[ch(channel)];
	}), space.name);

	var alpha = obj.a !== undefined ? obj.a : obj.alpha;
	if (alpha !== undefined) this.setAlpha(alpha);

	return this;
};

proto.toJSON = function (spaceName) {
	var space = spaces[spaceName || this._space];

	var result = {};

	var values = this.toArray(space.name);

	//go by channels, create properties
	space.channel.forEach(function (channel, i) {
		result[ch(channel)] = values[i];
	});

	if (this._alpha < 1) result.a = this._alpha;

	return result;
};


/** HEX number getter/setter */
proto.fromNumber = function (int, space) {
	var values = pad(int.toString(16), 6, 0).split(/(..)/).filter(Boolean);
	return this.fromArray(values, space);
};

proto.toNumber = function (space) {
	var values = this.toArray(space);
	return (values[0] << 16) | (values[1] << 8) | values[2];
};


/**
 * Universal component setter and getter
 *
 * @param {string} component Whether space or channel identifier
 * @param {number|array|object|string} value A value for the component
 */
proto.set = function (component, value) {
	xxx;
};

proto.get = function (component) {
	xxx;
};


/**
 * Current space values
 */
proto.values = function () {
	if (arguments.length) return this.setValues.apply(this, arguments);
	return this.getValues.apply(this, arguments);
};

/**
 * Return values array for a passed space
 * Or for current space
 *
 * @param {string} space A space to calculate values for
 *
 * @return {Array} List of values
 */
proto.getValues = function (space) {
	return this.toArray(space);
};

/**
 * Set values for a space passed
 *
 * @param {Array} values List of values to set
 * @param {string} spaceName Space indicator
 */
proto.setValues = proto.parse;


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
proto.getChannel = function (space, idx) {
	this.setSpace(space);
	return this._values[idx];
};

/** Set current channel value */
proto.setChannel = function (space, idx, value) {
	this.setSpace(space);
	this._values[idx] = cap(value, space, idx);
	this._xyz = spaces[space].xyz(this._values);
	return this;
};


/** Define named set of methods for a space */
proto.defineSpace = function (name, space) {
	var setName = 'set' + capfirst(name);
	var getName = 'get' + capfirst(name);

	//create precisions
	space.precision = space.channel.map(function (ch, idx) {
		return Math.abs(space.max[idx] - space.min[idx]) > 1 ? 1 : 0.01;
	});

	// .rgb()
	proto[name] = function () {
		if (arguments.length) {
			return this[setName].apply(this, arguments);
		} else {
			return this[getName]();
		}
	};

	// .setRgb()
	proto[setName] = function (values) {
		if (arguments.length > 1) return this.setValues(slice(arguments), name);
		return this.setValues(values, name);
	};
	// .getRgb()
	proto[getName] = function () {
		return this.toJSON(name);
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

	// .rgbNumber()
	proto[name + 'Number'] = function (values) {
		if (arguments.length) return this.fromNumber(values);
		return this.toNumber(name);
	};

	// .red(), .green(), .blue()
	space.channel.forEach(function (cname, cidx) {
		if (proto[cname]) return;
		proto[cname] = function (value) {
			if (arguments.length) {
				return this.setChannel(name, cidx, value);
			}
			else {
				return round(this.getChannel(name, cidx), space.precision[cidx]);
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
proto.alpha = function (value) {
	if (arguments.length) return this.setAlpha(value);
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
proto.hexString = function (str) {
	if (arguments.length) {
		return this.fromString(str, 'hex');
	}
	else {
		return this.toString('hex').toUpperCase();
	}
};

/** Percent string formatter */
proto.percentString = function (str) {
	if (arguments.length) {
		return this.fromString(str, 'percent');
	}
	else {
		return this.toString('percent');
	}
};


/** Keyword setter/getter */
proto.keyword = function (str) {
	if (arguments.length) {
		return this.fromString(str, 'keyword');
	}
	else {
		return this.toString('keyword');
	}
};

/** Clone instance */
proto.clone = function () {
	return (new Color()).fromArray(this._values, this._space);
};


//gray
//toFilter
//isValid
//getFormat
//random
// ie-hex-str($color)
//is(otherColor)


/** Get short channel name */
function ch (name, obj) {
	return name === 'black' ? 'k' : name[0];
}

/**
 * Cap channel value.
 * Note that cap should not round.
 *
 * @param {number} value A value to store
 * @param {string} spaceName Space name take as a basis
 * @param {int} idx Channel index
 *
 * @return {number} Capped value
 */
function cap(value, spaceName, idx) {
	var space = spaces[spaceName];
	if (space.channel[idx] === 'hue') {
		return loop(value, space.min[idx], space.max[idx]);
	} else {
		return between(value, space.min[idx], space.max[idx]);
	}
}


/**
 * Manipulation methods.
 */
// Object.keys(manipulate).forEach(function (name) {
// 	proto[name] = function () {
// 		return manipulate[name].apply(this.rgbArray(), arguments);
// 	};
// });
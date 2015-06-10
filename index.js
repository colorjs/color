/**
 * Full-featured color class.
 *
 * @module  color
 */


var Color = require('./color');


module.exports = Color;


//TODO: merge actualizeSpace with setSpace
//TODO: replace manual methods with method constructor
//TODO: extend with additional space conversions
//TODO: keep loselessly last two spaces, or one
//TODO: move out color operations, leave truly minimal barebones
//TODO: add performance tests referenced in harthur/color #43 ↓
//There's the time it takes to instantiate a new Color object, the time it takes to set the values, the time it takes to get the values for the space specified, and the time to get the values for a space other than the one it's specified in.

//TODO: ie8 tests on defineProperty




/**
 * Spaces API
 * based on color-space module
 */
// Object.keys(spaces).forEach(function (name) {
	//.rgb
	// proto[space.name] = function () {

	// };

	//.setRgb()
	//.getRgb()

	//.rgbString()

	//.rgbArray()

	//.red(), .green(), .blue()
// });


//alpha
//keyword
//hex
//gray
//toFilter
//isValid
//getFormat
//random
// ie-hex-str($color)


/**
 * Manipulation methods.
 */
// Object.keys(manipulate).forEach(function (name) {
// 	proto[name] = function () {
// 		return manipulate[name].apply(this.rgbArray(), arguments);
// 	};
// });

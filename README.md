# color [![Build Status](https://travis-ci.org/dfcreative/color.svg?branch=master)](https://travis-ci.org/dfcreative/color) [![Code Climate](https://codeclimate.com/github/dfcreative/color/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/color)

A stateful implementation of [color](http://npmjs.org/package/color).

Basically:

* [new color spaces](http://github.com/dfcreative/color-space)
* [new manipulation & measurement functions](http://github.com/dfcreative/color-manipulate)
* [better parsing of input values](http://github.com/dfcreative/color-parse)
* [increased performance](TODO: tests link)
* [normalized API](#API)


## Usage

```bash
npm install color2
```

```javascript
var Color = require('color2');

var color = new Color("#7743CE");

color.alpha(0.5).lighten(0.5);

console.log(color.hslString());  // "hsla(262, 59%, 81%, 0.5)"
```

## API

API is fully compatible with [color](http://github.com/harthur/color#API).

### Setters

### Getters

### Measures

### Manipulations




## Why not [color](https://github.com/harthur/color)?
//TODO: remove this

_Color_ is great for basic color manipulations, but in practice it might be confusing.

* `new Color([0,10,20])` - a natural way to create color from rgb array is not supported.
* `.setSpace()` with no arguments is factually a `.getSpace()`.
* `.setChannel()` with no arguments is factually a `.getChannel()`, but there’s no `.getChannel()` method.
* `.rgb()` can both get and set, but `.rgbArray()` can only get.
* `.rgbString()` - the same as `.rgbArray()`.
* `.mix()` cannot mix in HSL or any other space but rgb, so mixed colors may look unnatural.
* No `.toString`, `.fromString` methods.
* No `.toJSON`, `.fromJSON` methods.
* No `.toArray`, `.fromArray` methods.
* No `Color.parse` and `Color.stringify` methods.
* Quite slow `.clone()`.
* Limited set of spaces.
* Slow due to expensive operations. _Color_ recalculates the whole cache of spaces each time value is updated. Meantime, the common practice for color space conversions is to use XYZ as a basis, so for the most part it is enough to store only rgb/xyz caches.


[![NPM](https://nodei.co/npm/color2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/color2/)
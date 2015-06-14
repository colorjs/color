# Color [![Build Status](https://travis-ci.org/dfcreative/color.svg?branch=master)](https://travis-ci.org/dfcreative/color) [![Code Climate](https://codeclimate.com/github/dfcreative/color/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/color) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A stateful implementation of [harthur/color](http://github.com/harthur/color):

* additional [color spaces](http://github.com/dfcreative/color-space)
* new [manipulation functions](http://github.com/dfcreative/color-manipulate)
* new [measurement functions](http://github.com/dfcreative/color-manipulate)
* [parsing of input values](http://github.com/dfcreative/color-parse)
* optimized [performance](http://TODOtests)
* normalized [API](#API).


## Usage

```bash
npm install color2
```

```javascript
var Color = require('color2');

var color = new Color("#7743CE");
color.alpha(0.5).lighten(0.5);
color.hslString();  // "hsla(262, 59%, 81%, 0.5)"
```

## API

API is compatible with [harthur/color](http://github.com/harthur/color).

### Setters

```js
var color = Color([10, 20, 30, .6]);
var color = Color('rgba(10, 20, 30, .8)');
var color = Color().rgb([10, 20, 30]);
var color = Color().rgb(10, 20, 30);
var color = Color().rgb({r: 10, g: 20, b: 30});
var color = Color().rgb(0xAAFFDD);
```

Pass into `Color()` any CSS color string, array, number or a hash of values. Also load in color values with `rgb()`, `hsl()`, `hsv()`, `hwb()`, `cmyk()`, `lab()`, [etc](http://npmjs.org/package/color-space).

```js
color.alpha(0.5);
```

Set the values for individual channels with `alpha`, `red`, `green`, `blue`, `hue`, `saturation` (hsl), `saturationv` (hsv), `lightness`, `whiteness`, `blackness`, `cyan`, `magenta`, `yellow`, `black`.


### Getters

```js
color.rgb();		// {r: 10, g:20, b:30}
color.rgbArray();	// [10, 20, 30]
color.rgbString();	// `rgba(10, 20, 30, .6)`
color.red();		// 10
```

### color.toString(space?)

Set color from the `string` or transform to string.
Parsing is provided by [color-parse](http://npmjs.org/package/color-parse).
Serializing is provided by [color-stringify](http://npmjs.org/package/color-stringify).

```js
var color = Color();
color.fromString('hwb(380deg, 40.1%, -12.5%, .5)').toString(); //hwb(20, 40%, 0%, 0.5)
```

### color.toArray(space?)

Set color from the list of values. If `space` is undefined, it is taken as current space.

```js
var color = Color();
color.fromArray([10, 30, 25], 'rgb').toArray('hsl'); //[165, 50, 8]
```

### color.toJSON(space?)

Set color from an `object`. If `space` is undefined, it will be detected from the passed object.

```js
var color = Color();
color.fromJSON({r: 10, g: 30, b:25, a: 0.5}).hslString('hsl'); //hsla(165, 50%, 8%, 0.5)
```

### color.toNumber(space?)

Get/set values from the integer.


### color.values(argument, space?)
### color.getValues(space?)

Get/set current space values.

```js
```

### color.space()
### color.getSpace()
### color.setSpace(space, values?)

Get/set current color space.

```js
```

### color.channel()
### color.getChannel(space, idx)

Get/set space channel defined by index starting with `0`.

```js
Color('hsl(red, 10%, 10%)').setChannel('hsl', 0, 40).toString(); //hsl(40, 10%, 10%)
```

### color.channel()
### color.getAlpha()
### color.setAlpha(value)

Get/set alpha.

```js
Color('rgb(0, 0, 0)').alpha(0.4).rgbString(); //rgba(0, 0, 0, 0.4)
```

### color.<space>()
### color.get<space>()
### color.set<space>()
### color.<space>Array()
### color.<space>String()
### color.<space>Number()
### color.<channel>()

Color exposes methods for each space provided by [color-space](http://npmjs.org/package/color-space) package: `rgb`, `hsl`, `hsv`, `hwb`, `cmyk`, `cmy`, `xyz`, `xyy`, `lab`, `lch`, `luv`, `lchuv`, `husl`, `huslp`, `labh`, `lms`, `yuv`, `yiq`, `cubehelix`, `gray`.

```js
var color = Color('rgb(120,120,120)');

```

### color.hexString()
### color.percentString()
### color.keyword()

### color.clone()

Return a new color instance the clone of the current one.

### Color.parse(argument, space?)
### Color.stringify(color, space?)

Static methods providing JSON-like API to parse or stringify color object.


### color.<manipulation>()
### color.<measure>()

Color provides all the manipulations from the [color-manipulate](http://npmjs.org/package/color-manipulate) package.

Example:

```js
var color = new Color('gray');
color.lighten(0.2).saturate(0.5);
color.luminance(); //1.123
```


## Contribute

The goal of the project is to provide fast and extensible color class with intuitive API. Please make sure your issue does not belong to a subpackage: [color-stringify](http://github.com/dfcreative/color-stringify), [color-parse](http://github.com/dfcreative/color-parse), [color-manipulate](http://github.com/dfcreative/color-manipulate), [color-blend](http://github.com/dfcreative/color-blend), [color-measure](http://github.com/dfcreative/color-measure), and only then [contribute](https://github.com/dfcreative/color/issues/new/).


[![NPM](https://nodei.co/npm/color2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/color2/)
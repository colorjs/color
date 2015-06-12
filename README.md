# Color [![Build Status](https://travis-ci.org/dfcreative/color.svg?branch=master)](https://travis-ci.org/dfcreative/color) [![Code Climate](https://codeclimate.com/github/dfcreative/color/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/color) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A stateful implementation of [harthur/color](http://github.com/harthur/color):

* new [color spaces](http://github.com/dfcreative/color-space)
* new [manipulation & measurement functions](http://github.com/dfcreative/color-manipulate)
* better [parsing of input values](http://github.com/dfcreative/color-parse)
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

API is compatible as much as possible with [harthur/color](http://github.com/harthur/color).

### new Color(argument, space?)

Create a color instance from any `argument`: a string, an array, an object, a number or other a color instance. An optional `space` string can be passed to specify parsing target.

```js
var color = new Color('red');
color.red(); //255
```

### color.parse(argument, space?)

Set current color from the `argument`, which can be anything. Pass an optional `space` string to specify parsing.

```js
var color = new Color();
color.parse('red');
color.red(); //255
```

### color.fromString(string)
### color.toString(space?)

Set color from the `string` or transform to string.
Parsing is provided by [color-parse](http://npmjs.org/package/color-parse).
Serializing is provided by [color-stringify](http://npmjs.org/package/color-stringify).

```js
var color = Color();
color.fromString('hwb(380deg, 40.1%, -12.5%, .5)').toString(); //hwb(20, 40%, 0%, 0.5)
```

### color.fromArray(values, space?)
### color.toArray(space?)

Set color from the list of values. If `space` is undefined, it is taken as current space.

```js
var color = Color();
color.fromArray([10, 30, 25], 'rgb').toArray('hsl'); //[165, 50, 8]
```

### color.fromJSON(object, space?)
### color.toJSON(space?)

Set color from an `object`. If `space` is undefined, it will be detected from the passed object.

```js
var color = Color();
color.fromJSON({r: 10, g: 30, b:25, a: 0.5}).hslString('hsl'); //hsla(165, 50%, 8%, 0.5)
```

### color.fromNumber(number)
### color.toNumber(space?)

Get/set values from the integer.

### color.get(component)
### color.set(component, values)

Get/set any component values.

### color.values(argument, space?)
### color.getValues(space?)
### color.setValues(values, space?)

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
### color.setChannel(space, idx, value)

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

The goal of the project is to provide fast and extensible color class with intuitive API. Please make sure your issue does not belong to the one of the subpackages: [color-stringify](), [color-manipulate](), [color-parse](), and then [contribute](https://github.com/dfcreative/color/issues/new/).


[![NPM](https://nodei.co/npm/color2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/color2/)
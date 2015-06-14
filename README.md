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

Pass into `Color()` any CSS color string, array, number or a hash of values. Also load in color values with `rgb()`, `hsl()`, `hsv()`, `hwb()`, `cmyk()`, `xyz()`, `lab()`, `lch()`, `huslp()`, [etc](http://npmjs.org/package/color-space).

```js
color.alpha(0.5);
```

Set the value for individual channel: `alpha`, `red`, `green`, `blue`, `hue`, `saturation` (hsl), `saturationv` (hsv), `lightness`, `whiteness`, `blackness`, `cyan`, `magenta`, `yellow` or `black`.


### Getters

```js
color.rgb();		// {r: 10, g:20, b:30}
color.rgbArray();	// [10, 20, 30]
color.rgbString();	// `rgba(10, 20, 30, .6)`
color.red();		// 10
```

Get a hash, array or string for `rgb`, `hsl`, `hsv`, `cmyk`, [etc](http://npmjs.org/package/color-space). Also get the value for individual channel.


### Manipulations

```js
color.negate();					// rgb(0, 100, 255) -> rgb(255, 155, 0)

color.lighten(0.5);				// hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
color.darken(0.5);				// hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)

color.saturate(0.5);			// hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
color.desaturate(0.5);			// hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
color.greyscale();				// #5CBF54 -> #969696

color.whiten(0.5);				// hwb(100, 50%, 50%) -> hwb(100, 75%, 50%)
color.blacken(0.5);				// hwb(100, 50%, 50%) -> hwb(100, 50%, 75%)

color.clearer(0.5);				// rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
color.opaquer(0.5);				// rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1.0)

color.rotate(180);				// hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)
color.rotate(-90);				// hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)

color.mix(Color("yellow"));		// cyan -> rgb(128, 255, 128)
color.mix(Color("yellow"), 0.3);// cyan -> rgb(77, 255, 179)

// chaining
color.green(100).greyscale().lighten(0.6)
```

All the manipulations from [color-manipulate](http://npmjs.org/package/color-manipulate) package.


### Utils

```js
//Universal parser
color.parse('hwb(380deg, 40.1%, -12.5%, .5)');

//Typed parsing/serializing
color.fromString('rgb(10, 20, 30)');
color.toString('hwb');

color.fromArray([10, 20, 30], 'rgb');
color.toArray('rgb');

color.fromJSON({red: 10, green: 20, blue: 30});
color.toJSON();

color.fromNumber(0xAABBCC, 'rgb');
color.toNumber();

//JSON-like API
Color.parse('rgb(10, 20, 30)');
Color.stringify(color);

//State API
color.setValues([10, 20, 30], 'rgb');
color.getValues('hsl');

color.getSpace();
color.setSpace('rgb');

color.setChannel('lab', 1, 25);
color.getChannel('lab', 1);

//Special formats
color.hexString();		//#AABBCC
color.percentString();	//rgb(10%, 20%, 100%);
color.keyword();		//red

//Return clone
color.clone();
```


## Contribute

The goal of the project is to provide fast and extensible color class with intuitive API. Please make sure your issue does not belong to a subpackage: [color-stringify](http://github.com/dfcreative/color-stringify), [color-parse](http://github.com/dfcreative/color-parse), [color-manipulate](http://github.com/dfcreative/color-manipulate), [color-blend](http://github.com/dfcreative/color-blend), [color-measure](http://github.com/dfcreative/color-measure), and only then [contribute](https://github.com/dfcreative/color/issues/new/).


[![NPM](https://nodei.co/npm/color2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/color2/)
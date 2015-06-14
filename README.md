# Color [![Build Status](https://travis-ci.org/dfcreative/color.svg?branch=master)](https://travis-ci.org/dfcreative/color) [![Code Climate](https://codeclimate.com/github/dfcreative/color/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/color) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A stateful implementation of [harthur/color](http://github.com/harthur/color):

* additional [color spaces](http://github.com/dfcreative/color-space),
* separate [manipulation functions](http://github.com/dfcreative/color-manipulate),
* separate [measurement functions](http://github.com/dfcreative/color-manipulate),
* enhanced [parsing of input values](http://github.com/dfcreative/color-parse),
* optimized [performance](http://TODOtests),
* normalized [API](#api).


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


### Setters

```js
//Initial
var color = Color([10, 20, 30, .6]);
var color = Color('hwb(380deg, 40.1%, -12.5%, .5)');

//Per-space
var color = Color().rgb([10, 20, 30]);
var color = Color().hwb(360, 50, 30);
var color = Color().cmyk({c: 10, m: 20, y: 30, k: 70});
var color = Color().rgb(0xAAFFDD);
var color = Color().hsl('hsla(120, 20, 30, .5)');

//Per-channel
color.alpha(0.5);
color.red(12);
color.lightness(15);

//Typed
color.fromString('rgb(10, 20, 30)');
color.fromArray([10, 20, 30], 'rgb');
color.fromJSON({red: 10, green: 20, blue: 30});
color.fromNumber(0xAABBCC, 'rgb');
```

Spaces and channels taken from [color-space](http://npmjs.org/package/color-space) package: `rgb`, `hsl`, `hsv`, `hwb`, `cmyk`, `lab`, `lch`, `luv`, `husl`, etc.


### Getters

```js
//Per-space
color.rgb();			// {r: 10, g:20, b:30}
color.rgbArray();		// [10, 20, 30]
color.rgbString();		// rgba(10, 20, 30, .6)

//Per-channel
color.alpha();			// 0.5
color.red();			// 10

//Special formats
color.hexString();		//#AABBCC
color.percentString();	//rgb(10%, 20%, 100%);
color.keyword();		//red

//Typed
color.toString('hwb');	//hwb(10, 20%, 30%, 0.6)
color.toArray('rgb');	//[10, 20, 30]
color.toJSON('hsl');	//{h:10, s:20, l:30}
color.toNumber('rgb');	//0xAABBCC
```

Stringify modes are from [color-stringify](http://npmjs.org/package/color-stringify) package: `hex`, `percent`, `keyword`, `rgb`, `hsl`, `hsv`, `hwb`, `cmyk`, etc.


### Manipulations

```js
color.negate();						// rgb(0, 100, 255) → rgb(255, 155, 0)

color.lighten(0.5);					// hsl(100, 50%, 50%) → hsl(100, 50%, 75%)
color.darken(0.5);					// hsl(100, 50%, 50%) → hsl(100, 50%, 25%)

color.saturate(0.5);				// hsl(100, 50%, 50%) → hsl(100, 75%, 50%)
color.desaturate(0.5);				// hsl(100, 50%, 50%) → hsl(100, 25%, 50%)
color.greyscale();					// #5CBF54 → #969696

color.whiten(0.5);					// hwb(100, 50%, 50%) → hwb(100, 75%, 50%)
color.blacken(0.5);					// hwb(100, 50%, 50%) → hwb(100, 50%, 75%)

color.clearer(0.5);					// rgba(10, 10, 10, 0.8) → rgba(10, 10, 10, 0.4)
color.opaquer(0.5);					// rgba(10, 10, 10, 0.8) → rgba(10, 10, 10, 1.0)

color.rotate(180);					// hsl(60, 20%, 20%) → hsl(240, 20%, 20%)
color.rotate(-90);					// hsl(60, 20%, 20%) → hsl(330, 20%, 20%)

color.mix(Color("yellow"));			// cyan → rgb(128, 255, 128)
color.mix(Color("yellow"), 0.3);	// cyan → rgb(77, 255, 179)

// chaining
color.green(100).greyscale().lighten(0.6)
```

Manipulations are done by [color-manipulate](http://npmjs.org/package/color-manipulate) package.


### Utils

```js
//Universal setter
Color().parse('rgb(10, 20, 30)');

//JSON-like API
Color.parse('rgb(10, 20, 30)');
Color.stringify(color);

//Current space API
color.setValues([10, 20, 30]);
color.getValues('hsl');				//[10, 20, 30]

color.getSpace();					//rgb
color.setSpace('rgb');

color.getChannel('red', 1);			//20
color.setChannel('lab', 1, 25);

//Clone
color.clone();
```


## Contribute

The goal of the project is to provide fast and extensible color class with intuitive API. Please make sure your issue does not belong to a subpackage: [color-stringify](http://github.com/dfcreative/color-stringify), [color-parse](http://github.com/dfcreative/color-parse), [color-manipulate](http://github.com/dfcreative/color-manipulate), [color-blend](http://github.com/dfcreative/color-blend), [color-measure](http://github.com/dfcreative/color-measure), and only then [contribute](https://github.com/dfcreative/color/issues/new/).


[![NPM](https://nodei.co/npm/color2.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/color2/)
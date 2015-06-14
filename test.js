var Color = require("./");
var assert = require("assert");

//harthur color
var Color1 = require("color");


describe('Color tests', function () {
	it('Color() instance', function () {
		assert.equal(new Color("red").red(), 255);

		assert.ok((new Color) instanceof Color);
	});

	it('Color() argument', function () {
		assert.deepEqual(Color("#0A1E19").rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color("rgb(10, 30, 25)").rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color("rgba(10, 30, 25, 0.4)").rgb(), {r: 10, g: 30, b: 25, a: 0.4});
		assert.deepEqual(Color("rgb(4%, 12%, 10%)").rgb(), {r: 10, g: 31, b: 26});
		assert.deepEqual(Color("rgba(4%, 12%, 10%, 0.4)").rgb(), {r: 10, g: 31, b: 26, a: 0.4});
		assert.deepEqual(Color("blue").rgb(), {r: 0, g: 0, b: 255});
		assert.deepEqual(Color("hsl(120, 50%, 60%)").hsl(), {h: 120, s: 50, l: 60});
		assert.deepEqual(Color("hsla(120, 50%, 60%, 0.4)").hsl(), {h: 120, s: 50, l: 60, a: 0.4});
		assert.deepEqual(Color("hwb(120, 50%, 60%)").hwb(), {h: 120, w: 50, b: 60});
		assert.deepEqual(Color("hwb(120, 50%, 60%, 0.4)").hwb(), {h: 120, w: 50, b: 60, a: 0.4});

		assert.deepEqual(Color({r: 10, g: 30, b: 25}).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color({h: 10, s: 30, l: 25}).hsl(), {h: 10, s: 30, l: 25});
		assert.deepEqual(Color({h: 10, s: 30, v: 25}).hsv(), {h: 10, s: 30, v: 25});
		assert.deepEqual(Color({h: 10, w: 30, b: 25}).hwb(), {h: 10, w: 30, b: 25});
		assert.deepEqual(Color({c: 10, m: 30, y: 25, k: 10}).cmyk(), {c: 10, m: 30, y: 25, k: 10});

		assert.deepEqual(Color({red: 10, green: 30, blue: 25}).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color({hue: 10, saturation: 30, lightness: 25}).hsl(), {h: 10, s: 30, l: 25});
		assert.deepEqual(Color({hue: 10, saturation: 30, value: 25}).hsv(), {h: 10, s: 30, v: 25});
		assert.deepEqual(Color({hue: 10, whiteness: 30, blackness: 25}).hwb(), {h: 10, w: 30, b: 25});
		assert.deepEqual(Color({cyan: 10, magenta: 30, yellow: 25, black: 10}).cmyk(), {c: 10, m: 30, y: 25, k: 10});
	});

	it('Setters', function () {
		assert.deepEqual(Color().rgb(10, 30, 25).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color().rgb(10, 30, 25, 0.4).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
		assert.deepEqual(Color().rgb([10, 30, 25]).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color().rgb([10, 30, 25, 0.4]).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
		assert.deepEqual(Color().rgb({r: 10, g: 30, b: 25}).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color().rgb({r: 10, g: 30, b: 25, a: 0.4}).rgb(), {r: 10, g: 30, b: 25, a: 0.4});
		assert.deepEqual(Color().rgb({red: 10, green: 30, blue: 25}).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color().rgb({red: 10, green: 30, blue: 25, alpha: 0.4}).rgb(), {r: 10, g: 30, b: 25, a: 0.4});

		assert.deepEqual(Color().hsl([260, 10, 10]).hsl(), {h: 260, s: 10, l: 10});
		assert.deepEqual(Color().hsv([260, 10, 10]).hsv(), {h: 260, s: 10, v: 10});
		assert.deepEqual(Color().hwb([260, 10, 10]).hwb(), {h: 260, w: 10, b: 10});
		assert.deepEqual(Color().cmyk([10, 10, 10, 10]).cmyk(), {c: 10, m: 10, y: 10, k: 10});
	});

	it('Retain alpha', function () {
		assert.equal(Color().rgb([10, 30, 25, 0.4]).rgb([10, 30, 25]).alpha(), 0.4);
	});

	it('Translations', function () {
		assert.deepEqual(Color().rgb(10, 30, 25).rgb(), {r: 10, g: 30, b: 25});
		assert.deepEqual(Color().rgb(10, 30, 25).hsl(), {h: 165, s: 50, l: 8});
		assert.deepEqual(Color().rgb(10, 30, 25).hsv(), {h: 165, s: 67, v: 12});
		assert.deepEqual(Color().rgb(10, 30, 25).hwb(), {h: 165, w: 4, b: 88});
		assert.deepEqual(Color().rgb(10, 30, 25).cmyk(), {c: 67, m: 0, y: 17, k: 88});
	});

	it('Array getters', function () {
		assert.deepEqual(Color({r: 10, g: 20, b: 30}).rgbArray(), [10, 20, 30]);
		assert.deepEqual(Color({h: 10, s: 20, l: 30}).hslArray(), [10, 20, 30]);
		assert.deepEqual(Color({h: 10, s: 20, v: 30}).hsvArray(), [10, 20, 30]);
		assert.deepEqual(Color({h: 10, w: 20, b: 30}).hwbArray(), [10, 20, 30]);
		assert.deepEqual(Color({c: 10, m: 20, y: 30, k: 40}).cmykArray(), [10, 20, 30, 40]);
	});

	it('Multiple times', function () {
		var color = Color({r: 10, g: 20, b: 30});
		assert.deepEqual(color.rgbaArray(), [10, 20, 30, 1]);
		assert.deepEqual(color.rgbaArray(), [10, 20, 30, 1]);
	});

	it('Channel getters/setters', function () {
		assert.equal(Color({r: 10, g: 20, b: 30, a: 0.4}).alpha(), 0.4);
		assert.equal(Color({r: 10, g: 20, b: 30, a: 0.4}).alpha(0.7).alpha(), 0.7);
		assert.equal(Color({r: 10, g: 20, b: 30}).red(), 10);
		assert.equal(Color({r: 10, g: 20, b: 30}).red(100).red(), 100);
		assert.equal(Color({r: 10, g: 20, b: 30}).green(), 20);
		assert.equal(Color({r: 10, g: 20, b: 30}).green(200).green(), 200);
		assert.equal(Color({r: 10, g: 20, b: 30}).blue(), 30);
		assert.equal(Color({r: 10, g: 20, b: 30}).blue(60).blue(), 60);
		assert.equal(Color({h: 10, s: 20, l: 30}).hue(), 10);
		assert.equal(Color({h: 10, s: 20, l: 30}).hue(100).hue(), 100);
		assert.equal(Color({h: 10, w: 20, b: 30}).hue(), 10);
		assert.equal(Color({h: 10, w: 20, b: 30}).hue(100).hue(), 100);
	});

	it('Capping values', function () {
		assert.equal(Color({h: 400, s: 50, l: 10}).hue(), 40);
		assert.equal(Color({h: -400, s: 50, l: 10}).hue(), 320);

		assert.equal(Color({h: 400, w: 50, b: 10}).hue(), 40);
		assert.equal(Color({h: -400, w: 50, b: 10}).hue(), 320);

		assert.equal(Color().red(400).red(), 255);
		assert.equal(Color().red(-400).red(), 0);
		assert.equal(Color().rgb(10, 10, 10, 12).alpha(), 1);
		assert.equal(Color().rgb(10, 10, 10, -200).alpha(), 0);
		assert.equal(Color().alpha(-12).alpha(), 0);
		assert.equal(Color().alpha(3).alpha(), 1);
	});

	it('Translate with channel setters', function () {
		assert.deepEqual(Color({r: 0, g: 0, b: 0}).lightness(50).hsl(), {h: 0, s: 0, l: 50});
		assert.deepEqual(Color({r: 0, g: 0, b: 0}).red(50).green(50).hsv(), {h: 60, s: 100, v: 20});
	});

	it('CSS String getters', function () {
		assert.equal(Color("rgb(10, 30, 25)").hexString(), "#0A1E19")
		assert.equal(Color("rgb(10, 30, 25)").rgbString(), "rgb(10, 30, 25)")
		assert.equal(Color("rgb(10, 30, 25, 0.4)").rgbString(), "rgba(10, 30, 25, 0.4)")
		assert.equal(Color("rgb(10, 30, 25)").percentString(), "rgb(4%, 12%, 10%)")
		assert.equal(Color("rgba(10, 30, 25, 0.3)").percentString(), "rgba(4%, 12%, 10%, 0.3)")
		assert.equal(Color("rgb(10, 30, 25)").hslString(), "hsl(165, 50%, 8%)")
		assert.equal(Color("rgb(10, 30, 25, 0.3)").hslString(), "hsla(165, 50%, 8%, 0.3)");
		assert.equal(Color({ h : 0, s : 0, v : 100 }).hslString(), "hsl(0, 0%, 100%)");
		assert.equal(Color("rgb(10, 30, 25)").hwbString(), "hwb(165, 4%, 88%)")
		assert.equal(Color("rgb(10, 30, 25, 0.3)").hwbString(), "hwb(165, 4%, 88%, 0.3)")
		assert.equal(Color("rgb(0, 0, 255)").keyword(), "blue")
		assert.strictEqual(Color("rgb(10, 30, 25)").keyword(), undefined);
	});

	it('Number getters', function () {
		assert.equal(Color("rgb(10, 30, 25)").toNumber(), 0xA1E19);
	});

	it('Metrics', function () {
		assert.equal(Color("white").luminosity(), 1);
		assert.equal(Color("black").luminosity(), 0);
		assert.equal(Color("red").luminosity(), 0.2126);
		assert.equal(Color("white").contrast(Color("black")), 21);
		assert.equal(Math.round(Color("white").contrast(Color("red"))), 4);
		assert.equal(Math.round(Color("red").contrast(Color("white"))), 4);
		assert.equal(Color("blue").contrast(Color("blue")), 1);
		assert.ok(Color("black").dark());
		assert.ok(!Color("black").light());
		assert.ok(Color("white").light());
		assert.ok(!Color("white").dark());
		assert.ok(Color("blue").dark());
		assert.ok(Color("darkgreen").dark());
		assert.ok(Color("pink").light());
		assert.ok(Color("goldenrod").light());
		assert.ok(Color("red").dark());

		assert.equal(Color("white").level(Color("black")), "AAA");
		assert.equal(Color("grey").level(Color("black")), "AA");
	});

	it('Manipulations', function () {
		assert.equal(Color({h: 100, s: 50, l: 80}).lighten(0.5).lightness(), 100);
		assert.equal(Color({h: 100, w: 50, b: 80}).blacken(0.5).blackness(), 100);
		assert.deepEqual(Color({r: 67, g: 122, b: 134}).greyscale().rgb(), {r: 111, g: 111, b: 111});
		assert.deepEqual(Color({r: 67, g: 122, b: 134}).negate().rgb(), {r: 188, g: 133, b: 121});
		assert.equal(Color({h: 100, s: 50, l: 60}).lighten(0.5).lightness(), 90);
		assert.equal(Color({h: 100, s: 50, l: 60}).darken(0.5).lightness(), 30);
		assert.equal(Color({h: 100, w: 50, b: 60}).whiten(0.5).whiteness(), 75);
		assert.equal(Color({h: 100, w: 50, b: 60}).blacken(0.5).blackness(), 90);
		assert.equal(Color({h: 100, s: 40, l: 50}).saturate(0.5).saturation(), 60);
		assert.equal(Color({h: 100, s: 80, l: 60}).desaturate(0.5).saturation(), 40);
		assert.equal(Color({r: 10, g: 10, b: 10, a: 0.8}).clearer(0.5).alpha(), 0.4);
		assert.equal(Color({r: 10, g: 10, b: 10, a: 0.5}).opaquer(0.5).alpha(), 0.75);
		assert.equal(Color({h: 60, s: 0, l: 0}).rotate(180).hue(), 240);
		assert.equal(Color({h: 60, s: 0, l: 0}).rotate(-180).hue(), 240);

		assert.deepEqual(Color("yellow").mix(Color("cyan")).rgbArray(), [128, 255, 128]);
		assert.deepEqual(Color("yellow").mix(Color("grey")).rgbArray(), [192, 192, 64]);
		assert.deepEqual(Color("yellow").mix(Color("grey"), 1).rgbArray(), [128, 128, 128]);
		assert.deepEqual(Color("yellow").mix(Color("grey"), 0.8).rgbArray(), [153, 153, 102]);
		assert.deepEqual(Color("yellow").mix(Color("grey").alpha(0.5)).rgbaArray(), [223, 223, 32, 0.75]);
		//TODO: add space-dependent mix
		// assert.deepEqual(Color('red').mix(Color('red').hue(360), .5, 'hsl').hslArray(), [180, 100, 50]);
	});

	it('Clone', function () {
		var c = Color({r: 10, g: 20, b: 30});
		assert.deepEqual(c.rgbaArray(), [10, 20, 30, 1]);
		assert.deepEqual(c.clone().rgb(50, 40, 30).rgbaArray(), [50, 40, 30, 1]);
		assert.deepEqual(c.clone().rgbaArray(), [10, 20, 30, 1]);
		assert.deepEqual(c.rgbaArray(), [10, 20, 30, 1]);
	});

	it('Immutability', function () {
		var c = Color([10, 20, 30]);
		var arr = c.rgbArray();
		arr.push(255);
		assert.deepEqual(c.rgbaArray(), [10, 20, 30, 1]);
	});

	it('Exceptions', function () {
		assert.throws(function () {
		  Color("unknow");
		});

		assert.throws(function () {
		  Color({});
		});
	});

});


describe('Comparison', function () {
	describe('Performance', function () {
		it('Color', function () {
			var color = new Color1('red');

			for (var x = 0, end = 2e4; x < end; x++){
				color.lightness(100 * x / end);
				color.hue(100 * x / end);
				color.red();
				color.green();
				color.blue();
			}
		});
		it('Color2', function () {
			var color = new Color('red');

			for (var x = 0, end = 2e4; x < end; x++){
				color.lightness(100 * x / end);
				color.hue(100 * x / end);
				color.red();
				color.green();
				color.blue();
			}
		});
	});


	describe('Back and forth conversion', function () {
		it('Color', function () {
			var c = Color1("rgb(10, 100, 60)");
			c.hslArray();
			c.hue();
			c.hue();
			assert.deepEqual(c.rgbArray(), [10, 100, 60]);
		});
		it('Color2', function () {
			var c = Color("rgb(10, 100, 60)");
			c.hslArray();
			c.hue();
			c.hue();
			assert.deepEqual(c.rgbArray(), [10, 100, 60]);
		});
	});

});


describe('Color2 tests', function () {
	it('supernatural parsing', function () {
		assert.deepEqual(Color('hwb(380deg, 40.1%, -12.5%, .5)').toString(), 'hwb(20, 40%, 0%, 0.5)');
	});

	it.skip('fromNumber', function () {
		assert.deepEqual(Color().fromNumber(123).rgbArray(), []);
		assert.deepEqual(Color().fromNumber(123, 'hsl').hslArray(), []);
	});

	it.skip('gray space', function () {
		Color(12, 'gray');
		Color(12);
	});

	it.skip('getValues');
	it.skip('getChannel', function () {
		//compatible with color

	});
	it.skip('getSpace');
});
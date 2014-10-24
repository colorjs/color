/* MIT license */
var convert = require("color-convert"),
    string = require("color-string");

var Color = function(cssString) {
  if (cssString instanceof Color) return cssString;
  if (! (this instanceof Color)) return new Color(cssString);

   this.values = {
      rgb: [0, 0, 0],
      hsl: [0, 0, 0],
      hsv: [0, 0, 0],
      hwb: [0, 0, 0],
      cmyk: [0, 0, 0, 0],
      alpha: 1
   }

   //keep actual values reference
   this.space = 'rgb';


   // parse Color() argument
   if (typeof cssString == "string") {
      var vals = string.getRgba(cssString);
      if (vals) {
         this.setValues("rgb", vals);
      }
      else if(vals = string.getHsla(cssString)) {
         this.setValues("hsl", vals);
      }
      else if(vals = string.getHwb(cssString)) {
         this.setValues("hwb", vals);
      }
      else {
        throw new Error("Unable to parse color from string \"" + cssString + "\"");
      }
   }
   else if (typeof cssString == "object") {
      var vals = cssString;
      if(vals["r"] !== undefined || vals["red"] !== undefined) {
         this.setValues("rgb", vals)
      }
      else if(vals["l"] !== undefined || vals["lightness"] !== undefined) {
         this.setValues("hsl", vals)
      }
      else if(vals["v"] !== undefined || vals["value"] !== undefined) {
         this.setValues("hsv", vals)
      }
      else if(vals["w"] !== undefined || vals["whiteness"] !== undefined) {
         this.setValues("hwb", vals)
      }
      else if(vals["c"] !== undefined || vals["cyan"] !== undefined) {
         this.setValues("cmyk", vals)
      }
      else {
        throw new Error("Unable to parse color from object " + JSON.stringify(cssString));
      }
   }
};

Color.prototype = {
   rgb: function (vals) {
      return this.setSpace("rgb", arguments);
   },
   hsl: function(vals) {
      return this.setSpace("hsl", arguments);
   },
   hsv: function(vals) {
      return this.setSpace("hsv", arguments);
   },
   hwb: function(vals) {
      return this.setSpace("hwb", arguments);
   },
   cmyk: function(vals) {
      return this.setSpace("cmyk", arguments);
   },

   rgbArray: function() {
      this.actualizeSpace('rgb');
      return this.values.rgb;
   },
   hslArray: function() {
      this.actualizeSpace('hsl');
      return this.values.hsl;
   },
   hsvArray: function() {
      this.actualizeSpace('hsv');
      return this.values.hsv;
   },
   hwbArray: function() {
      this.actualizeSpace('hwb');
      if (this.values.alpha !== 1) {
        return this.values.hwb.concat([this.values.alpha])
      }
      return this.values.hwb;
   },
   cmykArray: function() {
      this.actualizeSpace('cmyk');
      return this.values.cmyk;
   },
   rgbaArray: function() {
      this.actualizeSpace('rgb');
      var rgb = this.values.rgb;
      return rgb.concat([this.values.alpha]);
   },
   hslaArray: function() {
      this.actualizeSpace('hsl');
      var hsl = this.values.hsl;
      return hsl.concat([this.values.alpha]);
   },
   alpha: function(val) {
      if (val === undefined) {
         return this.values.alpha;
      }
      this.setValues("alpha", val);
      return this;
   },

   red: function(val) {
      this.actualizeSpace('rgb');
      return this.setChannel("rgb", 0, val);
   },
   green: function(val) {
      this.actualizeSpace('rgb');
      return this.setChannel("rgb", 1, val);
   },
   blue: function(val) {
      this.actualizeSpace('rgb');
      return this.setChannel("rgb", 2, val);
   },
   hue: function(val) {
      this.actualizeSpace('hsl');
      return this.setChannel("hsl", 0, val);
   },
   saturation: function(val) {
      this.actualizeSpace('hsl');
      return this.setChannel("hsl", 1, val);
   },
   lightness: function(val) {
      this.actualizeSpace('hsl');
      return this.setChannel("hsl", 2, val);
   },
   saturationv: function(val) {
      this.actualizeSpace('hsv');
      return this.setChannel("hsv", 1, val);
   },
   whiteness: function(val) {
      this.actualizeSpace('hwb');
      return this.setChannel("hwb", 1, val);
   },
   blackness: function(val) {
      this.actualizeSpace('hwb');
      return this.setChannel("hwb", 2, val);
   },
   value: function(val) {
      this.actualizeSpace('hsv');
      return this.setChannel("hsv", 2, val);
   },
   cyan: function(val) {
      this.actualizeSpace('cmyk');
      return this.setChannel("cmyk", 0, val);
   },
   magenta: function(val) {
      this.actualizeSpace('cmyk');
      return this.setChannel("cmyk", 1, val);
   },
   yellow: function(val) {
      this.actualizeSpace('cmyk');
      return this.setChannel("cmyk", 2, val);
   },
   black: function(val) {
      this.actualizeSpace('cmyk');
      return this.setChannel("cmyk", 3, val);
   },

   hexString: function() {
      this.actualizeSpace('rgb');
      return string.hexString(this.values.rgb);
   },
   rgbString: function() {
      this.actualizeSpace('rgb');
      return string.rgbString(this.values.rgb, this.values.alpha);
   },
   rgbaString: function() {
      this.actualizeSpace('rgb');
      return string.rgbaString(this.values.rgb, this.values.alpha);
   },
   percentString: function() {
      this.actualizeSpace('rgb');
      return string.percentString(this.values.rgb, this.values.alpha);
   },
   hslString: function() {
      this.actualizeSpace('hsl');
      return string.hslString(this.values.hsl, this.values.alpha);
   },
   hslaString: function() {
      this.actualizeSpace('hsl');
      return string.hslaString(this.values.hsl, this.values.alpha);
   },
   hwbString: function() {
      this.actualizeSpace('hwb');
      return string.hwbString(this.values.hwb, this.values.alpha);
   },

   /** Get actual space string representation */
   toString: function(){
      var strMethod = this[this.space + 'String'];
      if (strMethod) {
         return strMethod.call(this, this.values[this.space], this.values.alpha);
      }
      return this.rgbString();
   },

   keyword: function() {
      this.actualizeSpace('rgb');
      return string.keyword(this.values.rgb, this.values.alpha);
   },

   rgbNumber: function() {
      this.actualizeSpace('rgb');
      return (this.values.rgb[0] << 16) | (this.values.rgb[1] << 8) | this.values.rgb[2];
   },

   luminosity: function() {
      // http://www.w3.org/TR/WCAG20/#relativeluminancedef
      this.actualizeSpace('rgb');
      var rgb = this.values.rgb;
      var lum = [];
      for (var i = 0; i < rgb.length; i++) {
         var chan = rgb[i] / 255;
         lum[i] = (chan <= 0.03928) ? chan / 12.92
                  : Math.pow(((chan + 0.055) / 1.055), 2.4)
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
   },

   contrast: function(color2) {
      // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();
      if (lum1 > lum2) {
         return (lum1 + 0.05) / (lum2 + 0.05)
      };
      return (lum2 + 0.05) / (lum1 + 0.05);
   },

   level: function(color2) {
     var contrastRatio = this.contrast(color2);
     return (contrastRatio >= 7.1)
       ? 'AAA'
       : (contrastRatio >= 4.5)
        ? 'AA'
        : '';
   },

   dark: function() {
      // YIQ equation from http://24ways.org/2010/calculating-color-contrast
      this.actualizeSpace('rgb');
      var rgb = this.values.rgb,
          yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return yiq < 128;
   },

   light: function() {
      return !this.dark();
   },

   negate: function() {
      this.actualizeSpace('rgb');
      var rgb = [];
      for (var i = 0; i < 3; i++) {
         rgb[i] = 255 - this.values.rgb[i];
      }
      this.setValues("rgb", rgb);
      return this;
   },

   lighten: function(ratio) {
      this.actualizeSpace('hsl');
      this.values.hsl[2] += this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   darken: function(ratio) {
      this.actualizeSpace('hsl');
      this.values.hsl[2] -= this.values.hsl[2] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   saturate: function(ratio) {
      this.actualizeSpace('hsl');
      this.values.hsl[1] += this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   desaturate: function(ratio) {
      this.actualizeSpace('hsl');
      this.values.hsl[1] -= this.values.hsl[1] * ratio;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   whiten: function(ratio) {
      this.actualizeSpace('hwb');
      this.values.hwb[1] += this.values.hwb[1] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
   },

   blacken: function(ratio) {
      this.actualizeSpace('hwb');
      this.values.hwb[2] += this.values.hwb[2] * ratio;
      this.setValues("hwb", this.values.hwb);
      return this;
   },

   greyscale: function() {
      this.actualizeSpace('rgb');
      var rgb = this.values.rgb;
      // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
      var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      this.setValues("rgb", [val, val, val]);
      return this;
   },

   clearer: function(ratio) {
      this.setValues("alpha", this.values.alpha - (this.values.alpha * ratio));
      return this;
   },

   opaquer: function(ratio) {
      this.setValues("alpha", this.values.alpha + (this.values.alpha * ratio));
      return this;
   },

   rotate: function(degrees) {
      this.actualizeSpace('hsl');
      var hue = this.values.hsl[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      this.values.hsl[0] = hue;
      this.setValues("hsl", this.values.hsl);
      return this;
   },

   mix: function(color2, weight, space) {
      space = space || 'rgb';

      this.actualizeSpace(space);

      weight = 1 - (weight == null ? 0.5 : weight);

      // algorithm from Sass's mix(). Ratio of first color in mix is
      // determined by the alphas of both colors and the weight
      var t1 = weight * 2 - 1,
          d = this.alpha() - color2.alpha();

      var weight1 = (((t1 * d == -1) ? t1 : (t1 + d) / (1 + t1 * d)) + 1) / 2;
      var weight2 = 1 - weight1;

      var vals = this.values[space];
      var vals2 = color2.values[space];

      for (var i = 0; i < vals.length; i++) {
         vals[i] = vals[i] * weight1 + vals2[i] * weight2;
      }
      this.setValues(space, vals);

      var alpha = this.alpha() * weight + color2.alpha() * (1 - weight);
      this.setValues("alpha", alpha);

      return this;
   },

   toJSON: function() {
     return this.rgb();
   },

   clone: function() {
     return new Color(this.rgb());
   }
};


Color.prototype.getValues = function(space) {
   this.actualizeSpace(space);

   var vals = {};
   for (var i = 0; i < space.length; i++) {
      vals[space[i]] = this.values[space][i];
   }
   if (this.values.alpha != 1) {
      vals["a"] = this.values.alpha;
   }
   // {r: 255, g: 255, b: 255, a: 0.4}
   return vals;
};


Color.spaces = {
   "rgb": ["red", "green", "blue"],
   "hsl": ["hue", "saturation", "lightness"],
   "hsv": ["hue", "saturation", "value"],
   "hwb": ["hue", "whiteness", "blackness"],
   "cmyk": ["cyan", "magenta", "yellow", "black"]
};

Color.maxes = {
   "rgb": [255, 255, 255],
   "hsl": [360, 100, 100],
   "hsv": [360, 100, 100],
   "hwb": [360, 100, 100],
   "cmyk": [100, 100, 100, 100]
};

Color.prototype.setValues = function(space, vals) {
   var spaces = Color.spaces, maxes = Color.maxes;

   var alpha = 1;
   //actualize target space
   this.actualizeSpace(space);

   if (space == "alpha") {
      alpha = vals;
   }
   else if (vals.length) {
      // [10, 10, 10]
      this.values[space] = vals.slice(0, space.length);
      alpha = vals[space.length];
   }
   else if (vals[space[0]] !== undefined) {
      // {r: 10, g: 10, b: 10}
      for (var i = 0; i < space.length; i++) {
        this.values[space][i] = vals[space[i]];
      }
      alpha = vals.a;
   }
   else if (vals[spaces[space][0]] !== undefined) {
      // {red: 10, green: 10, blue: 10}
      var chans = spaces[space];
      for (var i = 0; i < space.length; i++) {
        this.values[space][i] = vals[chans[i]];
      }
      alpha = vals.alpha;
   }
   this.values.alpha = Math.max(0, Math.min(1, (alpha !== undefined ? alpha : this.values.alpha) ));
   if (space == "alpha") {
      return;
   }

   // cap values
   for (var i = 0, capped; i < space.length; i++) {
      capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
      this.values[space][i] = Math.round(capped);
   }

   return true;
};


/** Update values for the space passed */
Color.prototype.actualizeSpace = function(space){
   var currSpace = this.space;

   //space is already actual
   if (currSpace === space) return this;
   if (space === 'alpha') return this;

   var maxes = Color.maxes;

   // cap values of the space prior converting all values
   for (var i = 0; i < space.length; i++) {
      var capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
      this.values[space][i] = Math.round(capped);
   }

   //calc new space values
   this.values[space] = convert[currSpace][space](this.values[currSpace]);

   //save last actual space
   this.space = space;

   return this;
};


Color.prototype.setSpace = function(space, args) {
   this.actualizeSpace(space);
   var vals = args[0];
   if (vals === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof vals == "number") {
      vals = Array.prototype.slice.call(args);
   }
   this.setValues(space, vals);
   return this;
};

Color.prototype.setChannel = function(space, index, val) {
   this.actualizeSpace(space);
   if (val === undefined) {
      // color.red()
      return this.values[space][index];
   }
   // color.red(100)
   this.values[space][index] = val;
   this.setValues(space, this.values[space]);
   return this;
};

module.exports = Color;

// tween.js - http://github.com/sole/tween.js

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      }
      ;

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      }
      ;
}());

'use strict';
void 0 === Date.now && (Date.now = function() {
  return (new Date).valueOf()
}
);
var TWEEN = TWEEN || function() {
  var a = [];
  return {
      REVISION: "12",
      getAll: function() {
          return a
      },
      removeAll: function() {
          a = []
      },
      add: function(c) {
          a.push(c)
      },
      remove: function(c) {
          c = a.indexOf(c);
          -1 !== c && a.splice(c, 1)
      },
      update: function(c) {
          if (0 === a.length)
              return !1;
          for (var b = 0, c = void 0 !== c ? c : "undefined" !== typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); b < a.length; )
              a[b].update(c) ? b++ : a.splice(b, 1);
          return !0
      }
  }
}();
TWEEN.Tween = function(a) {
  var c = {}, b = {}, d = {}, e = 1E3, g = 0, h = !1, j = !1, q = 0, m = null, v = TWEEN.Easing.Linear.None, w = TWEEN.Interpolation.Linear, n = [], r = null, s = !1, t = null, u = null, k;
  for (k in a)
      c[k] = parseFloat(a[k], 10);
  this.to = function(a, c) {
      void 0 !== c && (e = c);
      b = a;
      return this
  }
  ;
  this.start = function(e) {
      TWEEN.add(this);
      j = !0;
      s = !1;
      m = void 0 !== e ? e : "undefined" !== typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
      m += q;
      for (var f in b) {
          if (b[f]instanceof Array) {
              if (0 === b[f].length)
                  continue;
              b[f] = [a[f]].concat(b[f])
          }
          c[f] = a[f];
          !1 === c[f]instanceof Array && (c[f] *= 1);
          d[f] = c[f] || 0
      }
      return this
  }
  ;
  this.stop = function() {
      if (!j)
          return this;
      TWEEN.remove(this);
      j = !1;
      this.stopChainedTweens();
      return this
  }
  ;
  this.stopChainedTweens = function() {
      for (var a = 0, b = n.length; a < b; a++)
          n[a].stop()
  }
  ;
  this.delay = function(a) {
      q = a;
      return this
  }
  ;
  this.repeat = function(a) {
      g = a;
      return this
  }
  ;
  this.yoyo = function(a) {
      h = a;
      return this
  }
  ;
  this.easing = function(a) {
      v = a;
      return this
  }
  ;
  this.interpolation = function(a) {
      w = a;
      return this
  }
  ;
  this.chain = function() {
      n = arguments;
      return this
  }
  ;
  this.onStart = function(a) {
      r = a;
      return this
  }
  ;
  this.onUpdate = function(a) {
      t = a;
      return this
  }
  ;
  this.onComplete = function(a) {
      u = a;
      return this
  }
  ;
  this.update = function(p) {
      var f;
      if (p < m)
          return !0;
      !1 === s && (null !== r && r.call(a),
      s = !0);
      var i = (p - m) / e
        , i = 1 < i ? 1 : i
        , j = v(i);
      for (f in b) {
          var k = c[f] || 0
            , l = b[f];
          l instanceof Array ? a[f] = w(l, j) : ("string" === typeof l && (l = k + parseFloat(l, 10)),
          "number" === typeof l && (a[f] = k + (l - k) * j))
      }
      null !== t && t.call(a, j);
      if (1 == i)
          if (0 < g) {
              isFinite(g) && g--;
              for (f in d)
                  "string" === typeof b[f] && (d[f] += parseFloat(b[f], 10)),
                  h && (i = d[f],
                  d[f] = b[f],
                  b[f] = i),
                  c[f] = d[f];
              m = p + q
          } else {
              null !== u && u.call(a);
              f = 0;
              for (i = n.length; f < i; f++)
                  n[f].start(p);
              return !1
          }
      return !0
  }
}
;
TWEEN.Easing = {
  Linear: {
      None: function(a) {
          return a
      }
  },
  Quadratic: {
      In: function(a) {
          return a * a
      },
      Out: function(a) {
          return a * (2 - a)
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
      }
  },
  Cubic: {
      In: function(a) {
          return a * a * a
      },
      Out: function(a) {
          return --a * a * a + 1
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2)
      }
  },
  Quartic: {
      In: function(a) {
          return a * a * a * a
      },
      Out: function(a) {
          return 1 - --a * a * a * a
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? 0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
      }
  },
  Quintic: {
      In: function(a) {
          return a * a * a * a * a
      },
      Out: function(a) {
          return --a * a * a * a * a + 1
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2)
      }
  },
  Sinusoidal: {
      In: function(a) {
          return 1 - Math.cos(a * Math.PI / 2)
      },
      Out: function(a) {
          return Math.sin(a * Math.PI / 2)
      },
      InOut: function(a) {
          return 0.5 * (1 - Math.cos(Math.PI * a))
      }
  },
  Exponential: {
      In: function(a) {
          return 0 === a ? 0 : Math.pow(1024, a - 1)
      },
      Out: function(a) {
          return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
      },
      InOut: function(a) {
          return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? 0.5 * Math.pow(1024, a - 1) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2)
      }
  },
  Circular: {
      In: function(a) {
          return 1 - Math.sqrt(1 - a * a)
      },
      Out: function(a) {
          return Math.sqrt(1 - --a * a)
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
      }
  },
  Elastic: {
      In: function(a) {
          var c, b = 0.1;
          if (0 === a)
              return 0;
          if (1 === a)
              return 1;
          !b || 1 > b ? (b = 1,
          c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
          return -(b * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4))
      },
      Out: function(a) {
          var c, b = 0.1;
          if (0 === a)
              return 0;
          if (1 === a)
              return 1;
          !b || 1 > b ? (b = 1,
          c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
          return b * Math.pow(2, -10 * a) * Math.sin((a - c) * 2 * Math.PI / 0.4) + 1
      },
      InOut: function(a) {
          var c, b = 0.1;
          if (0 === a)
              return 0;
          if (1 === a)
              return 1;
          !b || 1 > b ? (b = 1,
          c = 0.1) : c = 0.4 * Math.asin(1 / b) / (2 * Math.PI);
          return 1 > (a *= 2) ? -0.5 * b * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4) : 0.5 * b * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - c) * 2 * Math.PI / 0.4) + 1
      }
  },
  Back: {
      In: function(a) {
          return a * a * (2.70158 * a - 1.70158)
      },
      Out: function(a) {
          return --a * a * (2.70158 * a + 1.70158) + 1
      },
      InOut: function(a) {
          return 1 > (a *= 2) ? 0.5 * a * a * (3.5949095 * a - 2.5949095) : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
      }
  },
  Bounce: {
      In: function(a) {
          return 1 - TWEEN.Easing.Bounce.Out(1 - a)
      },
      Out: function(a) {
          return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
      },
      InOut: function(a) {
          return 0.5 > a ? 0.5 * TWEEN.Easing.Bounce.In(2 * a) : 0.5 * TWEEN.Easing.Bounce.Out(2 * a - 1) + 0.5
      }
  }
};
TWEEN.Interpolation = {
  Linear: function(a, c) {
      var b = a.length - 1
        , d = b * c
        , e = Math.floor(d)
        , g = TWEEN.Interpolation.Utils.Linear;
      return 0 > c ? g(a[0], a[1], d) : 1 < c ? g(a[b], a[b - 1], b - d) : g(a[e], a[e + 1 > b ? b : e + 1], d - e)
  },
  Bezier: function(a, c) {
      var b = 0, d = a.length - 1, e = Math.pow, g = TWEEN.Interpolation.Utils.Bernstein, h;
      for (h = 0; h <= d; h++)
          b += e(1 - c, d - h) * e(c, h) * a[h] * g(d, h);
      return b
  },
  CatmullRom: function(a, c) {
      var b = a.length - 1
        , d = b * c
        , e = Math.floor(d)
        , g = TWEEN.Interpolation.Utils.CatmullRom;
      return a[0] === a[b] ? (0 > c && (e = Math.floor(d = b * (1 + c))),
      g(a[(e - 1 + b) % b], a[e], a[(e + 1) % b], a[(e + 2) % b], d - e)) : 0 > c ? a[0] - (g(a[0], a[0], a[1], a[1], -d) - a[0]) : 1 < c ? a[b] - (g(a[b], a[b], a[b - 1], a[b - 1], d - b) - a[b]) : g(a[e ? e - 1 : 0], a[e], a[b < e + 1 ? b : e + 1], a[b < e + 2 ? b : e + 2], d - e)
  },
  Utils: {
      Linear: function(a, c, b) {
          return (c - a) * b + a
      },
      Bernstein: function(a, c) {
          var b = TWEEN.Interpolation.Utils.Factorial;
          return b(a) / b(c) / b(a - c)
      },
      Factorial: function() {
          var a = [1];
          return function(c) {
              var b = 1, d;
              if (a[c])
                  return a[c];
              for (d = c; 1 < d; d--)
                  b *= d;
              return a[c] = b
          }
      }(),
      CatmullRom: function(a, c, b, d, e) {
          var a = 0.5 * (b - a)
            , d = 0.5 * (d - c)
            , g = e * e;
          return (2 * c - 2 * b + a + d) * e * g + (-3 * c + 3 * b - 2 * a - d) * g + a * e + c
      }
  }
};




//here is the main code of this roller coaster 
(function() {
    var Main;
  
    Main = (function() {
      function Main() {
        this.vars();
        this.fixIEPatterns();
        this.launchTrains();
        this.launchClouds();
        this.animate();
      }
  
      Main.prototype.vars = function() {
        var cabin, i, _i, _j;
        this.train1 = {
          cabins: [],
          path: document.getElementById('js-blue-path')
        };
        for (i = _i = 1; _i <= 5; i = ++_i) {
          if (cabin = document.getElementById("js-blue-train-cabin" + i)) {
            this.train1.cabins.push(cabin);
          }
        }
        this.cabinWidth = 2.5 * this.train1.cabins[0].getBoundingClientRect().width;
        this.train2 = {
          cabins: [],
          path: document.getElementById('js-yellow-path')
        };
        for (i = _j = 1; _j <= 5; i = ++_j) {
          if (cabin = document.getElementById("js-yellow-train-cabin" + i)) {
            this.train2.cabins.push(cabin);
          }
        }
        this.cabinWidth = 90;
        this.childNode = this.isIE() ? 1 : 0;
        this.childMethod = this.isIE() ? 'childNodes' : 'children';
        return this.animate = this.bind(this.animate, this);
      };
  
      Main.prototype.fixIEPatterns = function() {
        if (!this.isIE()) {
          return;
        }
        this.addImageToPattern({
          pattern: 'pattern2',
          image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6859/pattern2.png'
        });
        this.addImageToPattern({
          pattern: 'pattern3',
          image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6859/pattern3.png'
        });
        this.addImageToPattern({
          pattern: 'pattern4',
          image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6859/pattern4.png'
        });
        return this.addImageToPattern({
          pattern: 'pattern5',
          image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6859/pattern5.png'
        });
      };
  
      Main.prototype.addImageToPattern = function(o) {
        var pattern, receptacle, svgfragment;
        pattern = document.getElementById(o.pattern);
        console.log(pattern);
        receptacle = document.createElement('div');
        svgfragment = "<svg>\n  <image\n    xmlns=\"http://www.w3.org/2000/svg\"\n    width=\"108px\"\n    height=\"108px\"\n    xlink:href=\"" + o.image + "\"\n  />\n</svg>";
        receptacle.innerHTML = '' + svgfragment;
        return Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach(function(el) {
          return pattern.appendChild(el);
        });
      };
  
      Main.prototype.launchClouds = function() {
        var cloud1, cloud11, cloud2, cloud21, cloud3, cloud31, cloud4, cloud41, cloudEnd, cloudStart, it, time;
        it = this;
        cloudStart = 3200;
        cloudEnd = -400;
        cloud1 = document.getElementById('js-cloud1');
        cloud11 = document.getElementById('js-cloud11');
        time = 90000;
        this.cloud1Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud1.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).start({
          progress: .65
        });
        this.cloud11Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud11.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).delay(time / 2).start({
          progress: .65
        });
        cloud2 = document.getElementById('js-cloud2');
        cloud21 = document.getElementById('js-cloud21');
        time = 75000;
        this.cloud2Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud2.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).start({
          progress: .25
        });
        this.cloud21Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud21.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).delay(time / 2).start({
          progress: .25
        });
        cloud3 = document.getElementById('js-cloud3');
        cloud31 = document.getElementById('js-cloud31');
        time = 100000;
        this.cloud3Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud3.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).start({
          progress: .75
        });
        this.cloud31Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud31.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).delay(time / 2).start({
          progress: .75
        });
        cloud4 = document.getElementById('js-cloud4');
        cloud41 = document.getElementById('js-cloud41');
        time = 110000;
        this.cloud4Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud4.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).start();
        return this.cloud41Tween = new TWEEN.Tween({
          left: cloudStart
        }).to({
          left: cloudEnd
        }, time).onUpdate(function() {
          return cloud41.setAttribute('transform', "translate(" + this.left + ")");
        }).repeat(9999999).delay(time / 2).start();
      };
  
      Main.prototype.launchTrains = function() {
        var it;
        it = this;
        this.train1Tween = new TWEEN.Tween({
          length: this.train1.path.getTotalLength()
        }).to({
          length: 0
        }, 8000).onUpdate(function() {
          var angle, attr, cabin, cabinChild, i, point, prevPoint, shift, x, x1, x2, y, _i, _len, _ref, _results;
          _ref = it.train1.cabins;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            cabin = _ref[i];
            shift = i * it.cabinWidth;
            point = it.train1.path.getPointAtLength(this.length - shift);
            prevPoint = it.train1.path.getPointAtLength(this.length - shift - 1);
            x1 = point.y - prevPoint.y;
            x2 = point.x - prevPoint.x;
            angle = Math.atan(x1 / x2) * (180 / Math.PI);
            x = point.x - 30;
            y = point.y - 54;
            if (point.x - prevPoint.x > 0) {
              if (!cabin.isRotated) {
                cabinChild = cabin[it.childMethod][it.childNode];
                cabinChild.setAttribute('xlink:href', '#cabin2');
                cabin.isRotated = true;
              }
            } else {
              if (cabin.isRotated) {
                cabinChild = cabin[it.childMethod][it.childNode];
                cabinChild.setAttribute('xlink:href', '#cabin1');
                cabin.isRotated = false;
              }
            }
            attr = "translate(" + x + ", " + y + ") rotate(" + (angle || 0) + ",38,23)";
            _results.push(cabin.setAttribute('transform', attr));
          }
          return _results;
        }).repeat(999999999999).start();
        return this.train2Tween = new TWEEN.Tween({
          length: this.train2.path.getTotalLength()
        }).to({
          length: 0
        }, 5000).onUpdate(function() {
          var angle, attr, cabin, cabinChild, i, point, prevPoint, shift, x, x1, x2, y, _i, _len, _ref, _results;
          _ref = it.train2.cabins;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            cabin = _ref[i];
            shift = i * it.cabinWidth;
            point = it.train2.path.getPointAtLength(this.length - shift);
            prevPoint = it.train2.path.getPointAtLength(this.length - shift - 1);
            x1 = point.y - prevPoint.y;
            x2 = point.x - prevPoint.x;
            angle = Math.atan(x1 / x2) * (180 / Math.PI);
            x = point.x - 50;
            y = point.y - 54;
            if (point.x - prevPoint.x > 0) {
              if (!cabin.isRotated) {
                cabinChild = cabin[it.childMethod][it.childNode];
                cabinChild.setAttribute('xlink:href', '#cabin2');
                cabin.isRotated = true;
              }
            } else {
              if (cabin.isRotated) {
                cabinChild = cabin[it.childMethod][it.childNode];
                cabinChild.setAttribute('xlink:href', '#cabin1');
                cabin.isRotated = false;
              }
            }
            attr = "translate(" + x + ", " + y + ") rotate(" + (angle || 0) + ",38,23)";
            _results.push(cabin.setAttribute('transform', attr));
          }
          return _results;
        }).repeat(999999999999).start();
      };
  
      Main.prototype.animate = function() {
        requestAnimationFrame(this.animate);
        return TWEEN.update();
      };
  
      Main.prototype.isIE = function() {
        var msie, rv, rvNum, trident, ua, undef;
        if (this.isIECache) {
          return this.isIECache;
        }
        undef = void 0;
        rv = -1;
        ua = window.navigator.userAgent;
        msie = ua.indexOf("MSIE ");
        trident = ua.indexOf("Trident/");
        if (msie > 0) {
          rv = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        } else if (trident > 0) {
          rvNum = ua.indexOf("rv:");
          rv = parseInt(ua.substring(rvNum + 3, ua.indexOf(".", rvNum)), 10);
        }
        this.isIECache = (rv > -1 ? rv : undef);
        return this.isIECache;
      };
  
      Main.prototype.bind = function(func, context) {
        var bindArgs, wrapper;
        wrapper = function() {
          var args, unshiftArgs;
          args = Array.prototype.slice.call(arguments);
          unshiftArgs = bindArgs.concat(args);
          return func.apply(context, unshiftArgs);
        };
        bindArgs = Array.prototype.slice.call(arguments, 2);
        return wrapper;
      };
  
      return Main;
  
    })();
  
    new Main;
  
  }).call(this);
  
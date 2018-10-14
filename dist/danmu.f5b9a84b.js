// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRgba = toRgba;
exports.getContentWidth = getContentWidth;
function toRgba(color) {
  var div = document.createElement('div');
  div.style.backgroundColor = color;
  document.body.appendChild(div);
  var c = window.getComputedStyle(div).backgroundColor;
  document.body.removeChild(div);
  return c;
}

function getContentWidth(value, fontSize) {
  // 通过创建span来计算内容长度
  var span = document.createElement('span');
  span.style.position = 'absolute';
  span.style.whiteSpace = 'nowrap';
  span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
  span.innerText = value;
  span.textContent = value;
  document.body.appendChild(span);
  var width = span.clientWidth;
  document.body.removeChild(span);

  return width;
}
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Barrage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barrage = exports.Barrage = function () {
  function Barrage(data, vm) {
    _classCallCheck(this, Barrage);

    this.data = data;
    this.vm = vm;
    this.context = vm.context;
    this.value = data.value;
    this.time = data.time;
    this.speed = vm.speed;
  }

  _createClass(Barrage, [{
    key: 'init',
    value: function init() {
      var speed = this.speed;
      if (this.data.hasOwnProperty('speed')) {
        speed = this.data.speed;
      }
      if (speed != 0) {
        speed = speed + this.data.value.length / 100;
      }

      var fontSize = this.data.fontSize || this.vm.speed;
      var color = this.data.color || this.vm.color;
      color = (0, _util.toRgba)(color);

      var range = this.data.range || this.vm.range;
      var opacity = this.data.opacity || this.vm.opacity;

      opacity = opacity / 100;

      this.width = (0, _util.getContentWidth)(this.value, fontSize);

      this.x = this.vm.width;
      if (speed == 0) {
        this.x = (this.x - this.width) / 2;
      }
      this.ax = this.vm.width;

      this.y = range[0] * this.vm.height + (range[1] - range[0]) * this.vm.height * Math.random();

      if (this.y > fontSize) {
        this.y = fontSize;
      } else if (this.y > height - fontSize) {
        this.y = this.vm.height - fontSize;
      }

      this.moveX = speed;
      this.opacity = opacity;
      this.color = color;
      this.range = range;
      this.fontSize = fontSize;
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.shadowColor = 'rgba(0,0,0,' + this.opacity + ')';
      this.context.shadowBlur = 2;
      this.context.font = this.fontSize + 'px "microsoft yahei", sans-serif';
      if (/rgb\(/.test(this.color)) {
        this.context.fillStyle = 'rgba(' + this.color.split('(')[1].split(')')[0] + ',' + this.opacity + ')';
      } else {
        this.context.fillStyle = this.color;
      }

      this.context.fillText = (this.value, this.x, this.y);
    }
  }]);

  return Barrage;
}();
},{"./util":6}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _barrage = require('./barrage');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Danmu = function () {
  function Danmu(canvas, video, options) {
    var _this = this;

    _classCallCheck(this, Danmu);

    this.canvas = canvas;
    this.video = video;
    this.options = options;
    this.store = {};
    this.isPause = true;
    this.time = video.currentTime;
    this.fontSize = 28;
    this.width = 0;
    this.height = 0;

    var defaults = {
      opacity: 100,
      fontSize: 24,
      speed: 2,
      range: [0, 1],
      color: '#fff',
      data: []
    };

    var params = {};

    for (var key in defaults) {
      if (options[key]) {
        params[key] = options[key];
      } else {
        params[key] = defaults[key];
      }

      this[key] = params[key];
    }

    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.data.forEach(function (data, index) {
      _this.store[index] = new _barrage.Barrage(data, _this);
    });

    this.video.onplay = function () {
      _this.isPause == false;
      _this.render();
    };

    this.video.onpause = function () {
      _this.isPause = true;
    };

    this.video.onseeked = function () {
      _this.reset();
    };
  }

  _createClass(Danmu, [{
    key: 'draw',
    value: function draw() {
      for (var index in this.store) {
        var dm = this.store[index];
        if (dm && !dm.disabled) {
          if (!dm.inited) {
            dm.init();
            dm.inited = true;
          }

          dm.x -= dm.moveX;
          if (dm.moveX == 0) {
            dm.ax -= this.speed;
          } else {
            dm.ax = dm.x;
          }

          if (dm.ax < -1 * dm.width) {
            dm.x = dm.ax;
            dm.disabled = true;
          }

          dm.draw();
        }
      }
    }
  }, {
    key: 'render',
    value: function (_render) {
      function render() {
        return _render.apply(this, arguments);
      }

      render.toString = function () {
        return _render.toString();
      };

      return render;
    }(function () {
      this.time = video.currentTime;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();

      if (!this.isPause) {
        requestAnimationFrame(render);
      }
    })
  }, {
    key: 'add',
    value: function add(data) {
      this.store[Object.keys(this.store).length] = new _barrage.Barrage(data, this);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.time = video.currentTime;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var index in this.store) {
        var dm = this.store[index];
        if (dm) {
          dm.disabled = false;
          if (this.time < dm.time) {
            dm.inited = null;
          } else {
            dm.disabled = true;
          }
        }
      }
    }
  }]);

  return Danmu;
}();

exports.default = Danmu;
},{"./barrage":5}],2:[function(require,module,exports) {
'use strict';

var _index = require('./src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var video = document.getElementById('video');

var data = [{
  value: 'speed设为0为非滚动',
  time: 1, // 单位秒
  speed: 0
}, {
  value: 'time控制弹幕时间，单位秒',
  color: 'blue',
  time: 2
}, {
  value: '视频共21秒',
  time: 3.2
}, {
  value: '视频背景为白色',
  time: 4.5
}, {
  value: '视频为录制',
  time: 5.0
}, {
  value: '视频内容简单',
  time: 6.3
}, {
  value: '是为了让视频尺寸不至于过大',
  time: 7.8
}, {
  value: '省流量',
  time: 8.5
}, {
  value: '支持弹幕暂停（视频暂停）',
  time: 9
}, {
  value: 'add()方法新增弹幕',
  time: 11
}, {
  value: 'reset()方法重置弹幕',
  time: 11
}, {
  value: '颜色，字号，透明度可全局设置',
  time: 13
}, {
  value: '具体交互细节可参考页面源代码',
  time: 14
}, {
  value: '内容不错哦！',
  time: 18,
  color: 'yellow'
}];

var dm = new _index2.default(canvas, video, {
  data: data
});
},{"./src/index":3}],7:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55957' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[7,2])
//# sourceMappingURL=/danmu.f5b9a84b.map
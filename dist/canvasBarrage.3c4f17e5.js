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
})({8:[function(require,module,exports) {
/*!
** by zhangxinxu(.com)
** 与HTML5 video视频真实交互的弹幕效果
** http://www.zhangxinxu.com/wordpress/?p=6386
** MIT License
** 保留版权申明
*/
var CanvasBarrage = function CanvasBarrage(canvas, video, options) {
	if (!canvas || !video) {
		return;
	}
	var defaults = {
		opacity: 100,
		fontSize: 24,
		speed: 2,
		range: [0, 1],
		color: 'white',
		data: []
	};

	options = options || {};

	var params = {};
	// 参数合并
	for (var key in defaults) {
		if (options[key]) {
			params[key] = options[key];
		} else {
			params[key] = defaults[key];
		}

		this[key] = params[key];
	}
	var top = this;
	var data = top.data;

	if (!data || !data.length) {
		return;
	}

	var context = canvas.getContext('2d');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	// 存储实例
	var store = {};

	// 暂停与否
	var isPause = true;
	// 播放时长
	var time = video.currentTime;

	// 字号大小
	var fontSize = 28;

	// 实例方法
	var Barrage = function Barrage(obj) {
		// 一些变量参数
		this.value = obj.value;
		this.time = obj.time;
		// data中的可以覆盖全局的设置
		this.init = function () {
			// 1. 速度
			var speed = top.speed;
			if (obj.hasOwnProperty('speed')) {
				speed = obj.speed;
			}
			if (speed !== 0) {
				// 随着字数不同，速度会有微调
				speed = speed + obj.value.length / 100;
			}
			// 2. 字号大小
			var fontSize = obj.fontSize || top.fontSize;

			// 3. 文字颜色
			var color = obj.color || top.color;
			// 转换成rgb颜色
			color = function () {
				var div = document.createElement('div');
				div.style.backgroundColor = color;
				document.body.appendChild(div);
				var c = window.getComputedStyle(div).backgroundColor;
				document.body.removeChild(div);
				return c;
			}();

			// 4. range范围
			var range = obj.range || top.range;
			// 5. 透明度
			var opacity = obj.opacity || top.opacity;
			opacity = opacity / 100;

			// 计算出内容长度
			var span = document.createElement('span');
			span.style.position = 'absolute';
			span.style.whiteSpace = 'nowrap';
			span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
			span.innerText = obj.value;
			span.textContent = obj.value;
			document.body.appendChild(span);
			// 求得文字内容宽度
			this.width = span.clientWidth;
			// 移除dom元素
			document.body.removeChild(span);

			// 初始水平位置和垂直位置
			this.x = canvas.width;
			if (speed == 0) {
				this.x = (this.x - this.width) / 2;
			}
			this.actualX = canvas.width;
			this.y = range[0] * canvas.height + (range[1] - range[0]) * canvas.height * Math.random();
			if (this.y < fontSize) {
				this.y = fontSize;
			} else if (this.y > canvas.height - fontSize) {
				this.y = canvas.height - fontSize;
			}

			this.moveX = speed;
			this.opacity = opacity;
			this.color = color;
			this.range = range;
			this.fontSize = fontSize;
		};

		this.draw = function () {
			// 根据此时x位置绘制文本
			context.shadowColor = 'rgba(0,0,0,' + this.opacity + ')';
			context.shadowBlur = 2;
			context.font = this.fontSize + 'px "microsoft yahei", sans-serif';
			if (/rgb\(/.test(this.color)) {
				context.fillStyle = 'rgba(' + this.color.split('(')[1].split(')')[0] + ',' + this.opacity + ')';
			} else {
				context.fillStyle = this.color;
			}
			// 填色
			context.fillText(this.value, this.x, this.y);
		};
	};

	data.forEach(function (obj, index) {
		store[index] = new Barrage(obj);
	});

	// 绘制弹幕文本
	var draw = function draw() {
		for (var index in store) {
			var barrage = store[index];

			if (barrage && !barrage.disabled && time >= barrage.time) {
				if (!barrage.inited) {
					barrage.init();
					barrage.inited = true;
				}
				barrage.x -= barrage.moveX;
				if (barrage.moveX == 0) {
					// 不动的弹幕
					barrage.actualX -= top.speed;
				} else {
					barrage.actualX = barrage.x;
				}
				// 移出屏幕
				if (barrage.actualX < -1 * barrage.width) {
					// 下面这行给speed为0的弹幕
					barrage.x = barrage.actualX;
					// 该弹幕不运动
					barrage.disabled = true;
				}
				// 根据新位置绘制圆圈圈
				barrage.draw();
			}
		}
	};

	// 画布渲染
	var render = function render() {
		// 更新已经播放时间
		time = video.currentTime;
		// 清除画布
		context.clearRect(0, 0, canvas.width, canvas.height);

		// 绘制画布
		draw();

		// 继续渲染
		if (isPause == false) {
			requestAnimationFrame(render);
		}
	};

	// 视频处理
	video.addEventListener('play', function () {
		isPause = false;
		render();
	});
	video.addEventListener('pause', function () {
		isPause = true;
	});
	video.addEventListener('seeked', function () {
		// 跳转播放需要清屏
		top.reset();
	});

	// 添加数据的方法 
	this.add = function (obj) {
		store[Object.keys(store).length] = new Barrage(obj);
	};

	// 重置
	this.reset = function () {
		time = video.currentTime;
		// 画布清除
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var index in store) {
			var barrage = store[index];
			if (barrage) {
				// 状态变化
				barrage.disabled = false;
				// 根据时间判断哪些可以走起
				if (time < barrage.time) {
					// 视频时间小于播放时间
					// barrage.disabled = true;
					barrage.inited = null;
				} else {
					// 视频时间大于播放时间
					barrage.disabled = true;
				}
			}
		}
	};
};
},{}],10:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59361' + '/');
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
},{}]},{},[10,8])
//# sourceMappingURL=/canvasBarrage.3c4f17e5.map
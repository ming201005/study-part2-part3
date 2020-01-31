"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _number = require("../utils/format/number");

var _event = require("../utils/dom/event");

var _popup = require("../mixins/popup");

var _touch = require("../mixins/touch");

var _image = _interopRequireDefault(require("../image"));

var _loading = _interopRequireDefault(require("../loading"));

var _swipe = _interopRequireDefault(require("../swipe"));

var _swipeItem = _interopRequireDefault(require("../swipe-item"));

var _createNamespace = (0, _utils.createNamespace)('image-preview'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

var _default2 = createComponent({
  mixins: [_popup.PopupMixin, _touch.TouchMixin],
  props: {
    className: null,
    lazyLoad: Boolean,
    asyncClose: Boolean,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: Number,
      default: 500
    },
    overlay: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    startPosition: {
      type: Number,
      default: 0
    },
    minZoom: {
      type: Number,
      default: 1 / 3
    },
    maxZoom: {
      type: Number,
      default: 3
    },
    overlayClass: {
      type: String,
      default: bem('overlay')
    }
  },
  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      active: 0,
      moving: false,
      zooming: false,
      doubleClickTimer: null
    };
  },
  computed: {
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        style.transform = "scale3d(" + scale + ", " + scale + ", 1) translate(" + this.moveX / scale + "px, " + this.moveY / scale + "px)";
      }

      return style;
    }
  },
  watch: {
    value: function value() {
      this.setActive(this.startPosition);
    },
    startPosition: function startPosition(active) {
      this.setActive(active);
    }
  },
  methods: {
    onWrapperTouchStart: function onWrapperTouchStart() {
      this.touchStartTime = new Date();
    },
    onWrapperTouchEnd: function onWrapperTouchEnd(event) {
      var _this = this;

      (0, _event.preventDefault)(event);
      var deltaTime = new Date() - this.touchStartTime;

      var _ref = this.$refs.swipe || {},
          _ref$offsetX = _ref.offsetX,
          offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
          _ref$offsetY = _ref.offsetY,
          offsetY = _ref$offsetY === void 0 ? 0 : _ref$offsetY; // prevent long tap to close component


      if (deltaTime < 300 && offsetX < 10 && offsetY < 10) {
        if (!this.doubleClickTimer) {
          this.doubleClickTimer = setTimeout(function () {
            var index = _this.active;

            _this.$emit('close', {
              index: index,
              url: _this.images[index]
            });

            if (!_this.asyncClose) {
              _this.$emit('input', false);
            }

            _this.doubleClickTimer = null;
          }, 300);
        } else {
          clearTimeout(this.doubleClickTimer);
          this.doubleClickTimer = null;
          this.toggleScale();
        }
      }
    },
    startMove: function startMove(event) {
      var image = event.currentTarget;
      var rect = image.getBoundingClientRect();
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      this.touchStart(event);
      this.moving = true;
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
      this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
    },
    startZoom: function startZoom(event) {
      this.moving = false;
      this.zooming = true;
      this.startScale = this.scale;
      this.startDistance = getDistance(event.touches);
    },
    onImageTouchStart: function onImageTouchStart(event) {
      var touches = event.touches;

      var _ref2 = this.$refs.swipe || {},
          _ref2$offsetX = _ref2.offsetX,
          offsetX = _ref2$offsetX === void 0 ? 0 : _ref2$offsetX;

      if (touches.length === 1 && this.scale !== 1) {
        this.startMove(event);
      }
      /* istanbul ignore else */
      else if (touches.length === 2 && !offsetX) {
          this.startZoom(event);
        }
    },
    onImageTouchMove: function onImageTouchMove(event) {
      var touches = event.touches;

      if (this.moving || this.zooming) {
        (0, _event.preventDefault)(event, true);
      }

      if (this.moving) {
        this.touchMove(event);
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = (0, _number.range)(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = (0, _number.range)(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.scale = (0, _number.range)(scale, this.minZoom, this.maxZoom);
      }
    },
    onImageTouchEnd: function onImageTouchEnd(event) {
      /* istanbul ignore else */
      if (this.moving || this.zooming) {
        var stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          this.moving = false;
          this.zooming = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }

        if (stopPropagation) {
          (0, _event.preventDefault)(event, true);
        }
      }
    },
    setActive: function setActive(active) {
      this.resetScale();

      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
    resetScale: function resetScale() {
      this.scale = 1;
      this.moveX = 0;
      this.moveY = 0;
    },
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.scale = scale;
      this.moveX = 0;
      this.moveY = 0;
    },
    genIndex: function genIndex() {
      var h = this.$createElement;

      if (this.showIndex) {
        return h("div", {
          "class": bem('index')
        }, [this.slots('index') || this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots('cover');

      if (cover) {
        return h("div", {
          "class": bem('cover')
        }, [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;

      var h = this.$createElement;
      var imageSlots = {
        loading: function loading() {
          return h(_loading.default, {
            "attrs": {
              "type": "spinner"
            }
          });
        }
      };
      return h(_swipe.default, {
        "ref": "swipe",
        "attrs": {
          "loop": this.loop,
          "indicatorColor": "white",
          "duration": this.swipeDuration,
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators
        },
        "class": bem('swipe'),
        "on": {
          "change": this.setActive
        },
        "nativeOn": {
          "touchstart": this.onWrapperTouchStart,
          "touchMove": _event.preventDefault,
          "touchend": this.onWrapperTouchEnd,
          "touchcancel": this.onWrapperTouchEnd
        }
      }, [this.images.map(function (image, index) {
        return h(_swipeItem.default, [h(_image.default, {
          "attrs": {
            "src": image,
            "fit": "contain",
            "lazyLoad": _this2.lazyLoad
          },
          "class": bem('image'),
          "scopedSlots": imageSlots,
          "style": index === _this2.active ? _this2.imageStyle : null,
          "nativeOn": {
            "touchstart": _this2.onImageTouchStart,
            "touchmove": _this2.onImageTouchMove,
            "touchend": _this2.onImageTouchEnd,
            "touchcancel": _this2.onImageTouchEnd
          }
        })]);
      })]);
    }
  },
  render: function render() {
    var h = arguments[0];

    if (!this.value) {
      return;
    }

    return h("transition", {
      "attrs": {
        "name": "van-fade"
      }
    }, [h("div", {
      "class": [bem(), this.className]
    }, [this.genImages(), this.genIndex(), this.genCover()])]);
  }
});

exports.default = _default2;
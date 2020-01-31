import { createNamespace } from '../utils';
import { range } from '../utils/format/number';
import { preventDefault } from '../utils/dom/event';
import { TouchMixin } from '../mixins/touch';
import { ClickOutsideMixin } from '../mixins/click-outside';

var _createNamespace = createNamespace('swipe-cell'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var THRESHOLD = 0.15;
export default createComponent({
  mixins: [TouchMixin, ClickOutsideMixin({
    event: 'touchstart',
    method: 'onClick'
  })],
  props: {
    onClose: Function,
    disabled: Boolean,
    leftWidth: Number,
    rightWidth: Number,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: ''
    }
  },
  data: function data() {
    return {
      offset: 0,
      dragging: false
    };
  },
  computed: {
    computedLeftWidth: function computedLeftWidth() {
      return this.leftWidth || this.getWidthByRef('left');
    },
    computedRightWidth: function computedRightWidth() {
      return this.rightWidth || this.getWidthByRef('right');
    }
  },
  methods: {
    getWidthByRef: function getWidthByRef(ref) {
      if (this.$refs[ref]) {
        var rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },
    // @exposed-api
    open: function open(position) {
      var offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.swipeMove(offset);
      this.opened = true;
      this.$emit('open', {
        position: position,
        detail: this.name
      });
    },
    // @exposed-api
    close: function close() {
      this.offset = 0;
    },
    swipeMove: function swipeMove(offset) {
      if (offset === void 0) {
        offset = 0;
      }

      this.offset = range(offset, -this.computedRightWidth, this.computedLeftWidth);

      if (!this.offset) {
        this.opened = false;
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;
        var isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.swipeMove(this.deltaX + this.startOffset);
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false; // compatible with desktop scenario

        setTimeout(function () {
          _this.lockClick = false;
        }, 0);
      }
    },
    toggle: function toggle(direction) {
      var offset = Math.abs(this.offset);
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      var computedLeftWidth = this.computedLeftWidth,
          computedRightWidth = this.computedRightWidth;

      if (computedRightWidth && direction === 'right' && offset > computedRightWidth * threshold) {
        this.open('right');
      } else if (computedLeftWidth && direction === 'left' && offset > computedLeftWidth * threshold) {
        this.open('left');
      } else {
        this.swipeMove(0);
      }
    },
    onClick: function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      this.$emit('click', position);

      if (this.opened && !this.lockClick) {
        if (this.onClose) {
          this.onClose(position, this, {
            name: this.name
          });
        } else {
          this.swipeMove(0);
        }
      }
    },
    getClickHandler: function getClickHandler(position, stop) {
      var _this2 = this;

      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        _this2.onClick(position);
      };
    },
    genLeftPart: function genLeftPart() {
      var h = this.$createElement;

      if (this.slots('left')) {
        return h("div", {
          "ref": "left",
          "class": bem('left'),
          "on": {
            "click": this.getClickHandler('left', true)
          }
        }, [this.slots('left')]);
      }
    },
    genRightPart: function genRightPart() {
      var h = this.$createElement;

      if (this.slots('right')) {
        return h("div", {
          "ref": "right",
          "class": bem('right'),
          "on": {
            "click": this.getClickHandler('right', true)
          }
        }, [this.slots('right')]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? '0s' : '.6s'
    };
    return h("div", {
      "class": bem(),
      "on": {
        "click": this.getClickHandler('cell'),
        "touchstart": this.onTouchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [h("div", {
      "class": bem('wrapper'),
      "style": wrapperStyle
    }, [this.genLeftPart(), this.slots(), this.genRightPart()])]);
  }
});
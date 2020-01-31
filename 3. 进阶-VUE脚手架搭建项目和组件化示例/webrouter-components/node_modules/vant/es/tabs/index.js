import { createNamespace, isDef, addUnit } from '../utils';
import { scrollLeftTo } from './utils';
import { route } from '../utils/router';
import { isHidden } from '../utils/dom/style';
import { ParentMixin } from '../mixins/relation';
import { BindEventMixin } from '../mixins/bind-event';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { setRootScrollTop, getElementTop } from '../utils/dom/scroll';
import Title from './Title';
import Content from './Content';
import Sticky from '../sticky';

var _createNamespace = createNamespace('tabs'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ParentMixin('vanTabs'), BindEventMixin(function (bind) {
    bind(window, 'resize', this.resize, true);
  })],
  model: {
    prop: 'active'
  },
  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: 'line'
    },
    active: {
      type: [Number, String],
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 0.3
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    swipeThreshold: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      position: '',
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color
      }
    };
  },
  computed: {
    // whether the nav is scrollable
    scrollable: function scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color,
        background: this.background
      };
    },
    currentName: function currentName() {
      var activeTab = this.children[this.currentIndex];

      if (activeTab) {
        return activeTab.computedName;
      }
    }
  },
  watch: {
    color: 'setLine',
    active: function active(name) {
      if (name !== this.currentName) {
        this.setCurrentIndexByName(name);
      }
    },
    children: function children() {
      var _this = this;

      this.setCurrentIndexByName(this.currentName || this.active);
      this.setLine();
      this.$nextTick(function () {
        _this.scrollIntoView(true);
      });
    },
    currentIndex: function currentIndex() {
      this.scrollIntoView();
      this.setLine(); // scroll to correct position

      if (this.stickyFixed) {
        setRootScrollTop(Math.ceil(getElementTop(this.$el) - this.offsetTop));
      }
    }
  },
  mounted: function mounted() {
    this.onShow();
  },
  activated: function activated() {
    this.onShow();
    this.setLine();
  },
  methods: {
    // @exposed-api
    resize: function resize() {
      this.setLine();
    },
    onShow: function onShow() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.inited = true;

        _this2.scrollIntoView(true);
      });
    },
    // update nav bar style
    setLine: function setLine() {
      var _this3 = this;

      var shouldAnimate = this.inited;
      this.$nextTick(function () {
        var titles = _this3.$refs.titles;

        if (!titles || !titles[_this3.currentIndex] || _this3.type !== 'line' || isHidden(_this3.$el)) {
          return;
        }

        var title = titles[_this3.currentIndex].$el;
        var lineWidth = _this3.lineWidth,
            lineHeight = _this3.lineHeight;
        var width = isDef(lineWidth) ? lineWidth : title.offsetWidth / 2;
        var left = title.offsetLeft + title.offsetWidth / 2;
        var lineStyle = {
          width: addUnit(width),
          backgroundColor: _this3.color,
          transform: "translateX(" + left + "px) translateX(-50%)"
        };

        if (shouldAnimate) {
          lineStyle.transitionDuration = _this3.duration + "s";
        }

        if (isDef(lineHeight)) {
          var height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        _this3.lineStyle = lineStyle;
      });
    },
    // correct the index of active tab
    setCurrentIndexByName: function setCurrentIndexByName(name) {
      var matched = this.children.filter(function (tab) {
        return tab.computedName === name;
      });
      var defaultIndex = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex);
    },
    setCurrentIndex: function setCurrentIndex(currentIndex) {
      currentIndex = this.findAvailableTab(currentIndex);

      if (isDef(currentIndex) && currentIndex !== this.currentIndex) {
        var shouldEmitChange = this.currentIndex !== null;
        this.currentIndex = currentIndex;
        this.$emit('input', this.currentName);

        if (shouldEmitChange) {
          this.$emit('change', this.currentName, this.children[currentIndex].title);
        }
      }
    },
    findAvailableTab: function findAvailableTab(index) {
      var diff = index < this.currentIndex ? -1 : 1;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    // emit event when clicked
    onClick: function onClick(index) {
      var _this$children$index = this.children[index],
          title = _this$children$index.title,
          disabled = _this$children$index.disabled,
          computedName = _this$children$index.computedName;

      if (disabled) {
        this.$emit('disabled', computedName, title);
      } else {
        this.setCurrentIndex(index);
        this.$emit('click', computedName, title);
      }
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var titles = this.$refs.titles;

      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }

      var nav = this.$refs.nav;
      var title = titles[this.currentIndex].$el;
      var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : this.duration);
    },
    onScroll: function onScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit('scroll', params);
    }
  },
  render: function render() {
    var _this4 = this,
        _ref;

    var h = arguments[0];
    var type = this.type,
        ellipsis = this.ellipsis,
        animated = this.animated,
        scrollable = this.scrollable;
    var Nav = this.children.map(function (item, index) {
      return h(Title, {
        "ref": "titles",
        "refInFor": true,
        "attrs": {
          "type": type,
          "title": item.title,
          "color": _this4.color,
          "isActive": index === _this4.currentIndex,
          "ellipsis": ellipsis,
          "disabled": item.disabled,
          "scrollable": scrollable,
          "activeColor": _this4.titleActiveColor,
          "inactiveColor": _this4.titleInactiveColor,
          "swipeThreshold": _this4.swipeThreshold
        },
        "style": item.titleStyle,
        "scopedSlots": {
          default: function _default() {
            return item.slots('title');
          }
        },
        "on": {
          "click": function click() {
            _this4.onClick(index);

            route(item.$router, item);
          }
        }
      });
    });
    var Wrap = h("div", {
      "ref": "wrap",
      "class": [bem('wrap', {
        scrollable: scrollable
      }), (_ref = {}, _ref[BORDER_TOP_BOTTOM] = type === 'line' && this.border, _ref)]
    }, [h("div", {
      "ref": "nav",
      "attrs": {
        "role": "tablist"
      },
      "class": bem('nav', [type]),
      "style": this.navStyle
    }, [this.slots('nav-left'), Nav, type === 'line' && h("div", {
      "class": bem('line'),
      "style": this.lineStyle
    }), this.slots('nav-right')])]);
    return h("div", {
      "class": bem([type])
    }, [this.sticky ? h(Sticky, {
      "attrs": {
        "container": this.$el,
        "offsetTop": this.offsetTop
      },
      "on": {
        "scroll": this.onScroll
      }
    }, [Wrap]) : Wrap, h(Content, {
      "attrs": {
        "count": this.children.length,
        "animated": animated,
        "duration": this.duration,
        "swipeable": this.swipeable,
        "currentIndex": this.currentIndex
      },
      "on": {
        "change": this.setCurrentIndex
      }
    }, [this.slots()])]);
  }
});
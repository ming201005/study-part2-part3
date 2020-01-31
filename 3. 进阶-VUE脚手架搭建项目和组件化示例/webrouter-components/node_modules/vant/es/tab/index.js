import _extends from "@babel/runtime/helpers/esm/extends";
import { isDef, createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';
import { routeProps } from '../utils/router';

var _createNamespace = createNamespace('tab'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanTabs')],
  props: _extends({}, routeProps, {
    name: [Number, String],
    title: String,
    titleStyle: null,
    disabled: Boolean
  }),
  data: function data() {
    return {
      inited: false
    };
  },
  computed: {
    computedName: function computedName() {
      return isDef(this.name) ? this.name : this.index;
    },
    isActive: function isActive() {
      return this.computedName === this.parent.currentName;
    }
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    'parent.currentIndex': function parentCurrentIndex() {
      this.inited = this.inited || this.isActive;
    },
    title: function title() {
      this.parent.setLine();
    }
  },
  render: function render(h) {
    var slots = this.slots,
        isActive = this.isActive;
    var shouldRender = this.inited || !this.parent.lazyRender;
    var Content = shouldRender ? slots() : h();

    if (this.parent.animated) {
      return h("div", {
        "attrs": {
          "role": "tabpanel",
          "aria-hidden": !isActive
        },
        "class": bem('pane-wrapper', {
          inactive: !isActive
        })
      }, [h("div", {
        "class": bem('pane')
      }, [Content])]);
    }

    return h("div", {
      "directives": [{
        name: "show",
        value: isActive
      }],
      "attrs": {
        "role": "tabpanel"
      },
      "class": bem('pane')
    }, [Content]);
  }
});
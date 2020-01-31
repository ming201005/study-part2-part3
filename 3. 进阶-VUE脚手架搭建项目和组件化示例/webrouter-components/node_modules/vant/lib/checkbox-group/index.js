"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _createNamespace = (0, _utils.createNamespace)('checkbox-group'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default2 = createComponent({
  mixins: [(0, _relation.ParentMixin)('vanCheckbox')],
  props: {
    max: Number,
    disabled: Boolean,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },
  methods: {
    toggleAll: function toggleAll(checked) {
      this.children.forEach(function (item) {
        item.toggle(checked);
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [this.slots()]);
  }
});

exports.default = _default2;
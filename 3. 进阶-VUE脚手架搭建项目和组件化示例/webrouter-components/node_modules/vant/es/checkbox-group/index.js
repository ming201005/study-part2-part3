import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';

var _createNamespace = createNamespace('checkbox-group'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ParentMixin('vanCheckbox')],
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
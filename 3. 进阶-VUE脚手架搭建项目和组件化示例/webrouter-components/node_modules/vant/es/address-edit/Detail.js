import _extends from "@babel/runtime/helpers/esm/extends";
import { createNamespace } from '../utils';
import { isAndroid } from '../utils/validate/system';
import Cell from '../cell';
import Field from '../field';

var _createNamespace = createNamespace('address-edit-detail'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

var android = isAndroid();
export default createComponent({
  props: {
    value: String,
    error: Boolean,
    focused: Boolean,
    detailRows: Number,
    searchResult: Array,
    detailMaxlength: Number,
    showSearchResult: Boolean
  },
  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    },
    onFinish: function onFinish() {
      this.$refs.field.blur();
    },
    genFinish: function genFinish() {
      var h = this.$createElement;
      var show = this.value && this.focused && android;

      if (show) {
        return h("div", {
          "class": bem('finish'),
          "on": {
            "click": this.onFinish
          }
        }, [t('complete')]);
      }
    },
    genSearchResult: function genSearchResult() {
      var _this = this;

      var h = this.$createElement;
      var searchResult = this.searchResult;
      var show = this.focused && searchResult && this.showSearchResult;

      if (show) {
        return searchResult.map(function (express) {
          return h(Cell, {
            "key": express.name + express.address,
            "attrs": {
              "title": express.name,
              "label": express.address,
              "icon": "location-o",
              "clickable": true
            },
            "on": {
              "click": function click() {
                _this.onSelect(express);
              }
            }
          });
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(Cell, {
      "class": bem()
    }, [h(Field, {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "value": this.value,
        "error": this.error,
        "label": t('label'),
        "maxlength": this.detailMaxlength,
        "placeholder": t('placeholder')
      },
      "ref": "field",
      "scopedSlots": {
        icon: this.genFinish
      },
      "on": _extends({}, this.$listeners)
    }), this.genSearchResult()]);
  }
});
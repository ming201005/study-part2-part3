"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _button = _interopRequireDefault(require("../button"));

var _radioGroup = _interopRequireDefault(require("../radio-group"));

var _Item = _interopRequireDefault(require("./Item"));

var _createNamespace = (0, _utils.createNamespace)('address-list'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

function AddressList(h, props, slots, ctx) {
  function genList(list, disabled) {
    if (!list) {
      return;
    }

    return list.map(function (item, index) {
      return h(_Item.default, {
        "attrs": {
          "data": item,
          "disabled": disabled,
          "switchable": props.switchable
        },
        "key": item.id,
        "on": {
          "select": function select() {
            (0, _functional.emit)(ctx, disabled ? 'select-disabled' : 'select', item, index);

            if (!disabled) {
              (0, _functional.emit)(ctx, 'input', item.id);
            }
          },
          "edit": function edit() {
            (0, _functional.emit)(ctx, disabled ? 'edit-disabled' : 'edit', item, index);
          },
          "click": function click() {
            (0, _functional.emit)(ctx, 'click-item', item, index);
          }
        }
      });
    });
  }

  var List = genList(props.list);
  var DisabledList = genList(props.disabledList, true);
  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem()
  }, (0, _functional.inherit)(ctx)]), [slots.top && slots.top(), h(_radioGroup.default, {
    "attrs": {
      "value": props.value
    }
  }, [List]), props.disabledText && h("div", {
    "class": bem('disabled-text')
  }, [props.disabledText]), DisabledList, slots.default && slots.default(), h(_button.default, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.addButtonText || t('add')
    },
    "class": bem('add'),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'add');
      }
    }
  })]);
}

AddressList.props = {
  list: Array,
  disabledList: Array,
  disabledText: String,
  addButtonText: String,
  value: [Number, String],
  switchable: {
    type: Boolean,
    default: true
  }
};

var _default = createComponent(AddressList);

exports.default = _default;
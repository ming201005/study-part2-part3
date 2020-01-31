"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _cell = _interopRequireDefault(require("../cell"));

var _radio = _interopRequireDefault(require("../radio"));

var _createNamespace = (0, _utils.createNamespace)('address-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
      switchable = props.switchable;

  function onClick() {
    if (switchable) {
      (0, _functional.emit)(ctx, 'select');
    }

    (0, _functional.emit)(ctx, 'click');
  }

  var genRightIcon = function genRightIcon() {
    return h(_icon.default, {
      "attrs": {
        "name": "edit"
      },
      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          (0, _functional.emit)(ctx, 'edit');
          (0, _functional.emit)(ctx, 'click');
        }
      }
    });
  };

  var genContent = function genContent() {
    var data = props.data;
    var Info = [h("div", {
      "class": bem('name')
    }, [data.name + "\uFF0C" + data.tel]), h("div", {
      "class": bem('address')
    }, [data.address])];
    return switchable && !disabled ? h(_radio.default, {
      "attrs": {
        "name": data.id,
        "iconSize": 16
      }
    }, [Info]) : Info;
  };

  return h(_cell.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      disabled: disabled
    }),
    "attrs": {
      "valueClass": bem('value'),
      "clickable": switchable && !disabled
    },
    "scopedSlots": {
      default: genContent,
      'right-icon': genRightIcon
    },
    "on": {
      "click": onClick
    }
  }, (0, _functional.inherit)(ctx)]));
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean
};

var _default = createComponent(AddressItem);

exports.default = _default;
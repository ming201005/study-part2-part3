"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _constant = require("../utils/constant");

var _icon = _interopRequireDefault(require("../icon"));

var _createNamespace = (0, _utils.createNamespace)('tag'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Tag(h, props, slots, ctx) {
  var _style, _ref;

  var type = props.type,
      mark = props.mark,
      plain = props.plain,
      color = props.color,
      round = props.round,
      size = props.size;
  var key = plain ? 'color' : 'backgroundColor';
  var style = (_style = {}, _style[key] = color, _style);

  if (props.textColor) {
    style.color = props.textColor;
  }

  var classes = {
    mark: mark,
    plain: plain,
    round: round
  };

  if (size) {
    classes[size] = size;
  }

  var Content = h("span", (0, _babelHelperVueJsxMergeProps.default)([{
    "style": style,
    "class": [bem([classes, type]), (_ref = {}, _ref[_constant.BORDER_SURROUND] = plain, _ref)]
  }, (0, _functional.inherit)(ctx, true)]), [slots.default && slots.default(), props.closeable && h(_icon.default, {
    "attrs": {
      "name": "cross"
    },
    "class": bem('close'),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'close');
      }
    }
  })]);

  if (props.closeable) {
    return h("transition", {
      "attrs": {
        "name": "van-fade"
      }
    }, [Content]);
  }

  return Content;
}

Tag.props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
  type: {
    type: String,
    default: 'default'
  }
};

var _default = createComponent(Tag);

exports.default = _default;
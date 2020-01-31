"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _info = _interopRequireDefault(require("../info"));

var _image = _interopRequireDefault(require("../image"));

var _createNamespace = (0, _utils.createNamespace)('icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

function Icon(h, props, slots, ctx) {
  var imageIcon = isImage(props.name);
  return h(props.tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [props.classPrefix, imageIcon ? '' : props.classPrefix + "-" + props.name],
    "style": {
      color: props.color,
      fontSize: (0, _utils.addUnit)(props.size)
    }
  }, (0, _functional.inherit)(ctx, true)]), [slots.default && slots.default(), imageIcon && h(_image.default, {
    "class": bem('image'),
    "attrs": {
      "fit": "contain",
      "src": props.name,
      "showLoading": false
    }
  }), h(_info.default, {
    "attrs": {
      "dot": props.dot,
      "info": props.info
    }
  })]);
}

Icon.props = {
  dot: Boolean,
  name: String,
  size: [Number, String],
  info: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: bem()
  }
};

var _default = createComponent(Icon);

exports.default = _default;
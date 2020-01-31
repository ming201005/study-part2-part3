import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace, addUnit } from '../utils';
import { inherit } from '../utils/functional';
import Info from '../info';
import Image from '../image'; // Types

var _createNamespace = createNamespace('icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

function Icon(h, props, slots, ctx) {
  var imageIcon = isImage(props.name);
  return h(props.tag, _mergeJSXProps([{
    "class": [props.classPrefix, imageIcon ? '' : props.classPrefix + "-" + props.name],
    "style": {
      color: props.color,
      fontSize: addUnit(props.size)
    }
  }, inherit(ctx, true)]), [slots.default && slots.default(), imageIcon && h(Image, {
    "class": bem('image'),
    "attrs": {
      "fit": "contain",
      "src": props.name,
      "showLoading": false
    }
  }), h(Info, {
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
export default createComponent(Icon);
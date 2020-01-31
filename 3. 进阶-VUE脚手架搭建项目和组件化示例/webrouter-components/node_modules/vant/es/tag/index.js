import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../utils';
import { inherit, emit } from '../utils/functional';
import { BORDER_SURROUND } from '../utils/constant';
import Icon from '../icon'; // Types

var _createNamespace = createNamespace('tag'),
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

  var Content = h("span", _mergeJSXProps([{
    "style": style,
    "class": [bem([classes, type]), (_ref = {}, _ref[BORDER_SURROUND] = plain, _ref)]
  }, inherit(ctx, true)]), [slots.default && slots.default(), props.closeable && h(Icon, {
    "attrs": {
      "name": "cross"
    },
    "class": bem('close'),
    "on": {
      "click": function click() {
        emit(ctx, 'close');
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
export default createComponent(Tag);
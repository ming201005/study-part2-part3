import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../utils';
import { emit, inherit } from '../utils/functional';
import Cell from '../cell'; // Types

var _createNamespace = createNamespace('contact-card'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

function ContactCard(h, props, slots, ctx) {
  var type = props.type,
      editable = props.editable;

  function onClick(event) {
    if (editable) {
      emit(ctx, 'click', event);
    }
  }

  return h(Cell, _mergeJSXProps([{
    "attrs": {
      "center": true,
      "border": false,
      "isLink": editable,
      "valueClass": bem('value'),
      "icon": type === 'edit' ? 'contact' : 'add-square'
    },
    "class": bem([type]),
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [type === 'add' ? props.addText || t('addText') : [h("div", [t('name') + "\uFF1A" + props.name]), h("div", [t('tel') + "\uFF1A" + props.tel])]]);
}

ContactCard.props = {
  tel: String,
  name: String,
  addText: String,
  editable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'add'
  }
};
export default createComponent(ContactCard);
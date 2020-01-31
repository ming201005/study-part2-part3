import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../utils';
import { RED } from '../utils/constant';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Cell from '../cell';
import Button from '../button';
import Radio from '../radio';
import RadioGroup from '../radio-group'; // Types

var _createNamespace = createNamespace('contact-list'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

function ContactList(h, props, slots, ctx) {
  var List = props.list && props.list.map(function (item, index) {
    function onClick() {
      emit(ctx, 'input', item.id);
      emit(ctx, 'select', item, index);
    }

    function Content() {
      return h(Radio, {
        "attrs": {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": RED
        },
        "on": {
          "click": onClick
        }
      }, [h("div", {
        "class": bem('name')
      }, [item.name + "\uFF0C" + item.tel])]);
    }

    function RightIcon() {
      return h(Icon, {
        "attrs": {
          "name": "edit"
        },
        "class": bem('edit'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();
            emit(ctx, 'edit', item, index);
          }
        }
      });
    }

    return h(Cell, {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "valueClass": bem('item-value')
      },
      "class": bem('item'),
      "scopedSlots": {
        default: Content,
        'right-icon': RightIcon
      },
      "on": {
        "click": onClick
      }
    });
  });
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [h(RadioGroup, {
    "attrs": {
      "value": props.value
    },
    "class": bem('group')
  }, [List]), h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.addText || t('addText')
    },
    "class": bem('add'),
    "on": {
      "click": function click() {
        emit(ctx, 'add');
      }
    }
  })]);
}

ContactList.props = {
  value: null,
  list: Array,
  addText: String
};
export default createComponent(ContactList);
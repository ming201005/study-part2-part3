import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio'; // Types

var _createNamespace = createNamespace('address-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
      switchable = props.switchable;

  function onClick() {
    if (switchable) {
      emit(ctx, 'select');
    }

    emit(ctx, 'click');
  }

  var genRightIcon = function genRightIcon() {
    return h(Icon, {
      "attrs": {
        "name": "edit"
      },
      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          emit(ctx, 'edit');
          emit(ctx, 'click');
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
    return switchable && !disabled ? h(Radio, {
      "attrs": {
        "name": data.id,
        "iconSize": 16
      }
    }, [Info]) : Info;
  };

  return h(Cell, _mergeJSXProps([{
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
  }, inherit(ctx)]));
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean
};
export default createComponent(AddressItem);
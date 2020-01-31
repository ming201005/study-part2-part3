import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace, isDef } from '../utils';
import { cellProps } from './shared';
import { emit, inherit } from '../utils/functional';
import { routeProps, functionalRoute } from '../utils/router';
import Icon from '../icon'; // Types

var _createNamespace = createNamespace('cell'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Cell(h, props, slots, ctx) {
  var icon = props.icon,
      size = props.size,
      title = props.title,
      label = props.label,
      value = props.value,
      isLink = props.isLink,
      arrowDirection = props.arrowDirection;
  var showTitle = slots.title || isDef(title);
  var showValue = slots.default || isDef(value);
  var showLabel = slots.label || isDef(label);
  var Label = showLabel && h("div", {
    "class": [bem('label'), props.labelClass]
  }, [slots.label ? slots.label() : label]);
  var Title = showTitle && h("div", {
    "class": [bem('title'), props.titleClass],
    "style": props.titleStyle
  }, [slots.title ? slots.title() : h("span", [title]), Label]);
  var Value = showValue && h("div", {
    "class": [bem('value', {
      alone: !slots.title && !title
    }), props.valueClass]
  }, [slots.default ? slots.default() : h("span", [value])]);
  var LeftIcon = slots.icon ? slots.icon() : icon && h(Icon, {
    "class": bem('left-icon'),
    "attrs": {
      "name": icon
    }
  });
  var rightIconSlot = slots['right-icon'];
  var RightIcon = rightIconSlot ? rightIconSlot() : isLink && h(Icon, {
    "class": bem('right-icon'),
    "attrs": {
      "name": arrowDirection ? "arrow-" + arrowDirection : 'arrow'
    }
  });

  function onClick(event) {
    emit(ctx, 'click', event);
    functionalRoute(ctx);
  }

  var clickable = isLink || props.clickable;
  var classes = {
    clickable: clickable,
    center: props.center,
    required: props.required,
    borderless: !props.border
  };

  if (size) {
    classes[size] = size;
  }

  return h("div", _mergeJSXProps([{
    "class": bem(classes),
    "attrs": {
      "role": clickable ? 'button' : null,
      "tabindex": clickable ? 0 : null
    },
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [LeftIcon, Title, Value, RightIcon, slots.extra && slots.extra()]);
}

Cell.props = _extends({}, cellProps, {}, routeProps);
export default createComponent(Cell);
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace, isDef } from '../utils';
import { emit, inherit } from '../utils/functional';
import Tag from '../tag';
import Image from '../image'; // Types

var _createNamespace = createNamespace('card'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Card(h, props, slots, ctx) {
  var thumb = props.thumb;
  var showNum = slots.num || isDef(props.num);
  var showPrice = slots.price || isDef(props.price);
  var showOriginPrice = slots['origin-price'] || isDef(props.originPrice);
  var showBottom = showNum || showPrice || showOriginPrice;

  function onThumbClick(event) {
    emit(ctx, 'click-thumb', event);
  }

  function ThumbTag() {
    if (slots.tag || props.tag) {
      return h("div", {
        "class": bem('tag')
      }, [slots.tag ? slots.tag() : h(Tag, {
        "attrs": {
          "mark": true,
          "type": "danger"
        }
      }, [props.tag])]);
    }
  }

  function Thumb() {
    if (slots.thumb || thumb) {
      return h("a", {
        "attrs": {
          "href": props.thumbLink
        },
        "class": bem('thumb'),
        "on": {
          "click": onThumbClick
        }
      }, [slots.thumb ? slots.thumb() : h(Image, {
        "attrs": {
          "src": thumb,
          "width": "100%",
          "height": "100%",
          "fit": "contain",
          "lazy-load": props.lazyLoad
        }
      }), ThumbTag()]);
    }
  }

  function Title() {
    if (slots.title) {
      return slots.title();
    }

    if (props.title) {
      return h("div", {
        "class": [bem('title'), 'van-multi-ellipsis--l2']
      }, [props.title]);
    }
  }

  function Desc() {
    if (slots.desc) {
      return slots.desc();
    }

    if (props.desc) {
      return h("div", {
        "class": [bem('desc'), 'van-ellipsis']
      }, [props.desc]);
    }
  }

  function Price() {
    if (showPrice) {
      return h("div", {
        "class": bem('price')
      }, [slots.price ? slots.price() : props.currency + " " + props.price]);
    }
  }

  function OriginPrice() {
    if (showOriginPrice) {
      var slot = slots['origin-price'];
      return h("div", {
        "class": bem('origin-price')
      }, [slot ? slot() : props.currency + " " + props.originPrice]);
    }
  }

  function Num() {
    if (showNum) {
      return h("div", {
        "class": bem('num')
      }, [slots.num ? slots.num() : "x " + props.num]);
    }
  }

  function Footer() {
    if (slots.footer) {
      return h("div", {
        "class": bem('footer')
      }, [slots.footer()]);
    }
  }

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx, true)]), [h("div", {
    "class": bem('header')
  }, [Thumb(), h("div", {
    "class": bem('content', {
      centered: props.centered
    })
  }, [Title(), Desc(), slots.tags && slots.tags(), showBottom && h("div", {
    "class": "van-card__bottom"
  }, [Price(), OriginPrice(), Num(), slots.bottom && slots.bottom()])])]), Footer()]);
}

Card.props = {
  tag: String,
  desc: String,
  thumb: String,
  title: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  num: [Number, String],
  price: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥'
  }
};
export default createComponent(Card);
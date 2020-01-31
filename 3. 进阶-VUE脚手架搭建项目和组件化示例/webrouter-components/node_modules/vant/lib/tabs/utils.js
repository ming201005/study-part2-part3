"use strict";

exports.__esModule = true;
exports.scrollLeftTo = scrollLeftTo;

var _raf = require("../utils/dom/raf");

function scrollLeftTo(el, to, duration) {
  var count = 0;
  var from = el.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    el.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      (0, _raf.raf)(animate);
    }
  }

  animate();
}
import { raf } from '../utils/dom/raf';
export function scrollLeftTo(el, to, duration) {
  var count = 0;
  var from = el.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    el.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      raf(animate);
    }
  }

  animate();
}
/**
 * @author wuyiccc
 * @date 2020/12/27 22:20
 * 岂曰无衣, 与子同袍
 */
import { check } from "../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default {
  install
};

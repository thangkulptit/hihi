import {Directive} from "vue";

const getEl = (el: Element) => {
  let inputEl;
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    inputEl = el;
  } else {
    inputEl = el.querySelector("input") || el.querySelector("textarea");
  }
  if (inputEl) {
    inputEl.trimString = () => {
      inputEl.value = inputEl.value?.trim();
      dispatch(inputEl);
    };
  }
  return inputEl || null;
};

function dispatch(el: Element) {
  el.dispatchEvent(new Event("input", {bubbles: true}));
}

const trimDirective: Directive = {
  mounted(el) {
    const inputEl = getEl(el);
    if (inputEl) {
      inputEl.addEventListener("blur", inputEl.trimString);
    }
  },
  unmounted(el) {
    const inputEl = getEl(el);
    if (inputEl) {
      inputEl.removeEventListener("blur", inputEl.trimString);
    }
  },
};

export default trimDirective;

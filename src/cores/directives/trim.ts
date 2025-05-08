import { Directive, DirectiveBinding } from 'vue';

interface HTMLElementWithTrim extends HTMLElement {
  _trimHandler?: () => void;
}

interface HTMLInputElementWithTrim extends HTMLInputElement {
  _trimHandler?: () => void;
}

interface HTMLTextAreaElementWithTrim extends HTMLTextAreaElement {
  _trimHandler?: () => void;
}

/**
 * Tìm phần tử input/textarea từ element được directive gắn vào
 * @param el Element được directive gắn vào
 * @returns HTMLInputElement | HTMLTextAreaElement | null
 */
const getInputElement = (
  el: HTMLElement
): HTMLInputElementWithTrim | HTMLTextAreaElementWithTrim | null => {
  // Nếu el chính là input hoặc textarea
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    return el as HTMLInputElementWithTrim | HTMLTextAreaElementWithTrim;
  }
  
  // Tìm kiếm input hoặc textarea con
  const inputEl = el.querySelector('input') || el.querySelector('textarea');
  return inputEl as HTMLInputElementWithTrim | HTMLTextAreaElementWithTrim | null;
};

/**
 * Kích hoạt sự kiện input để cập nhật v-model
 * @param el Phần tử input/textarea
 */
const dispatchInputEvent = (el: HTMLInputElement | HTMLTextAreaElement): void => {
  el.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Directive v-trim: Tự động xóa khoảng trắng thừa khi blur khỏi input/textarea
 */
const vTrim: Directive = {
  mounted(el: HTMLElementWithTrim, binding: DirectiveBinding): void {
    const inputEl = getInputElement(el);
    
    if (!inputEl) return;
    
    // Tạo hàm xử lý trim và cập nhật giá trị
    inputEl._trimHandler = (): void => {
      const currentValue = inputEl.value;
      // Chỉ xử lý khi có giá trị và có khoảng trắng thừa
      if (currentValue && currentValue !== currentValue.trim()) {
        inputEl.value = currentValue.trim();
        dispatchInputEvent(inputEl);
      }
    };
    
    // Thêm event listener cho sự kiện blur
    inputEl.addEventListener('blur', inputEl._trimHandler);
  },
  
  beforeUnmount(el: HTMLElementWithTrim): void {
    const inputEl = getInputElement(el);
    
    if (!inputEl || !inputEl._trimHandler) return;
    
    // Xóa event listener khi component bị hủy
    inputEl.removeEventListener('blur', inputEl._trimHandler);
    delete inputEl._trimHandler;
  }
};

export default vTrim;
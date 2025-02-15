// utils/form/numberInputUtils.js

/**
 * 숫자 입력 필드에서 숫자 이외의 키 입력 차단
 * @param {KeyboardEvent} event - 키보드 이벤트 객체
 */
export const handleKeyDown = (event) => {
  const { key } = event;

  // 허용할 키 목록
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];

  // 숫자가 아니고 허용된 키도 아니라면 입력 차단
  if (!/^\d$/.test(key) && !allowedKeys.includes(key)) {
    event.preventDefault();
  }
};

/**
 * 숫자 외에 다른 값 붙여넣기 방지
 * @param {ClipboardEvent} event - 클립보드 이벤트 객체
 */
export const handlePaste = (event) => {
  const pastedText = event.clipboardData.getData("text");

  // 숫자가 아닌 값이 포함되어 있다면 붙여넣기 차단
  if (isNaN(Number(pastedText))) {
    event.preventDefault();
  }
};
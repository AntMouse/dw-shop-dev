// utils/state/stateUtils.js

/**
 * ✅ 상태 업데이트 유틸 함수 (단순 값 비교)
 * @param {function} setState - 업데이트할 setState 함수
 * @param {*} prevValue - 이전 값
 * @param {*} newValue - 새로운 값
 * @param {function} setTrigger - 동일한 값일 때 변경할 트리거 상태
 */
export const updateStateSimple = (prevValue, newValue, setTrigger) => {
  if (prevValue === newValue) {
    setTrigger(prevTrigger => !prevTrigger); // ✅ 값이 동일하면 트리거 변경
    return prevValue; // ✅ 기존 값 유지
  }
  return newValue; // ✅ 값이 다르면 업데이트
};

/**
 * ✅ 상태 업데이트 유틸 함수 (JSON 기반 비교)
 * @param {function} setState - 업데이트할 setState 함수
 * @param {*} prevValue - 이전 값
 * @param {*} newValue - 새로운 값
 * @param {function} setTrigger - 동일한 값일 때 변경할 트리거 상태
 */
export const updateStateWithJson = (prevValue, newValue, setTrigger) => {
  if (JSON.stringify(prevValue) === JSON.stringify(newValue)) {
    setTrigger(prevTrigger => !prevTrigger); // ✅ 값이 동일하면 트리거 변경
    return prevValue; // ✅ 기존 값 유지
  }
  return newValue; // ✅ 값이 다르면 업데이트
};
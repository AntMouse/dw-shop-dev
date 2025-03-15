// utils/styles/styleUtils.js

/**
 * ✅ 공통 스타일을 반환하는 유틸 함수
 * @param {boolean} useCustomStyles - 사용자 정의 스타일 사용 여부
 * @param {string} customClass - 사용자 정의 스타일 클래스
 * @param {string} defaultStyles - 기본 스타일 클래스
 * @returns {string} 적용할 스타일 클래스
 */
export const getCommonStyles = (useCustomStyles, customClass, defaultStyles) => {
  return useCustomStyles ? customClass : defaultStyles;
};
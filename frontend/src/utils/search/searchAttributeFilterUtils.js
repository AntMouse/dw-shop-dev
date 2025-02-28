// utils/search/searchAttributeFilterUtils.js
/**
 * ✅ 속성 필터링 함수 (성별, 등급 등)
 * @param {Array} items - 검색할 객체 배열
 * @param {Object} filters - 속성 필터 (예: { gender: "male", status: "active" })
 * @returns {Array} - 필터링된 결과 배열
 */
export const filterItemsByAttributes = (items, filters = {}) => {
  if (!Array.isArray(items)) return [];

  return items.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // 필터가 없으면 해당 필드는 무시
      return item[key] === value;
    })
  );
};
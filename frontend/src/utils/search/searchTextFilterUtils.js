// utils/search/searchTextFilterUtils.js

/**
 * ✅ 특정 값이 검색어를 포함하는지 확인하는 함수
 * @param {any} value - 검색할 값 (문자열 또는 숫자)
 * @param {string} searchTerm - 검색어
 * @returns {boolean} - 검색어가 포함되었는지 여부
 */
const isMatch = (value, searchTerm) => {
  if (typeof value === "string") return value.toLowerCase().includes(searchTerm.toLowerCase());
  if (typeof value === "number") return value.toString().includes(searchTerm);
  return false;
};

/**
 * ✅ 텍스트 검색 함수 (단일 및 다중 필드 검색 지원)
 * @param {Array} items - 검색할 객체 배열
 * @param {string} searchTerm - 검색어
 * @param {string | string[]} searchFields - 검색 기준 필드 (단일 필드 또는 다중 필드)
 * @returns {Array} - 검색 결과가 포함된 배열
 */
export const filterItemsBySearchTerm = (items, searchTerm, searchFields) => {
  if (!Array.isArray(items)) return [];
  if (typeof searchTerm !== "string" || !searchFields) return items;

  return items.filter((item) => {
    if (typeof searchFields === "string") {
      return isMatch(item?.[searchFields], searchTerm);
    }

    if (Array.isArray(searchFields)) {
      return searchFields.some((field) => isMatch(item?.[field], searchTerm));
    }

    return false;
  });
};
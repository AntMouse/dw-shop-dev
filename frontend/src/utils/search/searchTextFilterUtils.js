// utils/search/searchTextFilterUtils.js

/**
 * ✅ 텍스트 검색 함수
 * @param {Array} items - 검색할 객체 배열
 * @param {string} searchTerm - 검색어
 * @param {string} searchField - 검색 기준 필드 (예: "name", "email")
 * @returns {Array} - 검색 결과가 포함된 배열
 */
export const filterItemsBySearchTerm = (items, searchTerm, searchField) => {
  if (!Array.isArray(items)) return [];
  if (typeof searchTerm !== "string" || !searchTerm.trim()) return items;
  if (!searchField) return items; // 필드가 지정되지 않았을 경우 전체 검색

  return items.filter((item) => {
    const value = item?.[searchField];
    if (typeof value === "string") return value.toLowerCase().includes(searchTerm.toLowerCase());
    if (typeof value === "number") return value.toString().includes(searchTerm);
    return false;
  });
};
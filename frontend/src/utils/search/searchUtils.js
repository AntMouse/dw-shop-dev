// utils/search/searchUtils.js

/**
 * ✅ 범용 검색 함수: 어떤 객체 배열이든 특정 키를 기준으로 검색 가능
 * @param {Array} items - 검색할 객체 배열 (예: members, products, orders)
 * @param {string} searchTerm - 검색어
 * @param {string} criteria - 검색 기준이 되는 키 (예: "memberId", "productName")
 * @returns {Array} - 검색 결과가 포함된 배열
 */
export const filterItemsBySearchTerm = (items, searchTerm, criteria) => {
  if (!Array.isArray(items)) return []; // ✅ items가 배열이 아닐 경우 빈 배열 반환
  if (typeof searchTerm !== "string" || !searchTerm.trim()) return items; // ✅ 검색어가 없거나 공백만 있을 경우 원본 반환
  if (!criteria) return []; // ✅ 검색 기준이 되는 키(criteria)가 제공되지 않으면 빈 배열 반환

  return items.filter((item) => {
    const value = item?.[criteria];

    if (typeof value === "string") {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (typeof value === "number") {
      return value.toString().includes(searchTerm); // ✅ 숫자 타입을 문자열로 변환 후 검색
    }

    return false; // ✅ 문자열 또는 숫자가 아닌 경우 검색 대상에서 제외
  });
};
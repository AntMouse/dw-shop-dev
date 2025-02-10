// utils/sort/sortUtils.js

/**
 * ✅ 범용 정렬 함수: 어떤 객체 배열이든 정렬 가능
 * @param {Array} items - 정렬할 객체 배열
 * @param {string} criteria - 정렬 기준이 되는 키
 * @param {string} [direction="asc"] - 정렬 방향 ("asc" 또는 "desc")
 * @returns {Array} - 정렬된 배열
 */
export const getSortedItems = (items, criteria, direction = "asc") => {
  if (!Array.isArray(items) || items.length === 0) return items; // ✅ items가 배열이 아닐 경우 원본 반환
  if (!criteria) return items; // ✅ 정렬 기준이 없을 경우 원본 반환

  const sortedItems = [...items];
  const sortDirectionMultiplier = direction === "asc" ? 1 : -1;

  sortedItems.sort((a, b) => {
    const valueA = a?.[criteria];
    const valueB = b?.[criteria];

    // ✅ 숫자 정렬 (더 직관적인 typeof 체크 사용)
    if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA - valueB) * sortDirectionMultiplier;
    }

    // ✅ 문자열 정렬
    const strA = typeof valueA === "string" ? valueA.toLowerCase() : "";
    const strB = typeof valueB === "string" ? valueB.toLowerCase() : "";

    if (strA < strB) return -1 * sortDirectionMultiplier;
    if (strA > strB) return 1 * sortDirectionMultiplier;
    return 0;
  });

  return sortedItems;
};

/**
 * ✅ 필터링 후 정렬된 목록 반환
 * @param {Array} items - 필터링 및 정렬할 객체 배열
 * @param {Function|null} filterCriteria - 필터링 기준 함수 (콜백)
 * @param {string} sortCriteria - 정렬 기준이 되는 키
 * @param {string} sortDirection - 정렬 방향 ("asc" 또는 "desc")
 * @returns {Array} - 필터링 및 정렬된 배열
 */
export const getFilteredAndSortedItems = (items, filterCriteria, sortCriteria, sortDirection) => {
  let filteredItems = items;

  // ✅ filterCriteria가 함수인지 확인 후 적용
  if (typeof filterCriteria === "function") {
    filteredItems = items.filter(filterCriteria);
  }

  return getSortedItems(filteredItems, sortCriteria, sortDirection);
};
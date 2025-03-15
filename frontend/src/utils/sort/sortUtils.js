// utils/sort/sortUtils.js

/**
 * ✅ 숫자 포함 문자열 정렬 함수
 * @param {string} a - 비교할 첫 번째 값
 * @param {string} b - 비교할 두 번째 값
 * @returns {number} - 정렬 순서 (-1, 0, 1)
 */
const naturalSort = (a, b) => {
  const regex = /(\d+(\.\d+)?)|(\D+)/g; // 숫자 포함 정규식 수정 (소수점 포함)
  const aParts = a.match(regex);
  const bParts = b.match(regex);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i];
    const bPart = bParts[i];

    if (aPart === undefined) return -1;
    if (bPart === undefined) return 1;

    const aNum = parseFloat(aPart);
    const bNum = parseFloat(bPart);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      if (aNum !== bNum) return aNum - bNum;
    } else {
      if (aPart !== bPart) return aPart.localeCompare(bPart);
    }
  }
  return 0;
};

/**
 * ✅ 범용 정렬 함수: 어떤 객체 배열이든 정렬 가능
 * @param {Array} items - 정렬할 객체 배열
 * @param {string} criteria - 정렬 기준이 되는 키
 * @param {string} [direction="asc"] - 정렬 방향 ("asc" 또는 "desc")
 * @returns {Array} - 정렬된 배열
 */
export const sortByCriteriaAndDirection = (items, criteria, direction = "asc") => {
  if (!Array.isArray(items) || items.length === 0) return [];
  if (!criteria) return items;

  const sortedItems = [...items];
  const sortDirectionMultiplier = direction === "asc" ? 1 : -1;

  sortedItems.sort((a, b) => {
    const valueA = a?.[criteria];
    const valueB = b?.[criteria];

    // ✅ 숫자인 경우
    if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA - valueB) * sortDirectionMultiplier;
    }

    // ✅ 날짜 문자열 처리 (YYYY-MM-DD, MM/DD/YYYY 등의 형식)
    if (Date.parse(valueA) && Date.parse(valueB)) {
      return (Date.parse(valueA) - Date.parse(valueB)) * sortDirectionMultiplier;
    }

    // ✅ 문자열 정렬 (대소문자 무시)
    if (typeof valueA === "string" && typeof valueB === "string") {
      return naturalSort(valueA.toLowerCase(), valueB.toLowerCase()) * sortDirectionMultiplier;
    }

    return 0;
  });

  return sortedItems;
};
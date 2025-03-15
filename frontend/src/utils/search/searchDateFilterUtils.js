// utils/search/searchDateFilterUtils.js
/**
 * ✅ 기간별 필터링 함수
 * @param {Array} items - 검색할 객체 배열
 * @param {string} dateField - 날짜 필드 (예: "createdAt")
 * @param {Date|string} startDate - 검색 시작 날짜 (null이면 전체)
 * @param {Date|string} endDate - 검색 종료 날짜 (null이면 전체)
 * @returns {Array} - 기간에 해당하는 결과 배열
 */
export const filterItemsByDateRange = (items, dateField, startDate = null, endDate = null) => {
  if (!Array.isArray(items)) return [];
  if (!dateField) return items; // 날짜 필드가 없으면 전체 반환

  return items.filter((item) => {
    const itemDate = new Date(item?.[dateField]);
    if (isNaN(itemDate)) return false;

    if (startDate && endDate) {
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    }
    return true;
  });
};

/**
 * ✅ 미리 정의된 기간 옵션을 처리하는 함수
 * @param {string} period - 기간 옵션 ("1일", "1주", "1개월", "6개월", "1년", "전체")
 * @returns {Object} - { startDate, endDate } 반환
 */
export const getDateRangeFromOption = (period, customStart = null, customEnd = null) => {
  const today = new Date();
  let startDate = null;
  let endDate = today;

  switch (period) {
    case "1일":
      startDate = new Date();
      startDate.setDate(today.getDate() - 1); // ✅ today를 변경하지 않고 새 객체에 적용
      break;
    case "1주":
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
      break;
    case "1개월":
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 1);
      break;
    case "6개월":
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 6);
      break;
    case "1년":
      startDate = new Date();
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case "직접 입력":
      startDate = customStart && customStart !== "" ? new Date(customStart) : null;
      endDate = customEnd && customEnd !== "" ? new Date(customEnd) : null;
      break;
    case "전체":
    default:
      startDate = null;
  }

  return { startDate, endDate };
};
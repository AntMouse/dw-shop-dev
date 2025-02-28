// utils/pagination/paginationUtils.js

/**
 * ✅ 현재 페이지에 맞게 아이템을 가져오는 함수
 * @param {Array} items - 전체 아이템 목록
 * @param {number} currentPage - 현재 페이지
 * @param {number} itemsPerPage - 페이지당 아이템 개수
 * @returns {Array} - 현재 페이지에 해당하는 아이템 목록
 */
export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
  if (!Array.isArray(items) || items.length === 0) return []; // ✅ 배열이 아니거나 빈 배열이면 빈 배열 반환

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const validPage = Math.min(Math.max(1, currentPage), totalPages); // ✅ currentPage 자동 보정

  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

/**
 * ✅ 페이지 수 계산 함수
 * @param {number} totalItems - 전체 아이템 개수
 * @param {number} itemsPerPage - 페이지당 아이템 개수
 * @returns {number} - 전체 페이지 개수
 */
export const calculateTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage) || 1; // ✅ 최소 1페이지는 존재
};

/**
 * ✅ 페이지 버튼 범위 계산 함수
 * @param {number} currentPage - 현재 페이지
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} maxPageButtons - 표시할 최대 페이지 버튼 수 (기본값: 10)
 * @returns {Object} - 시작 페이지 및 종료 페이지 범위
 */
export const calculatePaginationRange = (currentPage, totalPages, maxPageButtons = 10) => {
  const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(1, currentPage - halfMaxPageButtons);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageButtons);

  if (currentPage <= halfMaxPageButtons) {
    endPage = Math.min(totalPages, maxPageButtons);
  }

  if (currentPage > totalPages - halfMaxPageButtons) {
    startPage = Math.max(1, totalPages - maxPageButtons + 1);
  }

  return { startPage, endPage };
};

/**
 * ✅ 페이지당 항목 개수 변경 핸들러 (공용 함수)
 */
export const handleItemsPerPageChange = (event, setItemsPerPage, setCurrentPage) => {
  const newItemsPerPage = Number(event.target.value);
  if (isNaN(newItemsPerPage) || newItemsPerPage <= 0) return; // ✅ 방어 코드 추가
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(1); // ✅ 페이지네이션을 처음부터 다시 시작
};
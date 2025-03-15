// utils/pagination/paginationUtils.js

/**
 * 전체 페이지 수 계산
 * @param {number} totalItems - 전체 아이템 개수
 * @param {number} itemsPerPage - 페이지당 아이템 개수
 * @returns {number} - 전체 페이지 개수
 */
export const getTotalPagesCount = (totalItems, itemsPerPage) => {
  if (totalItems < 0 || itemsPerPage < 1) return 1;
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
};

/**
 * ✅ 전체 페이지 그룹 개수 계산
 * @param {number} totalPages - 전체 페이지 개수
 * @param {number} maxPageButtons - 한 페이지 그룹에서 보여줄 버튼 개수 (기본값: 10)
 * @returns {number} - 전체 페이지 그룹 개수
 */
export const getTotalPageGroups = (totalPages, maxPageButtons = 10) => {
  if (totalPages < 1 || maxPageButtons < 1) return 1;
  return Math.ceil(totalPages / maxPageButtons);
};

/**
 * ✅ 현재 페이지가 속한 페이지 그룹을 계산하는 함수
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} maxPageButtons - 한 페이지 그룹에서 보여줄 버튼 개수 (기본값: 10)
 * @returns {number} - 현재 페이지 그룹
 */
export const getCurrentPageGroup = (currentPage, maxPageButtons = 10) => {
  if (currentPage < 1 || maxPageButtons < 1) return 1;
  return Math.ceil(currentPage / maxPageButtons);
};

// 현재 페이징 그룹의 시작/끝 페이지 번호 계산
export const getPaginationRange = (currentPageGroup, totalPages, maxPageButtons = 10) => {
  maxPageButtons = Math.max(1, maxPageButtons);
  if (totalPages < 1) return { startPage: 1, endPage: 1 };

  const startPage = Math.max(1, (currentPageGroup - 1) * maxPageButtons + 1);
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  return { startPage, endPage };
};

/**
 * 현재 페이지에 있어야 하는 데이터 가져오기
 * @param {Array} items - 전체 아이템 목록
 * @param {number} currentPage - 현재 페이지
 * @param {number} itemsPerPage - 페이지당 아이템 개수
 * @returns {Array} - 현재 페이지에 해당하는 아이템 목록
 */
export const getCurrentPageItems = (items, currentPage, itemsPerPage) => {
  if (!Array.isArray(items) || items.length === 0 || itemsPerPage < 1) return [];

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  if (currentPage < 1) return [];
  const validPage = Math.min(currentPage, totalPages); // 유효 페이지 보정

  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length); // slice에서 마지막 인덱스 -1 계산

  return items.slice(startIndex, endIndex); // 마지막 인덱스 -1로 계산
};

// 페이지당 아이템 개수 변경(한 페이지에 아이템을 몇 개 나오게 할지 변경하는 함수)
export const updateItemsPerPage = (event, setItemsPerPage, setCurrentPage, items, currentPage, itemsPerPage) => {
  // 페이지당 아이템 갯수를 변경한 값이 숫자인지 확인
  const newItemsPerPage = Number(event?.target?.value);
  if (isNaN(newItemsPerPage) || newItemsPerPage < 1) return;

  // 현재 페이지에 나온 데이터를 찾고, 거기서 가장 처음에 나오는 데이터를 찾아서 선언
  const currentPageItems = getCurrentPageItems(items, currentPage, itemsPerPage);
  const referenceItem = currentPageItems.length > 0 ? currentPageItems[0] : null;

  // 페이지당 아이템 개수 업데이트
  setItemsPerPage(newItemsPerPage);

  // 따로 이동할 페이지를 정할 기준 데이터(순서)가 없으면 1페이지로 이동
  if (!referenceItem) {
    setCurrentPage(1);
    return;
  }

  // ✅ 기준 데이터의 새로운 위치 찾기
  const newIndex = items.findIndex(item => item.id === referenceItem.id);
  
  if (newIndex === -1) {
    setCurrentPage(1); // 만약 데이터가 없다면 1페이지로 이동
    return;
  }

  // ✅ 기준 데이터가 있는 페이지로 이동
  const newCurrentPage = Math.floor(newIndex / newItemsPerPage) + 1;
  setCurrentPage(newCurrentPage);
};

// 페이지에서 화살표 클릭시 현재 페이지, 페이지 그룹 계산
export const updateCurrentPageAndGroupOnNavigation = (
  action, currentPage, totalPages, currentPageGroup, totalPageGroups, maxPageButtons = 10
) => {
  let newPage = currentPage;
  let newCurrentPageGroup = currentPageGroup;

  switch (action) {
    case "first": // << 버튼: 첫 번째 페이지로 이동
      if (currentPage > 1) {
        newPage = 1;
        newCurrentPageGroup = 1;
      }
      break;

    case "prev": // < 버튼: 이전 그룹으로 이동
      if (currentPageGroup > 1) {
        newCurrentPageGroup = currentPageGroup - 1;
        newPage = (newCurrentPageGroup - 1) * maxPageButtons + 1;
      }
      break;

    case "next": // > 버튼: 다음 그룹으로 이동
      if (currentPageGroup < totalPageGroups) {
        newCurrentPageGroup = currentPageGroup + 1;
        newPage = (newCurrentPageGroup - 1) * maxPageButtons + 1;
      }
      break;

    case "last": // >> 버튼: 마지막 페이지로 이동
      if (currentPage < totalPages) {
        newPage = totalPages;
        newCurrentPageGroup = totalPageGroups;
      }
      break;

    default:
      return { currentPage, currentPageGroup };
  }

  return { currentPage: newPage, currentPageGroup: newCurrentPageGroup };
};

// 숫자 버튼 클릭 시 현재 페이지 변경 함수
export const updateCurrentPage = (pageNumber, currentPage) => {
  if (pageNumber !== currentPage) {
    return { currentPage: pageNumber };
  }
  return { currentPage };
};
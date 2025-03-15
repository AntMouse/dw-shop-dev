// hooks/admin/shared/useAdminPagination.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { 
  getTotalPagesCount, 
  getTotalPageGroups,
  getCurrentPageGroup,
  getPaginationRange, 
  getCurrentPageItems,
  updateItemsPerPage,
  updateCurrentPageAndGroupOnNavigation,
  updateCurrentPage,
} from "../../../utils/pagination/paginationUtils";

/**
 * ✅ 공용 관리자 페이지네이션 훅
 * @param {Array} items - 페이지네이션을 적용할 데이터 목록
 * @param {Array} perPageOptions - 페이지당 항목 개수 옵션 리스트 (기본값: [5, 10, 20, 50])
 * @param {number} maxPageButtons - 최대 페이지 버튼 개수 (기본값: 10)
 */
export const useAdminPagination = (items = [], perPageOptions = [5, 10, 20, 50], maxPageButtons = 10) => {
  const defaultItemsPerPage = perPageOptions[0];
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPageGroups, setTotalPageGroups] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1); // 1~10, 11~20 등의 페이지 그룹
  const [startPage, setStartPage] = useState(1); // 현재 페이지 그룹의 시작 페이지
  const [endPage, setEndPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage); // 한 페이지에 표시할 아이템 수

  // ✅ 현재 페이지에 해당하는 데이터 추출
  const itemsInCurrentPage = getCurrentPageItems(items, currentPage, itemsPerPage);

  // ✅ 전체 페이지 업데이트 함수
  const updateTotalPages = () => {
    const newTotalPages = getTotalPagesCount(items.length, itemsPerPage);
    setTotalPages(newTotalPages);
    return newTotalPages;
  };

  // ✅ 전체 페이지 그룹 업데이트 함수
  const updateTotalPageGroups = (newTotalPages = totalPages) => {
    const newTotalPageGroups = getTotalPageGroups(newTotalPages, maxPageButtons);
    setTotalPageGroups(newTotalPageGroups);
  };

  // ✅ 현재 페이지가 속한 페이지 그룹 업데이트
  const updateCurrentPageGroup = (newCurrentPage = currentPage) => {
    const newCurrentPageGroup = getCurrentPageGroup(newCurrentPage, maxPageButtons);
    setCurrentPageGroup(newCurrentPageGroup);
    return newCurrentPageGroup;
  };

  // ✅ 시작 페이지 및 끝 페이지 업데이트 함수
  const updateStartAndEndPages = (newCurrentPageGroup = currentPageGroup, newTotalPages = totalPages) => {
    const { startPage: newStartPage, endPage: newEndPage } = 
    getPaginationRange(newCurrentPageGroup, newTotalPages, maxPageButtons);

    setStartPage(newStartPage);
    setEndPage(newEndPage);
  };

  // ✅ 페이지당 아이템 개수 변경 핸들러
  const handleItemsPerPageChange = (event) => {
    updateItemsPerPage(event, setItemsPerPage, setCurrentPage, items, currentPage, itemsPerPage);
  };

  // ✅ 화살표 클릭 시 페이지 그룹 업데이트
  const handlePageNavigation = (action) => {
    const { currentPage: newPage, currentPageGroup: newCurrentPageGroup } = 
      updateCurrentPageAndGroupOnNavigation(action, currentPage, totalPages, currentPageGroup, totalPageGroups, maxPageButtons);

    setCurrentPage(newPage);
    setCurrentPageGroup(newCurrentPageGroup);
  };

  // 숫자 버튼 클릭으로 현재 페이지 이동
  const handlePageChange = (pageNumber) => {
    setCurrentPage(prevPage => {
      const { currentPage: newPage } = updateCurrentPage(pageNumber, prevPage);
      return newPage;
    });
  };

  const updatePagination = () => {
    const newTotalPages = updateTotalPages();
    updateTotalPageGroups(newTotalPages);
    const newCurrentPageGroup = updateCurrentPageGroup(1);
    updateStartAndEndPages(newCurrentPageGroup, newTotalPages);
  };
  
  return {
    totalPages,
    currentPage,
    setCurrentPage,
    totalPageGroups,
    currentPageGroup,
    setCurrentPageGroup,
    startPage,
    endPage,
    itemsPerPage,
    setItemsPerPage,
    itemsInCurrentPage,
    updateTotalPages,
    updateTotalPageGroups,
    updateCurrentPageGroup,
    updateStartAndEndPages,
    handleItemsPerPageChange,
    handlePageNavigation,
    handlePageChange,
  };
};
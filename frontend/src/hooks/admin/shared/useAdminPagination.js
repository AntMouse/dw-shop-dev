// hooks/admin/shared/useAdminPagination.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { calculateTotalPages, calculatePaginationRange, handleItemsPerPageChange } from "../../../utils/pagination/paginationUtils";

/**
 * ✅ 공용 관리자 페이지네이션 훅
 * @param {Array} items - 페이지네이션을 적용할 데이터 목록
 * @param {Array} perPageOptions - 페이지당 항목 개수 옵션 리스트 (기본값: [5, 10, 20, 50])
 * @param {number} maxPageButtons - 최대 페이지 버튼 개수 (기본값: 10)
 */
export const useAdminPagination = (items = [], perPageOptions = [5, 10, 20, 50], maxPageButtons = 10) => {
  const defaultItemsPerPage = perPageOptions[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // ✅ 전체 페이지 수 계산
  const totalPages = calculateTotalPages(items.length, itemsPerPage);
  const { startPage, endPage } = calculatePaginationRange(currentPage, totalPages, maxPageButtons);

  const handlePerPageChange = (event) => {
    handleItemsPerPageChange(event, setItemsPerPage, setCurrentPage);
  }

  // ✅ 현재 페이지에 해당하는 데이터 추출
  const currentItems = items?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    startPage,
    endPage,
    perPageOptions,
    handleItemsPerPageChange: handlePerPageChange,
    currentItems,
  };
};
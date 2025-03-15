// hooks/admin/shared/useAdminSort.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { sortByCriteriaAndDirection } from "../../../utils/sort/sortUtils"; 
import { updateStateWithJson } from "../../../utils/state/stateUtils";

/**
 * ✅ 공통 정렬 훅
 * @param {Array} items - 정렬할 데이터 배열 (회원, 상품, 주문 등)
 * @param {string} defaultCriteria - 기본 정렬 기준 (예: "memberId", "productId" 등)
 * @param {string} defaultDirection - 기본 정렬 방향 ("asc" 또는 "desc")
 */
export const useAdminSort = (items = [], defaultCriteria = "id", defaultDirection = "asc") => {
  const [sortCriteria, setSortCriteria] = useState(defaultCriteria);
  const [sortDirection, setSortDirection] = useState(defaultDirection);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedItemsTrigger, setSortedItemsTrigger] = useState(false); // ✅ 트리거 추가

  // ✅ 정렬 기준 변경 함수
  const handleSortCriteriaChange = (newCriteria) => {
    setSortCriteria(newCriteria);
  };

  // ✅ 정렬 방향 변경 함수
  const handleSortDirectionChange = (newDirection) => {
    setSortDirection(newDirection);
    console.log("정렬 방향 변경 함수 실행 : " + newDirection);
  };

  // ✅ 정렬된 데이터 가져오기
  const getSortedItems = () => {
    return sortByCriteriaAndDirection(items, sortCriteria, sortDirection);
  };

  // ✅ 정렬 실행 함수 (트리거 반영)
  const executeSort = () => {
    setSortedItems(prevSortedItems => 
      updateStateWithJson(prevSortedItems, getSortedItems(), setSortedItemsTrigger)
    );
  };

  return {
    sortCriteria,
    handleSortCriteriaChange,
    sortDirection,
    handleSortDirectionChange,
    sortedItems,
    sortedItemsTrigger,
    getSortedItems,
    executeSort,
  };
};
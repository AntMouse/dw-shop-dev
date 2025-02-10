// hooks/admin/shared/useAdminFetchList.js

// 1. React 기본 라이브러리
import { useState, useEffect, useCallback } from "react";

/**
 * ✅ 공용 관리자 목록 조회 훅
 * @param {Function} fetchData - API 요청 함수 (예: `getMemberList`, `getProductList`)
 * @param {Function} sortFunction - 정렬 함수 (예: `getSortedMembers`, `getSortedProducts`)
 * @param {Function} [onError] - 에러 발생 시 실행할 콜백 함수 (선택적)
 */
export const useAdminFetchList = (fetchData, sortFunction, onError) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchData();

      if (!Array.isArray(data) || data.length === 0) {
        const errorMessage = "불러온 데이터가 없습니다.";
        setError(errorMessage);
        onError?.(errorMessage); // ✅ 외부에서 에러 처리 가능하도록 추가
        setItems([]);
        setFilteredItems([]);
      } else {
        setItems(data);
        setFilteredItems(sortFunction(data, null));
      }
    } catch (error) {
      const errorMessage = `데이터를 불러오는 중 오류 발생: ${error.message}`;
      setError(errorMessage);
      onError?.(errorMessage); // ✅ 외부에서 에러 처리 가능하도록 추가
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, sortFunction, onError]); // ✅ onError를 의존성에 추가

  useEffect(() => {
    if (!isLoading) {
      fetchItems();
    }
  }, []);

  return { items, filteredItems, setItems, setFilteredItems, fetchItems, error, isLoading };
};
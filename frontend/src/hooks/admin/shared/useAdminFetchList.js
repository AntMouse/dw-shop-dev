// hooks/admin/shared/useAdminFetchList.js

// 1. React 기본 라이브러리
import { useState, useEffect, useCallback } from "react";

/**
 * ✅ 공용 관리자 목록 조회 훅
 * @param {Function} fetchData - API 요청 함수 (예: `getMemberList`, `getProductList`)
 * @param {Function} [onError] - 에러 발생 시 실행할 콜백 함수 (선택적)
 */
export const useAdminFetchList = (fetchData, onError) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchData();
      if (!Array.isArray(data) || data.length === 0) {
        const errorMessage = "불러온 데이터가 없습니다.";
        if (onError) {
          onError(errorMessage);
        } else {
          setError(errorMessage);
        }
        setItems([]);
      } else {
        setItems((prevItems) => (Array.isArray(data) ? data : prevItems)); // ✅ 기존 상태 유지하면서 새로운 데이터 적용
      }
    } catch (error) {
      const errorMessage = `데이터를 불러오는 중 오류 발생: ${error.message}`;
      if (onError) {
        onError(errorMessage);
      } else {
        setError(errorMessage);
      }
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, onError]);

  useEffect(() => {
    if (!isLoading && items.length === 0) { // ✅ 최초 실행 보장
      fetchItems();
    }
  }, []);

  return { items, setItems, fetchItems, error, isLoading };
};
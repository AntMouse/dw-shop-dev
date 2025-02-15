// hooks/admin/shared/useAdminFetchItem.js

// 1. React 기본 라이브러리
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useParams } from "react-router-dom";

/**
 * ✅ 공용 관리자 개별 데이터 조회 훅
 * @param {Function} fetchDataById - 특정 데이터를 불러오는 API 호출 함수 (예: `getMemberById`, `getProductById`)
 * @param {Object} defaultData - 기본 데이터 값
 * @param {Function} [transformData] - (선택) 데이터 변환 함수 (예: 전화번호 마스킹 등)
 * @param {Function} [onError] - (선택) 에러 발생 시 실행할 콜백 함수
 */
export const useAdminFetchItem = (fetchDataById, defaultData, transformData = null, onError = null) => {
  const { id } = useParams();
  const [item, setItem] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      const errorMessage = "ID가 제공되지 않았습니다.";
      setError(errorMessage);
      if (onError) onError(errorMessage);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDataById(id);
        if (!data) {
          const errorMessage = "API에서 데이터를 찾을 수 없습니다.";
          setError(errorMessage);
          if (onError) onError(errorMessage);
          setItem(defaultData);
        } else {
          setItem(transformData ? transformData(data) : data);
        }
      } catch (error) {
        const errorMessage = `데이터를 불러오는 중 오류 발생: ${error.message}`;
        setError(errorMessage);
        if (onError) onError(errorMessage);
        setItem(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, onError]);

  return { item, isLoading, error };
};
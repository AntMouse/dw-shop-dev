// hooks/admin/shared/useAdminEditType.js

// 1. React 기본 라이브러리
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useNavigate, useParams } from "react-router-dom";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { navigateToAdminPage } from "../../utils/navigation/adminNavigation";

/**
 * ✅ 공용 관리자 타입 변경 훅
 * @param {Function} updateTypeApi - 타입을 업데이트하는 API 함수 (예: `updateMemberType`, `updateProductType`)
 * @param {Object} defaultData - 기본 데이터 값
 * @param {string} adminListPage - 취소 시 이동할 페이지 (예: "memberList", "productList")
 * @param {Function} [onError] - (선택) 에러 발생 시 실행할 콜백 함수
 */
export const useAdminEditType = (updateTypeApi, defaultData, adminListPage, onError) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancelClick = () => {
    navigateToAdminPage(navigate, adminListPage);
  };

  useEffect(() => {
    if (!defaultData) return;
    setEditData(defaultData);
  }, [defaultData]);

  const handleInputChange = (event, key) => {
    setEditData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSaveClick = async (onSuccess) => {
    if (!id) {
      const errorMessage = "잘못된 ID입니다.";
      setError(errorMessage);
      if (onError) onError(errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      await updateTypeApi(id, editData.type);
      if (onSuccess) onSuccess("타입이 성공적으로 변경되었습니다.");
      handleCancelClick();
    } catch (error) {
      const errorMessage = "타입을 업데이트하는 중 오류가 발생했습니다.";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { editData, handleInputChange, handleSaveClick, handleCancelClick, isLoading, error };
};
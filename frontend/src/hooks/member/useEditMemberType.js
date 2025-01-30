// hooks/member/userEditMemberType.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { API_BASE_URL } from "../../config/api";
import { navigateToAdminMemberList } from "../../utils/adminNavigation";

export const useEditMemberType = (initialData) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMemberData, setEditMemberData] = useState(initialData);

  // member 데이터가 업데이트될 때 editMemberData도 업데이트하도록 useEffect 추가
  useEffect(() => {
    if (initialData) {
      setEditMemberData(initialData);
    }
  }, [initialData]); // initialData가 변경될 때만 실행

  const handleInputChange = (event, key) => {
    setEditMemberData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/members/${id}`, {
        memberType: editMemberData.memberType,
      });
      alert("회원 정보가 성공적으로 업데이트되었습니다.");
      navigate("/admin/member/list");
    } catch (error) {
      console.error("회원 정보를 업데이트하는 중 오류가 발생했습니다:", error);
      alert("회원 정보를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    navigateToAdminMemberList(navigate);
  };

  return { editMemberData, handleInputChange, handleSaveClick, handleCancelClick };
};

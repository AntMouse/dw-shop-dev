// hooks/member/useEditMemberType.js

// 1. React 기본 라이브러리
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useNavigate, useParams } from "react-router-dom";

// 3. 서비스 가져오기
import { updateMemberType } from "../../services/member/memberService"; // ✅ API 호출을 서비스에서 처리
import { navigateToAdminPage } from "../../utils/adminNavigation";

export const useEditMemberType = (initialData) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMemberData, setEditMemberData] = useState(initialData || {
    memberType: "",
    memberId: "",
    memberName: "",
    birthdate: "",
    gender: "",
    email: "",
    contact: ""
  });

  const handleCancelClick = () => {
    navigateToAdminPage(navigate, "memberList");
  };

  useEffect(() => {
    if (initialData) {
      setEditMemberData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (event, key) => {
    setEditMemberData((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await updateMemberType(id, editMemberData.memberType);
      alert("회원 정보가 성공적으로 업데이트되었습니다.");
      handleCancelClick();
    } catch {
      alert("회원 정보를 업데이트하는 중 오류가 발생했습니다.");
    }
  };
  
  return { editMemberData, handleInputChange, handleSaveClick, handleCancelClick };
};
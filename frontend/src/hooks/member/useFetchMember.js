// hooks/member/useFetchMember.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useParams } from "react-router-dom";
import axios from "axios";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { API_BASE_URL } from "../../config/api";
import { maskPhoneNumber } from "../../utils/maskUtils";

// 기본 데이터 설정
const defaultData = {
  memberType: "",
  memberId: "",
  memberName: "",
  birthdate: "",
  gender: "",
  email: "",
  contact: ""
};

export const useFetchMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/members/${id}`);
        const memberData = response.data;
        setMember({
          ...memberData,
          contact: maskPhoneNumber(memberData.contact), // 전화번호 마스킹 처리
        });
      } catch (error) {
        console.error("회원 정보를 불러오는 중 오류가 발생했습니다:", error);
        setMember(defaultData); // ❗ 오류 발생 시 기본 데이터 사용
      }
    };

    fetchMemberData();
  }, [id]);

  return { member: member || defaultData }; // ❗ member가 null이면 기본 데이터 반환
};

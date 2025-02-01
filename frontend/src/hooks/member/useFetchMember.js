// hooks/member/useFetchMember.js

// 1. React 기본 라이브러리
import { useState, useEffect } from "react";

// 2. 외부 라이브러리
import { useParams } from "react-router-dom";

// 3. 서비스 가져오기
import { getMemberById } from "../../services/member/memberService"; // ✅ API 요청을 서비스에서 처리
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
    if (!id) return;

    const fetchMemberData = async () => {
      try {
        const memberData = await getMemberById(id);
        setMember({
          ...memberData,
          contact: maskPhoneNumber(memberData.contact),
        });
      } catch {
        setMember(defaultData);
      }
    };

    fetchMemberData();
  }, [id]);

  return { member: member || defaultData };
};
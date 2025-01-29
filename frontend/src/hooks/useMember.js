// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useState, useEffect } from 'react';

// 2. 외부 라이브러리
import axios from 'axios';

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { API_BASE_URL } from '../config/api';
import { maskPhoneNumber } from '../utils';

export const useMember = (id) => {
  const [member, setMember] = useState(null);
  const [editMemberData, setEditMemberData] = useState({
    memberType: '',
    memberId: '',
    memberName: '',
    birthdate: '',
    gender: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/members/${id}`)
      .then(response => {
        const memberData = response.data;
        setMember(memberData);
        setEditMemberData({
          memberType: memberData.memberType,
          memberId: memberData.memberId,
          memberName: memberData.memberName,
          birthdate: memberData.birthdate,
          gender: memberData.gender,
          email: memberData.email,
          contact: maskPhoneNumber(memberData.contact)
        });
      })
      .catch(error => {
        console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [id]);

  return { member, editMemberData, setEditMemberData };
};

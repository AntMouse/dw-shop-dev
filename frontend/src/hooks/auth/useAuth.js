// hooks/auth/useAuth.js

// 1. React 기본 라이브러리 (React 관련 라이브러리)
import { useEffect, useState } from 'react';

// 2. 외부 라이브러리
import { useNavigate } from 'react-router-dom';

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { logout } from '../../services/auth/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) {
      navigate("/"); // ✅ 로그아웃 후 홈으로 이동
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, navigate]);

  const handleLogout = () => {
    logout(); // ✅ authService에서 로그아웃 처리
    setIsLoggingOut(true);
  };

  return { handleLogout };
};
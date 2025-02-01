// config/api.js

// 2. 외부 라이브러리
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터 (Authorization 자동 추가)
api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  // 🚨 `Bearer ` 중복 방지
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  }

  const noAuthRequired = ["/api/login", "/api/register"];

  if (token) {
    if (!noAuthRequired.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => Promise.reject(error));

// ✅ 응답 인터셉터 (에러 핸들링 + 토큰 만료 체크)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // ✅ 만료된 토큰 삭제
      window.location.href = "/login"; // ✅ 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);

export default api;

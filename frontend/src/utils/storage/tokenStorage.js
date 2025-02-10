// utils/storage/tokenStorage.js

const TOKEN_KEY = "token"; // ✅ 토큰 키 상수화

/**
 * ✅ `localStorage` 사용 가능 여부 체크 함수
 * @returns {boolean} - localStorage가 사용 가능한지 여부
 */
const isLocalStorageAvailable = () => {
  if (typeof window === "undefined") return false; // ✅ SSR 체크
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * ✅ 토큰 가져오기
 * @returns {string|null} - 저장된 토큰 또는 null
 */
export const getToken = () => {
  if (!isLocalStorageAvailable()) return null;
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? token.replace("Bearer ", "").trim() : null; // ✅ 공백 제거
};

/**
 * ✅ 토큰 저장
 * @param {string} token - 저장할 토큰 값
 */
export const setToken = (token) => {
  if (!isLocalStorageAvailable()) return;
  if (typeof token === "string") {
    const formattedToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "").trim() : token.trim();
    localStorage.setItem(TOKEN_KEY, formattedToken); // ✅ 공백 제거 후 저장
  }
};

/**
 * ✅ 토큰 삭제 (로그아웃 시 사용)
 */
export const removeToken = () => {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(TOKEN_KEY);
};

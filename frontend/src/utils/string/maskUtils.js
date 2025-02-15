// utils/string/maskUtils.js

/**
 * ✅ 전화번호를 123-4567-8901 형태로 변환하는 함수
 * @param {string} phoneNumber - 원본 전화번호
 * @returns {string} - 포맷팅된 전화번호
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== "string") return "";

  // 숫자만 남김
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  if (cleanedNumber.length === 11) {
    return `${cleanedNumber.slice(0, 3)}-${cleanedNumber.slice(3, 7)}-${cleanedNumber.slice(7)}`;
  }
  if (cleanedNumber.length === 10) {
    return `${cleanedNumber.slice(0, 2)}-${cleanedNumber.slice(2, 6)}-${cleanedNumber.slice(6)}`;
  }
  return cleanedNumber; // 10자리나 11자리가 아니면 그대로 반환
};

/**
 * ✅ 전화번호 마지막 4자리 마스킹 처리
 * @param {string} phoneNumber - 원본 전화번호
 * @returns {string} - 마스킹 처리된 전화번호
 */
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== "string") return "";

  const formattedNumber = formatPhoneNumber(phoneNumber);

  if (formattedNumber.length <= 4) return formattedNumber;

  return formattedNumber.slice(0, -4) + "*".repeat(4);
};
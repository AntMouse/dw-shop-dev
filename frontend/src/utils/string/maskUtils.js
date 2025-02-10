// utils/string/maskUtils.js

/**
 * ✅ 전화번호 마지막 4자리 마스킹 처리
 * @param {string} phoneNumber - 원본 전화번호
 * @returns {string} - 마스킹 처리된 전화번호
 */
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== "string") return "";

  // 숫자가 아닌 문자는 제거하여 정리
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // 최소 4자리 이하일 경우 마스킹 없이 반환
  if (cleanedNumber.length <= 4) return cleanedNumber;

  // 마지막 4자리 마스킹 처리
  return cleanedNumber.slice(0, -4) + "*".repeat(4);
};
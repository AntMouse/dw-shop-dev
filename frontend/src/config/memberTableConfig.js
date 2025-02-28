// config/memberTableConfig.js

// ✅ 회원 테이블 필드 정의 (key-label 매핑)
export const memberFields = [
  { key: "memberId", label: "아이디" },
  { key: "memberName", label: "이름" },
  { key: "email", label: "이메일" },
  { key: "contact", label: "전화번호" },
];

// ✅ 회원 테이블 컬럼 정의 (label 값만 추출, UI 요소 제외)
export const memberTableColumns = memberFields.map(field => field.label);
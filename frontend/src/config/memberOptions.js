// config/memberOptions.js

// ✅ 회원 검색 기간 옵션
export const memberSearchPeriodOptions = [
  { value: "전체", label: "전체 기간" },
  { value: "1일", label: "최근 1일" },
  { value: "1주", label: "최근 1주" },
  { value: "1개월", label: "최근 1개월" },
  { value: "6개월", label: "최근 6개월" },
  { value: "1년", label: "최근 1년" },
];

// ✅ 회원 필드 옵션 (검색 & 정렬에서 공통으로 사용)
export const memberFieldOptions = [
  { value: "all", label: "전체" },
  { value: "memberId", label: "아이디" },
  { value: "memberName", label: "이름" },
  { value: "memberEmail", label: "이메일" },
  { value: "memberBirth", label: "생일" },
  { value: "memberType", label: "회원 타입" },
  { value: "contact", label: "전화번호" },
];

// ✅ 검색 필드만 포함
export const memberSearchFieldsOptions = memberFieldOptions.filter(field =>
  ["all", "memberId", "memberName", "memberEmail", "memberBirth", "contact"].includes(field.value)
);

// ✅ 정렬 필드만 포함
export const memberSortCriteriaOptions = memberFieldOptions.filter(field =>
  ["memberId", "memberName", "memberBirth"].includes(field.value)
);
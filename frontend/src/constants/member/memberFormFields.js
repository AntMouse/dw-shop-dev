// constants/member/memberFormFields.js

export const MEMBER_FORM_FIELDS = [
  { key: "memberType", label: "회원 타입", type: "select", options: [{ value: "USER", label: "일반 회원" }, { value: "ADMIN", label: "관리자" }] },
  { key: "memberId", label: "아이디", type: "text" },
  { key: "memberName", label: "이름", type: "text" },
  { key: "birthdate", label: "생년월일", type: "date" },
  { key: "gender", label: "성별", type: "select", options: [{ value: "Male", label: "남자" }, { value: "Female", label: "여자" }] },
  { key: "email", label: "이메일", type: "email" },
  { key: "contact", label: "전화번호", type: "text" },
];
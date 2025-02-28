// hooks/admin/shared/useAdminSearch.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { filterItemsBySearchTerm } from "../../../utils/search/searchTextFilterUtils";
import { filterItemsByDateRange, getDateRangeFromOption } from "../../../utils/search/searchDateFilterUtils";
import { filterItemsByAttributes } from "../../../utils/search/searchAttributeFilterUtils";

/**
 * ✅ 공용 관리자 검색 훅
 * @param {Array} items - 검색할 데이터 배열
 * @param {string} defaultSearchField - 기본 검색 기준 필드 (예: "name")
 * @param {string} defaultDateField - 기본 날짜 필드 (예: "createdAt")
 */
export const useAdminSearch = (items = [], defaultSearchField = "", defaultDateField = "") => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 검색어 기본값은 빈 문자열
  const [searchField, setSearchField] = useState(defaultSearchField);
  const [selectedSearchPeriod, setselectedSearchPeriod] = useState("전체"); // ✅ 기본값: 전체
  const [searchFilters, setSearchFilters] = useState({}); // ✅ 기본값: 빈 객체

  // 검색어 변경 핸들러
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 기준 필드 변경 핸들러
  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  // 기간 선택 핸들러
  const handleSearchPeriodChange = (event) => {
    setselectedSearchPeriod(event.target.value);
  };

  // 속성 필터 변경 핸들러
  const handleSearchFilterChange = (filterKey, filterValue) => {
    setSearchFilters((prevSearchFilters) => ({
      ...prevSearchFilters,
      [filterKey]: filterValue,
    }));
  };

  // ✅ 최종 검색 결과 계산
  const getSearchResults = () => {
    let result = [...items];
  
    const trimmedSearchTerm = searchTerm.trim();
  
    // ✅ 검색어가 없으면 전체 데이터 반환
    if (!trimmedSearchTerm) {
      return result;
    }
  
    // ✅ 전체 검색일 경우, 모든 필드에서 검색
    if (searchField === "all") {
      result = result.filter((item) => 
        Object.values(item).some(value =>
          (typeof value === "string" && value.toLowerCase().includes(trimmedSearchTerm.toLowerCase())) ||
          (typeof value === "number" && value.toString().includes(trimmedSearchTerm))
        )
      );
    } else {
      result = filterItemsBySearchTerm(result, trimmedSearchTerm, searchField);
    }
  
    result = filterItemsByAttributes(result, searchFilters); // ✅ 속성 필터 적용
  
    // ✅ 기간 필터 적용
    const { startDate, endDate } = getDateRangeFromOption(selectedSearchPeriod);
    result = filterItemsByDateRange(result, defaultDateField, startDate, endDate);
  
    return result;
  };  

  // ✅ 검색 실행 함수
  const handleSearchSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim();

    // ✅ 공백만 입력되었을 경우 검색 실행 안 함
    if (!trimmedSearchTerm) return;

    setSearchTerm(trimmedSearchTerm); // ✅ 앞뒤 공백 제거
    getSearchResults(); // ✅ 검색 실행
  };

  // ✅ Enter 키 입력 시 검색 실행
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(); // ✅ 검색 실행
    }
  };

  return {
    searchTerm,
    handleSearchTermChange,
    searchField,
    handleSearchFieldChange,
    selectedSearchPeriod,
    handleSearchPeriodChange,
    searchFilters,
    handleSearchFilterChange,
    getSearchResults,
    handleSearchKeyPress,
    handleSearchSubmit,
  };
};
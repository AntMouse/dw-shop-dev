// hooks/admin/shared/useAdminSearch.js

// 1. React 기본 라이브러리
import { useState } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { filterItemsBySearchTerm } from "../../../utils/search/searchTextFilterUtils";
import { filterItemsByDateRange, getDateRangeFromOption } from "../../../utils/search/searchDateFilterUtils";
import { updateStateSimple, updateStateWithJson } from "../../../utils/state/stateUtils";

/**
 * ✅ 공용 관리자 검색 훅
 * @param {Array} items - 검색할 데이터 배열
 * @param {string} defaultSearchField - 기본 검색 기준 필드 (예: "name")
 * @param {string} defaultDateField - 기본 날짜 필드 (예: "createdAt")
 */
export const useAdminSearch = (
  items = [], 
  defaultSearchField = "", 
  defaultDateField = "", 
  allSearchFields = []
) => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false);
  const [searchResults, setSearchResults] = useState([]); 
  const [searchResultsTrigger, setSearchResultsTrigger] = useState(false);
  const [searchField, setSearchField] = useState(defaultSearchField);
  const [selectedSearchPeriod, setSelectedSearchPeriod] = useState("전체");
  const [customStartDate, setCustomStartDate] = useState(""); // 🔥 직접 입력 시작 날짜
  const [customEndDate, setCustomEndDate] = useState(""); // 🔥 직접 입력 종료 날짜

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
    setSelectedSearchPeriod(event.target.value);

    if (event.target.value !== "직접 입력") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };

  // 사용자 지정 기간 입력(시작 날짜)
  const handleCustomStartDateChange = (event) => {
    setCustomStartDate(event.target.value);
  };

  // 사용자 지정 기간 입력(종료 날짜)
  const handleCustomEndDateChange = (event) => {
    setCustomEndDate(event.target.value);
  };

  // ✅ 최종 검색 결과 계산
  const executeSearch = () => {
    let result = [...items];
    const trimmedSearchTerm = confirmedSearchTerm.trim();
  
    if (!trimmedSearchTerm) {
      setSearchResults(prevSearchResults => 
        updateStateWithJson(prevSearchResults, result, setSearchResultsTrigger)
      );
      return;
    }
  
    const searchFields = searchField === "all" ? allSearchFields : searchField;
    result = filterItemsBySearchTerm(result, trimmedSearchTerm, searchFields);
    const { startDate, endDate } = getDateRangeFromOption(selectedSearchPeriod, customStartDate, customEndDate);
    result = filterItemsByDateRange(result, defaultDateField, startDate, endDate);
  
    setSearchResults(prevSearchResults =>
      updateStateWithJson(prevSearchResults, result, setSearchResultsTrigger)
    );    
  };

  // ✅ 검색 실행 함수
  const handleSearchSubmit = () => {
    setTimeout(() => {
      setConfirmedSearchTerm(prevConfirmedSearchTerm => 
        updateStateSimple(prevConfirmedSearchTerm, searchTerm.trim(), setSearchTrigger)
      );
      setIsSearchExecuted(true);
    }, 0);
  };  

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };
  
  return {
    searchTerm,
    handleSearchTermChange,
    confirmedSearchTerm,
    searchTrigger,
    isSearchExecuted,
    setIsSearchExecuted,
    searchResults,
    searchResultsTrigger,
    searchField,
    handleSearchFieldChange,
    selectedSearchPeriod,
    handleSearchPeriodChange,
    customStartDate,
    handleCustomStartDateChange,
    customEndDate,
    handleCustomEndDateChange,
    executeSearch,
    handleSearchSubmit,
    handleSearchKeyPress,
  };
};
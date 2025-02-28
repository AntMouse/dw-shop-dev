// hooks/admin/member/useAdminMemberSearch.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminSearch } from "../shared/useAdminSearch";

export const useAdminMemberSearch = (members) => {
  const result = useAdminSearch(members, "memberId", "createdAt"); // 기본 검색 필드 및 날짜 필드 지정

  return {
    memberSearchTerm: result.searchTerm, 
    handleMemberSearchTermChange: result.handleSearchTermChange, 
    memberSearchField: result.searchField, 
    handleMemberSearchFieldChange: result.handleSearchFieldChange, 
    memberSelectedSearchPeriod: result.selectedSearchPeriod,
    handleMemberSearchPeriodChange: result.handleSearchPeriodChange, 
    memberSearchFilters: result.searchFilters,
    handleMemberSearchFilterChange: result.handleSearchFilterChange,
    getMemberSearchResults: result.getSearchResults,
    handleMemberSearchKeyPress: result.handleSearchKeyPress,
    handleMemberSearchSubmit: result.handleSearchSubmit,
  };
};
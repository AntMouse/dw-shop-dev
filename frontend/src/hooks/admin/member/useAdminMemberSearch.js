// hooks/admin/member/useAdminMemberSearch.js

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAdminSearch } from "../shared/useAdminSearch";

export const useAdminMemberSearch = (members, allSearchFields) => {
  const result = useAdminSearch(members, "memberId", "createdAt", allSearchFields);

  return {
    memberSearchTerm: result.searchTerm, 
    handleMemberSearchTermChange: result.handleSearchTermChange, 
    memberConfirmedSearchTerm: result.confirmedSearchTerm,
    memberSearchTrigger: result.searchTrigger,
    memberIsSearchExecuted: result.isSearchExecuted,
    setMemberIsSearchExecuted: result.setIsSearchExecuted,
    memberSearchResults: result.searchResults,
    memberSearchResultsTrigger: result.searchResultsTrigger,
    memberSearchField: result.searchField, 
    handleMemberSearchFieldChange: result.handleSearchFieldChange, 
    memberSelectedSearchPeriod: result.selectedSearchPeriod,
    handleMemberSearchPeriodChange: result.handleSearchPeriodChange, 
    memberCustomStartDate: result.customStartDate,
    handleMemberCustomStartDateChange: result.handleCustomStartDateChange,
    memberCustomEndDate: result.customEndDate,
    handleMemberCustomEndDateChange: result.handleCustomEndDateChange,
    executeMemberSearch: result.executeSearch,
    handleMemberSearchSubmit: result.handleSearchSubmit,
    handleMemberSearchKeyPress: result.handleSearchKeyPress,
  };
};
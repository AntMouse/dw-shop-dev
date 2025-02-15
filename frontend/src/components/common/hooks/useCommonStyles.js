// components/common/hooks/useCommonStyles.js

export const useCommonStyles = (useCustomStyles, customClass, defaultStyles) => {
    return useCustomStyles ? customClass : defaultStyles;
  };  
// utils/feature/featureUtils.js

// ✅ 공통 기능 활성화 유틸 함수
export const isFeatureSetEnabled = (enabledFeatures, isFeatureEnabled) => {
    return enabledFeatures.length > 0 && enabledFeatures.some(isFeatureEnabled);
  };  

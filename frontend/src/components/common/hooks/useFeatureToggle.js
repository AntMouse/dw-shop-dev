// components/common/hooks/useFeatureToggle.js

export const useFeatureToggle = (enabledFeatures) => {
    return (feature) => enabledFeatures.includes(feature);
  };
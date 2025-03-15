// utils/feature/featureUtils.js

/**
 * ✅ 특정 기능이 활성화되었는지 확인하는 유틸 함수
 * @param {string[]} enabledFeatures - 활성화된 기능 목록
 * @param {string} feature - 체크할 기능
 * @returns {boolean}
 */
export const isFeatureEnabled = (enabledFeatures, feature) => {
  return enabledFeatures.includes(feature);
};

/**
* ✅ 최소 하나 이상의 기능이 활성화되었는지 확인하는 유틸 함수
* @param {string[]} enabledFeatures - 활성화된 기능 목록
* @returns {boolean}
*/
export const isFeatureSetEnabled = (enabledFeatures) => {
  return enabledFeatures.length > 0 && enabledFeatures.some(feature => isFeatureEnabled(enabledFeatures, feature));
};
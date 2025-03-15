// hooks/admin/shared/useAdminComponentUtils.js
import { useMemo } from "react";

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { getCommonStyles } from "../../../utils/styles/styleUtils";
import { isFeatureEnabled, isFeatureSetEnabled } from "../../../utils/feature/featureUtils";

/**
 * ✅ 공용 컴포넌트 유틸 훅
 * - 스타일 및 기능 활성화를 한 번에 처리
 */
export const useAdminComponentUtils = (enabledFeatures, useCustomStyles, customClass, defaultStyles) => {
  // ✅ 기능 활성화 여부 확인
  const isFeatureEnabledCheck = (feature) => isFeatureEnabled(enabledFeatures, feature);

  // ✅ 최소 하나 이상의 기능이 활성화되었는지 확인
  const isAnyFeatureEnabled = useMemo(() => isFeatureSetEnabled(enabledFeatures), [enabledFeatures]);

  // ✅ 스타일 설정
  const containerClass = getCommonStyles(useCustomStyles, customClass, defaultStyles);

  return { isFeatureEnabled: isFeatureEnabledCheck, isAnyFeatureEnabled, containerClass };
};
import { transformLocalizationLabels } from "egov-ui-kit/utils/commons";
import { getLocalization, getLocalizationLabelsAsync } from "egov-ui-kit/utils/localStorageUtils";

export const initLocalizationLabels = (locale) => {
  let localizationLabels;
  try {
    // FIX: SMART INITIALIZATION - Try loading from _common first (faster, smaller)
    // This contains only rainmaker-common (~2.5MB) instead of all modules (~5MB+)
    let commonData = getLocalization(`localization_${locale}_common`);

    if (commonData) {
      // Load rainmaker-common for instant access
      console.log(`[Redux Init] Loading from localization_${locale}_common (fast path)`);
      localizationLabels = JSON.parse(commonData);
      localizationLabels = transformLocalizationLabels(localizationLabels);
      console.log(`[Redux Init] Loaded ${Object.keys(localizationLabels).length} keys from common module`);
    } else {
      // Fallback to combined data if _common not available (backward compatibility)
      console.log(`[Redux Init] Common data not found, trying combined data (slower)`);
      localizationLabels = getLocalization(`localization_${locale}`);

      if (localizationLabels) {
        localizationLabels = JSON.parse(localizationLabels);
        localizationLabels = transformLocalizationLabels(localizationLabels);
        console.log(`[Redux Init] Loaded ${Object.keys(localizationLabels).length} keys from combined data`);
      } else {
        console.log(`[Redux Init] No localization data found in localStorage - will fetch from API`);
        localizationLabels = {};
      }
    }
  } catch (error) {
    console.warn('[Redux Init] Failed to load localization labels:', error);
    localizationLabels = {};
  }

  return localizationLabels;
};

/**
 * Async version that tries IndexedDB first, then falls back to localStorage
 * This is used for initial app load to leverage faster IndexedDB retrieval
 *
 * @param {string} locale - Language locale
 * @returns {Promise<object>} Transformed localization labels
 */
export const initLocalizationLabelsAsync = async (locale) => {
  try {
    // Try hybrid storage (IndexedDB first, localStorage fallback)
    const localizationData = await getLocalizationLabelsAsync(locale);

    if (localizationData) {
      const parsedLabels = JSON.parse(localizationData);
      const transformedLabels = transformLocalizationLabels(parsedLabels);
      console.log(`[Async Init] Loaded ${Object.keys(transformedLabels).length} localization keys`);
      return transformedLabels;
    }
  } catch (error) {
    console.warn('[Async Init] Failed to load from hybrid storage, using sync fallback:', error);
  }

  // Fallback to sync localStorage method
  return initLocalizationLabels(locale);
};

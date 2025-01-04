/**
 * 텍스트 입력을 처리하는 유틸리티 함수 모음
 */

/**
 * HTML 태그 제거
 * @param {string} text - 사용자 입력 텍스트
 * @returns {string} - HTML 태그가 제거된 텍스트
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  return text.replace(/<\/?[^>]+(>|$)/g, '').trim();
};

/**
 * 불필요한 공백 및 줄바꿈 제거
 * @param {string} text - 사용자 입력 텍스트
 * @returns {string} - 공백 및 줄바꿈이 정리된 텍스트
 */
export const normalizeWhitespace = (text) => {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
};

/**
 * 문자열 길이 검증
 * @param {string} text - 사용자 입력 텍스트
 * @param {number} maxLength - 허용 최대 길이
 * @returns {boolean} - 길이가 허용 범위 내인지 여부
 */
export const validateTextLength = (text, maxLength = 500) => {
  if (!text) return false;
  return text.length <= maxLength;
};

/**
 * 텍스트 정규화 (소문자 변환)
 * @param {string} text - 사용자 입력 텍스트
 * @returns {string} - 소문자로 변환된 텍스트
 */
export const toLowerCase = (text) => {
  if (!text) return '';
  return text.toLowerCase();
};

/**
 * 여러 텍스트 프로세싱 함수 적용
 * @param {string} text - 사용자 입력 텍스트
 * @returns {string} - 처리된 텍스트
 */
export const processText = (text) => {
  let processedText = sanitizeText(text);
  processedText = normalizeWhitespace(processedText);
  processedText = toLowerCase(processedText);
  return processedText;
};

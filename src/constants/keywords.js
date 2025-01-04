/**
 * JD 분석기에서 사용되는 주요 키워드 및 상수
 */

// 🚀 기술 스택 키워드
export const TECH_STACK_KEYWORDS = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  'AWS',
  'Docker',
  'Kubernetes',
  'SQL',
  'NoSQL',
  'GraphQL'
];

// 📝 주요 JD 섹션 키워드
export const JD_SECTIONS = {
  REQUIRED_SKILLS: 'required_skills',
  RESPONSIBILITIES: 'responsibilities',
  QUALIFICATIONS: 'qualifications',
  PREFERENCES: 'preferences'
};

// 📊 우선순위 키워드
export const PRIORITY_KEYWORDS = [
  '필수',
  '우대',
  '경험',
  '자격'
];

// ⚠️ 제한사항 (최대 텍스트 길이 등)
export const TEXT_LIMITS = {
  JD_MAX_LENGTH: 1000, // JD 최대 길이
  KEYWORD_MAX_LENGTH: 50 // 키워드 최대 길이
};

// 🛡️ 안전 키워드 (허용된 단어 목록)
export const SAFE_KEYWORDS = [
  '프로젝트',
  '개발',
  '설계',
  '배포',
  '유지보수',
  '테스트'
];

// 🌐 API 관련 상수
export const API_ROUTES = {
  ANALYZE_JD: '/analyze',
  GENERATE_PROMPT: '/generate-prompt'
};

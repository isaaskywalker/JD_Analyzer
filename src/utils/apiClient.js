import { CATEGORY_NAMES } from '../constants/keywords';

// 프롬프트 템플릿 정의
const PROMPT_TEMPLATES = {
  INTRO: (jobTitle) => `[${jobTitle} 포트폴리오 맞춤형 프롬프트]

이 프롬프트는 채용공고 분석을 통해 생성되었으며, 각 섹션은 직무 요구사항과 매칭되도록 구성되었습니다.`,

  TECH_STACK: (skills) => `
## 1. 기술 스택 강조
${skills.map(skill => `• ${skill} 활용 경험 및 프로젝트 상세
  - 해당 기술 선택 이유
  - 구체적인 적용 사례
  - 기술적 성과`).join('\n')}`,

  RESPONSIBILITIES: (tasks) => `
## 2. 핵심 업무 경험
${tasks.map(task => `• ${task} 관련 프로젝트/경험
  - 담당 역할 및 책임
  - 구체적인 업무 수행 내용
  - 성과 및 영향력`).join('\n')}`,

  QUALIFICATIONS: (quals) => `
## 3. 자격요건 부합성
${quals.map(qual => `• ${qual} 요건 충족 사례
  - 관련 경험/자격 상세
  - 실제 적용 사례
  - 입증 가능한 결과`).join('\n')}`,

  PREFERENCES: (prefs) => `
## 4. 우대사항 경험
${prefs.map(pref => `• ${pref} 관련 경험
  - 구체적인 활동/성과
  - 습득한 역량
  - 적용 가능성`).join('\n')}`,

  PROJECT_STRUCTURE: `
## 5. 프로젝트 상세 구조

### 1) 프로젝트 개요
- 프로젝트 목적 및 배경
- 본인 역할 및 기여도
- 프로젝트 규모 및 기간

### 2) 문제 해결 과정
- 직면한 문제/과제 정의
- 해결 방안 도출 과정
- 채택한 기술/방법론

### 3) 핵심 구현 내용
- 주요 기능 구현 상세
- 기술적 의사결정
- 난관 극복 사례

### 4) 성과 및 결과
- 정량적 지표
  • 성능 개선율
  • 사용자 증가율
  • 비용 절감액 등
- 정성적 성과
  • 사용자 피드백
  • 시스템 안정성
  • 유지보수성 개선

### 5) 학습 및 성장
- 습득한 기술/지식
- 개선점 및 교훈
- 후속 발전 계획`,

  TIPS: `
## 작성 팁
1. 모든 경험과 성과는 구체적인 수치와 예시 포함
2. STAR 방식 활용 (상황-업무-행동-결과)
3. 직무 연관성 높은 프로젝트 위주로 선별
4. 본인의 기여도와 역할을 명확히 기술
5. 기술적 의사결정의 근거 제시`
};

// 프롬프트 생성 함수
export const generatePrompt = (keywords, jobTitle = '개발자') => {
  const {
    required_skills = [],
    responsibilities = [],
    qualifications = [],
    preferences = []
  } = keywords;

  return [
    PROMPT_TEMPLATES.INTRO(jobTitle),
    PROMPT_TEMPLATES.TECH_STACK(required_skills),
    PROMPT_TEMPLATES.RESPONSIBILITIES(responsibilities),
    PROMPT_TEMPLATES.QUALIFICATIONS(qualifications),
    PROMPT_TEMPLATES.PREFERENCES(preferences),
    PROMPT_TEMPLATES.PROJECT_STRUCTURE,
    PROMPT_TEMPLATES.TIPS
  ].join('\n');
};

// 맞춤형 강조점 생성
export const generateEmphasis = (keywords) => {
  const emphasis = [];
  
  if (keywords.required_skills.length > 0) {
    emphasis.push('기술 스택 경험을 구체적인 프로젝트와 연계하여 서술');
  }
  
  if (keywords.responsibilities.some(r => r.includes('설계'))) {
    emphasis.push('시스템 설계 및 아키텍처 결정 과정 상세화');
  }
  
  if (keywords.responsibilities.some(r => r.includes('성능'))) {
    emphasis.push('성능 최적화 성과를 정량적 지표로 제시');
  }

  return emphasis;
};

// 프롬프트 유효성 검증
export const validatePrompt = (prompt) => {
  const validations = {
    hasStructure: prompt.includes('프로젝트 구조'),
    hasMetrics: prompt.includes('정량적') || prompt.includes('수치'),
    hasSkills: prompt.includes('기술 스택'),
    minimumLength: prompt.length >= 500
  };

  return {
    isValid: Object.values(validations).every(v => v),
    validations
  };
};
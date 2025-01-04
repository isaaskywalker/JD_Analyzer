// 키워드 카테고리 정의
export const KEYWORD_CATEGORIES = {
    SKILLS: 'required_skills',
    RESPONSIBILITIES: 'responsibilities',
    QUALIFICATIONS: 'qualifications',
    PREFERENCES: 'preferences'
  };
  
  // 카테고리 한글명 매핑
  export const CATEGORY_NAMES = {
    required_skills: '필수 기술 스택',
    responsibilities: '주요 업무',
    qualifications: '자격 요건',
    preferences: '우대사항'
  };
  
  // 기술 스택 키워드
  export const TECH_KEYWORDS = {
    // 프로그래밍 언어
    LANGUAGES: [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust',
      'PHP', 'Ruby', 'Swift', 'Kotlin'
    ],
    
    // 프레임워크
    FRAMEWORKS: [
      'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express',
      'Django', 'Spring', 'Flask', 'Laravel', 'Ruby on Rails'
    ],
    
    // 데이터베이스
    DATABASES: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle',
      'SQLite', 'Firebase', 'DynamoDB', 'Elasticsearch'
    ],
    
    // 클라우드/인프라
    INFRASTRUCTURE: [
      'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Jenkins',
      'Git', 'Linux', 'Nginx', 'Terraform'
    ]
  };
  
  // 직무 관련 키워드
  export const JOB_KEYWORDS = {
    // 개발 방법론
    METHODOLOGIES: [
      'Agile', 'Scrum', 'Waterfall', 'TDD', 'DDD', 'MSA',
      '객체지향', '함수형 프로그래밍', 'CI/CD'
    ],
    
    // 직무 역량
    SKILLS: [
      '웹 개발', '앱 개발', '서버 개발', '프론트엔드', '백엔드',
      'DevOps', '풀스택', '시스템 설계', '데이터베이스 설계',
      'API 개발', '성능 최적화', '테스트 자동화'
    ],
    
    // 소프트 스킬
    SOFT_SKILLS: [
      '커뮤니케이션', '문제해결능력', '팀워크', '창의력',
      '분석적 사고', '자기주도적', '책임감'
    ]
  };
  
  // 경력 요건 키워드
  export const EXPERIENCE_KEYWORDS = [
    '신입', '경력', '년차', '이상', '미만',
    '학사', '석사', '박사', '학위', '자격증'
  ];
  
  // 우대사항 키워드
  export const PREFERENCE_KEYWORDS = [
    '유관 업무', '관련 프로젝트', '오픈소스', '영어',
    '해외 경험', '논문', '특허', '자격증'
  ];
  
  // 키워드 가중치
  export const KEYWORD_WEIGHTS = {
    EXACT_MATCH: 1.0,    // 정확한 일치
    PARTIAL_MATCH: 0.7,  // 부분 일치
    RELATED_MATCH: 0.5,  // 연관 키워드
    CONTEXT_MATCH: 0.3   // 문맥상 관련
  };
  
  // 불용어 목록
  export const STOP_WORDS = [
    '및', '등', '와', '과', '또는', '특히',
    '위주', '중심', '기반', '가능한',
    '하신', '하실', '이신', '이실',
    '우대', '필수', '요구', '공고'
  ];
  
  // 키워드 매칭 정규식 패턴
  export const MATCHING_PATTERNS = {
    YEAR_PATTERN: /\d+[년개월]|\d+[\s]*(년차|연차)/g,
    SKILL_LEVEL_PATTERN: /(초급|중급|고급|심화|기본)/g,
    EDUCATION_PATTERN: /(학사|석사|박사|학위)/g,
    NUMBER_RANGE_PATTERN: /\d+[년개월]?\s*[~-]\s*\d+[년개월]?/g
  };
  
  // 분석 설정
  export const ANALYSIS_CONFIG = {
    MIN_KEYWORD_LENGTH: 2,        // 최소 키워드 길이
    MAX_KEYWORDS_PER_CATEGORY: 10,// 카테고리당 최대 키워드 수
    SIMILARITY_THRESHOLD: 0.7,    // 유사도 임계값
    CONTEXT_WINDOW_SIZE: 5        // 문맥 분석 윈도우 크기
  };
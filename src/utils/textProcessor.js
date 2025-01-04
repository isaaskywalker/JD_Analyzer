import { 
    TECH_KEYWORDS, 
    JOB_KEYWORDS, 
    STOP_WORDS,
    KEYWORD_WEIGHTS,
    MATCHING_PATTERNS,
    ANALYSIS_CONFIG
  } from '../constants/keywords';
  
  // 텍스트 전처리
  export const preprocessText = (text) => {
    return text
      .replace(/\s+/g, ' ')                // 연속된 공백 제거
      .replace(/[^\w\s가-힣]/g, ' ')       // 특수문자 제거
      .replace(/\s+/g, ' ')                // 다시 한번 공백 정리
      .trim()                              // 앞뒤 공백 제거
      .toLowerCase();                      // 소문자 변환
  };
  
  // 문장 분리
  export const splitSentences = (text) => {
    return text.split(/[.!?]+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);
  };
  
  // 불용어 제거
  export const removeStopWords = (text) => {
    const words = text.split(' ');
    return words
      .filter(word => !STOP_WORDS.includes(word))
      .join(' ');
  };
  
  // 키워드 매칭
  export const findKeywords = (text) => {
    const processedText = preprocessText(text);
    const sentences = splitSentences(processedText);
    
    const matches = {
      required_skills: new Set(),
      responsibilities: new Set(),
      qualifications: new Set(),
      preferences: new Set()
    };
  
    // 기술 스택 매칭
    Object.values(TECH_KEYWORDS).flat().forEach(keyword => {
      if (processedText.includes(keyword.toLowerCase())) {
        matches.required_skills.add(keyword);
      }
    });
  
    // 직무 키워드 매칭
    Object.values(JOB_KEYWORDS).flat().forEach(keyword => {
      if (processedText.includes(keyword.toLowerCase())) {
        matches.responsibilities.add(keyword);
      }
    });
  
    // 자격요건 패턴 매칭
    sentences.forEach(sentence => {
      // 경력 요구사항 체크
      const yearMatches = sentence.match(MATCHING_PATTERNS.YEAR_PATTERN);
      if (yearMatches) {
        matches.qualifications.add(yearMatches[0]);
      }
  
      // 학력 요구사항 체크
      const eduMatches = sentence.match(MATCHING_PATTERNS.EDUCATION_PATTERN);
      if (eduMatches) {
        matches.qualifications.add(eduMatches[0]);
      }
    });
  
    return {
      required_skills: [...matches.required_skills],
      responsibilities: [...matches.responsibilities],
      qualifications: [...matches.qualifications],
      preferences: [...matches.preferences]
    };
  };
  
  // 키워드 가중치 계산
  export const calculateKeywordWeight = (keyword, text, category) => {
    let weight = KEYWORD_WEIGHTS.EXACT_MATCH;
  
    // 출현 빈도에 따른 가중치 조정
    const frequency = (text.match(new RegExp(keyword, 'gi')) || []).length;
    weight *= (1 + (frequency - 1) * 0.1);
  
    // 카테고리별 특수 가중치
    if (category === 'required_skills') {
      // 필수 스킬은 가중치 증가
      weight *= 1.2;
    } else if (category === 'preferences') {
      // 우대사항은 가중치 감소
      weight *= 0.8;
    }
  
    return weight;
  };
  
  // 문맥 분석
  export const analyzeContext = (sentence, keyword) => {
    const words = sentence.split(' ');
    const keywordIndex = words.findIndex(w => w.includes(keyword));
    
    if (keywordIndex === -1) return false;
  
    const contextStart = Math.max(0, keywordIndex - ANALYSIS_CONFIG.CONTEXT_WINDOW_SIZE);
    const contextEnd = Math.min(words.length, keywordIndex + ANALYSIS_CONFIG.CONTEXT_WINDOW_SIZE);
    const context = words.slice(contextStart, contextEnd);
  
    // 필수 요구사항 관련 단어 체크
    const requirementWords = ['필수', '반드시', '요구', '해야'];
    const isRequired = requirementWords.some(word => context.includes(word));
  
    // 우대사항 관련 단어 체크
    const preferenceWords = ['우대', '선호', '이면 좋음', '가능하면'];
    const isPreferred = preferenceWords.some(word => context.includes(word));
  
    return {
      isRequired,
      isPreferred,
      context: context.join(' ')
    };
  };
  
  // 키워드 중복 제거 및 정리
  export const deduplicateKeywords = (keywords) => {
    return {
      ...keywords,
      required_skills: [...new Set(keywords.required_skills)],
      responsibilities: [...new Set(keywords.responsibilities)],
      qualifications: [...new Set(keywords.qualifications)],
      preferences: [...new Set(keywords.preferences)]
    };
  };
  
  // 키워드 정렬 (가중치 기준)
  export const sortKeywordsByWeight = (keywords, text) => {
    const sortByWeight = (items, category) => {
      return items
        .map(keyword => ({
          keyword,
          weight: calculateKeywordWeight(keyword, text, category)
        }))
        .sort((a, b) => b.weight - a.weight)
        .map(item => item.keyword)
        .slice(0, ANALYSIS_CONFIG.MAX_KEYWORDS_PER_CATEGORY);
    };
  
    return {
      required_skills: sortByWeight(keywords.required_skills, 'required_skills'),
      responsibilities: sortByWeight(keywords.responsibilities, 'responsibilities'),
      qualifications: sortByWeight(keywords.qualifications, 'qualifications'),
      preferences: sortByWeight(keywords.preferences, 'preferences')
    };
  };
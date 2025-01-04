// services/keywordExtractor.js
export const extractKeywords = async (text) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: `다음 채용공고에서 주요 키워드를 추출해주세요:
                  ${text}
                  
                  형식:
                  {
                    "required_skills": [],
                    "responsibilities": [],
                    "qualifications": [],
                    "preferences": []
                  }`,
          max_tokens: 500,
          temperature: 0.3
        })
      });
  
      const data = await response.json();
      return JSON.parse(data.choices[0].text);
    } catch (error) {
      console.error('키워드 추출 중 오류 발생:', error);
      return null;
    }
  };
  
  // services/promptGenerator.js
  export const generatePrompt = (keywords) => {
    const {
      required_skills,
      responsibilities,
      qualifications,
      preferences
    } = keywords;
  
    return `
  [포트폴리오 맞춤형 프롬프트]
  
  1. 기술 스택 강조
  ${required_skills.map(skill => `- ${skill}를 활용한 프로젝트 경험 강조`).join('\n')}
  
  2. 주요 업무 경험
  ${responsibilities.map(resp => `- ${resp} 관련 경험 포함`).join('\n')}
  
  3. 자격요건 매칭
  ${qualifications.map(qual => `- ${qual} 관련 경험/자격 명시`).join('\n')}
  
  4. 우대사항 반영
  ${preferences.map(pref => `- ${pref} 관련 경험 있다면 포함`).join('\n')}
  
  프로젝트 구조:
  1. 문제 정의
  2. 해결 방안
  3. 사용 기술
  4. 결과 및 성과
  5. 배운 점
  
  각 섹션은 구체적인 수치와 예시를 포함하여 작성하세요.`;
  };
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

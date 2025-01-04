import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

// JD 입력 컴포넌트
const JDInput = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">채용공고 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="채용공고 내용을 붙여넣어주세요..."
          className="min-h-48 p-4"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={!text.trim()}
        >
          분석하기
        </Button>
      </form>
    </div>
  );
};

// 키워드 분석 결과 컴포넌트
const KeywordAnalysis = ({ keywords }) => {
  const categories = {
    required_skills: '필수 기술',
    responsibilities: '주요 업무',
    qualifications: '자격 요건',
    preferences: '우대 사항'
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">분석 결과</h2>
      <div className="space-y-4">
        {Object.entries(keywords).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-medium">{categories[category]}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 프롬프트 생성 컴포넌트
const PromptGenerator = ({ prompt }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">포트폴리오 프롬프트</h2>
      <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
        {prompt}
      </div>
      <Button onClick={copyToClipboard}>
        클립보드에 복사
      </Button>
    </div>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [error, setError] = useState('');

  const extractKeywords = async (text) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: `다음 채용공고에서 주요 키워드를 추출해주세요:\n${text}`,
          max_tokens: 500,
          temperature: 0.3
        })
      });
      
      if (!response.ok) throw new Error('API 요청 실패');
      
      const data = await response.json();
      return JSON.parse(data.choices[0].text);
    } catch (error) {
      setError('키워드 추출 중 오류가 발생했습니다.');
      return null;
    }
  };

  const generatePrompt = (keywords) => {
    const sections = [
      { title: '기술 스택', items: keywords.required_skills },
      { title: '주요 업무 경험', items: keywords.responsibilities },
      { title: '자격요건 매칭', items: keywords.qualifications },
      { title: '우대사항 반영', items: keywords.preferences }
    ];

    return sections.map(section => 
      `${section.title}\n${section.items.map(item => `- ${item} 관련 경험 포함`).join('\n')}`
    ).join('\n\n');
  };

  const handleJDSubmit = async (text) => {
    setJobDescription(text);
    setError('');
    
    const extractedKeywords = await extractKeywords(text);
    if (extractedKeywords) {
      setKeywords(extractedKeywords);
      const prompt = generatePrompt(extractedKeywords);
      setGeneratedPrompt(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">JD 분석기</h1>
        
        {error && (
          <Alert className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <JDInput onSubmit={handleJDSubmit} />
            </CardContent>
          </Card>
          
          {keywords && (
            <Card>
              <CardContent className="p-6">
                <KeywordAnalysis keywords={keywords} />
              </CardContent>
            </Card>
          )}
          
          {generatedPrompt && (
            <Card>
              <CardContent className="p-6">
                <PromptGenerator prompt={generatedPrompt} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
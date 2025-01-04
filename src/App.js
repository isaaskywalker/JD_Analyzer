import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';

const App = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleJDSubmit = async (text) => {
    setJobDescription(text);
    // 키워드 추출 로직 실행
    // const extractedKeywords = await extractKeywords(text);
    // setKeywords(extractedKeywords);
    // const prompt = generatePrompt(extractedKeywords);
    // setGeneratedPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">JD 분석기</h1>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <textarea
                className="w-full min-h-[200px] p-4 border rounded-lg"
                placeholder="채용공고 내용을 붙여넣어주세요..."
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button 
                className="mt-4 w-full"
                onClick={() => handleJDSubmit(jobDescription)}
              >
                분석하기
              </Button>
            </CardContent>
          </Card>
          
          {keywords && (
            <Card>
              <CardHeader>
                <CardTitle>분석 결과</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 키워드 분석 결과 표시 */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { extractKeywords } from '../services/keywordExtractor';

function JDInput() {
  const [jdText, setJDText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    const result = await extractKeywords(jdText);
    setAnalysisResult(result);
  };

  return (
    <div>
      <h2>채용공고 입력</h2>
      <textarea
        value={jdText}
        onChange={(e) => setJDText(e.target.value)}
        placeholder="채용공고를 입력하세요"
      />
      <button onClick={handleAnalyze}>분석하기</button>

      {analysisResult && (
        <div>
          <h3>분석 결과:</h3>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default JDInput;

import React, { useState } from 'react';
import { analyzeJD } from '../api/apiClient';

function JDInput({ setAnalysisResult }) {
    const [jdText, setJDText] = useState('');

    const handleAnalyze = async () => {
        try {
            const result = await analyzeJD(jdText);
            setAnalysisResult(result);
        } catch (error) {
            alert('JD 분석 중 오류가 발생했습니다.');
        }
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
        </div>
    );
}

export default JDInput;
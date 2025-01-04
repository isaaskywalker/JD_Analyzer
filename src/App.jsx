import React, { useState } from 'react';
import JDInput from './components/JDInput';
import JDResult from './components/JDResult';

function App() {
    const [analysisResult, setAnalysisResult] = useState(null);

    return (
        <div>
            <h1>JD 분석기</h1>
            <JDInput setAnalysisResult={setAnalysisResult} />
            <JDResult analysisResult={analysisResult} />
        </div>
    );
}

export default App;
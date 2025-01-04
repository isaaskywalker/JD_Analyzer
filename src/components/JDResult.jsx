import React from 'react';

function JDResult({ analysisResult }) {
    return (
        <div>
            <h2>분석 결과</h2>
            {analysisResult ? (
                <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
            ) : (
                <p>아직 분석된 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default JDResult;
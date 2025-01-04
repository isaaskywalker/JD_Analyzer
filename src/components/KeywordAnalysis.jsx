import React from 'react';
import { JD_SECTIONS } from '../constants/keywords';

function KeywordAnalysis({ analysisResult }) {
  return (
    <div>
      <h2>키워드 분석 결과</h2>
      <h3>필수 기술</h3>
      <ul>
        {analysisResult[JD_SECTIONS.REQUIRED_SKILLS]?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordAnalysis;

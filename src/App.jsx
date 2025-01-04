// 📄 src/App.jsx

import React from 'react';
import JDInput from './components/JDInput';
import KeywordAnalysis from './components/KeywordAnalysis';
import PromptGenerator from './components/PromptGenerator';

function App() {
  return (
    <div>
      <header>
        <h1>JD 분석기</h1>
      </header>
      <main>
        <JDInput />
        <KeywordAnalysis />
        <PromptGenerator />
      </main>
      <footer>
        <p>&copy; Isabelle Choi. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

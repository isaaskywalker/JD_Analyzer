import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Tailwind CSS 스타일 import
import './styles/globals.css';

// API 키 환경 변수 확인
if (!process.env.REACT_APP_OPENAI_API_KEY) {
  console.warn('OpenAI API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

// React 앱 마운트
const container = document.getElementById('root');
const root = createRoot(container);

// 앱 렌더링
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-50">
      <App />
    </div>
  </React.StrictMode>
);

// 핫 리로딩 설정 (개발 모드)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

// 콘솔 에러 처리
const handleError = (error) => {
  console.error('애플리케이션 오류:', error);
  // 여기에 에러 리포팅 서비스 추가 가능
};

window.onerror = handleError;
window.onunhandledrejection = (event) => handleError(event.reason);

// 성능 측정 (개발 모드)
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = (metric) => {
    console.log(metric);
  };

  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}

// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('ServiceWorker 등록 성공:', registration.scope);
      },
      (err) => {
        console.log('ServiceWorker 등록 실패:', err);
      }
    );
  });
}
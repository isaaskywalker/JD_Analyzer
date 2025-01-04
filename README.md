# JD_Analyzer
# JD분석기 (채용공고 분석 도구)

## 프로젝트 소개
JD분석기는 채용공고(Job Description)를 분석하여 주요 키워드를 추출하고, 이를 바탕으로 맞춤형 포트폴리오 작성을 위한 프롬프트를 생성하는 도구입니다.

## 주요 기능
1. 채용공고 텍스트 분석
2. 핵심 키워드 추출
   - 필수 기술 스택
   - 주요 업무
   - 자격 요건
   - 우대 사항
3. 맞춤형 포트폴리오 프롬프트 생성

## 기술 스택
- React
- OpenAI API
- TailwindCSS
- shadcn/ui

## 시작하기

### 환경 설정
1. 저장소 클론
```bash
git clone https://github.com/yourusername/jd-analyzer.git
cd jd-analyzer
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. 개발 서버 실행
```bash
npm start
```

## 사용 방법
1. 채용공고 텍스트를 입력창에 붙여넣기
2. "분석하기" 버튼 클릭
3. 추출된 키워드 확인
4. 생성된 포트폴리오 프롬프트 활용

## 프로젝트 구조
```
jd-analyzer/
├── public/
├── src/
│   ├── components/      # React 컴포넌트
│   ├── services/        # API 및 비즈니스 로직
│   ├── utils/           # 유틸리티 함수
│   └── constants/       # 상수 및 설정
└── ...
```

## 라이선스
MIT License
# 순신의 길 - 프로젝트 실행 계획서

## 🎯 프로젝트 목표
충무공 이순신의 역사와 관련 여행지를 소개하는 인터랙티브 웹사이트 구축

## 📂 작업 경로
C:\Users\mokka\Claude-project\Sun-sin-path

## ⏱️ 시간별 상세 작업 계획

### [0-1시간] 프로젝트 초기화 및 환경 설정
- [x] Desktop Commander로 프로젝트 폴더 구조 생성
- [x] 기본 HTML/CSS/JS 템플릿 파일 생성
- [x] Git 저장소 초기화
- [x] 프로젝트 README.md 작성

### [1-2시간] 노션 데이터베이스 구축
- [ ] Notion API 연동 설정
- [ ] 3개 데이터베이스 생성 (연표/여행지/코스)
- [ ] 샘플 데이터 5개씩 입력
- [ ] API 토큰 및 데이터베이스 ID 저장

### [2-3시간] 리서치 및 데이터 수집
- [ ] Naver Search: 국내 이순신 관련 장소 20곳
- [ ] Google Search: 역사 정보 및 전투 상세
- [ ] 수집 데이터를 JSON 형식으로 정리
- [ ] 노션 데이터베이스에 일괄 입력

### [3-4시간] 이미지 자동 생성 시스템 구축
- [ ] GPT-4 API 연동 코드 작성
- [ ] 이미지 생성 프롬프트 템플릿 작성
- [ ] 각 페이지별 필요 이미지 리스트 작성
- [ ] 이미지 자동 생성 및 저장

### [4-6시간] 웹사이트 핵심 개발
- [ ] 메인 페이지 (index.html) 완성
- [ ] 연표 페이지 (timeline.html) 개발
- [ ] 여행지 페이지 (destinations.html) 개발
- [ ] 코스 페이지 (courses.html) 개발
- [ ] 노션 데이터 연동 JavaScript 작성

### [6-7시간] 디자인 및 애니메이션
- [ ] CSS 스타일링 완성
- [ ] 스크롤 애니메이션 구현
- [ ] 인터랙티브 지도 기능 추가
- [ ] 반응형 디자인 적용

### [7-8시간] 기능 고도화
- [ ] 검색 기능 구현
- [ ] 필터링 기능 추가
- [ ] 즐겨찾기 기능 (localStorage)
- [ ] 공유 기능 구현

### [8-9시간] 테스트 및 최적화
- [ ] Playwright로 전체 기능 테스트
- [ ] 성능 최적화 (이미지 압축, 코드 최소화)
- [ ] SEO 메타태그 추가
- [ ] 접근성 개선

### [9-10시간] 배포 및 문서화
- [ ] GitHub Pages 배포 설정
- [ ] 커스텀 도메인 설정 (선택)
- [ ] 사용 가이드 문서 작성
- [ ] 프로젝트 발표 자료 준비

## 📁 프로젝트 구조
```
C:\Users\mokka\Claude-project\Sun-sin-path\
├── index.html
├── pages/
│   ├── timeline.html
│   ├── destinations.html
│   └── courses.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── notion-api.js
│   ├── image-generator.js
│   └── navigation.js
├── assets/
│   ├── images/
│   │   ├── generated/     # AI 생성 이미지
│   │   └── static/        # 정적 이미지
│   └── data/
│       ├── timeline.json
│       ├── destinations.json
│       └── courses.json
├── config/
│   └── api-keys.js       # API 키 관리
├── scripts/
│   └── build-static.js   # 정적 빌드 스크립트
└── project-plan.md

## 🔑 API 키 관리
- Notion API Token: [환경변수로 관리]
- OpenAI API Key: [환경변수로 관리]
- GitHub Token: [Git 설정에 저장]

## 📝 현재 진행 상황
작업 시작 시간: 2025-05-26
현재 단계: 노션 데이터베이스 구축 준비
완료된 작업:
- 프로젝트 계획서 작성
- 프로젝트 폴더 생성
- Git 저장소 초기화 및 첫 커밋
- 기본 HTML/CSS/JS 템플릿 파일 생성
  - index.html (메인 페이지)
  - 3개 서브페이지 (timeline, destinations, courses)
  - CSS 파일 3개 (style, responsive, animations)
  - main.js (기본 인터랙션)

## 🚨 주의사항
1. 매 시간마다 git commit으로 진행사항 저장
2. API 키는 절대 코드에 직접 입력하지 않음
3. 이미지는 최대 100KB 이하로 최적화
4. 모든 텍스트는 UTF-8 인코딩 사용
# 순신의 길 - 로컬 테스트 가이드

## 🚀 빠른 시작

### 방법 1: Python 서버 (추천)
```bash
cd C:\Users\mokka\Claude-project\Sun-sin-path
python -m http.server 8080
```
브라우저에서 http://localhost:8080 접속

### 방법 2: VS Code Live Server
1. VS Code에서 프로젝트 폴더 열기
2. index.html 우클릭
3. "Open with Live Server" 선택

### 방법 3: Node.js http-server
```bash
npm install -g http-server
cd C:\Users\mokka\Claude-project\Sun-sin-path
http-server -p 8080
```

## 🧪 테스트 체크리스트

### 메인 페이지
- [ ] 타이핑 애니메이션 작동
- [ ] 파티클 효과 표시
- [ ] 스크롤 인디케이터 애니메이션
- [ ] 네온 버튼 호버 효과
- [ ] Feature 카드 스크롤 애니메이션

### 반응형 디자인
- [ ] 모바일 (375px) 레이아웃
- [ ] 태블릿 (768px) 레이아웃
- [ ] 데스크톱 (1024px+) 레이아웃

### 브라우저 호환성
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🐛 알려진 이슈
- 네비게이션 메뉴 토글 기능 추가 필요
- 모바일 반응형 스타일 추가 필요
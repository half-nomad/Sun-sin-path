// 순신의 길 - API 설정 파일
// 보안 주의: 실제 API 토큰은 환경변수나 서버 사이드에서 사용

const NOTION_CONFIG = {
    // 더미 API 토큰 (실제 사용 시 환경변수로 교체)
    token: 'NOTION_API_TOKEN_HERE',
    
    // 노션 API 버전
    version: '2022-06-28',
    
    // 데이터베이스 ID들 (공개 가능한 정보)
    databases: {
        // 여행코스 DB
        travelCourses: '201091314f8f80a1b28dcc04552f870f',
        
        // 연표 DB  
        timeline: '20109131-4f8f-80a3-908b-e834651bd807',
        
        // 여행지 정보 DB
        destinations: '201091314f8f803aa27fecf11768b3a4',
    },
    
    // API 기본 설정
    baseUrl: 'https://api.notion.com/v1',
    
    // 요청 헤더 템플릿
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Notion-Version': this.version,
            'Content-Type': 'application/json'
        };
    }
};

// 전역에서 사용 가능하도록 설정
if (typeof window !== 'undefined') {
    window.NOTION_CONFIG = NOTION_CONFIG;
}

// Node.js 환경에서도 사용 가능
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NOTION_CONFIG;
}

console.log('✅ API 설정 로드 완료 (더미 토큰 사용 중)');
console.log('🔒 실제 배포 시에는 환경변수로 토큰을 설정하세요');

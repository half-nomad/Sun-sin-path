// 여행코스 페이지 - 2025-06-01 JSON 구조 매칭 버전
class CoursesPage {
    constructor() {
        this.courses = [];
        this.init();
    }
    
    async init() {
        try {
            let retryCount = 0;
            while (!window.sunsinData && retryCount < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retryCount++;
            }
            
            this.courses = await window.sunsinData.getTravelCourses();
            console.log(`✅ 코스 데이터 ${this.courses.length}개 로드`);
            this.renderCourses();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    
    renderCourses() {
        const container = document.getElementById('courses-container');
        if (!container) return;
        
        if (!this.courses || this.courses.length === 0) {
            container.innerHTML = '<p>데이터를 불러오는 중입니다...</p>';
            return;
        }
        
        container.innerHTML = this.courses.map(item => `
            <div class="course-card">
                <h3>${item.title}</h3>
                <p>📅 ${item.duration} | 📍 ${this.getRegion(item.departure)}</p>
                <p>🚗 ${item.departure}</p>
                <p>🔄 ${item.return}</p>
                <div class="course-schedule">
                    <strong>주요 여행지:</strong>
                    ${this.getDayInfo(item)}
                </div>
            </div>
        `).join('');
        
        console.log(`✅ 코스 렌더링 완료: ${this.courses.length}개 아이템`);
    }    
    getRegion(departure) {
        if (!departure) return '지역 미정';
        if (departure.includes('천안아산')) return '충청남도';
        if (departure.includes('목포')) return '전라남도';
        if (departure.includes('창원')) return '경상남도';
        return '전국';
    }
    
    getDayInfo(item) {
        let dayInfo = '';
        if (item.day1) dayInfo += `<p><strong>1일차:</strong> ${item.day1.split('\n')[0]}</p>`;
        if (item.day2) dayInfo += `<p><strong>2일차:</strong> ${item.day2.split('\n')[0]}</p>`;
        if (item.day3 && item.day3.trim()) dayInfo += `<p><strong>3일차:</strong> ${item.day3.split('\n')[0]}</p>`;
        return dayInfo || '<p>일정 정보 준비 중</p>';
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (window.sunsinData) {
        window.coursesPage = new CoursesPage();
    } else {
        setTimeout(() => window.coursesPage = new CoursesPage(), 500);
    }
});

console.log('✅ courses.js 로드 완료 (2025-06-01 JSON 구조 매칭 업데이트)');

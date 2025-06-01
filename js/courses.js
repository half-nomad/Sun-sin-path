// 여행코스 페이지 - 2025-06-01 수정본
class CoursesPage {
    constructor() {
        this.courses = [];
        this.init();
    }
    
    async init() {
        try {
            // DataLoader 대기
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
        if (!container) {
            console.error('❌ courses-container 요소를 찾을 수 없습니다');
            return;
        }
        
        if (!this.courses || this.courses.length === 0) {
            console.error('❌ 렌더링할 코스 데이터가 없습니다');
            container.innerHTML = '<p>데이터를 불러오는 중입니다...</p>';
            return;
        }
        
        console.log(`🎨 ${this.courses.length}개 코스 아이템 렌더링 시작`);
        
        container.innerHTML = this.courses.map(item => `
            <div class="course-card">
                <h3>${item.title}</h3>
                <p>📅 ${item.duration} | 📍 ${item.region}</p>
                <p>🚗 ${item.difficulty}</p>
                <p>${item.description}</p>
                <div class="course-highlights">
                    <strong>주요 여행지:</strong>
                    ${item.highlights ? item.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('') : ''}
                </div>
                ${item.schedule ? this.renderSchedule(item.schedule) : ''}
            </div>
        `).join('');
        
        console.log(`✅ 코스 렌더링 완료: ${this.courses.length}개 아이템`);
    }
    
    renderSchedule(schedule) {
        return `
            <div class="course-schedule">
                <strong>일정표:</strong>
                ${schedule.map(day => `
                    <div class="day-schedule">
                        <h4>${day.day}일차</h4>
                        ${day.activities.map(activity => `
                            <div class="activity">
                                <span class="time">${activity.time}</span>
                                <span class="place">${activity.place}</span>
                                <span class="desc">${activity.description}</span>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
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

console.log('✅ courses.js 로드 완료 (2025-06-01 업데이트)');

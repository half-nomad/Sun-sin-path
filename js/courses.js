// 여행코스 페이지
class CoursesPage {
    constructor() {
        this.courses = [];
        this.init();
    }
    async init() {
        try {
            this.courses = await DataLoader.loadCourses();
            console.log(`✅ 코스 데이터 ${this.courses.length}개 로드`);
            this.renderCourses();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    renderCourses() {
        const container = document.getElementById('courses-container');
        if (!container) return;
        container.innerHTML = this.courses.map(item => `
            <div class="course-card">
                <h3>${item.title}</h3>
                <p>${item.duration} / ${item.difficulty}</p>
                <p>${item.description}</p>
                <p>📍 ${item.destinations}</p>
                <p>💰 ${item.budget}</p>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.coursesPage = new CoursesPage(), 500);
});
console.log('✅ courses.js 로드 완료');
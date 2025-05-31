// 타임라인 페이지
class TimelinePage {
    constructor() {
        this.timeline = [];
        this.init();
    }
    async init() {
        try {
            // DataLoader 대기
            let retryCount = 0;
            while ((!window.SunsinLoader || !window.DataLoader) && retryCount < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retryCount++;
            }
            this.timeline = await DataLoader.loadTimeline();
            console.log(`✅ 연표 데이터 ${this.timeline.length}개 로드`);
            this.renderTimeline();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        container.innerHTML = this.timeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-year">${item.year}년</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
}
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (window.SunsinLoader) {
        window.timelinePage = new TimelinePage();
    } else {
        setTimeout(() => window.timelinePage = new TimelinePage(), 500);
    }
});
console.log('✅ timeline.js 로드 완료');
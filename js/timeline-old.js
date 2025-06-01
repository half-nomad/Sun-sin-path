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
            while (!window.sunsinData && retryCount < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retryCount++;
            }
            this.timeline = await window.sunsinData.getTimeline();
            console.log(`✅ 연표 데이터 ${this.timeline.length}개 로드`);
            this.renderTimeline();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) {
            console.error('❌ timeline-container 요소를 찾을 수 없습니다');
            return;
        }
        
        if (!this.timeline || this.timeline.length === 0) {
            console.error('❌ 렌더링할 타임라인 데이터가 없습니다');
            container.innerHTML = '<p>데이터를 불러오는 중입니다...</p>';
            return;
        }
        
        console.log(`🎨 ${this.timeline.length}개 타임라인 아이템 렌더링 시작`);
        
        container.innerHTML = this.timeline.map(item => `
            <div class="timeline-item" data-importance="${item.importance || '보통'}">
                <div class="timeline-year">${item.date}</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="timeline-location">📍 ${item.location || ''}</div>
                </div>
            </div>
        `).join('');
        
        console.log(`✅ 타임라인 렌더링 완료: ${this.timeline.length}개 아이템`);
    }
}
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (window.sunsinData) {
        window.timelinePage = new TimelinePage();
    } else {
        setTimeout(() => window.timelinePage = new TimelinePage(), 500);
    }
});
console.log('✅ timeline.js 로드 완료');
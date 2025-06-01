// 여행지 페이지 - 2025-06-01 수정본
class DestinationsPage {
    constructor() {
        this.destinations = [];
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
            
            this.destinations = await window.sunsinData.getDestinations();
            console.log(`✅ 여행지 데이터 ${this.destinations.length}개 로드`);
            this.renderDestinations();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    
    renderDestinations() {
        const container = document.getElementById('destinations-grid');
        if (!container) {
            console.error('❌ destinations-grid 요소를 찾을 수 없습니다');
            return;
        }
        
        if (!this.destinations || this.destinations.length === 0) {
            console.error('❌ 렌더링할 여행지 데이터가 없습니다');
            container.innerHTML = '<p>데이터를 불러오는 중입니다...</p>';
            return;
        }
        
        console.log(`🎨 ${this.destinations.length}개 여행지 아이템 렌더링 시작`);
        
        container.innerHTML = this.destinations.map(item => `
            <div class="destination-card" data-category="${item.category || '기타'}">
                <h3>${item.name}</h3>
                <p>📍 ${item.address}</p>
                <p>${item.description}</p>
                ${item.visitInfo ? `<p>🕒 ${item.visitInfo.hours || item.visitInfo}</p>` : ''}
                ${item.visitInfo && item.visitInfo.price ? `<p>💰 ${item.visitInfo.price}</p>` : ''}
            </div>
        `).join('');
        
        console.log(`✅ 여행지 렌더링 완료: ${this.destinations.length}개 아이템`);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (window.sunsinData) {
        window.destinationsPage = new DestinationsPage();
    } else {
        setTimeout(() => window.destinationsPage = new DestinationsPage(), 500);
    }
});

console.log('✅ destinations.js 로드 완료 (2025-06-01 업데이트)');

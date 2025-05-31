// 여행지 페이지
class DestinationsPage {
    constructor() {
        this.destinations = [];
        this.init();
    }
    async init() {
        try {
            this.destinations = await window.SunsinLoader.getDestinations();
            console.log(`✅ 여행지 데이터 ${this.destinations.length}개 로드`);
            this.renderDestinations();
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }
    renderDestinations() {
        const container = document.getElementById('destinations-container');
        if (!container) return;
        container.innerHTML = this.destinations.map(item => `
            <div class="destination-card">
                <h3>${item.name}</h3>
                <p>📍 ${item.address}</p>
                <p>${item.description}</p>
                ${item.hours ? `<p>🕒 ${item.hours}</p>` : ''}
                ${item.price ? `<p>💰 ${item.price}</p>` : ''}
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.SunsinLoader) {
        window.destinationsPage = new DestinationsPage();
    } else {
        setTimeout(() => window.destinationsPage = new DestinationsPage(), 500);
    }
});
console.log('✅ destinations.js 로드 완료');
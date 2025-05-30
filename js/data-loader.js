// 순신의 길 - JSON 데이터 로더
// GitHub Actions로 생성된 JSON 파일을 로드

class SunsinDataLoader {
    constructor() {
        this.baseUrl = './assets/data/';
        this.cache = new Map();
        this.cacheTTL = 5 * 60 * 1000; // 5분 캐시
        
        console.log('🚀 순신의 길 데이터 로더 초기화 완료');
    }

    // JSON 파일 로드 (캐시 포함)
    async loadJsonFile(filename) {
        const cacheKey = filename;
        const cached = this.cache.get(cacheKey);
        
        // 캐시 확인
        if (cached && (Date.now() - cached.timestamp) < this.cacheTTL) {
            console.log(`📋 캐시에서 로드: ${filename}`);
            return cached.data;
        }

        try {
            console.log(`📥 JSON 파일 로드 중: ${filename}`);
            const response = await fetch(`${this.baseUrl}${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // 캐시에 저장
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });
            
            console.log(`✅ ${filename} 로드 완료 (${data.count || 0}개 항목)`);
            return data;
            
        } catch (error) {
            console.error(`❌ ${filename} 로드 실패:`, error.message);
            return null;
        }
    }

    // 연표 데이터 가져오기
    async getTimeline() {
        const result = await this.loadJsonFile('timeline.json');
        return result ? result.data : [];
    }

    // 여행지 데이터 가져오기
    async getDestinations() {
        const result = await this.loadJsonFile('destinations.json');
        return result ? result.data : [];
    }

    // 여행코스 데이터 가져오기
    async getTravelCourses() {
        const result = await this.loadJsonFile('courses.json');
        return result ? result.data : [];
    }

    // 메타데이터 가져오기
    async getMetadata() {
        return await this.loadJsonFile('metadata.json');
    }

    // 모든 데이터 한번에 로드
    async loadAllData() {
        console.log('🚀 모든 데이터 로딩 시작...');
        
        try {
            const [timeline, destinations, courses, metadata] = await Promise.all([
                this.getTimeline(),
                this.getDestinations(),
                this.getTravelCourses(),
                this.getMetadata()
            ]);

            const result = {
                timeline,
                destinations,
                courses,
                metadata,
                loadedAt: new Date().toISOString()
            };

            console.log('✅ 모든 데이터 로딩 완료!');
            console.log(`📊 연표: ${timeline.length}개, 여행지: ${destinations.length}개, 코스: ${courses.length}개`);
            
            return result;
        } catch (error) {
            console.error('❌ 데이터 로딩 실패:', error);
            return null;
        }
    }

    // 검색 기능
    searchDestinations(keyword) {
        return new Promise(async (resolve) => {
            const destinations = await this.getDestinations();
            const filtered = destinations.filter(dest => 
                dest.name.includes(keyword) || 
                dest.description.includes(keyword) ||
                dest.address.includes(keyword)
            );
            resolve(filtered);
        });
    }

    // 데이터 상태 확인
    async getDataStatus() {
        const metadata = await this.getMetadata();
        return {
            isOnline: !!metadata,
            lastUpdate: metadata?.lastUpdate || 'Unknown',
            updateReason: metadata?.updateReason || 'Unknown',
            version: metadata?.version || '1.0.0'
        };
    }
}

// 전역 인스턴스 생성
window.sunsinData = new SunsinDataLoader();

// 사용 예시 함수들 (기존 코드와 호환)
async function loadTimelinePage() {
    const timeline = await window.sunsinData.getTimeline();
    console.log('연표 데이터:', timeline);
    return timeline;
}

async function loadDestinationsPage() {
    const destinations = await window.sunsinData.getDestinations();
    console.log('여행지 데이터:', destinations);
    return destinations;
}

async function loadCoursesPage() {
    const courses = await window.sunsinData.getTravelCourses();
    console.log('여행코스 데이터:', courses);
    return courses;
}

// 데이터 상태 테스트 함수
async function testDataLoader() {
    console.log('🧪 데이터 로더 테스트 시작...');
    
    try {
        const status = await window.sunsinData.getDataStatus();
        console.log('📊 데이터 상태:', status);
        
        const allData = await window.sunsinData.loadAllData();
        console.log('🎯 테스트 완료! 모든 데이터 로드 성공');
        return allData;
    } catch (error) {
        console.error('❌ 테스트 실패:', error);
        return null;
    }
}

console.log('✅ data-loader.js 로드 완료');
console.log('🚀 사용법: testDataLoader() 실행하여 테스트 가능');
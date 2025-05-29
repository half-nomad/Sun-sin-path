// 순신의 길 - Notion API 연동 모듈
// 3개 데이터베이스 완전 연동: 여행코스, 연표, 여행지

class SunsinNotionAPI {
    constructor() {
        // api-keys.js에서 설정 가져오기
        if (typeof window !== 'undefined' && window.NOTION_CONFIG) {
            this.config = window.NOTION_CONFIG;
        } else {
            console.error('NOTION_CONFIG not found. Make sure api-keys.js is loaded.');
            return;
        }
        
        this.baseUrl = this.config.baseUrl;
        this.headers = this.config.getHeaders();
        this.databases = this.config.databases;
        
        console.log('🚀 순신의 길 Notion API 초기화 완료');
        console.log('📊 연동된 데이터베이스:', Object.keys(this.databases));
    }

    // 기본 API 호출 함수
    async makeRequest(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                headers: this.headers,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('🚨 Notion API 요청 실패:', error);
            return { success: false, error: error.message };
        }
    }

    // 데이터베이스 쿼리 (범용)
    async queryDatabase(databaseId, queryOptions = {}) {
        const result = await this.makeRequest(`/databases/${databaseId}/query`, {
            method: 'POST',
            body: JSON.stringify(queryOptions)
        });

        if (result.success) {
            console.log(`✅ 데이터베이스 쿼리 성공: ${result.data.results.length}개 항목`);
            return result.data;
        } else {
            console.error('❌ 데이터베이스 쿼리 실패:', result.error);
            return null;
        }
    }

    // 1️⃣ 연표 데이터 가져오기
    async getTimeline() {
        console.log('📅 연표 데이터 로딩 중...');
        
        const queryOptions = {
            sorts: [
                {
                    property: '년도',
                    direction: 'ascending'
                }
            ]
        };

        const data = await this.queryDatabase(this.databases.timeline, queryOptions);
        if (!data) return [];

        return this.formatTimelineData(data.results);
    }

    // 2️⃣ 여행지 데이터 가져오기  
    async getDestinations() {
        console.log('🏛️ 여행지 데이터 로딩 중...');
        
        const queryOptions = {
            sorts: [
                {
                    property: '중요도',
                    direction: 'descending'
                }
            ]
        };

        const data = await this.queryDatabase(this.databases.destinations, queryOptions);
        if (!data) return [];

        return this.formatDestinationData(data.results);
    }

    // 3️⃣ 여행코스 데이터 가져오기
    async getTravelCourses() {
        console.log('🗺️ 여행코스 데이터 로딩 중...');
        
        const queryOptions = {
            sorts: [
                {
                    property: '기간',
                    direction: 'ascending'
                }
            ]
        };

        const data = await this.queryDatabase(this.databases.travelCourses, queryOptions);
        if (!data) return [];

        return this.formatCourseData(data.results);
    }

    // 📅 연표 데이터 포맷팅
    formatTimelineData(results) {
        return results.map(item => {
            const props = item.properties;
            return {
                id: item.id,
                year: this.getPropertyValue(props.년도),
                title: this.getPropertyValue(props.제목),
                description: this.getPropertyValue(props.설명),
                category: this.getPropertyValue(props.카테고리),
                importance: this.getPropertyValue(props.중요도),
                createdTime: item.created_time,
                lastEdited: item.last_edited_time
            };
        });
    }
    // 🏛️ 여행지 데이터 포맷팅
    formatDestinationData(results) {
        return results.map(item => {
            const props = item.properties;
            return {
                id: item.id,
                name: this.getPropertyValue(props.장소명),
                address: this.getPropertyValue(props.주소),
                category: this.getPropertyValue(props.카테고리),
                description: this.getPropertyValue(props.설명),
                openingHours: this.getPropertyValue(props.운영시간),
                admissionFee: this.getPropertyValue(props.입장료),
                importance: this.getPropertyValue(props.중요도),
                phone: this.getPropertyValue(props.전화번호),
                website: this.getPropertyValue(props.웹사이트),
                images: this.getPropertyValue(props.이미지),
                createdTime: item.created_time
            };
        });
    }

    // 🗺️ 여행코스 데이터 포맷팅
    formatCourseData(results) {
        return results.map(item => {
            const props = item.properties;
            return {
                id: item.id,
                title: this.getPropertyValue(props.코스명),
                duration: this.getPropertyValue(props.기간),
                description: this.getPropertyValue(props.설명),
                destinations: this.getPropertyValue(props.여행지목록),
                transportation: this.getPropertyValue(props.교통편),
                budget: this.getPropertyValue(props.예산),
                difficulty: this.getPropertyValue(props.난이도),
                season: this.getPropertyValue(props.추천계절),
                highlights: this.getPropertyValue(props.주요포인트),
                createdTime: item.created_time
            };
        });
    }

    // 노션 속성값 추출 헬퍼 함수
    getPropertyValue(property) {
        if (!property) return '';

        switch (property.type) {
            case 'title':
                return property.title[0]?.plain_text || '';
            case 'rich_text':
                return property.rich_text[0]?.plain_text || '';
            case 'number':
                return property.number || 0;
            case 'select':
                return property.select?.name || '';
            case 'multi_select':
                return property.multi_select?.map(item => item.name) || [];
            case 'date':
                return property.date?.start || '';
            case 'checkbox':
                return property.checkbox || false;
            case 'url':
                return property.url || '';
            case 'email':
                return property.email || '';
            case 'phone_number':
                return property.phone_number || '';
            case 'files':
                return property.files?.map(file => file.external?.url || file.file?.url) || [];
            default:
                return property;
        }
    }

    // 🔄 모든 데이터 한번에 로드
    async loadAllData() {
        console.log('🚀 모든 데이터 로딩 시작...');
        
        try {
            const [timeline, destinations, courses] = await Promise.all([
                this.getTimeline(),
                this.getDestinations(), 
                this.getTravelCourses()
            ]);

            const result = {
                timeline,
                destinations,
                courses,
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

    // 🔍 검색 기능
    async searchDestinations(keyword) {
        const destinations = await this.getDestinations();
        return destinations.filter(dest => 
            dest.name.includes(keyword) || 
            dest.description.includes(keyword) ||
            dest.address.includes(keyword)
        );
    }

    // 📊 통계 정보
    async getStats() {
        const data = await this.loadAllData();
        if (!data) return null;

        return {
            totalTimeline: data.timeline.length,
            totalDestinations: data.destinations.length,
            totalCourses: data.courses.length,
            categories: [...new Set(data.destinations.map(d => d.category))],
            lastUpdated: data.loadedAt
        };
    }
}

// 전역 인스턴스 생성
window.sunsinAPI = new SunsinNotionAPI();

// 사용 예시 함수들
async function loadTimelinePage() {
    const timeline = await window.sunsinAPI.getTimeline();
    console.log('연표 데이터:', timeline);
    return timeline;
}

async function loadDestinationsPage() {
    const destinations = await window.sunsinAPI.getDestinations();
    console.log('여행지 데이터:', destinations);
    return destinations;
}

async function loadCoursesPage() {
    const courses = await window.sunsinAPI.getTravelCourses();
    console.log('여행코스 데이터:', courses);
    return courses;
}

// 전체 데이터 로드 및 테스트 함수
async function testNotionAPI() {
    console.log('🧪 Notion API 테스트 시작...');
    
    try {
        const stats = await window.sunsinAPI.getStats();
        console.log('📊 데이터 통계:', stats);
        
        const allData = await window.sunsinAPI.loadAllData();
        console.log('🎯 테스트 완료! 모든 데이터 로드 성공');
        return allData;
    } catch (error) {
        console.error('❌ 테스트 실패:', error);
        return null;
    }
}

console.log('✅ notion-api.js 로드 완료');
console.log('🚀 사용법: testNotionAPI() 실행하여 테스트 가능');
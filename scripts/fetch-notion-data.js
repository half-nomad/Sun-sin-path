#!/usr/bin/env node
// 순신의 길 - 노션 데이터 자동 업데이트 스크립트
// GitHub Actions에서 실행되어 노션 데이터를 JSON으로 저장

const fs = require('fs').promises;
const path = require('path');

// 노션 API 설정
const NOTION_CONFIG = {
    token: process.env.NOTION_TOKEN || 'ntn_Y24359279513pKlRBKWhw75wdKn3FManCgX9wsxi0NCbc6',
    version: '2022-06-28',
    baseUrl: 'https://api.notion.com/v1',
    databases: {
        travelCourses: '201091314f8f80a1b28dcc04552f870f',
        timeline: '20109131-4f8f-80a3-908b-e834651bd807', 
        destinations: '201091314f8f803aa27fecf11768b3a4'
    }
};

console.log('🚀 노션 데이터 업데이트 스크립트 시작');
console.log('📅 실행 시간:', new Date().toISOString());
console.log('📊 업데이트 타입:', process.env.UPDATE_TYPE || 'all');
console.log('📝 업데이트 이유:', process.env.UPDATE_REASON || '수동 실행');

// 노션 API 호출 함수
async function callNotionAPI(endpoint, options = {}) {
    const url = `${NOTION_CONFIG.baseUrl}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${NOTION_CONFIG.token}`,
                'Notion-Version': NOTION_CONFIG.version,
                'Content-Type': 'application/json'
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`❌ API 호출 실패 (${endpoint}):`, error.message);
        throw error;
    }
}

// 데이터베이스 쿼리
async function queryDatabase(databaseId, queryOptions = {}) {
    console.log(`📊 데이터베이스 쿼리 중: ${databaseId}`);
    
    const data = await callNotionAPI(`/databases/${databaseId}/query`, {
        method: 'POST',
        body: JSON.stringify(queryOptions)
    });
    
    console.log(`✅ ${data.results.length}개 항목 조회 완료`);
    return data.results;
}

// 노션 속성값 추출
function getPropertyValue(property) {
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
            return property.files?.map(file => 
                file.external?.url || file.file?.url
            ) || [];
        default:
            return '';
    }
}
// 연표 데이터 처리
async function fetchTimeline() {
    console.log('📅 연표 데이터 가져오기 시작...');
    
    const results = await queryDatabase(NOTION_CONFIG.databases.timeline, {
        sorts: [{ property: '년도', direction: 'ascending' }]
    });
    
    const timeline = results.map(item => {
        const props = item.properties;
        return {
            id: item.id,
            year: getPropertyValue(props.년도),
            title: getPropertyValue(props.제목),
            description: getPropertyValue(props.설명),
            category: getPropertyValue(props.카테고리),
            importance: getPropertyValue(props.중요도),
            createdTime: item.created_time,
            lastEdited: item.last_edited_time
        };
    });
    
    console.log(`✅ 연표 데이터 ${timeline.length}개 처리 완료`);
    return timeline;
}

// 여행지 데이터 처리
async function fetchDestinations() {
    console.log('🏛️ 여행지 데이터 가져오기 시작...');
    
    const results = await queryDatabase(NOTION_CONFIG.databases.destinations, {
        sorts: [{ property: '중요도', direction: 'descending' }]
    });
    
    const destinations = results.map(item => {
        const props = item.properties;
        return {
            id: item.id,
            name: getPropertyValue(props.장소명),
            address: getPropertyValue(props.주소),
            category: getPropertyValue(props.카테고리),
            description: getPropertyValue(props.설명),
            openingHours: getPropertyValue(props.운영시간),
            admissionFee: getPropertyValue(props.입장료),
            importance: getPropertyValue(props.중요도),
            phone: getPropertyValue(props.전화번호),
            website: getPropertyValue(props.웹사이트),
            images: getPropertyValue(props.이미지),
            createdTime: item.created_time
        };
    });
    
    console.log(`✅ 여행지 데이터 ${destinations.length}개 처리 완료`);
    return destinations;
}

// 여행코스 데이터 처리
async function fetchTravelCourses() {
    console.log('🗺️ 여행코스 데이터 가져오기 시작...');
    
    const results = await queryDatabase(NOTION_CONFIG.databases.travelCourses, {
        sorts: [{ property: '기간', direction: 'ascending' }]
    });
    
    const courses = results.map(item => {
        const props = item.properties;
        return {
            id: item.id,
            title: getPropertyValue(props.코스명),
            duration: getPropertyValue(props.기간),
            description: getPropertyValue(props.설명),
            destinations: getPropertyValue(props.여행지목록),
            transportation: getPropertyValue(props.교통편),
            budget: getPropertyValue(props.예산),
            difficulty: getPropertyValue(props.난이도),
            season: getPropertyValue(props.추천계절),
            highlights: getPropertyValue(props.주요포인트),
            createdTime: item.created_time
        };
    });
    
    console.log(`✅ 여행코스 데이터 ${courses.length}개 처리 완료`);
    return courses;
}

// JSON 파일 저장
async function saveToFile(filename, data) {
    const dataDir = path.join(process.cwd(), 'assets', 'data');
    
    // 디렉토리 생성 (없으면)
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, filename);
    const jsonData = JSON.stringify(data, null, 2);
    
    await fs.writeFile(filePath, jsonData, 'utf8');
    console.log(`💾 ${filename} 저장 완료 (${jsonData.length} bytes)`);
}
// 메인 실행 함수
async function main() {
    try {
        const updateType = process.env.UPDATE_TYPE || 'all';
        
        console.log('\n🎯 업데이트 시작...');
        
        // 업데이트 타입에 따라 실행
        if (updateType === 'all' || updateType === 'timeline') {
            const timeline = await fetchTimeline();
            await saveToFile('timeline.json', {
                data: timeline,
                lastUpdated: new Date().toISOString(),
                count: timeline.length
            });
        }
        
        if (updateType === 'all' || updateType === 'destinations') {
            const destinations = await fetchDestinations();
            await saveToFile('destinations.json', {
                data: destinations,
                lastUpdated: new Date().toISOString(),
                count: destinations.length
            });
        }
        
        if (updateType === 'all' || updateType === 'courses') {
            const courses = await fetchTravelCourses();
            await saveToFile('courses.json', {
                data: courses,
                lastUpdated: new Date().toISOString(),
                count: courses.length
            });
        }
        
        // 통합 메타데이터 생성
        const metadata = {
            lastUpdate: new Date().toISOString(),
            updateReason: process.env.UPDATE_REASON || '수동 실행',
            updateType: updateType,
            databases: NOTION_CONFIG.databases,
            version: '1.0.0'
        };
        
        await saveToFile('metadata.json', metadata);
        
        console.log('\n🎉 모든 데이터 업데이트 완료!');
        console.log('📊 업데이트 결과:');
        console.log(`   - 타입: ${updateType}`);
        console.log(`   - 시간: ${metadata.lastUpdate}`);
        console.log(`   - 이유: ${metadata.updateReason}`);
        
    } catch (error) {
        console.error('\n❌ 업데이트 실패:', error.message);
        console.error('스택 트레이스:', error.stack);
        process.exit(1);
    }
}

// 스크립트 실행
if (require.main === module) {
    main();
}
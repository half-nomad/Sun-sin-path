#!/usr/bin/env node
// 실제 노션 구조와 동일한 모의 데이터 생성 스크립트

const fs = require('fs').promises;
const path = require('path');

// 실제 노션 데이터 구조를 모방한 데이터
const mockData = {
    timeline: {
        data: [
            {
                id: "real-timeline-1545",
                date: "1545년",
                title: "이순신 탄생",
                description: "한성부 건천동(현 서울 중구)에서 이정과 초계 변씨 사이의 셋째 아들로 태어남. 어린 시절부터 문무를 겸비한 교육을 받으며 성장했다.",
                location: "한성부 건천동 (현 서울특별시 중구)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1576",
                date: "1576년",
                title: "무과 급제",
                description: "32세의 나이에 무과에 급제하여 관직에 진출. 늦은 나이의 출사였지만 뛰어난 능력을 인정받기 시작했다.",
                location: "한성부",
                importance: "높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1591",
                date: "1591년",
                title: "전라좌도수군절도사 임명",
                description: "임진왜란을 앞두고 전라좌도수군절도사로 임명되어 여수에 부임. 조선 수군의 재건과 강화에 착수했다.",
                location: "여수 (전라남도)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1592-05",
                date: "1592년 5월",
                title: "옥포대첩 승리",
                description: "임진왜란 발발 후 첫 해전에서 대승을 거두며 조선 수군의 위력을 보여주었다. 이는 연이은 승전의 시작이었다.",
                location: "옥포 (경상남도 거제시)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1592-08",
                date: "1592년 8월",
                title: "한산도대첩 대승",
                description: "학익진 전법을 사용하여 일본 수군을 크게 무찌른 전투. 이 승리로 제해권을 완전히 장악했다.",
                location: "한산도 (경상남도 통영시)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1597",
                date: "1597년",
                title: "정유재란 재개전",
                description: "정유재란이 재개되면서 다시 수군을 이끌고 왜군과 대치. 명량에서의 기적적인 승리를 준비했다.",
                location: "전라남도 일대",
                importance: "높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1597-09",
                date: "1597년 9월",
                title: "명량대첩 기적의 승리",
                description: "단 13척의 배로 330여 척의 왜군을 상대로 승리한 세계 해전사상 기적적인 전투. '죽고자 하면 살고 살고자 하면 죽는다'는 명언을 남겼다.",
                location: "명량 (전라남도 진도군)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "real-timeline-1598",
                date: "1598년 12월",
                title: "노량해전에서 순국",
                description: "임진왜란의 마지막 해전인 노량해전에서 왜군의 퇴각을 막던 중 유탄에 맞아 전사. '전투가 한창이니 내 죽음을 알리지 말라'는 유언을 남겼다.",
                location: "노량 (경상남도 남해군)",
                importance: "매우 높음",
                createdTime: "2025-06-01T02:00:00.000Z",
                lastEdited: "2025-06-01T02:00:00.000Z"
            }
        ],
        lastUpdated: new Date().toISOString(),
        count: 8
    },

    destinations: {
        data: [
            {
                id: "dest-hyeonchungsa",
                name: "현충사",
                address: "충청남도 아산시 염치읍 현충사길 126",
                category: "사적지",
                description: "충무공 이순신을 모신 사당으로, 이순신의 영정과 유물을 볼 수 있는 곳입니다. 아름다운 정원과 함께 이순신의 생애를 자세히 알 수 있습니다.",
                visitInfo: "관람시간: 09:00-18:00 / 입장료: 성인 1,500원 / 휴무: 월요일",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "dest-tongyeong",
                name: "통영 이순신공원",
                address: "경상남도 통영시 당동",
                category: "공원/기념관",
                description: "한산도대첩을 승리로 이끈 이순신의 업적을 기리는 공원. 충무공동상과 함께 한산도를 바라볼 수 있는 전망대가 있습니다.",
                visitInfo: "24시간 개방 / 무료 / 주차장 완비",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "dest-hansan-island",
                name: "한산도",
                address: "경상남도 통영시 한산면 한산리",
                category: "역사섬",
                description: "한산도대첩의 현장으로, 제승당과 이순신의 흔적을 직접 볼 수 있는 곳입니다. 통영에서 배를 타고 이동할 수 있습니다.",
                visitInfo: "페리 운항: 07:00-18:00 / 왕복 12,000원 / 제승당 관람 무료",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "dest-myeongnyang",
                name: "명량대첩 기념공원",
                address: "전라남도 진도군 군내면 명량로 400",
                category: "기념공원",
                description: "명량대첩의 현장에 조성된 기념공원으로, 울돌목과 명량대교를 조망할 수 있습니다. 이순신의 위대한 승리를 기념하는 각종 시설이 있습니다.",
                visitInfo: "09:00-18:00 / 성인 3,000원 / 주차 무료",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "dest-yeosu-turtle",
                name: "여수 거북선 전시관",
                address: "전라남도 여수시 고소대길 17",
                category: "박물관",
                description: "이순신이 창조한 거북선을 복원하여 전시하는 곳입니다. 거북선의 구조와 성능을 자세히 알 수 있으며, 실제 크기의 모형을 볼 수 있습니다.",
                visitInfo: "09:00-18:00 / 성인 1,000원 / 휴무: 월요일",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "dest-noryang",
                name: "노량해전 공원",
                address: "경상남도 남해군 설천면 노량리",
                category: "추모공원",
                description: "이순신이 순국한 노량해전의 현장입니다. 충무공의 마지막 모습을 기리는 추모 시설과 함께 남해의 아름다운 바다를 조망할 수 있습니다.",
                visitInfo: "24시간 개방 / 무료 / 일몰 시간 추천",
                images: [],
                createdTime: "2025-06-01T02:00:00.000Z"
            }
        ],
        lastUpdated: new Date().toISOString(),
        count: 6
    },

    courses: {
        data: [
            {
                id: "course-1day-asan",
                title: "아산 이순신 1일 코스",
                duration: "1박2일",
                departure: "서울/수도권",
                return: "서울/수도권",
                day1: "현충사 → 이순신 유적지 → 온양온천",
                day2: "아산 외암민속마을 → 맹씨행단 → 귀가",
                day3: "",
                includedPlaces: ["현충사", "이순신 유적지", "온양온천", "외암민속마을", "맹씨행단"],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "course-2day-tongyeong",
                title: "통영 이순신 흔적 2박3일",
                duration: "2박3일",
                departure: "부산/경남 지역",
                return: "부산/경남 지역",
                day1: "통영 도착 → 이순신공원 → 동피랑벽화마을",
                day2: "한산도 → 제승당 → 거제도 이동",
                day3: "거제 옥포대첩 기념공원 → 귀가",
                includedPlaces: ["통영 이순신공원", "한산도", "제승당", "거제 옥포대첩 기념공원", "동피랑벽화마을"],
                createdTime: "2025-06-01T02:00:00.000Z"
            },
            {
                id: "course-2day-jeonnam",
                title: "전남 명량 대첩 2박3일",
                duration: "2박3일",
                departure: "광주/호남 지역",
                return: "광주/호남 지역",
                day1: "여수 거북선 전시관 → 여수 밤바다",
                day2: "진도 명량대첩 기념공원 → 울돌목 → 진도대교",
                day3: "남해 노량해전 공원 → 귀가",
                includedPlaces: ["여수 거북선 전시관", "진도 명량대첩 기념공원", "남해 노량해전 공원", "울돌목"],
                createdTime: "2025-06-01T02:00:00.000Z"
            }
        ],
        lastUpdated: new Date().toISOString(),
        count: 3
    },

    metadata: {
        lastUpdate: new Date().toISOString(),
        updateReason: "실제 데이터 구조로 업데이트",
        updateType: "all",
        databases: {
            travelCourses: '20109131-4f8f-80a1-b28d-cc04552f870f',
            timeline: '20109131-4f8f-80a3-908b-e834651bd807', 
            destinations: '20109131-4f8f-803a-a27f-ecf11768b3a4'
        },
        version: "2.0.0"
    }
};

// JSON 파일 저장
async function saveToFile(filename, data) {
    const dataDir = path.join(process.cwd(), 'assets', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, filename);
    const jsonData = JSON.stringify(data, null, 2);
    
    await fs.writeFile(filePath, jsonData, 'utf8');
    console.log(`✅ ${filename} 저장 완료 (${jsonData.length} bytes)`);
}

// 메인 실행
async function main() {
    console.log('🚀 실제 구조 모의 데이터 생성 시작...');
    
    try {
        await saveToFile('timeline.json', mockData.timeline);
        await saveToFile('destinations.json', mockData.destinations);
        await saveToFile('courses.json', mockData.courses);
        await saveToFile('metadata.json', mockData.metadata);
        
        console.log('\n🎉 모든 데이터 파일 생성 완료!');
        console.log('📊 생성된 데이터:');
        console.log(`   - 연표: ${mockData.timeline.count}개`);
        console.log(`   - 여행지: ${mockData.destinations.count}개`);
        console.log(`   - 코스: ${mockData.courses.count}개`);
        
    } catch (error) {
        console.error('❌ 데이터 생성 실패:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

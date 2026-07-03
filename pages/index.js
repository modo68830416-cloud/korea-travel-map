
import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/home.module.css'

const REGIONS = [
  { id: 'gangwon', name: '강원', emoji: '🏔️' },
  { id: 'sudo', name: '수도권', emoji: '🏙️' },
  { id: 'chungcheong', name: '충청', emoji: '⛲' },
  { id: 'gyeongsang', name: '경상', emoji: '🌉' },
  { id: 'jeolla', name: '전라', emoji: '🌾' },
  { id: 'jeju', name: '제주', emoji: '🌴' },
]

const REGION_NAME_LOOKUP = REGIONS.reduce((acc, r) => {
  acc[r.id] = r.name
  return acc
}, {})

const COURSES = {
  sudo: [
    {
      category: '관광 코스',
      icon: '🏯',
      title: '고궁과 한강, 서울 감성 1일 코스',
      duration: '당일치기',
      stops: ['경복궁', '인사동', '광장시장', '남산서울타워', '반포 한강공원'],
      desc: '전통과 현대가 공존하는 서울의 하루. 궁궐 산책 후 시장에서 먹거리를 즐기고, 노을 지는 한강에서 마무리하는 코스예요.',
    },
    {
      category: '맛집 코스',
      icon: '🍜',
      title: '서울 노포·시장 맛집 코스',
      duration: '당일치기',
      stops: ['광장시장 빈대떡·마약김밥', '을지로 노포 골목', '신당동 떡볶이 타운', '이태원 세계음식거리'],
      desc: '수십 년 전통의 노포부터 세계 각국 음식까지, 서울에서 미식 여행을 즐기는 코스입니다.',
    },
  ],
  gangwon: [
    {
      category: '관광 코스',
      icon: '🚗',
      title: '동해안 힐링 드라이브 2박 3일',
      duration: '2박 3일',
      stops: ['강릉 경포호', '안목해변 카페거리', '정동진', '속초 설악산', '남애항'],
      desc: '푸른 동해 바다를 따라 달리는 드라이브 코스. 커피 한 잔의 여유와 설악산 단풍까지 즐길 수 있어요.',
    },
    {
      category: '맛집 코스',
      icon: '🐚',
      title: '강원 향토음식 맛집 코스',
      duration: '1박 2일',
      stops: ['강릉 초당순두부마을', '속초 아바이마을 순대', '춘천 닭갈비골목', '정선 곤드레밥', '동해 물회거리'],
      desc: '순두부부터 닭갈비, 곤드레밥까지 강원도의 대표 향토음식을 한 번에 맛보는 코스입니다.',
    },
  ],
  chungcheong: [
    {
      category: '관광 코스',
      icon: '🏛️',
      title: '역사와 온천의 고장 1박 2일',
      duration: '1박 2일',
      stops: ['공주 공산성', '부여 백제문화단지', '대전 유성온천', '청주 청남대'],
      desc: '백제의 숨결이 남아있는 유적지를 둘러보고, 유성온천에서 여행의 피로를 풀어보세요.',
    },
    {
      category: '맛집 코스',
      icon: '🥟',
      title: '충청 별미 맛집 코스',
      duration: '당일치기',
      stops: ['천안 병천순대거리', '청주 삼겹살거리', '대전 성심당', '아산 온천지구 맛집'],
      desc: '순대와 삼겹살, 전국구 빵집까지 충청도에서만 만날 수 있는 별미를 즐기는 코스예요.',
    },
  ],
  gyeongsang: [
    {
      category: '관광 코스',
      icon: '⛩️',
      title: '부산·경주 문화유산 여행 2박 3일',
      duration: '2박 3일',
      stops: ['경주 불국사', '첨성대', '부산 해운대', '감천문화마을', '태종대'],
      desc: '천년 고도 경주의 유적과 부산의 바다·야경을 함께 즐기는 알찬 코스입니다.',
    },
    {
      category: '맛집 코스',
      icon: '🐟',
      title: '부산·대구·안동 맛집 코스',
      duration: '1박 2일',
      stops: ['부산 자갈치시장 회', '부산 밀면거리', '대구 막창골목', '안동 찜닭거리'],
      desc: '싱싱한 해산물부터 얼큰한 막창, 안동 찜닭까지 경상도 미식 벨트를 도는 코스입니다.',
    },
  ],
  jeolla: [
    {
      category: '관광 코스',
      icon: '🎨',
      title: '미식과 예술의 남도 여행 2박 3일',
      duration: '2박 3일',
      stops: ['전주 한옥마을', '순창 전통시장', '여수 밤바다', '순천만 국가정원', '담양 죽녹원'],
      desc: '맛있는 남도 음식과 아름다운 자연을 함께 즐기는 미식 여행 코스예요.',
    },
    {
      category: '맛집 코스',
      icon: '🍚',
      title: '전라도 한정식·미식 맛집 코스',
      duration: '1박 2일',
      stops: ['전주 비빔밥·한정식', '목포 홍어거리', '여수 서대회·갓김치', '담양 떡갈비'],
      desc: '한 상 가득 차려지는 한정식부터 홍어, 서대회까지 남도 미식의 정수를 경험하는 코스입니다.',
    },
  ],
  jeju: [
    {
      category: '관광 코스',
      icon: '🌋',
      title: '제주 힐링 코스 3박 4일',
      duration: '3박 4일',
      stops: ['성산일출봉', '우도', '협재해수욕장', '한라산', '서귀포 올레시장'],
      desc: '바다와 오름, 한라산까지 제주의 매력을 한 번에 담은 대표 코스입니다.',
    },
    {
      category: '맛집 코스',
      icon: '🐷',
      title: '제주 흑돼지·해녀음식 맛집 코스',
      duration: '2박 3일',
      stops: ['제주시 흑돼지거리', '서귀포 매일올레시장', '성산 해녀의부엌', '고기국수 맛집', '우도 땅콩아이스크림'],
      desc: '흑돼지 구이부터 해녀가 직접 잡은 해산물, 고기국수까지 제주 미식을 제대로 즐기는 코스입니다.',
    },
  ],
}

function Home() {
  const [activeRegion, setActiveRegion] = useState(null)

  const toggleRegion = (id) => {
    setActiveRegion((current) => (current === id ? null : id))
  }

  const activeCourses = activeRegion ? COURSES[activeRegion] : null

  return (
    <>
      <Head>
        <title>코리아트립 | 지역별 여행 코스 추천</title>
        <meta name="description" content="대한민국 구석구석, 지역별 추천 여행 코스와 맛집 코스를 만나보세요" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <img src="/logo.svg" alt="코리아트립 로고" className={styles.heroLogo} />
          <p className={styles.heroKicker}>KOREA TRAVEL MAP</p>
          <h1 className={styles.heroTitle}>
            대한민국 구석구석,
            <br />
            나만의 여행 코스를 찾아보세요
          </h1>
          <p className={styles.heroDesc}>
            지도를 눌러 지역을 선택하면, 그 지역의 여행 코스와 맛집 코스를 바로 확인할 수 있어요.
          </p>
          <div className={styles.heroActions}>
            <a href="#map" className={styles.btnPrimary}>
              지역별 코스 보기
            </a>
            <a href="#courses" className={styles.btnSecondary}>
              전체 코스 둘러보기
            </a>
          </div>
        </section>

        <section id="map" className={styles.section}>
          <h2 className={styles.sectionTitle}>지도에서 지역을 선택하세요</h2>
          <p className={styles.sectionDesc}>클릭 한 번으로 그 지역의 여행 코스와 맛집 코스를 볼 수 있어요.</p>

          <div className={styles.mapGrid}>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`${styles.mapTile} ${styles['tile_' + r.id]} ${
                  activeRegion === r.id ? styles.mapTileActive : ''
                }`}
                onClick={() => toggleRegion(r.id)}
              >
                <span className={styles.mapTileIcon}>{r.emoji}</span>
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          {activeCourses && (
            <div className={styles.courseDetailList}>
              {activeCourses.map((course) => (
                <article key={course.title} className={styles.courseDetail}>
                  <div className={styles.courseDetailTags}>
                    <span className={styles.courseRegionTag}>{REGION_NAME_LOOKUP[activeRegion]}</span>
                    <span className={styles.courseCategoryTag}>
                      {course.icon} {course.category}
                    </span>
                  </div>
                  <h3 className={styles.courseDetailTitle}>{course.title}</h3>
                  <p className={styles.courseDuration}>🗓 {course.duration}</p>
                  <p className={styles.courseDetailDesc}>{course.desc}</p>
                  <ol className={styles.stopList}>
                    {course.stops.map((stop, i) => (
                      <li key={stop}>
                        <span className={styles.stopIndex}>{i + 1}</span>
                        {stop}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="courses" className={styles.section}>
          <h2 className={styles.sectionTitle}>전체 여행 코스</h2>
          <p className={styles.sectionDesc}>지역별 여행 코스와 맛집 코스를 한눈에 비교해보세요.</p>

          <div className={styles.courseGrid}>
            {REGIONS.map((r) =>
              COURSES[r.id].map((course) => (
                <article key={course.title} className={styles.courseCard}>
                  <div className={styles.courseCardThumb}>{course.icon}</div>
                  <div className={styles.courseDetailTags}>
                    <span className={styles.courseRegionTag}>{r.name}</span>
                    <span className={styles.courseCategoryTag}>{course.category}</span>
                  </div>
                  <h3 className={styles.courseCardTitle}>{course.title}</h3>
                  <p className={styles.courseCardDuration}>{course.duration}</p>
                  <p className={styles.courseCardDesc}>{course.desc}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section id="request" className={styles.consult}>
          <h2 className={styles.consultTitle}>나에게 맞는 코스를 추천받고 싶나요?</h2>
          <p className={styles.consultDesc}>여행 스타일과 일정을 알려주시면 맞춤 코스를 짜드립니다.</p>
          <div className={styles.consultActions}>
            <button type="button" className={styles.btnPrimary}>
              📝 맞춤 코스 요청하기
            </button>
            <button type="button" className={styles.btnSecondary}>
              💬 카카오톡 상담
            </button>
            <button type="button" className={styles.btnSecondary}>
              📩 이메일 문의
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home

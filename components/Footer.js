import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { label: '인스타그램', icon: '📷', href: '#' },
  { label: '유튜브', icon: '▶️', href: '#' },
  { label: '블로그', icon: '✍️', href: '#' },
  { label: '카카오톡', icon: '💬', href: '#' },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>코리아트립 KOREA TRIP</p>
          <p className={styles.desc}>대한민국 구석구석, 나만의 여행 코스를 찾아드립니다.</p>
        </div>

        <div className={styles.contactBlock}>
          <p>대표번호 1544-0000</p>
          <p>운영시간 평일 09:00 ~ 18:00</p>
          <p>이메일 hello@korea-trip.kr</p>
        </div>

        <div className={styles.socialBlock}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} KOREA TRIP. All rights reserved.</p>
    </footer>
  )
}

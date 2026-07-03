import { useState } from 'react'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#home', label: '홈' },
  { href: '#map', label: '지역별 코스' },
  { href: '#courses', label: '전체 코스' },
  { href: '#request', label: '코스 추천받기' },
  { href: '#footer', label: '문의' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <img src="/logo.svg" alt="코리아트립 로고" className={styles.logoImg} />
          <span className={styles.logoText}>
            <span className={styles.logoMark}>코리아트립</span>
            <span className={styles.logoSub}>KOREA TRIP</span>
          </span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#map" className={styles.navCta} onClick={() => setOpen(false)}>
            내 코스 찾기
          </a>
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}

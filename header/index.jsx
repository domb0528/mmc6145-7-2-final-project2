import styles from './style.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Calorie Watcher 🏋️‍♂️ </Link>
        <Link href="/search">Calorie Input</Link>
      </div>
    </header>
  )
}
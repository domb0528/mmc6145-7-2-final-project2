import styles from './style.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Calorie Watcher 🏋️‍♂️ </Link>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
        <Link href="/search">Calorie Input</Link>
        <Link href="/Favorites">Favorites</Link>
      </div>
    </header>
  )
}
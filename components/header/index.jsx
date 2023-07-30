import styles from './style.module.css'
import useLogout from "../../hooks/useLogout";
import Link from 'next/link'

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.header}>
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Calorie Watcher 🏋️‍♂️ </Link>
      <Link href="/search">Search</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  </header>
)
}
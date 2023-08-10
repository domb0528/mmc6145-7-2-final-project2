import styles from './style.module.css'
import useLogout from "../../hooks/useLogout";
import Link from 'next/link'

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.header}>
       <div className={styles.container}>
      {props.isLoggedIn ? (
        <>
        <p>
          <Link href="/" className={styles.logo}>Calorie Watcher 🏋️‍♂️ </Link>
          </p>
          <p>
          <Link href="/favorites">Favorites</Link>
          </p>
          <p>
          <Link href="/search" isLoggedIn={props.isLoggedIn }>Search</Link>
          </p>
          <div >
            <p onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <>
          <p>
          <Link href="/" className={styles.logo}>Calorie Watcher 🏋️‍♂️ </Link>
          </p>
          <p>
            <Link href="/login">Login</Link>
          </p>
        
           <p>
          <Link href="/signup">Sign Up</Link>
          </p>

             <p>
          <Link href="/search" isLoggedIn={props.isLoggedIn }>Search</Link>
          </p>
        </>
      )}
      </div>
    </header>
  );
}
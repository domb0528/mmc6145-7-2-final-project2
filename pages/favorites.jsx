import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from "../components/header";


export default function Home(props) {
  
  return (
    <>
      <Head>
        <title>Calorie Watcher 🏋️‍♂️</title>
        <meta name="description" content="Sip & Savor is a wine pairing app" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏋️‍♂️</text></svg>"/>
      </Head>
      <Header isLoggedIn={true}/>
      <main>
        <div className={styles.container}>
          <h1>Welcome to Your Favorites Page Add Your Favorites Here.</h1>
          <section className={styles.jumbo}>
            <ul>
              <li>
                Favorites go here
              </li>
            </ul>
          </section>
        </div>
        <section className={styles.goSearch}>
          <p></p>
          <Link href="/search" className="button">Search for your suggested meals to add to your Favorites</Link>
        </section>
      </main>
    </>
  )
}
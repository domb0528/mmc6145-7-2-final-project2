import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getWinePairing } from '../../util/winePairing'
import styles from '../../styles/winePairing.module.css'

export async function getServerSideProps({params: {id}}) {

  const winePairingInfo = await getWinePairing(id)

  return { props:{winePairingInfo} }
}

export default function WinePairing({winePairingInfo}) {
  return (
    <>
      <Head>
        <title>{winePairingInfo ? winePairingInfo.title : 'WinePairing Not Found'}</title>
        <meta name="description" content={winePairingInfo ? 'WinePairing info for ' + winePairingInfo.title : 'WinePairing Not Found Page'} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"/>
      </Head>


      {winePairingInfo ? <WinePairingInfo {...winePairingInfo} /> : <WinePairingError />}

      <Link className={styles.return} href="/search">Return to Search</Link>
    </>
  )
}

function WinePairingInfo({
  image,
  title,
  readyInMinutes,
  instructions,
  summary,
  extendedIngredients
}) {
  return (
    <main className={styles.container}>
      <h1>{title}</h1>
      <Image src={image} alt={title} className={styles.winePairingImg}/>
      <div className={styles.notes}>
        <p>Time to Make: {readyInMinutes}min</p>
      </div>
      <div className={styles.infoGroup}>
        <div className={styles.description}>
          <h2>Description</h2>
          <div dangerouslySetInnerHTML={{__html: summary.replace(/(href=")[\w-/:\.]+-([\d]+)/g, "$1" + '/winePairing/' + "$2")}}></div>
        </div>
        <div className={styles.ingredients}>
          <h2>Ingredients</h2>
          <ul>
            {extendedIngredients.map((ing, i) => <li key={i}>{ing.original}</li>)}
          </ul>
        </div>
      </div>
      <h2>Steps</h2>
      <div className={styles.instructions} dangerouslySetInnerHTML={{__html: instructions}}></div>
    </main>
  )
}

function WinePairingError() {
  return (
    <h1 className={styles.notFound}>WinePairing Not Found!</h1>
  )
}
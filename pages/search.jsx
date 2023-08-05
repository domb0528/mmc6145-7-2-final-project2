import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { searchWinePairings } from '../util/winePairing'
import styles from '../styles/search.module.css'


export async function getServerSideProps({query:{q}}) {
  
  const props = {}
  if (!q) return{props}

  props.winePairings = await searchWinePairings(q)
  console.log(props)
  return {props}
}

export default function Search({winePairings}) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    router.replace(router.pathname + `?q=${query}`)
    
  }
  return (
    <>
      <Head>
        <title>Calorie Watcher 🏋️‍♂️</title>
        <meta name="description" content="Search for Wine Pairings" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏋️‍♂️</text></svg>"/>
      </Head>

      <p className={styles.noResults}>Type in your nutriant goal numbers for calories or carbs etc, and the website will populate a meal recipies with all nutriant information.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="winePairing-search">Search by your amount of calories or nutriants values</label>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          name="winePairing-search"
          id="winePairing-search" autoFocus/>
        <button type="submit">Submit</button>
      </form>
      {
        winePairings?.length
        ? <section className={styles.results}>
      
        
        {
        winePairings.map((winePairing, i) => (   
        
        <WinePairingPreview key={i} id={winePairing.id} title={winePairing.title} image={winePairing.imageUrl} description={winePairing.description} calories={winePairing.calories} carbs={winePairing.carbs} fat={winePairing.fat} protein={winePairing.protein}  />
        ))}
        
        </section>
      : <p className={styles.noResults}>No meals found!</p>
    }
    </>
  )
}

function WinePairingPreview({id, title, image, description}) {
  return (
    <div>
    <Link href={'/winePairing/' + id} className={styles.preview}>
      <Image src={image} width="231" height="231" alt={title}/>
      <span>{title}</span>
      <span>{description}</span>
      <span>{calorioes}</span>
      <span>{carbs}</span>
      <span>{protein}</span>
      <span>{fat}</span>

    </Link>
    </div>
  )
}
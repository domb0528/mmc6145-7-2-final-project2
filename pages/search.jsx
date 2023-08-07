import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { searchWinePairings } from '../util/winePairing'
import styles from '../styles/search.module.css'
import Header from "../components/header";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
    console.log(query)
    const { user } = req.session;
    const props = {};
    if (user) {
      props.user = req.session.user;
    }
    props.isLoggedIn = !!user;
    props.winePairings = await searchWinePairings(query.q)
    return { props };
  },
  sessionOptions
);

export async function getServerSideProps1({query:{q}}) {
  
  const props = {}
  if (!q) return{props}

  props.winePairings = await searchWinePairings(q)
  console.log(props)
  return {props}
}

export default function Search({winePairings, isLoggedIn}) {
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
      <Header isLoggedIn={isLoggedIn}/>
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
        
        <WinePairingPreview key={i} id={winePairing.id} title={winePairing.title} image={winePairing.image} calories={winePairing.calories} carbs={winePairing.carbs} fat={winePairing.fat} protein={winePairing.protein} addToFavorites={winePairing.addToFavorites} removeFromFavorites={winePairing.removeFromFavorites}    />
        ))}
        
        </section>
      : <p className={styles.noResults}>No meals found!</p>
    }
    </>
  )
}

async function addToFavorites(WinePairingPreview) {
  // TODO: use fetch to call POST /api/book
  // Be sure to pass book in body (use JSON.stringify)
  // Call router.replace(router.asPath) if you receive a 200 status
  console.log

  const res = await fetch('/util/winePairing', {
    method:'POST', 
    body: JSON.stringify({WinePairingPreview})
  })
  if (res.status === 200) {
    console.log(await res.json())
    console.log(res)
    router.replace(router.asPath)
  }


}
async function removeFromFavorites(WinePairingPreview) {
  // TODO: use fetch to call DELETE /api/book
  // Be sure to pass {id: <book id>} in body (use JSON.stringify)
  // Call router.replace(router.asPath) if you receive a 200 status

  const res = await fetch('/util/winePairing', {
    method: 'DELETE', 
    body: JSON.stringify({WinePairingPreview}),
  })
   // Call router.replace(router.asPath) if you receive a 200 status
  if (res.status === 200) {
  
    router.replace(router.asPath)
  }


}



function WinePairingPreview({id, title, image, calories, carbs, protein, fat, addToFavorites}) {
  return (
    <div className={styles.preview}>
      <Image src={image} width="231" height="231" alt={title}/>
      <span>{title}</span>
      <span>Calories: {calories}</span>
      <span>Total Carbs: {carbs}</span>
      <span>Total Protein: {protein}</span>
      <span>Total Fat: {fat}</span>
      
      <Link href={'favorites'}>
      <button onClick={addToFavorites}>
                  Add to Favorites
                </button></Link>
      <button onClick={removeFromFavorites}>
                  Remove from Favorites
                </button>
    </div>
  )
}
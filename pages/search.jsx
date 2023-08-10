import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { searchFoods } from '../util/food'
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
      console.log(props.user)
      props.user = req.session.user;
    }
    props.isLoggedIn = !!user;
    props.foods = await searchFoods(query.q)
    return { props };
  },
  sessionOptions
);

async function addToFavorites(id,title,image,calories,carbs,protein,fat) {
  // TODO: use fetch to call POST /api/food
  // Be sure to pass food in body (use JSON.stringify)
  // Call router.replace(router.asPath) if you receive a 200 status
  console.log(id, title, calories, carbs)

    let foodInfo = {
      "id" : id,
      "title" : title,
      "image" : image,
      "calories" : calories,
      "carbs" :carbs,
      "protein" : protein,
      "fat" : fat
    }
      
    const res = await fetch('/api/food', {
      method:'POST', 
      body: JSON.stringify(foodInfo)
    })
    if (res.status === 200) {
      console.log(await res.json())
      console.log(res)
      router.replace(router.asPath)
    }


};
async function removeFromFavorites(FoodPreview) {
  // TODO: use fetch to call DELETE /api/food
  // Be sure to pass {id: <food id>} in body (use JSON.stringify)
  // Call router.replace(router.asPath) if you receive a 200 status

  const res = await fetch('/util/food', {
    method: 'DELETE', 
    body: JSON.stringify({FoodPreview}),
  })
   // Call router.replace(router.asPath) if you receive a 200 status
  if (res.status === 200) {
  
    router.replace(router.asPath)
  }


};

export async function getServerSideProps1({query:{q}}) {
  
  const props = {}
  if (!q) return{props}

  props.foods = await searchFoods(q)
  console.log(props)
  return {props}
}

export default function Search({foods, isLoggedIn}) {
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
        <label htmlFor="food-search">Search by your amount of calories or nutriants values</label>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          name="food-search"
          id="food-search" autoFocus/>
        <button type="submit">Submit</button>
      </form>
      {
        foods?.length
        ? <section className={styles.results}>
      
        
        {
        foods.map((food, i) => (   
        
        <FoodPreview key={i} id={food.id} title={food.title} image={food.image} calories={food.calories} carbs={food.carbs} fat={food.fat} protein={food.protein} addToFavorites={food.addToFavorites} removeFromFavorites={food.removeFromFavorites}    />
        ))}
        
        </section>
      : <p className={styles.noResults}>No meals found!</p>
    }
    </>
  )
}


function FoodPreview({id, title, image, calories, carbs, protein, fat}) {
  return (
    
    <div className={styles.preview}>
      <Image src={image} width="231" height="231" alt={title}/>
      <span>{title}</span>
      <span>Calories: {calories}</span>
      <span>Total Carbs: {carbs}</span>
      <span>Total Protein: {protein}</span>
      <span>Total Fat: {fat}</span>
      
      <Link href="/favorites">
      <button onClick={()=>{addToFavorites(id,title,image,calories,carbs,protein,fat)}}>
                  Add to Favorites
                </button>
                </Link>
      <button onClick={removeFromFavorites}>
                  Remove from Favorites
                </button>
    </div>
  )
}
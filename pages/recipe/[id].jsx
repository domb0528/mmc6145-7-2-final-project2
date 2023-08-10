import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getFood } from '../../util/food'
import styles from '../../styles/food.module.css'

export async function getServerSideProps({params: {id}}) {

  const foodInfo = await getFood(id)

  return { props:{foodInfo} }
}

async function addToFavorites(foodInfo) {
  console.log

  const res = await fetch('/api/action', {
    method:'POST', 
    body: JSON.stringify(foodInfo)
  })
  if (res.status === 200) {
    console.log(await res.json())
    console.log(res)
    router.replace(router.asPath)
  }


}

async function removeFromFavorites(foodInfo) {
 

  const res = await fetch('/api/action', {
    method: 'DELETE', 
    body: JSON.stringify({id:foodInfo.id}),
  })

  if (res.status === 200) {
  
    router.replace(router.asPath)
  }


}

export default function Food({foodInfo}) {
  return (
    <>
      <Head>
        <title>{foodInfo ? foodInfo.title : 'Food Not Found'}</title>
        <meta name="description" content={foodInfo ? 'Food info for ' + foodInfo.title : 'Food Not Found Page'} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"/>
      </Head>


      {foodInfo ? <FoodInfo {...foodInfo} /> : <FoodError />}

      <Link className={styles.return} href="/search">Return to Search</Link>
    </>
  )
}

function FoodInfo({
  image,
  title,
  protein,
  carbs,
  calories,
  fat,
}) {
  return (
    <main className={styles.container}>
      <h1>{title}</h1>
      <Image src={image} alt={title} className={styles.foodImg}/>
      <div className={styles.notes}>
        <p>{calories}</p>
        <p>{carbs}</p>
        <p>{protein}</p>
        <p>{fat}</p>
        <button onClick={removeFromFavorites}>
                  Remove from Favorites
                </button>
              <button onClick={addToFavorites}>
                  Add to Favorites
                </button>
      </div>
      <div className={styles.infoGroup}>
        <div className={styles.description}>
          <h2>Description</h2>
          <div dangerouslySetInnerHTML={{__html: summary.replace(/(href=")[\w-/:\.]+-([\d]+)/g, "$1" + '/food/' + "$2")}}></div>
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

function FoodError() {
  return (
    <h1 className={styles.notFound}>Food Not Found!</h1>
  )
}
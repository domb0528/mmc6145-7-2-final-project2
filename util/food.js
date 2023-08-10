export async function getFood(id) {
  

  const response = await fetch(`https://api.spoonacular.com/recipes/4632/card?apiKey=${process.env.API_KEY}`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  return data
}

export async function searchFoods(query) {

  const response = await fetch(`https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${query}&number=20&apiKey=a68f60ca41a34d0da1a841af84f31945`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  //console.log(data)
  return data
}
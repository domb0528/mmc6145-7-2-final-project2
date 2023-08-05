export async function getWinePairing(id) {
  

  const response = await fetch(`https://api.spoonacular.com/recipes/findByNutrients${query}?apiKey=${process.env.API_KEY}`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  return data
}

export async function searchWinePairings(query) {

  const response = await fetch(`https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=2${query}&apiKey=afb3f661343b437f8d72e45c372ff95a`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  console.log(data)
  return data.productMatches
}
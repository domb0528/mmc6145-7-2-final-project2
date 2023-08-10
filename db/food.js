import User from './models/user'
import { normalizeId, dbConnect } from './util'

// export async function getAll(userId) {
//   await dbConnect()
//   const user = await User.findById(userId).lean()
//   if (!user) return null
//   return user.favoriteFoods.map(food => normalizeId(food))
// }

// export async function getByGoogleId(userId, foodId) {
//   await dbConnect()
//   const user = await User.findById(userId).lean()
//   if (!user) return null
//   const food = user.favoriteFoods.find(food => food.googleId === foodId)
//   if (food) return normalizeId(food)
//   return null
// }

export async function add(userId, food) {
  await dbConnect()
  console.log("db connected")
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteFoods: food } },
    { new: true }
  )
  if (!user) return null
  //const addedFood = user.favoriteFoods.find(bk => bk.Id === food.Id)
  console.log("added food!!")
  return 200
}

// export async function remove(userId, foodId) {
//   await dbConnect()
//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $pull: { favoriteFoods: {_id: foodId } } },
//     { new: true }
//   )
//   if (!user) return null
//   return true
// }
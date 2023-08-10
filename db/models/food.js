import { Schema } from 'mongoose'

const foodSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
})

export default foodSchema
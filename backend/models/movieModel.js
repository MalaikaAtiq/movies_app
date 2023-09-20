import mongoose from "mongoose"
const movieSchema = new mongoose.Schema({
  movie_title:{
    type: String
  },
  release_date:{
    type: String
  },
  production_budget:{
    type: Number
  },
  domestic_gross:{
    type: Number
  },
  worldwide_gross:{
    type: Number
  }
})
export default mongoose.model('Movie', movieSchema)
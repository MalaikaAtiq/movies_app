import movieModel from "../models/movieModel.js"
export const getMovies = async(req, res) =>{
  try{
    const movies = await movieModel.find({})
    console.log(movies)
    res.json(movies)
  }catch(err){
    console.log(err.message)
    return res.status(500).json({ msg: err.message })
  }
}
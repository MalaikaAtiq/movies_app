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

export const addMovie = async( req, res ) =>{
  try{
    await movieModel.create(req.body)
    res.json({msg: "Movie added successfully"})
  }catch(err){  
    console.log(err.message)
    return res.status(500).json({msg: err.message})
  }
}
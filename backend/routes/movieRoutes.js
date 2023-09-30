import express from "express";
import { isAuthenticated as auth} from "../auth/auth.js";
import * as movieController  from "../controllers/movieController.js";

const movieRouter = express.Router()

movieRouter.get('/', auth, movieController.getMovies)
movieRouter.post('/addmovie', auth, movieController.addMovie)

export default movieRouter
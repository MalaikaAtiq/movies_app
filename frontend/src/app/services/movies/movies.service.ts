import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor() { }

  getMovies = async() =>{
    try{
      const response = await axios.get('http://localhost:5000/movies',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
        }})
      return response.data;
    }catch(error){
      console.log(error)
    }
  }

  addMovie = async(movie) =>{
    try{
      const response = await axios.post('http://localhost:5000/movies/addmovie', movie, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
        }})
        return response.data
    }catch(error){
      console.log(error)
    }
  }
}

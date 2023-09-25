import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor() { }

  getMovies = async() =>{
    try{
      const response = await axios.get('http://localhost:5000/movies')
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
}

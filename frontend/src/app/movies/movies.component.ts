import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MoviesService } from '../services/movies/movies.service';
import { AppState, MovieState } from '../redux/app.state';
import { Store, select } from '@ngrx/store';
import * as MovieActions from '../redux/actions/movie.actions'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  movies: [] = [] 
  m$: Observable<MovieState>= new Observable<MovieState>;
  pageSize = 10; 
  pageIndex = 0; 
  
  constructor(private movieService: MoviesService, private store: Store<AppState>){
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  ngOnInit(){
    console.log(JSON.parse(localStorage.getItem('moviesState')).movies.length)
    if(JSON.parse(localStorage.getItem('moviesState')).movies.length != 0){
      this.movies = JSON.parse(localStorage.getItem('moviesState')).movies
      this.store.dispatch(MovieActions.getMovies({movies: this.movies}))
      return
    }

    this.m$ = this.store.pipe(select('movies'), take(1))
     this.m$.subscribe(async(state) => {
       if(state.movies.length == 0){
        console.log(state.movies.length)
        await this.getMovies()
        this.store.dispatch(MovieActions.getMovies({movies: this.movies}))
        console.log("If executed", this.movies)
       }

      else{
        this.movies = state.movies
        console.log("else executed: ", this.movies)
      }      
    })


  }
  
  // Pagination event handler
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


//write another getMovies function that brings data from redux 
  // getMovies = async() =>{
  //   try{
  //     const response = await axios.get('http://localhost:5000/movies')
  //     console.log(response.data)
  //     this.movies = response.data
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

//write a function that gets movies from movie service 

  getMovies = async() =>{
      console.log("I was called")
      const movies = await this.movieService.getMovies()
      if(movies){
        this.movies = movies;
      }

      return;
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  onBeforeUnload() {
    this.store.pipe(select('movies'), take(1)).subscribe(state => {
      localStorage.setItem('moviesState', JSON.stringify(state));
    });
  }
}


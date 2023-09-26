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

export class MoviesComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  movies: { movie_title: string, release_date:string,	production_budget: number,	domestic_gross: Number,	worldwide_gross: Number }[] = []
  m$: Observable<MovieState> = new Observable<MovieState>;
  pageSize = 10;
  pageIndex = 0;
  filter: ""
  filteredMovies: { movie_title: string } [] = []

  constructor(private movieService: MoviesService, private store: Store<AppState>) {
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  async ngOnInit() {
    //check the local storage for movie data 
    if (JSON.parse(localStorage.getItem('moviesState')).movies.length != 0) {
      this.movies = JSON.parse(localStorage.getItem('moviesState')).movies
      this.store.dispatch(MovieActions.getMovies({ movies: this.movies }))
      console.log(this.movies)
    }
    //if local storage has no movie data send request to the database 
    else {
      const movieArray = await this.getMovies();
      this.movies = movieArray;
      this.store.dispatch(MovieActions.getMovies({ movies: this.movies }))
    }
  }

  // Pagination event handler
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getMovies = async () => {
    const movies = await this.movieService.getMovies()
    return movies;
  }

  filterMovies = () =>{
    this.filteredMovies = this.movies.filter(movie => movie.movie_title.toLowerCase().includes(this.filter.toLowerCase()));
    console.log(this.filteredMovies)
  }

  resetFilter = () =>{
    this.filteredMovies = [];
  }

  sortDescending = () =>{
    this.movies.sort((a, b) => b.production_budget - a.production_budget);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  onBeforeUnload() {
    this.store.pipe(select('movies'), take(1)).subscribe(state => {
      localStorage.setItem('moviesState', JSON.stringify(state));
    })
  }
}

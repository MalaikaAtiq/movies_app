import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core'
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator'
import { MoviesService } from '../services/movies/movies.service';
import { AppState, MovieState } from '../redux/app.state';
import { Store, select } from '@ngrx/store';
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
  pageSize = 10
  pageIndex = 0
  searchFilter: ""
  sortFilter = ""
  filteredMovies: { movie_title: string } [] = []
  movie_title=""
  release_date=""
  production_budget
  domestic_gross
  worldwide_gross
  popup: Boolean = false;
  successMessage: String = ""
  failMessage: String = ""
  loading= true

  constructor(private movieService: MoviesService, private store: Store<AppState>, private paginatorIntl: MatPaginatorIntl) {
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this))
    this.paginatorIntl.nextPageLabel = ''; 
    this.paginatorIntl.previousPageLabel = ''; 
    this.filteredMovies = []
  }

  async ngOnInit() {
    this.movies = await this.getMovies()
    this.loading = false;
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
      this.filteredMovies = this.movies.filter(movie => movie.movie_title.toLowerCase().includes(this.searchFilter.toLowerCase()));
   
  }

  resetSearch = () =>{
    this.searchFilter = ""
    this.sortFilter=""
    this.filteredMovies = [];
  }

  sortAscending = (filter) =>{
    console.log(this.movies)

    this.sortFilter = filter;
    if(filter === 'movie_title'){
      if(this.filteredMovies.length !=0){
        const movies = this.filteredMovies
        let sortedMoviesAsc =  [...movies].sort((a, b) => a[filter].localeCompare(b[filter]));
        this.filteredMovies = sortedMoviesAsc;
      }
      else{
        const movies = this.movies
        let sortedMoviesAsc =  [...movies].sort((a, b) => a[filter].localeCompare(b[filter]));
        this.filteredMovies = sortedMoviesAsc;
      }
      
    }
    else{
      if(this.filteredMovies.length !=0){
        const movies = this.filteredMovies
        let sortedMoviesAsc = [...movies].sort((a, b) => a[filter] - b[filter]);
        this.filteredMovies = sortedMoviesAsc;
      }
      else{
        const movies = this.movies
        let sortedMoviesAsc = [...movies].sort((a, b) => a[filter] - b[filter]);
        this.filteredMovies = sortedMoviesAsc;
      }
    }
  }

  sortDescending = (filter) =>{
    this.sortFilter = filter;
    if(filter === 'movie_title'){

      if(this.filteredMovies.length !=0){
        
        const movies = this.filteredMovies
        let sortedMoviesDesc = [...movies].sort((a, b) => b[filter].localeCompare(a[filter]));
        this.filteredMovies = sortedMoviesDesc;
      }
      else{
        const movies = this.movies
        let sortedMoviesDesc = [...movies].sort((a, b) => b[filter].localeCompare(a[filter]));
        this.filteredMovies = sortedMoviesDesc;
      }
    }
    else{
      if(this.filteredMovies.length != 0){
        const movies = this.filteredMovies
        let sortedMoviesDesc = [...movies].sort((a, b) => b[filter] - a[filter]);
        this.filteredMovies = sortedMoviesDesc;
      }
      else{
        const movies = this.movies
        let sortedMoviesDesc = [...movies].sort((a, b) => b[filter] - a[filter]);
        this.filteredMovies = sortedMoviesDesc;
      }
    }

  }

  resetSort = () =>{
    this.sortFilter = ""
    this.searchFilter = ""
    this.filteredMovies = [];
  }

  closePopup = () =>{
    this.domestic_gross = null;
    this.production_budget = null;
    this.worldwide_gross = null;
    this.movie_title = "";
    this.release_date = "";
    this.popup = false;
    this.successMessage = ""
  }

  openPopup= () =>{
    this.popup = true;
  }

  addMovie = () =>{
    // if(this.movie_title && this.release_date != "" ){

    // }
    this.movieService.addMovie({movie_title: this.movie_title, release_date: this.release_date, production_budget: this.production_budget, domestic_gross: this.domestic_gross, worldwide_gross: this.worldwide_gross})
    this.domestic_gross = null;
    this.production_budget = null;
    this.worldwide_gross = null;
    this.movie_title = "";
    this.release_date = "";
    this.successMessage = "Movie Added!"
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

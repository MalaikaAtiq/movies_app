import { Component, ViewChild, OnInit } from '@angular/core'
import axios from 'axios'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  movies: any[] = [] ;
  pageSize = 10; // Number of items per page
  pageIndex = 0; // Current page index
  
  ngOnInit(){
    this.getMovies()
  }
  
  // Pagination event handler
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }



  getMovies = async() =>{
    try{
      const response = await axios.get('http://localhost:5000/movies')
      console.log(response.data)
      this.movies = response.data
    }catch(err){
      console.log(err)
    }
  }
}
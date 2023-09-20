import { Component, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ViewChild } from '@angular/core';
import axios from 'axios'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit{

  @ViewChild('paginator') paginator: MatPaginator;

  movies: any[] = [] ;
  dataSource = new MatTableDataSource(this.movies)

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.movies);
    this.dataSource.paginator = this.paginator;
}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getMovies()
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
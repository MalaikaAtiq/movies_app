import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MoviesService } from '../services/movies/movies.service';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{
    selectedChartType: string = 'bar'
    myChart: Chart;
    plot: Chart;
    loading= true;

    constructor(private movieService: MoviesService){

    }
 
    async ngOnInit() {
        var movies = await this.movieService.getMovies()

        const averageBudgetPerYear = movies.reduce((acc, movie) => {
            const year = new Date(movie.release_date).getFullYear();
            acc[year] = (acc[year] || { total: 0, count: 0 });
            acc[year].total += movie.production_budget;
            acc[year].count += 1;
            return acc;
          }, {})
          
          console.log(averageBudgetPerYear)

           var years = Object.keys(averageBudgetPerYear)
           const averageBudgets = years.map(year => {
            return {
              year: +year,
              average: averageBudgetPerYear[year].total / averageBudgetPerYear[year].count
            }
          })
          var count: number[] = [];
          var i =0;
          Object.keys(averageBudgetPerYear).forEach((key, index) =>{
            count[i] = averageBudgetPerYear[key].count
            i++;
          })
          
          console.log(count)

        //   var count = Object.values(averageBudgetPerYear)
        //   console.log(count)

          var yearsInt = years.map(year => parseInt(year))
          yearsInt = averageBudgets.map(item => item.year)
          console.log(yearsInt)
          const averageBudgetValues = averageBudgets.map(item => item.average)
      

    this.myChart = new Chart("bar-chart-canvas", {
        type: 'bar',
        data: {
            labels: yearsInt,
            datasets: [{
                label: 'Average Production Budget per Year ',
                data: averageBudgetValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    this.plot = new Chart("scatter-canvas", {
        type: 'scatter',
        data: {
            labels: yearsInt,
            datasets: [{
                label: 'Number of Releases per Year',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })

    this.loading= false;
  }


  selectChartType = (type: string) =>{
    this.selectedChartType = type;
    if(type === 'bar'){
        
    }

    else if(type === 'plot'){
       
    }
  }


  


}

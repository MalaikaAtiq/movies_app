import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private _router: Router){
    
  }
  ngOnInit() {
    console.log(localStorage.getItem('accessToken') === "")
    if(localStorage.getItem('accessToken') === ""){
      this._router.navigateByUrl('/')
    }
  }
}

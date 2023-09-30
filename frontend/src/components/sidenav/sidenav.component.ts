import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  constructor(private _router: Router){

  }
  logout() {
    localStorage.setItem("accessToken", "")
    localStorage.setItem("isLoggedIn", "")
    this._router.navigateByUrl('')
  }
}

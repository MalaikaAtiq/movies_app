import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  showSmallNav = false;
  constructor(private _router: Router, private socialAuthService: SocialAuthService){

  }
  
  logout() {
    localStorage.setItem("accessToken", "")
    localStorage.setItem("isLoggedIn", "")
      this.socialAuthService.signOut().then(() => {
        this._router.navigateByUrl('/');
      });
      this._router.navigateByUrl('/');
    
  }

  openSmallNav =()=>{
    this.showSmallNav = true;
  }

  closeSmallNav = () =>{
    this.showSmallNav = false;
  }
}

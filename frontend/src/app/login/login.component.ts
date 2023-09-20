import { Component } from '@angular/core';
import axios from 'axios'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email = ""
  password= ""
  errorMessage=""
  
  constructor(private _router: Router){
  
  }

  login = async() =>{
    try{  
      const response = await axios.post('http://localhost:5000/user/login', {email: this.email, password: this.password})
      console.log(response.data.user)
      localStorage.setItem('accessToken', response.data.accessToken)
      this._router.navigateByUrl('/dashboard')
    }catch(error){
      console.log(error)
    }
  }
}


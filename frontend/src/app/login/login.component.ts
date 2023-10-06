import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import axios from 'axios'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit{
  email = ""
  password= ""
  validEmail = false
  errorMessage=""
  
  constructor(private _router: Router, private socialAuthService: SocialAuthService){
  
  }

  ngOnInit(){
    const urlParams = new URLSearchParams(new URL(window.location.href).search)
    const code = urlParams.get("code")
    console.log(code) 
    if(code){
      this.getGithubUser(code)
    }
    this.socialAuthService.authState.subscribe((authState) => {
      console.log(authState)
      if (authState) {
        console.log(authState.idToken)
        this.getGoogleUser(authState).then(()=>{
          this._router.navigateByUrl('/dashboard')
        })

      } 
    });
  }

  getGithubUser = async(code) =>{
    try{
      const response = await axios.post('http://localhost:5000/user/auth/github', { code: code })
          console.log(response)
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('isLoggedIn', "true")
          this._router.navigateByUrl('/dashboard')
    }catch(error){
      console.log(error.response.data.msg)
    }
  }

  getGoogleUser = async(authState) =>{
    try{
      const response = await axios.post('http://localhost:5000/user/auth/google', { googleUser: authState})
          console.log(response)
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('isLoggedIn', "true")
    }catch(error){
      console.log(error.response.data.msg)
    }
  }

  login = async() =>{
    if(this.validEmail == true && this.email != ""){
      try{  
        const response = await axios.post('http://localhost:5000/user/login', {email: this.email, password: this.password})
        console.log(response.data.user)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('isLoggedIn', "true")
        this._router.navigateByUrl('/dashboard')
      }catch(error){
        console.log(error.response.data.msg)
        this.errorMessage = error.response.data.msg
      }
    }
    else{
      this.errorMessage = "Invalid email address"
    }
  }

  signInWithGithub = async() =>{
    try{
      window.location.href = `https://github.com/login/oauth/authorize?client_id=1fa1bb65f74d50f74670&redirect_uri=http://localhost:4200&scope=user,user:email`;
    }catch(err){
      console.log(err.message)
    }    
  }  

  validateEmail() {
    if (!this.email) {
      this.errorMessage = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      this.errorMessage = "Invalid email format";
    } else {
      this.errorMessage = null
      this.validEmail = true
    }
  }
  
}


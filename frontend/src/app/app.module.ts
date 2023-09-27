import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from 'src/components/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { StoreModule } from '@ngrx/store'
import { movieReducer } from './redux/reducers/movie.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsComponent } from './charts/charts.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    MoviesComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    StoreModule.forRoot({ movies: movieReducer }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '403710484746-bnpe1nuegc7skc8amlm8pouiia82d7oc.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

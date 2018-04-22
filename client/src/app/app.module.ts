import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpService } from './http.service'
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './movies/movies.component';
import { ReviewComponent } from './review/review.component';
import { MovieformComponent } from './movieform/movieform.component';
import { ReviewformComponent } from './reviewform/reviewform.component'

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ReviewComponent,
    MovieformComponent,
    ReviewformComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

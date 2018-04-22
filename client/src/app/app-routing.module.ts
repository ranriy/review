import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieformComponent } from './movieform/movieform.component';
import { MoviesComponent } from './movies/movies.component';
import { ReviewformComponent } from './reviewform/reviewform.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
   
  { path: 'movies/new',component: MovieformComponent },
  { path: 'movies',component: MoviesComponent },
  //{ path: ':id', component: ReviewComponent},//MoviesComponent }, ==>tutna nhi chahiye isliye comment kiya
  { path: 'movies/review/:id', component: ReviewformComponent}, //naya daal rhe idhar
  { path: 'movies/:id', component: ReviewComponent},
  //{ path: '**', component: PageNotFoundComponent }
  { path: '', pathMatch: 'full', redirectTo: '/movies' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

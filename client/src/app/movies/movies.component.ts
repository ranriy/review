import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  allmovies
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  	this.display()
  }

 /* addMovie(event){
  	let observable = this._httpService.addMovie(this.newMovie, this.newReview)
  	observable.subscribe(data => console.log(data))
  }*/

  display(){
  	let observable = this._httpService.getMovies()
  	observable.subscribe(data => {
  		console.log(data)
  		this.allmovies = data
      console.log(this.allmovies)
      console.log(this.allmovies)
  	});
  }
}

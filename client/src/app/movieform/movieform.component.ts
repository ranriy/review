import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService} from '../http.service'

@Component({
  selector: 'app-movieform',
  templateUrl: './movieform.component.html',
  styleUrls: ['./movieform.component.css']
})
export class MovieformComponent implements OnInit {
  //allmovies
  newMovie;
  newReview;
  errors;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { 
  }

  ngOnInit() {
    this.newMovie = {title: ""}
    this.newReview = {reviewer: "", stars:1, reviews: ""}
  	this.errors = {title: "", reviewer: "", reviews: ""}
  }
  addMovie(event){
    event.preventDefault()
    console.log("enter component")
    let observable = this._httpService.addMovie(this.newMovie, this.newReview)
    observable.subscribe(data => {
      console.log(data)
      this.newMovie = {title: ""}
      this.newReview = {reviewer: "", starts:1, reviews: ""}
      this._router.navigate(['/movies']);
    },
    err=>{
      console.log(err)
      this.errors = err.error
    });
    console.log("Done")
    
    
  }
  
}

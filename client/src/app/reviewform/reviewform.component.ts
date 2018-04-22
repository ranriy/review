import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

  moviename
  movieId
  newReview
  errors

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newReview = {reviewer: "", stars:1, reviews: ""}
    this.errors  = { reviewer: "", reviews: ""}
  	this.getMovieId()
    
  }

  getMovieId(){
  	this._route.params.subscribe((params: Params) => {
  		this.movieId = params['id']
      console.log(this.movieId)
  		let observable = this._httpService.getMovie(this.movieId)
  		observable.subscribe( (res:any) => {
          console.log("IMP!!")
      		this.moviename = res.title;
          this.movieId = res._id
    	})
  	})
  }

  addReview(event){
  	console.log("here")
    event.preventDefault()
  	let observable = this._httpService.addReview(this.movieId, this.newReview)
  	observable.subscribe((res)=>{
      console.log(res)
      this._router.navigate(['/movies', this.movieId]);
    },
    err=>{
      console.log(err)
      this.errors = err.error
      console.log(this.errors)
    })
    //this.newReview = {reviewer: "", stars:1, reviews: ""}
    
  }

}

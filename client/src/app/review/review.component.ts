import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  allreviews
  movieId
  moviename
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.moviename =""
  	this.display()
  }

  onDelete(){
    this._route.params.subscribe((params: Params)=>{
      console.log("h")
      this.movieId = params['id']
      let observable = this._httpService.deleteMovie(this.movieId)
      observable.subscribe((res)=>{
      this._router.navigate(['/movies'])
      })
    })   
  }


  onReviewDelete(id){
    this._route.params.subscribe((params: Params)=>{
      console.log("MOvie id")
      console.log(params['id'])
      let observable = this._httpService.deleteReview(id)
      observable.subscribe((res)=>{
      this._router.navigate(['/movies'])
      })
      
    })  
  }

  display(){
  	this._route.params.subscribe((params: Params) => {
  		this.movieId = params['id']
      console.log(this.movieId)
  		let observable = this._httpService.getReviews(this.movieId)
  		observable.subscribe( (res:any) => {
          //this.allreviews = res
          console.log("IMP!!")
          console.log(res)
      		this.moviename = res.title;
          this.movieId = res._id;
          this.allreviews = res.reviews
          console.log(this.moviename)
          console.log(this.allreviews)
    	})
  	})
  	//Pata nhi kyun tha yeh
  	/*let observable = this._httpService.getReviews()
  	observable.subscribe(data => {
  		console.log(data)
  		//this.allreviews = data
      	//console.log(this.allreviews[0].title)
  	});*/
  }
}

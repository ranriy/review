import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getMovies(){
  	let observable = this._http.get('/movie')
  	return observable
  }

  addMovie(newMovie, newReview){
    console.log("enter servviceS")
    let observable = this._http.post('/newmovie', {movie: newMovie, review: newReview})
    return observable
  }

  addReview(id, newReview){
    console.log("Enter service")
  	let observable = this._http.post('/movie/'+id, newReview)
    console.log("Return from service")
  	return observable
  }

  getMovie(id){
    console.log(id)
  	let observable = this._http.get('/movie/' + id)
  	return observable
  }
  getReviews(id){
    console.log("movieid________service me se get review" , id)
    let observable = this._http.get('/review/' + id)
    return observable
  }

  deleteMovie(id){
    let observable = this._http.delete('/movie/' + id)
    return observable
  }

  deleteReview(id){
    console.log(id)
    let observable = this._http.delete('/review/' + id)
    return observable
  }
}

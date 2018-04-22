let express     = require('express'),
    app         = express(),
    path        = require('path'),
    body_parser = require('body-parser'),
    mongoose    = require('mongoose')

app.use(body_parser.json());
//app.use(bodyParser.urlencoded());
app.use(express.static( __dirname + '/client/dist' ));

mongoose.connect('mongodb://localhost/movies_db')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema;

var MovieSchema = new mongoose.Schema({
	title: {type:String, required:true, minlength:3},
	reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

var ReviewSchema = new mongoose.Schema({
	_movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
	reviewer: {type:String, required:true, minlength:3},
	stars: {type:Number, required:true},
	reviews: {type:String, required: true, minlength:3} //review message
})

mongoose.model('Movie', MovieSchema) 
var Movie = mongoose.model('Movie')

mongoose.model('Review', ReviewSchema)
var Review = mongoose.model('Review')


//all movies
app.get('/movie', function(req, res){
    console.log("Hi")
	Movie.find({}, (err,movies)=>{
		if(err){
			console.log("errors")
			res.json({message:"Error", error: err})
		}
		else{
			res.json(movies)
		}
	})
  /*Review.aggregate([
    { "$unwind": "$movie" },
    { 
        "$group": {
            "_id": "$movie",
            "ratingAvg": { "$avg": "$stars" }
        }
    }
], function(err, results) {
    if(err) handleError(err);
    Movie.populate(results, { "path": "_id" }, function(err, result) {
        if(err) handleError(err);
        console.log(result);
    });
})*/

})


//get one movie
app.get('/movie/:id', function(req,res){
    Movie.findOne({_id: req.params.id}, (err,movie)=>{
        if(err){
            console.log("errors")
            res.json({message:"Error", error: err})
        }
        else{
            res.json(movie)
        }
    })

})

//Reviews for one movie
app.get('/review/:id', (req, res) => {
 console.log("here")
 console.log(req.params.id)
 // Promise Syntax
 Movie.findOne({_id: req.params.id})
 .populate({ path: 'reviews' , options: {sort: {'stars':-1} }})
 .exec((err, movie) => {
    console.log("yaha tak aaya me")
    console.log(movie)
    return res.json(movie);
 });      //platform par mila...pata nhi kaise chalta?

})
     

//add a review for a movie
app.post('/movie/:id', function (req, res){
    console.log(req.params.id)
    console.log("here")

    Movie.findOne({_id: req.params.id}, function(err,movie){
        // data from form on the front end ---- Movie==> many reviews
        console.log(movie)
        var review = new Review(req.body);
        //  set the reference like this:
        review._movie = movie._id;
        // now save both to the DB
        movie.reviews.push(review)
        console.log(movie);
        review.save(function(err){
            if (err) return res.status(400).json(err.errors);

            movie.save(function(err){
                 if(err) {
                      console.log('Error', err);
                      res.status(400).json(err.errors);
                 } else {
                      console.log("rediect link")
                      res.json(movie)
                 }
             });
         });
    })
    console.log("Done")
})


//add a new movie and a review
app.post('/newmovie', function(req,res){
    //console.log("In server")
    //console.log('req.body', req.body , "ends");
	var movie = new Movie({title: req.body.movie.title})
	var review = new Review({_movie: movie._id, reviewer: req.body.review.reviewer, 
        stars: req.body.review.stars, reviews: req.body.review.reviews})
    //console.log('movie', movie);
    //console.log('review', review);
    review.save(function(err){
        if (err){
          console.log(err)
          return res.status(400).json(err.errors);
        }
	      movie.reviews.push(review);
        //console.log('movie', movie);
        movie.save(function(err){
             if(err) {
                  console.log(err)
                  res.status(400).json(err.errors)
                  //console.log('Error');
             } else {
                  res.json(movie)
                  //res.redirect('/');
             }
         });
     });

})

app.delete('/movie/:id', function(req,res){
  Movie.remove({_id:req.params.id}, (err)=>{
    if(err){
      res.status(400).json(err)
    }
    else{
      res.json({delete: "successful"})
    }
  })
})

app.delete('/review/:id', function(req,res){
  console.log("Review delete in service")
  Review.remove({_id:req.params.id}, (err)=>{
    console.log(err)
    if(err){
      res.status(400).json(err)
    }
    else{
      res.json({delete: "successful"})
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(6769, function() {
    console.log("listening on port 6769");
})
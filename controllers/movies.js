const {Movie,validate} =  require('../models/movies')
const {Genre} = require('../models/genre')


exports.movie_get = async(req,res)=>{

    try {
          const movies = await Movie.find()
            res.send(movies)

    } catch (error) {
        
        res.send(error.message)
    }


}

exports.movie_add = async(req,res)=>{

    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const genre = await Genre.findById(req.body.genre)
        if(!genre) return res.send('Genre not found by the given id')
    
        var movies = new Movie( {
            title:req.body.title,
            genre:{
                id:genre.id,
                name:genre.name    
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        }    )
        
        const movie = await movies.save()
        res.send(movie)
    
    
    } catch (error) {
        res.send(error.message)
    }
    
    
    }

 exports.movie_update = async(req,res)=>{

        try {
           
    
            const {error} = validate(req.body)
            if(error) return res.status(400).send(error.details[0].message)
        
            const genre = await Genre.findById(req.body.genre)
            if(!genre) return res.send('Genre not found by the given id')
            
            var getmovie = await Movie.findById(req.params.id)
            getmovie.title = req.body.title
            getmovie.genre = {id:genre.id,
                               name:genre.name     }
            getmovie.numberInStock = req.body.numberInStock
            getmovie.dailyRentalRate = req.body.dailyRentalRate
    
            getmovie.save()
            res.send(getmovie)
        
        
        } catch (error) {
            res.send(error.message)
        }
        
        
        }
        
    
exports.movie_delete = async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        res.send(`The given id is successfully deleted ${req.params.id}`)
        } 
    catch (error) {
        console.log(error.message)
    }

}
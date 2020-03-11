const {Genre,validate} =  require('../models/genre')

exports.genre_get_all =  async(req,res) => {
    try {
    const Genres = await Genre.find()
    res.send(Genres)   
    } catch (error) {
        console.log(error.message)
    }
}

exports.genre_add = async(req,res)=>{
    try {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let genrename = new Genre ({name:req.body.name});
    genrename = await genrename.save()
    res.send(genrename)
    } catch (error) {
        console.log(error.message)
    }    
}

exports.genre_update = async(req,res)=>{
    try {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let Genres = await Genre.findById(req.params.id)    
     Genres.name = req.body.name;
     Genres.save()
     res.send(Genres)   
    } catch (error) {
        console.log(error.message)
    }

}


exports.genre_delete = async(req,res)=>{
    try {
    let genres = await Genre.findByIdAndRemove(req.params.id)
    if(!genres) return res.status(404).send('id not found')
    res.send(`${req.params.id} removed seccessfully`)   
    } catch (error) {
        console.log(error.message)
    }
}
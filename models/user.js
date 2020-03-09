const Joi = require('joi')
const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    }
    ,
    Email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    }
    ,
    Password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    }
    ,
   Token :{
       type:Array
   },
   CurrentToken:{
       type:String
   }
   ,UserRole:{
       type:Number
   }
})

const user = mongoose.model('User',userSchema)

validateUser = (users) =>{
    const schema = {
        Name:Joi.string().min(5).max(255).required(),
        Email:Joi.string().min(5).max(255).required().email(),
        Password:Joi.string().min(5).max(255).required(),
        UserRole:Joi.number().required()

    }

    return Joi.validate(users,schema)
}

validateloginuser = (users) =>{
    const schema = {
        Email:Joi.string().min(5).max(255).required().email(),
        Password:Joi.string().min(5).max(255).required()
    }

    return Joi.validate(users,schema)
}


exports.User = user
exports.validate = validateUser
exports.validatelogin = validateloginuser
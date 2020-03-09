const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {User} = require('../models/user')

module.exports = async function (req,res,next){
     let user = await User.findOne({_id:req.user._id})
     if(user.UserRole === 1) return res.status(403).send('Forbidden')

    next()
}



// exports.checkauth = auth
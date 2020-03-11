const {User,validate} = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')



exports.user_register = async(req,res)=>{
  try {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({Email:req.body.Email})
    if(user) return res.send('User already registered')
    user = new User(_.pick(req.body,['Name','Email','Password','UserRole']))
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(user.Password,salt)
    user.Password = password;
    user = await user.save()
    res.send(user) 
  }
  catch (error) {
    console.log(error.message)
  }
  } 
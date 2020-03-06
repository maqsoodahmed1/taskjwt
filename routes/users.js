const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User,validate} = require('../models/user')
var express = require('express');
var router = express.Router();
const verify = require('../routes/verifyToken')

/* GET users listing. */
router.get('/',verify, async(req, res, next) =>{
  let user = await User.find()
  res.send(user);
});


router.post('/',async(req,res)=>{
  const {error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  let user = await User.findOne({Email:req.body.Email})
  if(user) return res.send('User already registered')
  user = new User(_.pick(req.body,['Name','Email','Password']))
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(user.Password,salt)
  user.Password = password;
  user = await user.save()
  res.send(user)
})







module.exports = router;

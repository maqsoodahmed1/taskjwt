const {checkauth} = require('../routes/verifyToken')
const jwt = require('jsonwebtoken')
const {v4} = require('uuid')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User,validatelogin} = require('../models/user')
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')



router.post('/',async(req,res)=>{
    try {
        const {error} = validatelogin({Email:req.body.Email,Password:req.body.Password})
        if(error) return res.status(400).send(error.details[0].message)
        let user = await User.findOne({Email:req.body.Email})
        if(!user) return res.status(400).send('user not found kindly register yourself')
        const check = await bcrypt.compare(req.body.Password,user.Password)
        if(!check) return res.status(400).send('invalid email or password')
        const Token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
        // const Tokenid = v4();
        const tokendetails = {
            deviceId:req.body.deviceId,
            token:Token   
        }
        user.CurrentToken = Token
        user.Token.push(tokendetails)
         user.save()
        res.header('auth-Token',Token).send(user)
    } catch (error) {
        res.send(error.message)
    }    
})


module.exports = router

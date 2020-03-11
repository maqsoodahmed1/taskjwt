const {User} = require('../models/user')

module.exports = async function (req,res,next){
    try {
     let user = await User.findOne({_id:req.user._id})
     if(user.UserRole === 1) return res.status(403).send('Forbidden')
    next()
    } catch (error) {
        res.send(error.message)
    }
}


const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
      const Token = req.header('auth-Token')
      if(!Token) return res.status(401).send('Access Denied')

      const key = process.env.TOKEN_SECRET
      try {
          const verified = jwt.verify(Token,key)
          req.user = verified
         
          next()
      } catch (error) {
          res.status(400).send('Invalid Token')
      }

}



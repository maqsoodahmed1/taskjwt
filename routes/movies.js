const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movies')
const verify = require('../middleware/verifyToken')
const checkadmin = require('../middleware/checkadmin')

router.get('/',verify,movieController.movie_get)
router.post('/',movieController.movie_add)
router.put('/:id',movieController.movie_update)
router.delete('/:id',[verify,checkadmin],movieController.movie_delete)

module.exports = router;





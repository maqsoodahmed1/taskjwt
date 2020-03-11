const express = require('express')
const router = express.Router()
const genreController = require('../controllers/gernre')

router.get('/',genreController.genre_get_all)
router.post('/',genreController.genre_add)
router.put('/:id',genreController.genre_update)
router.delete('/:id',genreController.genre_delete)

module.exports = router;





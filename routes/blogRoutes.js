const express = require('express');
const blogController = require('../controllers/blogController');


const router = express.Router()

router.get('/new_blog', blogController.blog_create_get)
router.get('', blogController.blog_index);
router.post('/new_blog', blogController.blog_create_post)
// to add a document manually
router.get('/add-blog', blogController.blog_create_manual_get)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)




module.exports = router
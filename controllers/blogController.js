// blog-details, blog-create-get, 
const Blog = require('../models/blog');

const blog_index = (req,res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('blogs/index', { blogs: result, title: 'Blogs',css: './index-styling.css' });
      })
      .catch(err => {
        console.log(err);
      });
}

const blog_create_manual_get = (req,res) => {
    const blog = new Blog({
        title: 'Blog Three',
        snippet: 'Snippet of Blog2',
        body: 'Body of the blog',
        
    })
    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
}
const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err)
    })
}


const blog_delete = (req,res) => {
    const id = req.params.id;
        
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
}
const blog_create_get = (req,res) => {
    res.render('blogs/new_blog', {
        title: 'New Blog',
        css: ''
    });
}
const blog_details = (req,res) => {
    const id = req.params.id;
        const blog = new Blog(req.body);
        Blog.findById(id)
        .then(result => {
            res.render('blogs/details', {blog:result, title:'Blog Details', css: ''})

        })
        .catch((err) => {
            res.status(err)
        });
    }


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_manual_get,
    blog_delete,
    blog_create_post
}
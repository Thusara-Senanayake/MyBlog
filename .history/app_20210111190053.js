// ----------- modules ------------
const express = require('express');
const { homedir } = require('os');
const mongoose = require('mongoose');
const Blog = require('./models/blog')



const app = express();

// database part
// ---------- connection -----------

const dbURI = 'mongodb://localhost:27017/blogs';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } ) // asynchronous
.then((result) =>  app.listen(3000))
.catch((err) => console.log(err))




// register view-engine
app.set('view engine', 'ejs');
// setting public
app.use(express.static('public'))
// this takes all the url encoded data from form submission and parse it into an object
app.use(express.urlencoded({ extended:true}));

// ports   
app.get('/', (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {
            title: 'Home',
            css: './index-styling.css',
            blogs:result
    })
    
    });

})

app.get('/new_blog', (req,res) => {
    res.render('new_blog', {
        title: 'New Blog',
        css: './new_blog-styling.css'
    });
})

    app.post('/new_blog', (req,res) => {
      const blog = new Blog(req.body);
      blog.save()
      .then((result) => {
          res.redirect('/');
      })
      .catch((err) => {
          console.log(err)
      })
    })

// to add a document manually
app.get('/add-blog', (req,res) => {
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
    })

     
  


    app.get('/blogs/:id', (req,res) => {
        const id = req.params.id;
        Blog.findById(id)
        .then(result => {
            res.render('details', {blog:result, title:'Blog Details', css: ''})
     
        })
        .catch((err) => {
            console.log(err)
        });
    })


    app.delete('/blogs/:id'), (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch((err) => {
            console.log(err)
        })
    }
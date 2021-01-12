// ----------- modules ------------
const express = require('express');
const { homedir } = require('os');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes')


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

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.use('/blogs',blogRoutes);

app.get('/', (req,res) => {
  res.redirect('/blogs')
})

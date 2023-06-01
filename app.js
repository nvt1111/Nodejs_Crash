const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();

// register view engine
app.set('view engine', 'ejs')

//middleware & static file
app.use(express.static('public')) // cho phép sử dụng đc các file tĩnh bên trong thư mục public 
//nếu không thì sẽ ko sử dụng đc
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
const methodOverride = require('method-override')
const url = 'mongodb://localhost:27017/note-tuts';


app.use(methodOverride('_method'))
mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err)=> console.log(err))
//

app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
})

app.use('/blogs', blogRoutes)
// ko có ai khớp thì nhảy vào use
app.use((req,res)=>{
    res.status(404).render('404', {title: '404'})
})
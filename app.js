const express = require('express');
const app = express();//init app
const mongoose = require('mongoose')

//bringing in the data
let Article = require('./models/article.js');




//mongo conn
mongoose.connect('mongodb://localhost/usingExpress',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

//check conn
db.once('open', function () {
    console.log('Connected to database')
})

//check for errors
db.on('error', function (err) {
    console.log(err);    
})



//load view engine
app.set('views', __dirname + '/views');
app.set('view engine','pug');

//home route
app.get('/', function (req, res){
    Article.find({}, function (err, articles){
        if(err){
            console.log(err);
        } 
        else{ 
            res.render('index', {
                title: "ARTICLES",
                articles: articles
            });
        }   
    })
   
});

app.get('/articles/add', function (req, res){
    res.render('add_article', {
        title: 'Add Article'
    })
})


app.get('/success', function (req, res){
    res.render('success', {
        articles: articles
    })
})





//start server
app.listen(3000, function () {
    console.log('Server Started on port 3000')
});

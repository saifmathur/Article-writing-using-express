const express = require('express');

const mongoose = require('mongoose')

//mongo conn
mongoose.connect('mongodb://127.0.0.1:27017/nodekb');
let db = mongoose.connection;


//check conn
db.once('open', function () {
    console.log('Connected to database');
});

//check for errors
db.on('error', function (err) {
    console.log(err);    
});

const app = express();//init app
//bringing in the data
let Article = require('./models/article');

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
                    title: 'Articles',
                    articles: articles,
                    body: articles.body
                });
            }
       
    });
   
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

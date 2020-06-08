const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

const app = express();   //init app
//bringing in the data
let Article = require('./models/article');

//load view engine
app.set('views', __dirname + '/views');
app.set('view engine','pug');

//adding body parsers middle ware
app.use(bodyParser.urlencoded(
    { extended: false }
));

//parse app json
app.use(bodyParser.json());

//set public folder as static files source
app.use(express.static(__dirname + '/public'));



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

//get single article
app.get('/article/:id', function (req, res){
    Article.findById(req.params.id, function(err, article){
        console.log(article);
        return;
    })
})




app.get('/articles/add', function (req, res){
    res.render('add_article', {
        title: 'Add Article'
    })
})

//Add submit post route
app.post('/articles/add', function (req, res){
    var article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function (err){
        if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.redirect('/');
                }
    })

})

//start server
app.listen(3000, function () {
    console.log('Server Started on port 3000')
});

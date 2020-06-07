const express = require('express');
const app = express();//init app

//load view engine
app.set('views', __dirname + '/views');
app.set('view engine','pug');


//home route
app.get('/', function (req, res){

    let articles = [
        {
            id: 1,
            title: 'article one',
            author: 'saif',
            body: 'this is article one'
        },
        {
            id: 2,
            title: 'article two',
            author: 'saif',
            body: 'this is article two'
        },
        {
            id: 3,
            title: 'article three',
            author: 'saif',
            body: 'this is article three'
        },
        {
            id: 4,
            title: 'article four',
            author: 'saif',
            body: 'this is article four'
        },




    ]

    res.render('index', {
        title: 'Articles',
        articles: articles
    });
});

app.get('/articles/add', function (req, res){
    res.render('add_article', {
        title: 'Add Article'
    })
})

//start server
app.listen(3000, function () {
    console.log('Server Started on port 3000')
});

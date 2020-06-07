const express = require('express');
const app = express();//init app

//load view engine
app.set('views', __dirname + '/views');
app.set('view engine','pug');


//home route
app.get('/', function (req, res){
    res.render('index', {
        title: 'Home',
        name: 'saif'
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

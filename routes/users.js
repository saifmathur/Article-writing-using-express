const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')
let User = require('../models/user')

const expressValidator = require('express-validator')
router.use(expressValidator())
router.use(flash())

//reg form
router.get('/register', function (req,res){
    res.render('register')
})

//register process
router.post('/register', function(req, res){
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2

    //perform check using express validator
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Email is not required').isEmail()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'password is required').notEmpty()

    //match pass
    req.checkBody('password2', 'Passowrds do not match').equals(req.body.password);

    let errors = req.validationErrors()
    if(errors){
        res.render('register', {
            errors: errors
        })
    }
    else {
            const newUser = new User({
                name: name,
                email: email,
                username: username,
                password: password

            }) 

            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function (err, hash){
                    if(err){
                        console.log(err);
                    }
                    newUser.password = hash
                    newUser.save(function (err){
                        if(err){console.log(err)
                        return;
                        }
                        else {
                            //req.flash('success','You are now Registered and can log in!');
                            res.redirect('/users/login');   
                        }
                    })
                });
            })

        }

})


router.get('/login', function (req, res){
    res.render('login');
})



module.exports = router;
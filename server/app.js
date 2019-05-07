const express = require('express');
const http = require('http')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const BlogUser = require('./models/BlogUser')
const Blog = require('./models/Blog')
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();

console.log(process.env.clientID);

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http://localhost:4000/auth/google/redirect',

},
    function (request, accessToken, refreshToken, profile, done) {
        console.log('Something')
        console.log('access token', accessToken);
        console.log(profile)
        done();
    }
));


app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://meetanshi:1234@gettingstarted-niywo.mongodb.net/restful-api?retryWrites=true',{
    useNewUrlParser: true 
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("mongoose connection established successfully");
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/profile',
        failureRedirect: 'http://localhost:3000/profile'
    }
    ), (req, res, next) => {
        next();
    }
);


app.post('/user-signup', (req, res) => {
    const user = new BlogUser({
        name: req.body.name,
        password: req.body.password
    });
    user.save().then(res => {
        console.log(res);
    })
    res.send(`New User Created: ${req.body.name} ${req.body.password}`);
})

app.get('/blogs', (req, res) => {
    Blog.find().exec().then(response => {
        console.log(response);
        res.send(response);
    })
})

app.get('/profile', (req, res)=>{

})

app.post('/profile/add-blog', (req, res) => {
    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    });
    blog.save().then(res => {
        console.log(res);
    })
    res.send(`New blog added: ${req.body.title} by ${req.body.author}`)
})


app.post('/profiledetails', (req, res)=>{
    console.log(req.body);
    const token = req.body.token; 

    const name = '';

    jwt.verify(req.body.token, 'secretkey', function(err, decoded) {
        console.log(decoded) 
        console.log('errror:', err)        

        Blog.find({author: decoded.name}).exec().then(blogsArray=>{
            console.log(blogsArray)
            res.send({'name': decoded.name, 'blogs': blogsArray})
        })        
    });  

    
    
})
 
app.post('/user-login', (req, response) => {
    BlogUser.findOne({ name: req.body.name, password: req.body.password }).exec().then(res => {
        console.log(res);

        const token = jwt.sign({
            name: res.name,
            email: res.email
        }, 'secretkey', {
            expiresIn: "2 days"
        }, (err, token)=>{
            console.log('error: ', err);
            console.log("token generated: ",token)

            const obj = {
                string: 'You are logged in' + res.name,
                isLoggedIn: true,
                token: token
            }
            response.send(JSON.stringify(obj));
        })
              
    }).catch(err => {
        const obj = {
            string: 'Authentication Failed',
            isLoggedIn: false
        }
        response.send(JSON.stringify(obj));
    })

})

module.exports = app;
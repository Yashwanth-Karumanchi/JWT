const jwt = require('jsonwebtoken')

const express = require('express')

const app = express()
let reqtoken;
app.post('/login',(req,res)=>{
    const user={
        "username" : "cvr",
        "password":"cse"
    }
    jwt.sign({user},'secretkey', {expiresIn:"5s"},(err,token)=>{
         if(!err) {
            reqtoken = token;
            res.json({token});
         }
         else {
            res.json({
                'message':'invalid crendentials'
            })
         }
    })
})
app.post('/post',accessToken,(req,res)=>{
    jwt.verify(reqtoken,'secretkey',(err,data)=>{
        if(!err) {
            res.json(data)
        }
        else {
            res.json({
                'message':'invalid token'
            })
        }
    })
})

function accessToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!='undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        console.log(bearerToken)
        next();
    }
    else {
        res.json({
            'message':'No header exists'
        })
    }
}

app.get('/',(req,res)=>{
    res.send('hello');
})

app.listen(3000,(req,res)=>{
    console.log('server started')
})
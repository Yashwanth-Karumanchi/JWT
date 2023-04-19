const express = require('express');
let users = require('./users.json')
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json());

const fs = require('fs');
const { hello } = require('./read');

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', (req, res) => {
    jwt.verify(reqtoken,'secretkey',(err,data)=>{
        if(!err) {
            const user = {
                id: users.length + 1,
                name: req.body.name,
                branch: req.body.branch,
                phone: req.body.phone
        
            }
            users.push(user)
            res.json(user)
            write(user)
        }
        else {
            res.json({
                'message':'invalid token'
            })
        }
    })
})

app.patch('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`no user exist with given id ${req.params.id}`)
    }
    user.name = req.body.name;
    user.branch = req.body.branch;
    user.phone = req.body.phone;
    res.json(user);
    write(user)
})

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`no user exist with given id ${req.params.id}`)
    }
    let index = users.indexOf(user);
    users.splice(index, 1)
    res.json(user);
    write(user)
})

app.listen(5500, () => console.log("Server Started . . ..  "))

function write(user){
    const file = fs.readFileSync("./users.json")
    if (file.length == 0) {
        //add data to json file
        fs.writeFileSync("./users.json", JSON.stringify([users]))
    } else {
        fs.writeFileSync("./users.json", JSON.stringify(users))
    }
}

let reqtoken;
app.post('/login',(req,res)=>{
    const user={
        "username" : "cvr",
        "password":"cse"
    }
    jwt.sign({user},'secretkey', {expiresIn:"30s"},(err,token)=>{
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
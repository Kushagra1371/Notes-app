const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/Note')
const User= require('./models/User')
var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'

const app = express()
app.use(express.json({ extender: true }))
app.use(express.urlencoded({ extender: true }))
const port = 3000

mongoose.connect(`mongodb://user:Kushagrayadav1371@ac-1agpynz-shard-00-00.isayqdh.mongodb.net:27017,ac-1agpynz-shard-00-01.isayqdh.mongodb.net:27017,ac-1agpynz-shard-00-02.isayqdh.mongodb.net:27017/?ssl=true&replicaSet=atlas-arqn8y-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
// Endpoints to serve the html
app.get('/', (req, res) => {
    res.sendFile("pages/index.html", { root: __dirname })
})
app.get('/login', (req, res) => {
    res.sendFile("pages/login.html", { root: __dirname })
})
app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html", { root: __dirname })
})
//endpoints for APIs
app.post('/getnotes', (req, res) => {
    const { userToken } = req.body
    res.sendFile("pages/signup.html", { root: __dirname })
})
app.post('/login', async(req, res) => {
    //const { userToken } = req.body
    let user = await User.findOne(req.body)
    console.log(user)
    if(!user){
        res.status(200).json({success: false, message: "No user found"})
    }
    else{
        res.status(200).json({success: true, user: {email: user.email} , message: "User found"})
    }
    res.sendFile("pages/signup.html", { root: __dirname })
})
app.post('/signup', async(req, res) => {
    const { userToken } = req.body
    console.log(req.body)
    let user = await User.create(req.body)
    res.status(200).json({success: true , user: user})
})
app.post('/addnote', (req, res) => {
    const { userToken } = req.body
    res.sendFile("pages/signup.html", { root: __dirname })
})
app.post('/deletenode', (req, res) => {
    const { userToken } = req.body
    res.sendFile("pages/signup.html", { root: __dirname })
})
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
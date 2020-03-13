const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = 'mongodb+srv://zethe:zethe@cluster0-knkk7.mongodb.net/howardDb?retryWrites=true&w=majority'

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  }, err => {
	if(err){
		console.log('Error!' + err)
	}
	else{
		console.log('Connected to mongodb')
	}
})

router.get('/', (req, res) => {
	res.send('From API route')
})

router.post('/register', (req, res) => {
	let userData = req.body
	let user = new User(userData)
	user.save((err, registeredUser) => {
		if(err){
			console.log(err)
		}
		else{
			res.status(200).send(registeredUser)
		}
	})
})

module.exports = router
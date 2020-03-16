const express = require('express')
const jwt = require('jsonwebtoken')
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
			let payload = { subject: registeredUser._id }
			let token = jwt.sign(payload, 'secretKey')
			res.status(200).send({token})
		}
	})
})

router.post('/login', (req, res) => {
	let userData = req.body

	User.findOne({email: userData.email}, (err, user) => {
		if(err){
			console.log(err)
		}
		else{
			if(!user){
				res.status(401).send('Invalid email')
			}
			else{
				if(user.password !== userData.password){
					res.status(401).send('Invalid password')
				}
				else{
					let payload = { subject: user._id }
					let token = jwt.sign(payload, 'secretKey')
					res.status(200).send({token})
				}
			}
		}
	})
})

module.exports = router
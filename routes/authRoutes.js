const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// /api/users/register
// PUBLIC 
// register user
router.post('/register', async (req, res) => {
    // check if user exists
    const username = req.body.username;
    const userExists = await User.findOne({username}); 
    // userExists is a User if it exists, else null

    if (userExists) {
        return res.json({msg:'failed', err:'Username exists'});
    }

    //check if email exists
    const email = req.body.email;
    const emailExists = await User.findOne({email});

    if (emailExists) {
        return res.json({msg:'failed', err:'Email exists'});
    }

    // save user
    const savedUser = new User({...req.body});

    savedUser.save((err, user) => {
        if (err) return res.json({'msg': 'failed', err});
        return res.json({'msg': 'success', savedUser});
    });
    
});

router.delete('/delete', async (req, res) => {
    const username = req.body.username;

    // check user exists
    const userExists = await User.findOne({username}); 

    if (!userExists) {
        return res.json({msg:'failed', err:'Username does not exist'});
    }

    User.deleteOne({username}, (err, user) => {
        if (err) return res.json({msg:'failed', err});
        return res.json({msg: 'success', user});
    });
});


// /api/users/register
// LOGIN
// register user
router.post('/login', async (req, res) => {
    const {username, password} = {...req.body};

    // check user exists
    const user = await User.findOne({username}); 

    if (!user) {
        return res.json({msg:'failed', err:'Username does not exist'});
    }

    // check password correct
    if (password === user.password) {
        const token = jwt.sign({

        })
        return res.json({'msg': 'success'});
    } else {
        return res.json({msg: 'failed', err: 'Incorrect password'});
    }
});

module.exports = router;
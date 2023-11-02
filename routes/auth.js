const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
// create a using POST "/api/auth/createruser". No login required
router.post("/createuser",[
  body('name','Enter a valid Name').isLength({min:3}),
  body('email','Enter a valid Email').isEmail(),
  body('password', 'Enter a valid Password').isLength({min:5}),
], async(req, res) => {
  // res.json(obj);
  // console.log(req.body);
  
  // checking errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }

  // save data in mongoose
  // const user = User(req.body);
  // user.save();
  // // res.send('hello')

  // check whether the user with this email exists already

  try{
  let user=await User.findOne({email:req.body.email});
  if (user){
    return res.status(400).json({error: 'Sorry with this email already exists'})
  }
  user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
  })
  // res.send(req.body);
  res.json(user);
  }
  catch(error){ 
    console.error(error.message)
    res.status(500).send('some error occured')
  }
});

module.exports = router;
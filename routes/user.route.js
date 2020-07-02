let express = require('express'),
   mongoose = require('mongoose'),
   
  router = express.Router();
  //const { check, validationResult } = require('express-validator');


// User model
let User = require('../model/User');


// POST User
router.post('/create-user',(req, res,next) => {
  //validateUser(req, res,next);
  const url = req.protocol + '://' + req.get('host');

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    createdon: req.body.createdon,
    phone: req.body.phone
  });
  
  user.save().then(result => {
    console.log("Saving Result "+result);
       res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
      _id: result._id,        
      username: result.username,
      password: result.password,
      email: result.email,
      role: result.role,
      createdon: result.createdon,
      phone: result.phone
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

//Get a User Details
router.get("/user/:id", (req, res,next) => {
  User.find({_id: mongoose.Types.ObjectId(req.params.id) }).then(data =>       
    res.json(data)
  );
});
//get user of login
router.get("/login/:username", (req, res,next) => {
    User.findOne({username: req.params.username }).then(data =>  
    res.json(data)
  );
});
//Delete a User Details
router.delete("/user/delete/:id", (req, res,next) => {
  User.deleteOne({_id: mongoose.Types.ObjectId(req.params.id) }).then(data =>       
    res.json(data._id)
  );
});

// Update user details
router.put('/user/update/:_id',(req, res,next) => {
 
  User.findByIdAndUpdate({
    _id: mongoose.Types.ObjectId(req.params._id)
}, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,            
            role: req.body.role,
            createdon: req.body.createdon,
            phone: req.body.phone            
        }
    }, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(response.id);
        }
    });
  })


// GET All Users

router.get("/", (req, res,next) => {
  User.find().then(data => 
      res.json(data)
  );
});



module.exports = router;


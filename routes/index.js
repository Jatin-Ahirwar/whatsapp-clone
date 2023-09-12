var express = require('express');
var router = express.Router();
var usermodel = require("./users");
var chatmodel = require("./chat");
const passport = require('passport');
var localStrategy = require("passport-local")
var path = require("path")
var socketapi = require("../socketapi")

passport.use(new localStrategy(usermodel.authenticate()))

async function clearSockets() {
  var allUser = await usermodel.find({})
  await Promise.all(
    allUser.map(async user => {
      user.currentSocket = ''
      await user.save()
    })
  )
}
clearSockets()

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get('/index',isloggedin,function(req, res, next) {
  res.render('index', {user: req.user });
});





router.get('/finduser',function(req, res, next) {
  usermodel.find().then(function(allusers){
    res.send(allusers)
  })
});


router.get('/log',function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post("/register",function(req,res){
  var newuser = new usermodel({
    username:req.body.username,
    profileImage:req.body.profileImage
  })
  usermodel.register(newuser,req.body.password).then(function(u){
    passport.authenticate(`local`)(req,res,function(){
      res.redirect("/index")
    })
  })
})


router.post(`/login`,passport.authenticate(`local`,{
  successRedirect: `/index`,
  failureRedirect:`/`
}),function(req,res,next){})
  

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){
      return next (err)
    }
    else {
      res.redirect("/log")
    }
  })
});



function isloggedin (req,res,next){
  if(req.isAuthenticated()){
    return next ()
  }
  else{
    res.redirect("/")
  }
}


router.get('/find/:username',function(req, res, next) {
  var regexp = new RegExp("^"+ req.params.username)
   usermodel.find({username: regexp})
   .then(function(allusers){
     res.json({allusers})
   })
});

router.post("/findchats",isloggedin,async (req,res)=>{
  var oppositeuser =await usermodel.findOne({username:req.body.oppositeuser})
  var fromuser =await usermodel.findOne({username:req.session.passport.user})
  var chats =await chatmodel.find({
    $or:[
      {
        fromuser:fromuser.username,
        touser:oppositeuser.username
      },
      {
        fromuser:oppositeuser.username,
        touser:fromuser.username
      }
    ]
  })
  res.json({chats})
})


module.exports = router;




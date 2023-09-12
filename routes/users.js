var mongoose = require("mongoose")
var plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")

var userschema = mongoose.Schema({
  password:String,
  username: String,
  profileImage:{
    type:String,
    default:""
  },
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  chat:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  currentsocket: String,
})
userschema.plugin(plm)

module.exports = mongoose.model("user",userschema)
const mongoose = require('mongoose')


const comment = new mongoose.Schema({
username:String ,
content:String,
product_id:String,
reply:Array
}
,
  { timestamps: true })



module.exports = mongoose.model("comment", comment)
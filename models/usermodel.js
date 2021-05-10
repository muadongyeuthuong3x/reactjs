const mongoose = require('mongoose')

const userSchema =new mongoose.Schema(
 {
     name:{
         type:String,
         required:true,
         trim:true
     },
     username:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true,
         min:6
     },
     role:{
         type:String ,
         enum: ['Admin', 'User'],
         default:"User"
     },
     avatar: {
        type: String,
        default: "laco.png"
    }
 }
)

module.exports = mongoose.model('Users', userSchema)
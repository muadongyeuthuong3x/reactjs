const mongoose = require('mongoose')

const { Schema } = mongoose;

const User = new Schema({
  email :{
      type:String,
      required:true,
      unique: true
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:Number,
    default: 0
  },
  avatar:{
    type:String,
    default:"https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
  }

},
{
    timestamps: true
});

module.exports = mongoose.model("User",  User)
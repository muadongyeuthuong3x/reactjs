const mongoose = require('mongoose')

const { Schema } = mongoose;

const Hangsanpham = new Schema({
  hangsp :{
      type:String,
      required:true
  }
},
{
    timestamps: true
});

module.exports = mongoose.model("hangsanpham", Hangsanpham)
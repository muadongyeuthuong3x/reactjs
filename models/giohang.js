const mongoose = require('mongoose')

const { Schema } = mongoose;

const Giohang = new Schema({
    nguoimua :{
      type:String,
      required:true
  },
  sdt:{
      type:Number,
      required:true    
  },
  diachi:{
    type:String,
    required:true 
},
userid:{
    type:String,
    required:true 
},
cart: {
    type: Array,
    default: []
}
},
{
    timestamps: true
});

module.exports = mongoose.model("Giohang", Giohang)
const mongoose = require('mongoose')

const { Schema } = mongoose;

const sanphamban = new Schema({
  tensanpham :{
      type:String,
      required:true
  },
  anhsanphamchinh:{
    type:String,
    required:true
},
 giaban:{
     type:Number,
     require:true
 },
  cacanhkhac:{
    type: Array,
    require:true
    },
    idhang:{
      type:String,
    }
  },
  { timestamps: true });

module.exports = mongoose.model("sanphamban", sanphamban)
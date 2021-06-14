const mongoose = require("mongoose");

const iduserchatuser = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("iduserchatuser",iduserchatuser);
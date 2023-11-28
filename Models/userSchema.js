const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   uName: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   profile: {
      type: String,
      required: true,
   },
   favorites:{
      type:Array,
      required:true
   }
});

const users = mongoose.model("users", userSchema);

module.exports = users;

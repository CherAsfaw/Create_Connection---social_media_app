import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },

    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      trim: true,
    },

    full_name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
   bio: {
  type: String,
  default: "Hey there!",
  trim: true,
  maxlength: 160
},
   profile_picture: {
     type: String,
     trim: true,
     default: "",
},
   cover_photo: {
     type: String,
     trim: true,
     default: "",
},
   location: {
     type: String,
     trim: true,
     default: "",
},
followers: [{
  type: String,
  ref: "User",
}],

following: [{
  type: String,
  ref: "User",
}],

connections: [{
  type: String,
  ref: "User",
}],
  },
  { timestamps: true, minimize: false }
);
const User = mongoose.model('User', userSchema);
export default User;

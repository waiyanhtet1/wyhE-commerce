import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

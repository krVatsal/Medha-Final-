import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const clientSchema = mongoose.Schema(
  {
    name: {
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
    refreshToken: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

clientSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

clientSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    // process.env.ACCESS_TOKEN_SECRET,
    "JuryJunction1",
    {
      // expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      expiresIn: "10d",
    }
  );
};
clientSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    // process.env.REFRESH_TOKEN_SECRET,
    "JuryJunction1_refreshed",
    {
      // expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      expiresIn: "1d",
    }
  );
};
export const clientModel = mongoose.model("clientModel", clientSchema);

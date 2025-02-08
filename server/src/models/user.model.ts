import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { string } from 'zod';

interface IUser extends Document {
  username: string;
  password: string;
  email:string;
  avatar:string;
  refreshToken:string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  generatePasswordResetToken : ()=>string;
  generateRefreshToken : () =>JwtPayload;
  generateAccessToken : () =>JwtPayload;
  isPasswordValid(password: string): Promise<boolean>;
}

const userSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar:{
      type:String,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, 
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String, // Token used for managing authentication/refresh token flow
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err instanceof Error ? err : new Error(String(err)));
  }
});

userSchema.methods.isPasswordValid = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function (): JwtPayload {
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
    secret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );
};

userSchema.methods.generateAccessToken = function (): JwtPayload {
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
    secret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d" }
  );
};

userSchema.methods.generatePasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken
}

const User = mongoose.model<IUser>('User', userSchema);
export default User;
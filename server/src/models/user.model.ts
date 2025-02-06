import mongoose, { Schema, Document } from "mongoose";

// Interface for User document
interface IUser extends Document {
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,  // Fixed typo here
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;
import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface ILink extends Document {
  link: string;
  userId: Types.ObjectId;
}

const linkSchema = new Schema<ILink>(
  {
    link: {
      type: String,
      required: true, 
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
  },
  { timestamps: true }
);

const Link = model<ILink>('Link', linkSchema);
export default Link;

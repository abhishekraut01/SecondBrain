import mongoose, { Document, Schema, model, Types } from 'mongoose';

interface IContent extends Document {
  link: Types.ObjectId;
  type: 'article' | 'video' | 'blog' | 'other'; // Enum for structured data
  title: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
  description?: string;
}

const contentSchema = new Schema<IContent>(
  {
    link: {
      type: Schema.Types.ObjectId,
      ref: 'Link',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['article', 'video', 'blog', 'other'], // Restrict to valid types
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        default: [], // Ensure it's always an array
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Optimized indexing for faster queries
    },
  },
  { timestamps: true }
);

const Content = model<IContent>('Content', contentSchema);
export default Content;

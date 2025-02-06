import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = model('Tag', tagSchema);
export default Tag;
import mongoose, { Schema, Document } from "mongoose";

export enum ContentType {
  ARTICLE = "article",
  VIDEO = "video",
  PODCAST = "podcast",
  BOOKMARK = "bookmark",
}

export interface IContent extends Document {
  link: string;
  type: ContentType;
  title: string;
  tags: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    link: { type: String, required: true },
    type: { type: String, enum: Object.values(ContentType), required: true },
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IContent>("Content", ContentSchema);

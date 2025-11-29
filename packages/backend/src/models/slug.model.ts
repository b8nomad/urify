import mongoose, { Document, Schema } from "mongoose";

export interface ISlug extends Document {
  password: string;
  url_slug: string;
  count: number;
  redirect: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SlugSchema: Schema = new Schema({
  password: { type: String, required: true },
  url_slug: { type: String, unique: true, required: true },
  count: { type: Number, default: 0 },
  redirect: { type: String, required: true },
}, {
  timestamps: true
});

const Slug =
  mongoose.models.Slug || mongoose.model<ISlug>("slug", SlugSchema);
export default Slug;

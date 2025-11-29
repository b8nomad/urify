import mongoose, { Document, Schema } from "mongoose";
const SlugSchema = new Schema({
    password: { type: String, required: true },
    url_slug: { type: String, unique: true, required: true },
    count: { type: Number, default: 0 },
    redirect: { type: String, required: true },
}, {
    timestamps: true
});
const Slug = mongoose.models.Slug || mongoose.model("slug", SlugSchema);
export default Slug;
//# sourceMappingURL=slug.model.js.map
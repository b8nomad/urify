import mongoose, { Document } from "mongoose";
export interface ISlug extends Document {
    password: string;
    url_slug: string;
    count: number;
    redirect: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const Slug: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<ISlug, {}, {}, {}, mongoose.Document<unknown, {}, ISlug, {}, {}> & ISlug & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Slug;
//# sourceMappingURL=slug.model.d.ts.map
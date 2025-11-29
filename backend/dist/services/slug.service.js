import Slug, {} from "../models/slug.model.js";
import { Model } from "mongoose";
import bcrypt from "bcrypt";
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
}
const slug = Slug;
const createSlug = async (data) => {
    if (!data.password || !data.url_slug || !data.redirect) {
        throw new Error("Missing required fields");
    }
    const existingSlug = await slug.findOne({ url_slug: data.url_slug });
    if (existingSlug) {
        throw new Error("slug already exists");
    }
    if (data.url_slug.length < 3) {
        throw new Error("Slug must be at least 3 characters long");
    }
    isValidUrl(data.redirect);
    if (!isValidUrl(data.redirect)) {
        throw new Error("Invalid redirect URL");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const url_slug = await slug.create({ ...data });
    return url_slug;
};
const getSlug = async ({ url_slug, password, }) => {
    const got = await slug.findOne({ url_slug });
    let isPassValid = false;
    if (password) {
        isPassValid = await bcrypt.compare(password, got?.password);
    }
    if (!isPassValid || !password) {
        await slug.updateOne({ url_slug }, { $inc: { count: 1 } });
        return { redirect: got?.redirect };
    }
    if (!got) {
        throw new Error("slug not found");
    }
    return got;
};
const editSlug = async ({ data, new_password, }) => {
    if (!new_password) {
        throw new Error("new password not defined");
    }
    const got = await slug.findOne({ url_slug: data.url_slug });
    if (!got) {
        throw new Error("slug not found");
    }
    let isPassValid;
    if (data.password) {
        console.log(data.password, got.password);
        isPassValid = await bcrypt.compare(data.password, got?.password);
    }
    if (!isPassValid || !data.password) {
        throw new Error("password invalid");
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const edit = slug.updateOne({ _id: got.id }, { $set: { password: hashedPassword } });
    return edit;
};
export default { createSlug, getSlug, editSlug };
//# sourceMappingURL=slug.service.js.map
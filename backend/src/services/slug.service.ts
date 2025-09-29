import Slug, { type ISlug } from "../models/slug.model.js";
import { Model } from "mongoose";
import bcrypt from "bcrypt";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const slug = Slug as Model<ISlug>;

const createSlug = async (data: ISlug) => {
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

const getSlug = async ({
  url_slug,
  password,
}: {
  url_slug: string;
  password: string;
}) => {
  const got = await slug.findOne({ url_slug });

  let isPassValid = false;

  if (password) {
    isPassValid = await bcrypt.compare(password, got?.password as string);
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

const editSlug = async ({
  data,
  new_password,
}: {
  data: ISlug;
  new_password: string;
}) => {
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
    isPassValid = await bcrypt.compare(data.password, got?.password as string);
  }

  if (!isPassValid || !data.password) {
    throw new Error("password invalid");
  }

  const hashedPassword = await bcrypt.hash(new_password, 10);

  const edit = slug.updateOne(
    { _id: got.id },
    { $set: { password: hashedPassword } }
  );

  return edit;
};

export default { createSlug, getSlug, editSlug };

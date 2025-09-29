import slugService from "../services/slug.service.js";
import type { Request, Response } from "express";

const createSlug = async (req: Request, res: Response) => {
  try {
    const slug = await slugService.createSlug(req.body);
    res.status(201).json({ slug, message: "slug created!", success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ message, success: false });
  }
};

const getSlug = async (req: Request, res: Response) => {
  try {
    const url_slug = req.query.url_slug as string;
    const password = req.query.password as string;

    if (!url_slug) {
      return res.status(400).json({
        message: "Missing required parameters: url_slug",
        success: false,
      });
    }

    const slug = await slugService.getSlug({ url_slug, password });

    res.status(200).json({ slug, message: "slug fetched!", success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ message, success: false });
  }
};

const editSlug = async (req: Request, res: Response) => {
  try {
    const new_password = req.query.new_password as string;

    const slug = await slugService.editSlug({data: req.body, new_password});

    res.status(200).json({message: "slug edited successfully!", success: true})
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ message, success: false });
  }
};

export default { createSlug, getSlug, editSlug };

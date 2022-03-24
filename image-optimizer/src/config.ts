require("dotenv").config();

export const APP_PORT = process.env.APP_PORT || 5201;
export const ID = process.env.ID || "";
export const STATIC_FOLDER = process.env.STATIC_FOLDER || "public";
export const compressFolder = "/compress";

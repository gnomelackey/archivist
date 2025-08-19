import { CookieOptions } from "express";

export const SESSION_COOKIE_NAME = "session";

export const COOKIE_CONFIG: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

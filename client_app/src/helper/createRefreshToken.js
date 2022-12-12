import Cookie from "universal-cookie";
import { AddDays } from "./configureDays";
let cookies = new Cookie();

export const createCookie = (name, refreshToken) => {
  try {
    if (refreshToken) {
      cookies.set(name, refreshToken, {
        sameSite: "strict",
        path: "/",
        // httpOnly: true,
        // secure: true,
        expires: AddDays(30),
      });

      if (cookies.get(name)) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

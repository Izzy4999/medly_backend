import { Router } from "express";
import passport from "passport";
import checkLoggedIn from "../middleware/auth.middle";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/feed",
    session: true,
  }),
  (req, res) => {
    return res.status(200);
  }
);


export default router;

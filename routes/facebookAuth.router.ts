import { Router } from "express";
import passport from "passport";
import checkLoggedIn from "../middleware/auth.middle";

const router = Router();

router.get("/", passport.authenticate("facebook"));

router.get(
  "/callback",
  passport.authenticate("facbook", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),
  (req, res) => {
    res.status(200).redirect("http://localhost:3000/feed");
    return;
  }
);

export default router;

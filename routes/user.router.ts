import { Router } from "express";
import passport from "passport";
import checkLoggedIn from "../middleware/auth.middle";

const router = Router();

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/login");
  });
  return;
});
router.get("/", checkLoggedIn, (req, res) => {
  return res.send("testing cors");
});

export default router;

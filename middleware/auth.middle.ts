import { NextFunction, Request, Response } from "express";

function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() && !req.user) {
    return res.status(401).json({
      error: "you must be logged in",
    });
  }
  next();
}

export default checkLoggedIn;


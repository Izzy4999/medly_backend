import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

import PassPortStart from "./startup/passport";
import googleAuth from "./routes/googleAuth.router";
import facebookAuth from "./routes/facebookAuth.router";
import user from "./routes/user.router";
import env from "./utils/env";

PassPortStart();

const app = express();

const MongoDBStoreSession = MongoDBStore(session);
const storeDb = new MongoDBStoreSession({
  uri: env.SESSION_DB_URL,
  collection: "sessions",
});

storeDb.on("error", (error) => {
  console.log(error);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(
  session({
    name: "session",
    saveUninitialized: true,
    secret: env.SESSION_SECRET,
    store: storeDb,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", googleAuth);
app.use("/auth/facebook", facebookAuth);
app.use("/auth/user", user);

export default app;

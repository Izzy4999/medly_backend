import https from "https";
import fs from "fs";

import app from "./app";
import env from "./utils/env";

https
  .createServer(
    {
      cert: fs.readFileSync("cert.crt"),
      key: fs.readFileSync("key.key"),
    },
    app
  )
  .listen(env.PORT, () => {
    console.log(`listening on ${env.PORT}`);
  });
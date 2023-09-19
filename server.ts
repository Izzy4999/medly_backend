import app from "./app";
import env from "./utils/env";

app.listen(env.PORT, () => {
  console.log(`listening on ${env.PORT}`);
});

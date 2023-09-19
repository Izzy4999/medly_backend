import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";

config();
const env = cleanEnv(process.env, {
  PORT: port(),
  CLIENT_ID: str(),
  CLIENT_SECRET: str(),
  SESSION_SECRET: str(),
  SESSION_DB_URL: str(),
  FACEBOOK_ID: str(),
  FACEBOOK_SECRET: str(),
});

export default env;

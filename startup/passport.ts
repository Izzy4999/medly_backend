import passport from "passport";
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth20";
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from "passport-facebook";

import env from "../utils/env";
import prisma from "../utils/prisma";

type CustomUserType = false | Express.User | null | undefined;
function PassPortStart() {
  const AUTH_OPTIONS: StrategyOptionsWithRequest = {
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true,
  };
  const FACBOOK_OPTIONS = {
    clientID: env.FACEBOOK_ID,
    clientSecret: env.FACEBOOK_SECRET,
    callbackURL: "/auth/facebook/callback",
  };
  async function verifyCallback(
    req: any,
    accessToken: string,
    refreshToken: string,
    params: GoogleCallbackParameters,
    profile: Profile,
    done: VerifyCallback
  ) {
    // check user in db
    const userExist = await prisma.user.findUnique({
      where: {
        email: String(profile._json.email),
        googleId: String(profile.id),
      },
    });
    // Create user if not in db
    if (!userExist) {
      await prisma.user.create({
        data: {
          email: String(profile._json.email),
          first_name: String(profile.name?.givenName),
          last_name: String(profile.name?.familyName),
          profileURL: String(profile._json.picture),
          googleId: String(profile.id),
          displayName: String(profile.displayName),
          email_verified: Boolean(profile._json.email_verified),
        },
      });
    }
    done(null, {
      email: profile._json.email,
      email_verified: profile._json.email_verified,
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      google_id: profile.id,
    });
  }
  async function facebookCallBack(
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile,
    cb: (error: any, user?: any, info?: any) => void
  ) {
    console.log(profile);
    cb(null, profile);
  }
  passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));
  passport.use(new FacebookStrategy(FACBOOK_OPTIONS, facebookCallBack));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj: CustomUserType, done) => {
    done(null, obj);
  });
}

export default PassPortStart;

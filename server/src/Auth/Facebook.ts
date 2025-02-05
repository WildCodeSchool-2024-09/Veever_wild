import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

const facebookClientID = process.env.VITE_CLIENT_ID_FACEBOOK as string;
const facebookClientSecret = process.env.VITE_CLIENT_SECRET_FACEBOOK as string;

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientID,
      clientSecret: facebookClientSecret,
      callbackURL: `${process.env.BACKEND_URL}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

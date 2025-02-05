import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientID = process.env.VITE_CLIENT_ID_GOOGLE as string;
const clientSecret = process.env.VITE_CLIENT_SECRET_GOOGLE as string;
passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3310/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : undefined,
      };
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

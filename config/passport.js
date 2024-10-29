import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import { comparePassword } from "../utils/passwordBcrypt.js"; 

// Configure the local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specify that email will be used as the username field
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        // Check if the password is correct
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        // If everything is okay, return the user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user information to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session using the ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;

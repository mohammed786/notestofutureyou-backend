// passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Import the User model

// Configure Passport to use local strategy (email and password)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email instead of username
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        // console.log("user", user);
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        console.log("user hased", bcrypt.hashSync(password, 10));

        // Compare the provided password with the stored hashed password
        console.log("password, user.password", password, user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("user", isMatch);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Successfully authenticated
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  const user = { id: profile.id, email: profile.emails[0].value, accessToken };
  return done(null, user);
}));

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file']
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), 
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, accessToken: req.user.accessToken },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`http://localhost:3000/?token=${token}`);
  }
);

router.get('/logout', (req, res) => {
  res.redirect('http://localhost:3000');
});

module.exports = router;
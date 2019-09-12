const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
    

const User = require('../models/user')

const secret = process.env.SECRET || 'my secret';

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : secret
}



module.exports = () => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //   console.log('jwt_payload =', jwt_payload)
    User.findById(jwt_payload.id, function(err, user) {
        if (err) {
            console.error(err)
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}
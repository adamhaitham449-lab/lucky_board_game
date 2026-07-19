const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
    new GoogleStrategy(
        {
            clientID: "PUT_GOOGLE_CLIENT_ID",
            clientSecret: "PUT_GOOGLE_CLIENT_SECRET",
            callbackURL: "http://localhost:3001/auth/google/callback"
        },

        (accessToken, refreshToken, profile, done)=>{

            return done(null,{

                id: profile.id,

                name: profile.displayName,

                photo: profile.photos[0].value

            });

        }
    )
);


passport.serializeUser((user,done)=>{

    done(null,user);

});


passport.deserializeUser((user,done)=>{

    done(null,user);

});


module.exports = passport;
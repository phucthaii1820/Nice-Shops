import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

const GOOGLE_CLIENT_ID = "30256336544-0ltvf0ol63a3kcg59p0umi15s7e9ah9g.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const ggStrategy = GoogleStrategy.Strategy;

passport.use(new ggStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value

        return done(null, profile);
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
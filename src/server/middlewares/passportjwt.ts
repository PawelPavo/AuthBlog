import * as passport from 'passport';
import * as passportjwt from 'passport-jwt';
import config from '../config';
import db from '../db';
import type { IPayLoad } from '../utils/interfaces';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new passportjwt.Strategy({
    jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}, async (jwt_payload: IPayLoad, done) => {
    try {
        const [user] = await db.users.one(jwt_payload.userid);
        if (user) {
            delete user.password
            done(null, user)
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}));
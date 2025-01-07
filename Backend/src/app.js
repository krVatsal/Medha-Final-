import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userAuthRoute from "./routes/auth.route.js";
dotenv.config();
const app = express();
app.use(cookieParser());
const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:3000", "https://teach.cograd.in"];
app.use(
  cors({
    origin: function (origin, callback) {
      // If the origin is in the allowedOrigins array or there is no origin (i.e., non-browser request), allow the request
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow credentials to be passed along
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
// Configure Passport's local strategy for login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Check password
        console.log("!")
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        console.log("Login successful");
        return done(null, user);
    } catch (err) {
        console.error("Error in authentication:", err);
        return done(err);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5217/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            user = new User({
                googleId: profile.id,
                firstName: `${profile.name.givenName}`,
                lastName: `${profile.name.familyName}`,
                email: profile.emails[0].value,
            })
            await user.save();
        }

        // Format user data
        const userData = {
            _id: user._id,
            name: user.firstName,
            email: user.email,
        };
        const clientName= userData.name

        return done(null, userData);
    } catch (err) {
        return done(err);
    }
}));


passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, {
                _id: user._id,
                name: user.firstName,
                email: user.email,
            });
        } else {
            done(null, null);
        }
    } catch (err) {
        done(err);
    }
});

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/medha',
        ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", userAuthRoute); 
export default app;

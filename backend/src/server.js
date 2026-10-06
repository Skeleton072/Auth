const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "development";
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");

const authRouter = require("./routes/authRoute");
const config = require("./config/index");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const redisClient = createClient({
  url: config.redis.redisUrl
});

redisClient.on("error", console.error);

(async () => {
  await redisClient.connect();
  console.log("Redis connected");
})();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});

app.use(
  session({
    name: "sid",
    store: redisStore,
    secret: config.session.sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: env === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    },
  })
);

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

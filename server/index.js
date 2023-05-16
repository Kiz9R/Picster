import express from "express";
const app = express();
import bodyParser from "body-parser";

import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// personal imports

import connectdb from "./db/connect.js";
import { register } from "./controller/auth.js";
import { createPost } from "./controller/posts.js";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/users.js";
import postRoutes from "./router/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./model/user.js";
import Post from "./model/post.js";
import { users, posts } from "./data/index.js";

// CONFIGS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(helmet());
dotenv.config();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// CONSTANT ROUTES
app.get("/", (req, res) => {
  res.send("PicSteR Server");
});

app.post("/auth/register", upload.single("picture"), register);

app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MAIN SERVER

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectdb(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is Listening on port ${PORT}`));

    // MANUAL SEEDING OF DATA ONLY ONCE
    // User.insertMany(users);
    // Post.insertMany(posts);
  } catch (err) {
    console.log(err);
  }
};

start();

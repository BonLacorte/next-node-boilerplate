import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
import userRoutes from "./route/userRoutes";
import postRoutes from "./route/postRoutes";
import commentRoutes from "./route/commentRoutes";
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes); 

const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// server
app.get("/", (req, res) => {
    res.send("Hello World!");
});





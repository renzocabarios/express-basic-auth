
import express, { Express } from "express";
import bodyParser from "body-parser";
import connectDB from "./app/db";
import ENV from "./app/env/index";
import { verifyToken } from './app/middleware'
import { usersRoute, authRoute } from "./app/route";
import cors from 'cors'

const app: Express = express();

// middlewares
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(verifyToken);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);

//initialization
const start = () => {
  connectDB(ENV.MONGO_CON).then(() => {
    console.log(`Database connected to ${ENV.MONGO_CON}`);

    app.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  });
};

start();

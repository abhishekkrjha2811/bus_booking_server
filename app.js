import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connect.js";
import { buildAdminJS } from "./config/setup.js";
import { PORT } from "./config/config.js";

dotenv.config();

const app = express();
//routes
//user routes
import userRoutes from "./routes/user.js"
app.use("/user",userRoutes)
 //bus routes
import busRoutes from "./routes/bus.js"
app.use("/bus",busRoutes)
//ticket routes
import ticketRoutes from "./routes/ticket.js"
app.use("/ticket",ticketRoutes)

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await buildAdminJS(app)
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server started on http://localhost:${PORT}/admin`);
      }
    });
  } catch (error) {
    console.log("Error starting a server -->", error);
  }
};

start();
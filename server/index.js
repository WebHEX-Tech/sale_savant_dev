import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import * as routes from "./routes/index.js";

// Configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/// Admin Routes
app.use("/admin", routes.adminRoutes);
app.use("/general", routes.generalRoutes);
app.use("/reports", routes.reportsRoutes);
app.use("/management", routes.managementRoutes);
app.use("/supply", routes.supplyRoutes);

/// Cashier Routes
app.use("/cashier", routes.cashierRoutes);
app.use("/orders", routes.ordersRoutes);
app.use("/checkout", routes.checkoutRoutes);
app.use("/refund", routes.refundRoutes);

// Database
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
.then(() => {
    app.listen(PORT, () => console.log(`\nServer Port: ${PORT}`));
})
.catch((error) => console.error(`MongoDB connection error: ${error}`));


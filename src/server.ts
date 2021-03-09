// Application Modules
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as MongoDBStore from "connect-mongodb-session";

// Routes
import ShoppingCartRoutes from "./api/routes/shopping-cart.route";
import { connectDB } from "./config/dbConnection";
import { sessionConfig } from "./config/sessionConfig";

connectDB();

const MongoSession = MongoDBStore(session);

const store = new MongoSession({
  uri: "mongodb://localhost:27017/shopping",
  collection: "sessions",
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sessionConfig());

const port = process.env.PORT || 7000;

app.use("/api/shopping-cart", ShoppingCartRoutes);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

// Application Modules
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as MongoDBStore from "connect-mongodb-session";
import * as mongoose from "mongoose";

// Config
import config from "./config/CartConfig";

// Routes
import ShoppingCartRoutes from "./api/routes/shopping-cart.route";

function connectDB() {
  mongoose
    .connect(config.db.url, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("DB Connected!"))
    .catch((err) => console.log(err));
}

connectDB();

const MongoSession = MongoDBStore(session);

const store = new MongoSession({
  uri: "mongodb://localhost:27017/shopping",
  collection: "sessions",
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "Mi Secret Session",
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: "destroy",
    name: "session cookie name",
  })
);

const port = process.env.PORT || 7000;

app.use("/api/shopping-cart", ShoppingCartRoutes);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

import * as session from "express-session";
import * as MongoDBStore from "connect-mongodb-session";

const MongoSession = MongoDBStore(session);

const store = new MongoSession({
  uri: "mongodb://localhost:27017/shopping",
  collection: "sessions",
});

export const sessionConfig = () => {
  return session({
    secret: "Mi Secret Session",
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: "destroy",
    name: "session cookie name",
  });
};

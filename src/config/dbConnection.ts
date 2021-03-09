import * as mongoose from "mongoose";

import config from "./CartConfig";

export const connectDB = async () => {
  await mongoose
    .connect(config.db.url, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("DB Connected!"))
    .catch((err) => console.log(err));
};

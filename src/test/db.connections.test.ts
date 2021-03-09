import * as mongoose from "mongoose";

import config from "../config/CartConfig";

describe("MongoDB connection", () => {
  test("Can connect to database", async () => {
    const db = await mongoose.connect(config.db.url, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbName = db.connections[0].name;
    expect(dbName).toEqual("shopping");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});

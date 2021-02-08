const config = {
  paypal: {
    businessEmail: "",
    url: "https://www.sandbox.paypal.com/cgi-bin/webscr",
    currency: "USD",
  },
  secret: "",
  name: "nodeStore",
  db: {
    url: "mongodb://localhost:27017/shopping",
    sessions: "sessions",
  },
  locale: {
    lang: "en-US",
    currency: "USD",
  },
};

export default config;

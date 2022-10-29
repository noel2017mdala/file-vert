const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const connection = require("./DB/connection");
const schema = require("./graphql/Schema");
const rootResolver = require("./graphql/Resolver");
const cookieParser = require("cookie-parser");
const demoMiddleWare = require("./middleware/demoMiddleWare");

const app = express();
const port = process.env.PORT || 8000;

const cors = require("cors");
require("dotenv/config");

app.options("*", cors());
app.use(
  cors({
    origin: process.env.DEVELOPMENT,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/graphql", (req, res) => {
  return graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: rootResolver,
    context: {
      request: { req, res },
      test: "Hello World",
    },
  })(req, res);
});
connection((conResult) => {
  console.log(conResult);
});

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.DEVELOPMENT);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

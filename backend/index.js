const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const connection = require("./DB/connection");
const schema = require("./graphql/Schema");
const rootResolver = require("./graphql/Resolver");
require("dotenv/config");
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("tiny"));
// app.get("/", (req, res) => {
//   res
//     .send({
//       message: "Hello User",
//     })
//     .status(200);
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: rootResolver,
  })
);
connection((conResult) => {
  console.log(conResult);
});

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

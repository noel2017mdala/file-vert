const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const connection = require("./DB/connection");
const schema = require("./graphql/Schema");
const rootResolver = require("./graphql/Resolver");
const cookieParser = require("cookie-parser");
const demoMiddleWare = require("./middleware/demoMiddleWare");
const { uploadFileConvert } = require("./DB/Model/UserModel");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
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

app.put("/upload", upload.single("file"), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  // console.log(obj.fileFormat);
  // console.log(req.file.path);
  io.sockets.emit("file-download", {
    message: "file ready for download",
  });
  res.send("done");
  return;
  const convertFile = await uploadFileConvert(
    req.file.path,
    obj.fileFormat,
    (result) => {
      if (result.status) {
        res
          .json({
            response: result.response,
            status: true,
          })
          .status(200);
      } else {
        res
          .json({
            response: result.response,
            status: false,
          })
          .status(401);
      }
    }
  );
  // console.log(convertFile);
  // res.send("hello").status(200);
});

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

io.on("connect", (socket) => {
  console.log(
    `user ${socket.request._query["userId"]} has this id ${socket.id}`
  );
});

// io.use(async (socket, next) =>)
http.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

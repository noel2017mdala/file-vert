const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const connection = require("./DB/connection");
const schema = require("./graphql/Schema");
const rootResolver = require("./graphql/Resolver");
const cookieParser = require("cookie-parser");
const schedule = require("node-schedule");
const {
  uploadFileConvert,
  getFileStatus,
  downloadFile,
  getUserData,
  updateConverts,
  getUserExp,
  updateUserSocket,
} = require("./DB/Model/UserModel");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8000;
let fileSize;

const job = schedule.scheduleJob("0 0 * * *", () => {
  getUserExp();
});

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let user = await getUserData(req.params.id);

    if (user) {
      if (user.plan.name === "free") {
        //1 MB
        fileSize = 1000000;
        cb(null, "images/free");
      } else if (user.plan.name === "personal") {
        console.log("personal");
        //100 MB
        fileSize = 104857600;
        cb(null, "images/personal");
      } else if (user.plan.name === "professional") {
        console.log("professional");
        //1 GB
        fileSize = 1073741824;
        cb(null, "images/professional");
      } else if (user.plan.name === "enterprise") {
        console.log("enterprise");
        //5 GB
        fileSize = 5368709120;
        cb(null, "images/enterprise");
      }
    }
  },

  filename: async (req, file, cb) => {
    let user = await getUserData(req.params.id);
    if (user) {
      if (user.plan.name === "free") {
        //1 MB
        fileSize = 1000000;
        cb(null, Date.now() + path.extname(file.originalname));
      } else if (user.plan.name === "personal") {
        console.log("personal");
        //100 MB
        fileSize = 104857600;
        cb(null, Date.now() + path.extname(file.originalname));
      } else if (user.plan.name === "professional") {
        console.log("professional");
        //1 GB
        fileSize = 1073741824;
        cb(null, Date.now() + path.extname(file.originalname));
      } else if (user.plan.name === "enterprise") {
        console.log("enterprise");
        //5 GB
        fileSize = 5368709120;
        cb(null, Date.now() + path.extname(file.originalname));
      }
    }
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSize,
  },
});
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

app.put("/upload/:id", upload.single("file"), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  let user = await getUserData(req.params.id);

  const convertFile = await uploadFileConvert(
    req.file.path,
    obj.fileFormat,
    user,
    async (result) => {
      if (result.status) {
        let processId = result.response.id;

        let getConvertStatus = setInterval(async () => {
          let getUploadStatus = await getFileStatus(processId);

          if (getUploadStatus && getUploadStatus.status) {
            if (getUploadStatus.status === "successful") {
              // console.log(user);
              const updateConvertStatus = await updateConverts(
                user._id,
                user.numberOfConverts
              );

              // console.log(getConvertStatus);
              if (updateConvertStatus.status) {
                await downloadFile(
                  getUploadStatus.target_files[0].id,
                  (result) => {
                    io.sockets.to(user.userSocket).emit("file-download", {
                      message: "file ready for download",
                      result,
                    });
                    // io.sockets.emit("file-download", {
                    //   message: "file ready for download",
                    //   result,
                    // });
                    clearInterval(getConvertStatus);
                  }
                );
              }
            }
          } else {
            clearInterval(getConvertStatus);
            io.sockets.to(user.userSocket).emit("file-download-error", {
              message: "Unable to upload your file",
            });
            console.log("failed");
          }
        }, 1000);

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
});

app.use("/graphql", (req, res) => {
  return graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: rootResolver,
    context: {
      request: { req, res },
      // test: "Hello World",
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
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers: Content-Type, *");
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

  if (socket.request._query["userId"] && socket.id) {
    const updateSocket = updateUserSocket(
      socket.request._query["userId"],
      socket.id
    );
  }
});

// io.use(async (socket, next) =>)
http.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});

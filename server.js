var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const fileUpload = req.file;
  if (!fileUpload) {
    return next(
      new Error({ message: "Please upload a file", httpStatusCode: 400 })
    );
  }
  res.json({
    name: fileUpload.originalname,
    type: fileUpload.mimetype,
    size: fileUpload.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

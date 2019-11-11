const express = require("express");
const path = require("path");
const app = express();

app.use("/dist", express.static("dist"));

app.use("/", (req, res) => res.sendFile(path.resolve("./dist/index.html")));

app.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));

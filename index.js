const express = require("express");
const app = express();
const PORT = 8080;

const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "./views");

const path = require("path");
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static("./styles"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { title: "ALAB 318.2.1" });
});

app.get("/image/tomato.png", (req, res) => {
  const filePath = path.join(__dirname, "images", "tomato.png");
  res.download(filePath);
});
const feedbackRouter = require("./routes/feedback");
app.use("/feedback", feedbackRouter);

app.get("/download-image", (req, res) => {
  const filePath = path.join(__dirname, "images", "tomato.png");
  res.download(filePath);
});

app.use((req, res, next) => {
  console.log(`Request was made at: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

const express = require("express");

const router = express.Router();

const feedbackArr = [];

router.get("/", (req, res) => {
  try {
    res.render("feedback", { title: "Feedback Result", options: feedbackArr });
  } catch (err) {
    console.log("Failed to load the feedback page", err);
  }
});
router.get("/new", (req, res) => {
  try {
    res.send(`<div style = "margin-left: 20px; margin-top:40px; font-family: Monospace, verdana, sans-serif">
    <nav>
      <a href="/">Home</a> | <a href="/feedback">Your Feedback</a>
    </nav>
    <h2>Send us your feedback on the website</h2>
    <form action="/feedback" method="POST" class="feedback-form"">
      Title: <input type="text" name="title" size="50"/> <br /> <br />
      Content: <br /> 
      <textarea name="content" cols="50" rows="10" /> </textarea><br />
      <br />
      <input type="submit"/>
    </> </div>
  `);
    console.log(req.body);
  } catch (err) {
    console.log("Getting feedback page failed", err);
  }
});

router.post("/", (req, res) => {
  feedbackArr.push(req.body);
  res.redirect("/feedback");
});

module.exports = router;

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Don’t bend, don’t water it down, don’t try to make it logical, don’t edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly. Keeping a journal of what’s going on in your life is a good way to help you distill what’s important and what’s not";


const aboutContent = "Helping you to reach your full potential by making sure you reach your goals through daily jorunalling.";
const contactContent =
  "Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.";

let posts = [];

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { startingParagraph: homeStartingContent, paragraph: posts});
});

app.get("/about", (req, res) => {
  res.render("about", {aboutParagraph: aboutContent});
});

app.get("/compose", (req, res) => {
  res.render("compose")
});


app.get("/contact", (req, res) => {
  res.render("contact", { contactParagraph: contactContent });
});

app.get("/posts/:topic", (req, res) => {
  for(let i = 0; i < posts.length; i++){
    if (_.lowerCase(req.params.topic) === _.lowerCase(posts[i].title)) {
      res.render("post", {head: posts[i].title, body: posts[i].body})
    }
  }
})


app.post("/compose", (req, res) => {

  const post = {
    title: req.body.postTitle,
    body : req.body.postArea
  };

  posts.push(post);
  res.redirect('/')

});






app.listen(PORT, () => {
  console.log("Listening on port ${PORT}");
});

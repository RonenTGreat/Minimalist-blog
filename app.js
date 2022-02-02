//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

const homeStartingContent =
  "Don’t bend, don’t water it down, don’t try to make it logical, don’t edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly. Keeping a journal of what’s going on in your life is a good way to help you distill what’s important and what’s not";

const aboutContent =
  "Helping you to reach your full potential by making sure you reach your goals through daily jorunalling.";

const contactContent =
  "Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/journalDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
  res.redirect("/");
    }
  });


});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

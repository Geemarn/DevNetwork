const express = require("express");
const router = express.Router();
const passport = require("passport");

//load Post model
const Post = require("../../models/Post");
//load User model
const User = require("../../models/User");
//import validator
const validatePostImput = require("../../validation/post");
// @route   GET apis/posts/test
//@desc     Test posts route
//@access   Public
router.get("/test", (req, res) =>
  res.json({
    mes: "posts is working"
  })
);

// @route   GET apis/posts
//@desc    get posts
//@access   Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ errorMessage: "No posts found" }));
});

// @route   GET apis/posts/:id
//@desc     get post by id
//@access   Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ errorMessage: "No post found with such id" })
    );
});
// @route   POST apis/posts
//@desc     create post
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //deconstructor
    var { errors, isValid } = validatePostImput(req.body);
    //check for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE apis/posts/:id
//@desc     delete post
//@access   Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "user not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postNotFound: "no post found" }));
    });
  }
);

// @route   POST apis/posts/like/:id
//@desc     like post
//@access   Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          //check if user as already liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyLiked: "posts already liked" });
          }
          // add user id to the likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNotFound: "no post found" }));
    });
  }
);

// @route   POST apis/posts/unlikes/:id
//@desc    unlike post
//@access   Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {
          //check if user have not liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ notLiked: "posts have not yet beenliked" });
          }
          // remove user id from the likes array
          // get remove index
          var removeIndex = post.likes

            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNotFound: "no post found" }));
    });
  }
);

// @route   POST apis/posts/comments/:id
//@desc    add comment to post
//@access   Private
router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //deconstructor
    var { errors, isValid } = validatePostImput(req.body);
    //check for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        var newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //add comment to array
        post.comments.unshift(newComment);
        //save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ noPost: "No post to comment" }));
  }
);

// @route   DELETE apis/posts/comments/:id1/:id2
//@desc     delete comment from post
//@access   Private
router.delete(
  "/comments/:id1/:id2",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ _id: req.params.id1 }).then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.id2
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentNotFound: "No comment to delete" });
      }

      var removeIndex = post.comments
        .map(item => item.id.toString())
        .indexOf(req.params.id2);

      //splice from array
      post.comments.splice(removeIndex, 1);
      // save
      post
        .save()
        .then(() => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);
module.exports = router;

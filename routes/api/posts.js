const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load User Post
const Post = require("../../models/Post");

//Load User Profile
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

// requireAuth
const requireAuth = passport.authenticate("jwt", { session: false });

//@route GET api/posts
//@desc Get posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: "There are no posts!" }));
});

//@route GET api/posts/:id
//@desc Get post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ posts: "There is no post!" }));
});

//@route POST api/posts/
//@desc Creates post here
//@access Privat
router.post("/", requireAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    // If any errors ,send 400 with error object
    return res.status(404).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private
router.delete("/:id", requireAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        // Check for post owner
        console.log(post);
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ noauth: "user no auth" });
        }

        // Delete
        post.remove().then(() => res.json({ success: true }));
      });
    })
    .catch(err => res.status(404).json({ posts: "Post not found!" }));
});

//@route POST api/posts/like/:id
//@desc like post
//@access Private
router.post("/like/:id", requireAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      console.log(req.params.id);
      Post.findById(req.params.id).then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not exist" });
        }

        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreayLiked: "User already liked this post" });
        }
        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    })
    .catch(err => res.status(404).json({ posts: "Post not found!" }));
});

//@route POST api/posts/unlike/:id
//@desc Unlike post
//@access Private
router.post("/unlike/:id", requireAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      console.log(req.params.id);
      Post.findById(req.params.id).then(post => {
        if (!post) {
          return res.status(404).json({ error: "Post not exist" });
        }

        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notLiked: "You have not liked this post" });
        }
        // get the remove index of array
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice the array
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      });
    })
    .catch(err => res.status(404).json({ posts: "Post not found!" }));
});

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post("/comment/:id", requireAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    // If any errors ,send 400 with error object
    return res.status(404).json(errors);
  }
  //console.log(req.body.text);
  Post.findById(req.params.id)
    .then(post => {
      // Create new comment
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // Add to comment array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Remove comment from post
//@access Private
router.delete("/comment/:id/:comment_id", requireAuth, (req, res) => {
  //console.log(req.body.text);
  Post.findById(req.params.id)
    .then(post => {
      // Check to see if the comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ commentnotexist: "Comment not exist" });
      }

      // Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of the array
      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

module.exports = router;

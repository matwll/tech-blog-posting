const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: Comment });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findAll(req.params.id, {
      include: Comment,
    });
    if (!postData) {
      res.status(404).json({ message: "couldn't find posts" });
    } else {
      res.status(200).json(postData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: "couldn't find post" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (postData) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: "couldn't find post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/comment", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_name: req.session.user_name,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/comment/:commentId", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: "couldn't find comment" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id/comment/:commentId", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (commentData) {
      res.status(200).json(commentData);
    } else {
      res.status(404).json({ message: "couldn't find comment" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

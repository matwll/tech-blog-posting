const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      user_name: req.session.user_name,
      post_id: req.body.postId,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", withAuth, async (req, res) => {
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

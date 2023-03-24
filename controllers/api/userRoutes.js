const router = require("express").Router();
const { User } = require("../../models");


router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      user_name: req.body.userName,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.user_name;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const user = await User.update(
      req.body,
      { where: { id: req.session.user_id } }
    );
    console.log("update button user data" + user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.userName } });

    if (!userData) {
      res.status(400).json({
        message: "please check your username and password and try again.",
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "please check your email and password and try again.",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.user_name;

      res.json({ user: userData, message: "Successful Login!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
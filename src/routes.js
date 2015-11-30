module.exports = (app, pinboard, authToken) => {

  app.get("/tags", (req, res) => {

    return pinboard.getTags().then((tags) => {

      return res.send(tags);
    });
  });

  app.get("/user", (req, res) => {

    return res.send({ username: authToken.split(":")[0] });
  });
};

module.exports = (app, pinboard, authToken) => {

  app.get("/tags", (req, res) => {

    return pinboard.getTags().then((tags) => {

      return res.send(tags);
    });
  });

  app.get("/bookmarks", (req, res) => {

    return pinboard.getBookmarks().then((bookmarks) => {

      return res.send(bookmarks);
    });
  });

  app.get("/user", (req, res) => {

    return res.send({ username: authToken.split(":")[0] });
  });
};

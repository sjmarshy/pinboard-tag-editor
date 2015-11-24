module.exports = (app, pinboard) => {

  app.get("/tags", (req, res) => {

    return pinboard.getTags().then((tags) => {

      return res.send(tags);
    });
  });
};

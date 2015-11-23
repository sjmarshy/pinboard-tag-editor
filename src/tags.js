const { curry } = require("ramda");
const { filter } = require("fuzzy");

const searchTags = curry((tags, search) => {

  return filter(search, tags);
});

module.exports = {

  searchTags
};

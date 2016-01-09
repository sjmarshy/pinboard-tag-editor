import { curry } from "ramda";
import { filter } from "fuzzy";

export const searchTags = curry((tags, search) => {

  return filter(search, tags);
});

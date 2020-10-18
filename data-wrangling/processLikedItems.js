function processLikedItems(rawLikedItems, characters) {
  // The structure of the raw data is screwed up due to the layout of the original
  // table. Characters that have more than 4 liked items (such as Bernadetta) get
  // an extra row which convertjson.com interprets as a distinct row.

  // To fix this, we'll fold arrays that do not start with a known character into
  // the previous array.
  const normalizedLikedItems = rawLikedItems.reduce((acc, curr) => {
    const [character, ...items] = curr;
    if (characters.includes(character)) {
      // Nothing to fix.
      acc.push(curr);
      return acc;
    }
    // `character` is not a known character, so it's probably an item that the
    // previously seen character likes.
    const missingItems = [character, ...items];
    const lastCharacter = acc.pop();
    acc.push([...lastCharacter, ...missingItems]);
    return acc;
  }, []);

  const likedItems = {};
  for (let arr of normalizedLikedItems) {
    const [character, ...items] = arr;
    const cleanItems = items
      // The original table used "–" to fill space. Remove these.
      .filter((item) => item !== "–")
      // Remove empty strings
      .filter((item) => item !== "");
    likedItems[character] = cleanItems;
  }

  return likedItems;
}

module.exports = { processLikedItems };

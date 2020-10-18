function processLostItems(rawLostItems) {
  const lostItems = {};
  // A list of characters is useful for processing /raw/liked-items.json.
  const characters = [];
  for (let arr of rawLostItems) {
    const [character, ...items] = arr;
    characters.push(character);
    // The original table used "–" to fill space. Remove these.
    const cleanItems = items.filter((item) => !(item === "–" || item === ""));
    lostItems[character] = cleanItems;
  }

  return { lostItems, characters };
}

module.exports = { processLostItems };

const fs = require("fs");

function processLostItems() {
  const rawLostItems = JSON.parse(
    fs.readFileSync("data-wrangling/raw/lost-items.json")
  );

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

  fs.writeFileSync(
    "data-wrangling/clean/lost-items.json",
    JSON.stringify(lostItems, null, 2)
  );
  fs.writeFileSync(
    "data-wrangling/clean/characters.json",
    JSON.stringify(characters)
  );
}

module.exports = { processLostItems };

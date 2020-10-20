const fs = require("fs");

const { processLostItems } = require("./processLostItems");
const { processLikedItems } = require("./processLikedItems");
const { joinLikedAndLost } = require("./joinLikedAndLost");

function main() {
  // Read
  const rawLikedItems = JSON.parse(
    fs.readFileSync("data-wrangling/raw/liked-items.json")
  );
  const rawLostItems = JSON.parse(
    fs.readFileSync("data-wrangling/raw/lost-items.json")
  );

  // Extract characters and lost items
  const { characters, lostItems } = processLostItems(rawLostItems);
  // Extract liked items
  const likedItems = processLikedItems(rawLikedItems, characters);
  // Assemble all data into 'Item' objects.
  const allItems = joinLikedAndLost(likedItems, lostItems);
  // Prep for writing.
  const allItemsString = `export const items = ${JSON.stringify(
    allItems,
    null,
    2
  )};`;

  // Write
  fs.writeFileSync("src/items.js", allItemsString);
  console.log("Done.\nResults written to /src/items.js");
}

main();

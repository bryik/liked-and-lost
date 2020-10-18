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
  console.log(allItems);

  // Write
  fs.writeFileSync(
    "public/data/lost-items.json",
    JSON.stringify(lostItems, null, 2)
  );
  fs.writeFileSync("public/data/characters.json", JSON.stringify(characters));
  fs.writeFileSync(
    "public/data/liked-items.json",
    JSON.stringify(likedItems, null, 2)
  );
  fs.writeFileSync("public/data/items.json", JSON.stringify(allItems, null, 2));

  console.log("Done.\nResults written to /public/data");
}

main();

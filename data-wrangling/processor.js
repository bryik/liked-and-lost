const { processLostItems } = require("./processLostItems");
const { processLikedItems } = require("./processLikedItems");

processLostItems();
processLikedItems();
console.log("Done.\nResults written to /data-wrangling/clean");

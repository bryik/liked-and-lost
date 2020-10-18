const { processLostItems } = require("./processLostItems");
const { processLikedItems } = require("./processLikedItems");

processLostItems();
processLikedItems();
console.log("Done.\nResults written to /public/data");

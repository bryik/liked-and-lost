function joinLikedAndLost(likedItems, lostItems) {
  // Collect all item names.
  const allItemNames = [
    Object.values(likedItems),
    Object.values(lostItems),
  ].flat(2);
  const uniqueItemNames = Array.from(new Set(allItemNames));

  // Create Item objects.
  // const allItems = uniqueItemNames.map((name) => {
  //   return { name, likedBy: [], lostBy: [] };
  // });
  const allItems = uniqueItemNames.reduce((acc, curr) => {
    acc[curr] = { name: curr, likedBy: [], lostBy: [] };
    return acc;
  }, {});

  // Add likedBy relations
  Object.entries(likedItems).forEach(([character, charactersLikedItems]) => {
    charactersLikedItems.forEach((item) => {
      allItems[item].likedBy.push(character);
    });
  });

  // Add lostBy relations
  Object.entries(lostItems).forEach(([character, charactersLostItems]) => {
    charactersLostItems.forEach((item) => {
      allItems[item].lostBy.push(character);
    });
  });

  return Object.values(allItems);
}

module.exports = { joinLikedAndLost };

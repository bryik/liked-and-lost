const likedItemsPath = `${process.env.PUBLIC_URL}/data/liked-items.json`;
const lostItemsPath = `${process.env.PUBLIC_URL}/data/lost-items.json`;
const itemsPath = `${process.env.PUBLIC_URL}/data/items.json`;

const fetchAndParse = (url) => fetch(url).then((result) => result.json());

export default async function fetchItemData() {
  const urlsToFetch = [likedItemsPath, lostItemsPath, itemsPath];

  const promisedResponses = [];
  for (let url of urlsToFetch) {
    const promisedResponse = fetchAndParse(url);
    promisedResponses.push(promisedResponse);
  }
  const responses = await Promise.all(promisedResponses);
  return {
    likedItems: responses[0],
    lostItems: responses[1],
    items: responses[2],
  };
}

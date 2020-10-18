const itemsPath = `${process.env.PUBLIC_URL}/data/items.json`;

export default async function fetchItemData() {
  const itemsResponse = await fetch(itemsPath);
  const itemsJson = await itemsResponse.json();
  return { items: itemsJson };
}

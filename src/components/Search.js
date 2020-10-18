import React, { useState } from "react";

import ItemTable from "./ItemTable";

export default function Search(props) {
  const { items } = props;
  const [searchExpression, setSearchExpression] = useState("");
  const handleSearchExpressionChange = (event) =>
    setSearchExpression(event.target.value);

  const filteredItems = items.filter((item) => {
    const re = new RegExp(searchExpression, "i");
    const searchableText = [
      item.name,
      item.likedBy.join(" "),
      item.lostBy.join(" "),
    ].join(" ");
    return re.exec(searchableText);
  });

  return (
    <div>
      <label className="mv2 mt3-ns mb3" style={{ marginLeft: "auto" }}>
        <p className="lh-copy b di">Search</p>
        <input
          type="text"
          value={searchExpression}
          onChange={handleSearchExpressionChange}
          className="ml2"
        />
      </label>
      <ItemTable items={filteredItems} />
    </div>
  );
}

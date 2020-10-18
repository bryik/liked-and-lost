import React, { useState } from "react";

function ItemTableRow(props) {
  const { name, likedBy, lostBy } = props;
  return (
    <tr>
      <td className="pv3 pr3 bb b--black-20">{name}</td>
      <td className="pv3 pr3 bb b--black-20">{likedBy.join(", ")}</td>
      <td className="pv3 pr3 bb b--black-20">{lostBy}</td>
    </tr>
  );
}

function ItemTable(props) {
  const { items } = props;
  const rows = items.map(({ name, likedBy, lostBy }) => (
    <ItemTableRow key={name} name={name} likedBy={likedBy} lostBy={lostBy} />
  ));
  return (
    <div className="overflow-auto mt0 mh3 mh0-l">
      <table className="f6 w-100 mw8 center" cellSpacing="0">
        <thead>
          <tr>
            <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Item</th>
            <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Liked By</th>
            <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Lost By</th>
          </tr>
        </thead>
        <tbody className="lh-copy">{rows}</tbody>
      </table>
    </div>
  );
}

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
      <label className="mv2 mt3-ns" style={{ marginLeft: "auto" }}>
        <p className="lh-copy b di">Search</p>
        <input
          type="text"
          value={searchExpression}
          onChange={handleSearchExpressionChange}
          className="ml2"
        />
      </label>
      <br />
      <br />
      <ItemTable items={filteredItems} />
    </div>
  );
}

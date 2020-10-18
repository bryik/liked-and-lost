import React, { useState, useMemo } from "react";

import ItemTable from "./ItemTable";

export default function Search(props) {
  const { items } = props;
  const [searchExpression, setSearchExpression] = useState("");
  const handleSearchExpressionChange = (event) =>
    setSearchExpression(event.target.value);
  const [searchExpressionError, setSearchExpressionError] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      let re;
      try {
        re = new RegExp(searchExpression, "i");
      } catch (error) {
        setSearchExpressionError(error);
        return true;
      }
      // Clear error.
      setSearchExpressionError(null);

      const searchableText = [
        item.name,
        item.likedBy.join(" "),
        item.lostBy.join(" "),
      ].join(" ");
      return re.exec(searchableText);
    });
  }, [items, searchExpression]);

  const searchInputClass = searchExpressionError
    ? "input-reset ba b--red pa2 mb2 db w-100"
    : "input-reset ba b--black-20 pa2 mb2 db w-100";

  const searchInputNote = searchExpressionError
    ? searchExpressionError?.message
    : "Enter the name of a character or item.";
  const searchInputNoteClass = searchExpressionError
    ? "f6 db mb2 code"
    : "f6 black-60 db mb2";
  return (
    <div>
      <div className="measure">
        <label htmlFor="search" className="f5 b db mb2">
          Search
        </label>
        <input
          id="search"
          className={searchInputClass}
          type="text"
          aria-describedby="search-desc"
          value={searchExpression}
          onChange={handleSearchExpressionChange}
        />
        <small id="search-desc" className={searchInputNoteClass}>
          {searchInputNote}
        </small>
      </div>
      <ItemTable items={filteredItems} />
    </div>
  );
}

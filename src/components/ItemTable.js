import React from "react";
import PropTypes from "prop-types";

ItemTableRow.propTypes = {
  name: PropTypes.string,
  likedBy: PropTypes.arrayOf(PropTypes.string),
  lostBy: PropTypes.arrayOf(PropTypes.string),
};
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

ItemTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      likedBy: PropTypes.arrayOf(PropTypes.string),
      lostBy: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
export default function ItemTable(props) {
  const { items } = props;
  const rows = items.map(({ name, likedBy, lostBy }) => (
    <ItemTableRow key={name} name={name} likedBy={likedBy} lostBy={lostBy} />
  ));
  return (
    <div className="overflow-auto mt4 mh0-l">
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

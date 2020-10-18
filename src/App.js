import React from "react";

import { useAsync } from "./hooks/useAsync";
import fetchItemData from "./utilities/fetchItemData";
import Search from "./components/Search";

const LoadingApp = () => {
  return (
    <div className="helvetica">
      <p>Loading</p>
    </div>
  );
};

const ErrorApp = (props) => {
  console.error(props.error);
  return (
    <div className="helvetica">
      <p>Error :(</p>
    </div>
  );
};

const SuccessApp = (props) => {
  const { data } = props;
  const { items } = data;
  return (
    <div
      className="helvetica pa1 ma1 pa3-ns ma3-ns"
      style={{ margin: "0 auto", maxWidth: "960px" }}
    >
      <h1 className="f2 lh-title">Liked & Lost Items</h1>
      <Search items={items} />
    </div>
  );
};

function App() {
  const { status, value, error } = useAsync(fetchItemData, true);

  if (status === "idle" || status === "pending") {
    return <LoadingApp />;
  }

  if (status === "error") {
    return <ErrorApp error={error} />;
  }

  return <SuccessApp data={value} />;
}

export default App;

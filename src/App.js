import React from "react";

import { useAsync } from "./hooks/useAsync";
import fetchItemData from "./utilities/fetchItemData";
import Search from "./components/Search";
import GitHubCorner from "./components/GitHubCorner";

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
    <>
      <GitHubCorner url="https://github.com/bryik/liked-and-lost" />
      <div
        className="helvetica pa1 ma1 pa3-ns ma3-ns"
        style={{ margin: "0 auto", maxWidth: "960px" }}
      >
        <h1 className="f2 lh-title">Liked & Lost Items</h1>
        <p class="f6 lh-copy measure">
          This is a tool to assist players of{" "}
          <span className="i">Fire Emblem: Three Houses</span> in finding owners
          of lost items and in matching characters with their preferred gifts.
        </p>
        <Search items={items} />
      </div>
    </>
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

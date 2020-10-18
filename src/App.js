import React from "react";

import { useAsync } from "./hooks/useAsync";
import fetchItemData from "./utilities/fetchItemData";

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
  console.log(data);
  return (
    <div className="helvetica">
      <p>TODO</p>
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

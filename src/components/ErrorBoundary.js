import React from "react";

import GitHubCorner from "./GitHubCorner";

/**
 * A basic React error boundary.
 * The last line of defense against unexpected errors.
 *
 * Based on: https://codepen.io/gaearon/pen/wqvxGa
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path.
      return (
        <>
          <GitHubCorner url="https://github.com/bryik/liked-and-lost" />
          <div
            className="helvetica pa3 ma3"
            style={{ margin: "0 auto", maxWidth: "960px" }}
          >
            <h1 className="f2 lh-title red">Error</h1>
            <p className="f5 lh-copy">An unexpected error has occured.</p>
            <p className="f5 lh-copy">
              Refresh the page and try again and if the error still occurs,{" "}
              <a href="https://github.com/bryik/liked-and-lost/issues/new">
                file an issue here
              </a>
              .
            </p>
            <details style={{ whiteSpace: "pre-wrap", cursor: "pointer" }}>
              <summary>Details</summary>
              <p className="f5 measure">
                {this.state.error && this.state.error.toString()}
              </p>
              <p className="code">{this.state.errorInfo.componentStack}</p>
            </details>
          </div>
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

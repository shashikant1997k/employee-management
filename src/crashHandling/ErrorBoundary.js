import React from "react";
import { Button, Result } from "antd";

export default class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  redirectToHome = () => {
    window.location.replace("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={this.redirectToHome}>
              Back Home
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

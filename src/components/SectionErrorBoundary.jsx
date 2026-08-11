import { Component } from "react";

// Wraps the lazy-loaded, viewport-triggered sections on Home. Without this,
// a single failed chunk fetch (flaky connection, missing asset) throws
// during render and — since nothing else catches it — unmounts the entire
// page, including Navbar/Hero/Footer that already loaded fine. This scopes
// the failure to just the section that broke.
export default class SectionErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Section failed to load:", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

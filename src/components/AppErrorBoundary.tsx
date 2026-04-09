import { Component, type ErrorInfo, type ReactNode } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Keep console details for debugging deployment-only crashes.
    console.error("Unhandled UI error:", error, errorInfo);
  }

  private handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full glass rounded-2xl p-6 text-center space-y-3">
            <h1 className="font-display text-2xl text-foreground">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              The page hit an unexpected error. Please reload to continue.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

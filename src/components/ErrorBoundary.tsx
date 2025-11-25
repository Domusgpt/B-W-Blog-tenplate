import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-2xl text-center">
            <div className="w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                <text x="50" y="60" fontSize="40" textAnchor="middle" fill="currentColor" className="text-cyan-400">!</text>
              </svg>
            </div>
            <h1 className="text-4xl font-light mb-4" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
              Something went wrong
            </h1>
            <p className="text-gray-400 mb-8">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="border border-white px-8 py-3 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
            >
              REFRESH PAGE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

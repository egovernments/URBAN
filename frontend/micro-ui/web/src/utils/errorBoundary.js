import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      sessionExpired: false
    };
  }

  static getDerivedStateFromError(error) {
    // Check if error is due to session/auth issues
    const isSessionError = error.message?.includes('401') || 
                          error.message?.includes('403') ||
                          error.message?.includes('Unauthorized') ||
                          error.message?.includes('session');
    
    return { 
      hasError: true,
      sessionExpired: isSessionError
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
    
    // Check for session-related errors
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      this.handleSessionExpiry();
    }
  }

  handleSessionExpiry = () => {
    // Clear all session data
    sessionStorage.clear();
    localStorage.removeItem("Employee.token");
    localStorage.removeItem("Employee.user-info");
    localStorage.removeItem("Employee.tenant-id");
    localStorage.removeItem("citizen.token");
    localStorage.removeItem("citizen.user-info");
    localStorage.removeItem("citizen.tenant-id");
    
    // Set flag for session timeout
    sessionStorage.setItem("session-timeout", "true");
    
    // Redirect to login
    const isCitizen = window.location.pathname.includes("/citizen");
    const loginPath = isCitizen ? "/digit-ui/citizen/login" : "/digit-ui/employee/user/login";
    window.location.href = loginPath;
  }

  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      if (this.state.sessionExpired) {
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2>Session Expired</h2>
            <p>Your session has expired. You will be redirected to the login page.</p>
            <button 
              onClick={this.handleSessionExpiry}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
          </div>
        );
      }
      
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p>We encountered an unexpected error. Please try refreshing the page.</p>
          <button 
            onClick={this.handleReload}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error details</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
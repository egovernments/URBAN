import React from 'react';
import CacheManager from '../utils/cacheManager';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isCacheError: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a cache-related error
    const isCacheError = error.message && (
      error.message.includes('getCaheData') ||
      error.message.includes('is not iterable') ||
      error.message.includes('Cannot read property') ||
      error.message.includes('localStorage')
    );
    
    return { 
      hasError: true, 
      isCacheError 
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log the error
    console.error('Error caught by boundary:', error, errorInfo);

    // If it's a cache error, try to clear cache automatically
    if (this.state.isCacheError) {
      console.log('Detected cache-related error, attempting to clear cache...');
      try {
        CacheManager.clearAllCache();
        console.log('Cache cleared successfully');
      } catch (cacheError) {
        console.error('Failed to clear cache:', cacheError);
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleClearCache = () => {
    try {
      CacheManager.clearAllCache();
      CacheManager.clearSessionCache();
      console.log('Cache cleared, reloading...');
      window.location.reload();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  handleGoToLogin = () => {
    try {
      CacheManager.clearAllCache();
      CacheManager.clearSessionCache();
      window.location.href = '/digit-ui/citizen/login';
    } catch (error) {
      console.error('Failed to redirect to login:', error);
    }
  };

  render() {
    if (this.state.hasError) {
      const isCacheError = this.state.isCacheError;
      
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              color: '#e74c3c'
            }}>
              ⚠️
            </div>
            
            <h2 style={{
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              {isCacheError ? 'Cache Error Detected' : 'Something Went Wrong'}
            </h2>
            
            <p style={{
              color: '#7f8c8d',
              marginBottom: '25px',
              lineHeight: '1.5'
            }}>
              {isCacheError 
                ? 'We detected a caching issue that might be causing problems. This can happen when the application data becomes stale or corrupted.'
                : 'An unexpected error occurred. Please try refreshing the page or clearing your browser cache.'
              }
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {isCacheError && (
                <button
                  onClick={this.handleClearCache}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Clear Cache & Reload
                </button>
              )}
              
              <button
                onClick={this.handleRetry}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleGoToLogin}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Go to Login
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details style={{
                marginTop: '20px',
                textAlign: 'left'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  color: '#7f8c8d',
                  fontSize: '14px'
                }}>
                  Error Details (Development)
                </summary>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto',
                  maxHeight: '200px',
                  marginTop: '10px'
                }}>
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
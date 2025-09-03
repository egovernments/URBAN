# Session Management Implementation

## Overview
This implementation adds comprehensive session timeout and idle detection features to prevent system crashes when users leave screens open for extended periods.

## Features

### 1. **Idle Timeout Detection**
- Monitors user activity (mouse movements, clicks, keyboard inputs, scroll, touch)
- Automatically logs out users after a configurable period of inactivity
- Default timeout: 60 minutes

### 2. **Session Warning**
- Shows a warning modal 5 minutes before session expires
- Users can extend their session by clicking OK
- Configurable warning time

### 3. **Tab Visibility Handling**
- Detects when users switch tabs or minimize browser
- Validates session when user returns to the application
- Prevents crashes from expired sessions on inactive tabs

### 4. **API Error Handling**
- Intercepts 401/403 authentication errors
- Automatically redirects to login on session expiry
- Prevents application crashes from unauthorized API calls

### 5. **Error Boundary**
- Catches React component errors
- Provides graceful error recovery
- Special handling for session-related errors

## Configuration

### Environment Variables
You can customize the session behavior using environment variables in your `.env` file:

```env
# Session timeout in minutes (default: 60)
REACT_APP_SESSION_TIMEOUT_MINUTES=60

# Warning time before timeout in minutes (default: 5)
REACT_APP_SESSION_WARNING_MINUTES=5

# Enable/disable session management (default: true)
REACT_APP_ENABLE_SESSION_MANAGEMENT=true

# Show warning modal (default: true)
REACT_APP_SHOW_SESSION_WARNING=true

# Session validity check interval in seconds (default: 30)
REACT_APP_SESSION_CHECK_INTERVAL=30
```

### Programmatic Configuration
Edit `src/config/sessionConfig.js` to modify:
- Timeout duration
- Warning messages
- Excluded paths
- Activity events to track

## File Structure

```
src/
├── hooks/
│   └── useIdleTimeout.js          # Main idle detection hook
├── components/
│   └── SessionManager.js          # Session management wrapper component
├── utils/
│   ├── errorBoundary.js          # Error boundary for crash prevention
│   └── apiInterceptor.js         # API request/response interceptor
├── config/
│   └── sessionConfig.js          # Configuration settings
└── App.js                         # Updated with SessionManager wrapper
```

## How It Works

1. **User Activity Tracking**: The system tracks various user interactions to determine if the user is active
2. **Timer Management**: A timer counts down from the last activity
3. **Warning Display**: Before timeout, a warning is shown to the user
4. **Session Cleanup**: On timeout, all session data is cleared and user is redirected to login
5. **Error Recovery**: Any session-related errors are caught and handled gracefully

## Testing

### Manual Testing Steps

1. **Test Idle Timeout**:
   - Login to the application
   - Leave the screen idle for the configured timeout period
   - Verify automatic logout and redirect to login page

2. **Test Warning Modal**:
   - Login to the application
   - Wait for (timeout - warning) minutes
   - Verify warning modal appears
   - Click OK to extend session

3. **Test Tab Switching**:
   - Login and switch to another tab
   - Wait for timeout period
   - Return to the application tab
   - Verify proper session handling

4. **Test API Errors**:
   - Manually clear session token from localStorage while logged in
   - Perform any action that makes an API call
   - Verify redirect to login without crashes

## Customization

### Changing Timeout Duration
Update in `src/App.js`:
```javascript
<SessionManager timeoutMinutes={120}> // 2 hours
```

### Customizing Warning Messages
Edit `src/config/sessionConfig.js`:
```javascript
MESSAGES: {
  SESSION_WARNING: 'Your custom warning message',
  SESSION_EXPIRED: 'Your custom expiry message'
}
```

### Excluding Specific Pages
Add paths to `EXCLUDED_PATHS` in `src/config/sessionConfig.js`:
```javascript
EXCLUDED_PATHS: [
  '/login',
  '/public-page',
  '/your-custom-path'
]
```

## Troubleshooting

### Session expires too quickly
- Increase `IDLE_TIMEOUT_MINUTES` in configuration
- Check if all required activity events are being tracked

### Warning doesn't appear
- Verify `SHOW_WARNING_MODAL` is set to true
- Check browser popup settings

### Session not clearing properly
- Clear browser cache and localStorage
- Check if all session storage keys are being cleared

## Benefits

1. **Prevents System Crashes**: Handles expired sessions gracefully
2. **Improves Security**: Automatically logs out inactive users
3. **Better User Experience**: Warns users before logout
4. **Configurable**: Easy to customize for different requirements
5. **Comprehensive**: Handles various edge cases and error scenarios

## Support

For issues or questions, please contact the development team or create an issue in the project repository.
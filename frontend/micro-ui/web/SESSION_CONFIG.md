# Session Manager Configuration Guide

## Current Implementation Features

### 1. **No Session Resume After Warning**
- Once the warning dialog appears, the session is **locked**
- User activity (mouse/keyboard) will NOT reset the timer after warning shows
- User must respond to the warning within 30 seconds or be logged out

### 2. **Strict Timeout Enforcement**
- If user clicks "Cancel" on warning → Immediate logout
- If user doesn't respond within 30 seconds → Automatic logout  
- If user clicks "OK" within time → Session extended for another cycle

### 3. **Session States**
- **Active**: Normal operation, timer resets on activity
- **Warning Shown**: Session locked, waiting for user response
- **Session Locked**: No activity can reset timer
- **Expired**: Automatic logout and redirect

## Testing Configuration (Current)
Located in: `H:\EGOV\URBAN\frontend\micro-ui\web\micro-ui-internals\packages\modules\core\src\Module.js`

```javascript
this.timeoutMinutes = 2;    // Total timeout: 2 minutes
this.warningMinutes = 0.5;  // Warning at: 1.5 minutes (30 sec before timeout)
```

## Production Configuration
To change for production, update lines 14-15 in Module.js:

```javascript
this.timeoutMinutes = 60;   // Total timeout: 60 minutes (1 hour)
this.warningMinutes = 5;    // Warning at: 55 minutes (5 min before timeout)
```

## How It Works

### Timeline Example (Testing - 2 min timeout):
1. **0:00** - User logs in, timer starts
2. **0:00-1:30** - Normal activity, timer resets on any interaction
3. **1:30** - Warning dialog appears, session locks
4. **1:30-2:00** - 30-second grace period to respond
   - Click OK → Session extends, timer restarts
   - Click Cancel → Immediate logout
   - No response → Logout at 2:00

### Timeline Example (Production - 60 min timeout):
1. **0:00** - User logs in, timer starts
2. **0:00-55:00** - Normal activity, timer resets on any interaction
3. **55:00** - Warning dialog appears, session locks
4. **55:00-60:00** - 5-minute grace period to respond
   - Click OK → Session extends, timer restarts
   - Click Cancel → Immediate logout
   - No response → Logout at 60:00

## Console Logs for Debugging

You'll see these in browser console:
- `🔥 Session Manager Initializing` - On page load
- `✅ Session Manager Started!` - When user is logged in
- `⏱️ Timer reset` - Each time activity resets timer
- `⚠️ Session Warning!` - When warning dialog shows
- `🔒 Session is locked` - If activity detected after warning
- `✅ Session extended by user` - User clicked OK
- `❌ User rejected extension` - User clicked Cancel
- `⏰ Warning timeout exceeded` - 30 sec passed without response
- `🚪 Session Expired` - Logging out

## Manual Testing in Browser Console

```javascript
// Check session manager status
window.digitSessionManager

// Trigger warning immediately (for testing)
window.digitSessionManager.showWarning()

// Force logout immediately (for testing)  
window.digitSessionManager.handleTimeout()

// Check if session is locked
window.digitSessionManager.sessionLocked

// Destroy session manager
window.digitSessionManager.destroy()
```

## Important Behaviors

1. **No Activity Reset After Warning**
   - Moving mouse or typing won't extend session once warning appears
   - Only clicking "OK" on the warning dialog extends session

2. **Automatic Logout Scenarios**
   - User clicks "Cancel" on warning
   - User closes warning dialog (X button)
   - User doesn't respond within grace period
   - Browser tab inactive for longer than timeout

3. **Session Data Cleared**
   - All localStorage tokens removed
   - All sessionStorage cleared
   - User service reset
   - Redirect to appropriate login page

## Recommended Production Settings

For a typical enterprise application:
```javascript
this.timeoutMinutes = 30;   // 30 minutes total
this.warningMinutes = 5;    // Warning at 25 minutes
```

For high-security applications:
```javascript
this.timeoutMinutes = 15;   // 15 minutes total
this.warningMinutes = 2;    // Warning at 13 minutes
```

For low-security/convenience:
```javascript
this.timeoutMinutes = 120;  // 2 hours total
this.warningMinutes = 10;   // Warning at 110 minutes
```
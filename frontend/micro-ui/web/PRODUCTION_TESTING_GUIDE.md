# Production Testing Guide for Session Manager

## Default Production Values
- **Timeout**: 60 minutes
- **Warning**: 5 minutes before timeout (at 55 minutes)

## How to Test in Production

### Method 1: Using Browser Console (Easiest)

1. **Open Browser Console** (F12 → Console tab)

2. **Set Custom Timeout for Testing**:
```javascript
// Set to 2 minutes timeout with 30 seconds warning
setSessionTimeout(2, 0.5)

// Set to 5 minutes timeout with 1 minute warning  
setSessionTimeout(5, 1)

// Set to 1 minute timeout with 15 seconds warning (quick test)
setSessionTimeout(1, 0.25)
```

3. **Refresh the Page** (F5) to apply new settings

4. **Verify Configuration**:
```javascript
// Check current settings
getSessionConfig()
```

5. **Test the Timeout**:
   - Wait for the specified time without any activity
   - Warning will appear at (timeout - warning) minutes
   - Session will expire at timeout minutes

6. **Reset to Production Values**:
```javascript
// Clear custom settings
clearSessionTimeout()
// Refresh page to apply defaults (60 min timeout, 5 min warning)
```

### Method 2: Using Session Storage (Manual)

1. **Open Developer Tools** (F12)
2. **Go to Application/Storage → Session Storage**
3. **Add these key-value pairs**:
   - Key: `SESSION_TIMEOUT_MINUTES` Value: `2`
   - Key: `SESSION_WARNING_MINUTES` Value: `0.5`
4. **Refresh the page** (F5)

### Method 3: Live Update (Without Refresh)

```javascript
// Update configuration without page refresh
window.digitSessionManager.updateConfig(2, 0.5)

// Check new configuration
window.digitSessionManager.getConfig()
```

## Testing Scenarios

### Quick Test (1 minute)
```javascript
// In console:
setSessionTimeout(1, 0.25)
// Refresh page
// Wait 45 seconds → Warning appears
// Wait 1 minute → Auto logout
```

### Standard Test (5 minutes)
```javascript
// In console:
setSessionTimeout(5, 1)
// Refresh page
// Wait 4 minutes → Warning appears
// Wait 5 minutes → Auto logout
```

### User Interaction Test
```javascript
// Set short timeout
setSessionTimeout(2, 0.5)
// Refresh page
// Move mouse for first minute → Timer keeps resetting
// Stop all activity
// At 1:30 → Warning appears
// Click OK → Session extends
// Or Click Cancel → Immediate logout
```

## Console Commands Reference

### Configuration Commands
```javascript
// Set custom timeout (minutes, warning_minutes)
setSessionTimeout(2, 0.5)

// Clear custom timeout (return to defaults)
clearSessionTimeout()

// Get current configuration
getSessionConfig()
```

### Testing Commands
```javascript
// Check session manager status
window.digitSessionManager

// Get detailed config
window.digitSessionManager.getConfig()

// Manually trigger warning (immediate)
window.digitSessionManager.showWarning()

// Force logout (immediate)
window.digitSessionManager.handleTimeout()

// Update config without refresh
window.digitSessionManager.updateConfig(3, 1)

// Destroy session manager
window.digitSessionManager.destroy()
```

## What You'll See in Console

### On Page Load:
```
🔥 Session Manager Initializing in Core Module...
⚙️ Session Manager Config: {
  timeoutMinutes: 60,
  warningMinutes: 5,
  source: "default production values"
}
```

### With Custom Settings:
```
⚙️ Session Manager Config: {
  timeoutMinutes: 2,
  warningMinutes: 0.5,
  source: "sessionStorage (custom)"
}
```

### During Operation:
```
✅ Session Manager Started! Timeout: 2min, Warning: 1.5min
⏱️ Timer reset: [timestamp]
⚠️ Session Warning!
🔒 Session is locked, cannot reset timer
✅ Session extended by user (if OK clicked)
❌ User rejected extension (if Cancel clicked)
🚪 Session Expired - Logging out!
```

## Important Notes

1. **Custom settings persist in session storage** until:
   - You call `clearSessionTimeout()`
   - Browser tab is closed
   - Session storage is cleared

2. **Production defaults** (60 min / 5 min) are used when:
   - No custom values in session storage
   - After calling `clearSessionTimeout()`

3. **Warning behavior**:
   - Once warning appears, session is locked
   - Mouse/keyboard activity won't extend session
   - Only clicking OK extends session

4. **Testing tips**:
   - Use 1-2 minute timeouts for quick testing
   - Use 5-10 minute timeouts for realistic testing
   - Always refresh page after `setSessionTimeout()`
   - Check `getSessionConfig()` to verify settings

## Troubleshooting

### Settings not applying?
- Make sure to refresh page after `setSessionTimeout()`
- Check session storage in DevTools
- Verify with `getSessionConfig()`

### Timer not working?
- Check if user is logged in (needs auth token)
- Verify with `window.digitSessionManager.isActive`
- Look for console errors

### Want to stop testing?
```javascript
clearSessionTimeout()  // Clear custom settings
location.reload()      // Refresh page
```

## Production Deployment

Before deploying to production:
1. Ensure default values are set to 60/5 (or your preferred production values)
2. Test thoroughly with production values
3. Document the timeout values for users
4. Consider adding this to your admin documentation
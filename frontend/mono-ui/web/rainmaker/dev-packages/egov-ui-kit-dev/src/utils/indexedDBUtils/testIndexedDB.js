/**
 * Test script for IndexedDB functionality
 * Run this in browser console or import it in your app temporarily
 */

import indexedDBManager from './index';

export const testIndexedDB = async () => {
  console.log('Log => ** [IndexedDB:Test] Starting IndexedDB tests...');

  try {
    // Test 1: Check support
    console.log('Log => ** [IndexedDB:Test] Support check:', indexedDBManager.isSupported);

    if (!indexedDBManager.isSupported) {
      console.error('Log => ** [IndexedDB:Test] IndexedDB is NOT supported in this browser!');
      return { success: false, error: 'Not supported' };
    }

    // Test 2: Initialize database
    console.log('Log => ** [IndexedDB:Test] Initializing database...');
    await indexedDBManager.init();
    console.log('Log => ** [IndexedDB:Test] Database initialized successfully');

    // Test 3: Save test data
    console.log('Log => ** [IndexedDB:Test] Saving test data...');
    const testData = [
      { code: 'TEST_KEY_1', message: 'Test Message 1' },
      { code: 'TEST_KEY_2', message: 'Test Message 2' }
    ];
    const saveResult = await indexedDBManager.setLocalization('test_locale', 'test_module', testData);
    console.log('Log => ** [IndexedDB:Test] Save result:', saveResult);

    // Test 4: Retrieve data
    console.log('Log => ** [IndexedDB:Test] Retrieving test data...');
    const retrievedData = await indexedDBManager.getLocalization('test_locale', 'test_module');
    console.log('Log => ** [IndexedDB:Test] Retrieved data:', retrievedData);

    // Test 5: Verify data integrity
    const dataMatches = JSON.stringify(testData) === JSON.stringify(retrievedData);
    console.log('Log => ** [IndexedDB:Test] Data integrity check:', dataMatches ? 'PASSED' : 'FAILED');

    // Test 6: Get storage stats
    console.log('Log => ** [IndexedDB:Test] Getting storage stats...');
    const stats = await indexedDBManager.getStorageStats();
    console.log('Log => ** [IndexedDB:Test] Storage stats:', stats);

    // Test 7: Clean up test data
    console.log('Log => ** [IndexedDB:Test] Cleaning up test data...');
    await indexedDBManager.deleteLocalization('test_locale', 'test_module');
    console.log('Log => ** [IndexedDB:Test] Test data cleaned up');

    console.log('Log => ** [IndexedDB:Test] ✅ All tests PASSED!');
    return {
      success: true,
      supported: true,
      dataIntegrity: dataMatches,
      stats
    };

  } catch (error) {
    console.error('Log => ** [IndexedDB:Test] ❌ Test FAILED:', error);
    return { success: false, error: error.message };
  }
};

// Auto-run if in development mode
if (process.env.NODE_ENV === 'development') {
  window.testIndexedDB = testIndexedDB;
  console.log('Log => ** [IndexedDB:Test] Test function available as window.testIndexedDB()');
}

export default testIndexedDB;

import React, { Component } from 'react';
import indexedDBManager from '../utils/indexedDBUtils';
import {
  getLocalizationStorageStats,
  migrateLocalizationToIndexedDB,
  getLocale,
  getLocalizationLabels
} from '../utils/localStorageUtils';

/**
 * Debug Panel for Localization Storage
 *
 * Usage: Add this component temporarily to any page to test IndexedDB
 * <LocalizationDebugPanel />
 */
class LocalizationDebugPanel extends Component {
  state = {
    indexedDBSupported: false,
    storageStats: null,
    localStorageSize: 0,
    indexedDBSize: 0,
    migrationStatus: '',
    logs: []
  };

  componentDidMount() {
    this.checkIndexedDBSupport();
    this.loadStats();
  }

  checkIndexedDBSupport = () => {
    const supported = indexedDBManager.checkSupport();
    this.setState({ indexedDBSupported: supported });
    this.addLog(supported ? '✅ IndexedDB is supported' : '❌ IndexedDB NOT supported');
  };

  loadStats = async () => {
    try {
      // Get IndexedDB stats
      const stats = await getLocalizationStorageStats();
      this.setState({ storageStats: stats });
      this.addLog(`📊 IndexedDB Stats: ${stats.totalEntries || 0} entries`);

      // Get localStorage size
      const locale = getLocale() || 'en_IN';
      const localData = localStorage.getItem(`localization_${locale}`);
      const localSize = localData ? new Blob([localData]).size : 0;
      this.setState({ localStorageSize: localSize });
      this.addLog(`💾 localStorage: ${(localSize / 1024).toFixed(2)} KB`);

      // Get IndexedDB size (approximate)
      const indexedData = await indexedDBManager.getLocalization(locale, 'all');
      const indexedSize = indexedData ? new Blob([JSON.stringify(indexedData)]).size : 0;
      this.setState({ indexedDBSize: indexedSize });
      this.addLog(`🗄️ IndexedDB: ${(indexedSize / 1024).toFixed(2)} KB`);

    } catch (error) {
      this.addLog(`❌ Error loading stats: ${error.message}`);
    }
  };

  handleMigration = async () => {
    this.addLog('🔄 Starting migration...');
    this.setState({ migrationStatus: 'Migrating...' });

    try {
      const result = await migrateLocalizationToIndexedDB();
      if (result) {
        this.setState({ migrationStatus: '✅ Migration successful!' });
        this.addLog('✅ Migration completed successfully');
      } else {
        this.setState({ migrationStatus: '⚠️ No data to migrate' });
        this.addLog('⚠️ No data found to migrate');
      }

      // Reload stats after migration
      await this.loadStats();
    } catch (error) {
      this.setState({ migrationStatus: `❌ Error: ${error.message}` });
      this.addLog(`❌ Migration failed: ${error.message}`);
    }
  };

  handleClearIndexedDB = async () => {
    if (window.confirm('Clear all IndexedDB data? (localStorage will remain)')) {
      this.addLog('🗑️ Clearing IndexedDB...');
      try {
        await indexedDBManager.clearAllLocalizations();
        this.addLog('✅ IndexedDB cleared');
        await this.loadStats();
      } catch (error) {
        this.addLog(`❌ Error clearing: ${error.message}`);
      }
    }
  };

  handleViewIndexedDB = async () => {
    try {
      const locale = getLocale() || 'en_IN';
      const data = await indexedDBManager.getLocalization(locale, 'all');

      if (data && data.length > 0) {
        console.log('=== IndexedDB Localization Data ===');
        console.log(`Total entries: ${data.length}`);
        console.log('Sample entries:', data.slice(0, 5));
        console.log('Full data:', data);
        this.addLog(`✅ Check console for ${data.length} IndexedDB entries`);
      } else {
        this.addLog('⚠️ No data in IndexedDB');
      }
    } catch (error) {
      this.addLog(`❌ Error: ${error.message}`);
    }
  };

  handleViewLocalStorage = () => {
    const locale = getLocale() || 'en_IN';
    const data = getLocalizationLabels();

    if (data) {
      const parsed = JSON.parse(data);
      console.log('=== localStorage Localization Data ===');
      console.log(`Total entries: ${parsed.length}`);
      console.log('Sample entries:', parsed.slice(0, 5));
      console.log('Full data:', parsed);
      this.addLog(`✅ Check console for ${parsed.length} localStorage entries`);
    } else {
      this.addLog('⚠️ No data in localStorage');
    }
  };

  addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    this.setState(prev => ({
      logs: [`[${timestamp}] ${message}`, ...prev.logs.slice(0, 19)] // Keep last 20 logs
    }));
  };

  render() {
    const {
      indexedDBSupported,
      storageStats,
      localStorageSize,
      indexedDBSize,
      migrationStatus,
      logs
    } = this.state;

    const panelStyle = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      maxHeight: '600px',
      backgroundColor: '#ffffff',
      border: '2px solid #2196F3',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    };

    const headerStyle = {
      backgroundColor: '#2196F3',
      color: 'white',
      padding: '10px',
      fontWeight: 'bold',
      fontSize: '14px'
    };

    const contentStyle = {
      padding: '10px',
      overflowY: 'auto',
      flex: 1
    };

    const buttonStyle = {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px'
    };

    const dangerButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#f44336'
    };

    const statStyle = {
      padding: '8px',
      margin: '5px 0',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      borderLeft: '3px solid #2196F3'
    };

    const logStyle = {
      backgroundColor: '#f9f9f9',
      padding: '5px',
      margin: '2px 0',
      borderRadius: '3px',
      fontSize: '10px',
      wordBreak: 'break-word'
    };

    return (
      <div style={panelStyle}>
        <div style={headerStyle}>
          🔍 Localization Storage Debug Panel
        </div>

        <div style={contentStyle}>
          {/* Status */}
          <div style={statStyle}>
            <strong>IndexedDB Support:</strong> {indexedDBSupported ? '✅ Yes' : '❌ No'}
          </div>

          {/* Storage Stats */}
          <div style={statStyle}>
            <strong>localStorage:</strong> {(localStorageSize / 1024).toFixed(2)} KB
          </div>

          <div style={statStyle}>
            <strong>IndexedDB:</strong> {(indexedDBSize / 1024).toFixed(2)} KB
          </div>

          {storageStats && storageStats.supported && (
            <div style={statStyle}>
              <strong>Total Entries:</strong> {storageStats.totalEntries || 0}<br/>
              {storageStats.percentUsed && (
                <span><strong>Storage Used:</strong> {storageStats.percentUsed}%</span>
              )}
            </div>
          )}

          {/* Migration Status */}
          {migrationStatus && (
            <div style={{...statStyle, borderLeft: '3px solid #FF9800'}}>
              {migrationStatus}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '10px' }}>
            <button style={buttonStyle} onClick={this.handleMigration}>
              🔄 Migrate to IndexedDB
            </button>
            <button style={buttonStyle} onClick={this.handleViewIndexedDB}>
              🗄️ View IndexedDB
            </button>
            <button style={buttonStyle} onClick={this.handleViewLocalStorage}>
              💾 View localStorage
            </button>
            <button style={buttonStyle} onClick={this.loadStats}>
              🔃 Refresh Stats
            </button>
            <button style={dangerButtonStyle} onClick={this.handleClearIndexedDB}>
              🗑️ Clear IndexedDB
            </button>
          </div>

          {/* Logs */}
          <div style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
            <strong>Activity Log:</strong>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '5px' }}>
              {logs.map((log, index) => (
                <div key={index} style={logStyle}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocalizationDebugPanel;

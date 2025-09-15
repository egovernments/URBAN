#!/usr/bin/env node
/**
 * Script to update version.json with current build information
 * This should be run during the build process
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Get build information
const getBuildInfo = () => {
  const packageJson = require('../package.json');
  const buildTime = new Date().toISOString();
  const gitCommit = process.env.GIT_COMMIT || 
                   process.env.GITHUB_SHA || 
                   process.env.BUILD_ID || 
                   process.env.BUILD_NUMBER || 
                   'unknown';
  const buildId = crypto.createHash('md5').update(buildTime + gitCommit).digest('hex').substring(0, 8);
  
  return {
    version: packageJson.version,
    buildTime,
    buildId,
    gitCommit: gitCommit.substring(0, 7)
  };
};

// Update version.json files
const updateVersionFiles = () => {
  const buildInfo = getBuildInfo();
  
  // Update both public folder (for development) and build output (for production)
  const versionFiles = [
    path.join(__dirname, '../../public/version.json'),
    path.join(__dirname, '../build/version.json')
  ];
  
  versionFiles.forEach(filePath => {
    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write version file
      fs.writeFileSync(filePath, JSON.stringify(buildInfo, null, 2));
      console.log(`Updated version file: ${filePath}`);
    } catch (error) {
      console.error(`Error updating ${filePath}:`, error.message);
    }
  });
  
  // Also create a build-info.js file that can be imported
  const buildInfoJs = `// Auto-generated build information
window.DIGIT_UI_BUILD_INFO = ${JSON.stringify(buildInfo, null, 2)};
`;
  
  // Create app-version.js file for compatibility
  const appVersionJs = `// Manually maintained application version for cache busting
// Update this value before each build/deploy
window.DIGIT_UI_VERSION = "${buildInfo.version}";
`;
  
  const buildInfoFiles = [
    path.join(__dirname, '../../public/build-info.js'),
    path.join(__dirname, '../build/build-info.js')
  ];
  
  const appVersionFiles = [
    path.join(__dirname, '../../public/app-version.js'),
    path.join(__dirname, '../build/app-version.js')
  ];
  
  buildInfoFiles.forEach(filePath => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, buildInfoJs);
      console.log(`Updated build info: ${filePath}`);
    } catch (error) {
      console.error(`Error updating ${filePath}:`, error.message);
    }
  });
  
  appVersionFiles.forEach(filePath => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, appVersionJs);
      console.log(`Updated app version: ${filePath}`);
    } catch (error) {
      console.error(`Error updating ${filePath}:`, error.message);
    }
  });
  
  console.log('Build info:', buildInfo);
};

// Run the script
if (require.main === module) {
  updateVersionFiles();
}

module.exports = { getBuildInfo, updateVersionFiles };
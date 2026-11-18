const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const zipOutputProject = path.resolve(rootDir, 'godaddy-shrikhafinserv-deploy.zip');
const userHome = process.env.USERPROFILE || 'C:\\Users\\DELL';
const desktopPath = path.join(userHome, 'Desktop');
const zipOutputDesktop = path.join(desktopPath, 'godaddy-shrikhafinserv-deploy.zip');

console.log('--- Step 1: Building production bundle for GoDaddy (Root Domain /) ---');
execSync('npx webpack --mode production', { cwd: rootDir, stdio: 'inherit' });

console.log('--- Step 2: Verifying build outputs ---');
if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory was not created.');
  process.exit(1);
}

const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
if (indexContent.includes('/Shrikha_Finserv/')) {
  console.warn('Fixing paths from /Shrikha_Finserv/ to root / in dist/index.html...');
  const fixedContent = indexContent.replace(/\/Shrikha_Finserv\//g, '/');
  fs.writeFileSync(indexHtmlPath, fixedContent, 'utf8');
}

// Ensure .htaccess exists in dist
const htaccessPublic = path.join(rootDir, 'public', '.htaccess');
const htaccessDist = path.join(distDir, '.htaccess');
if (!fs.existsSync(htaccessDist) && fs.existsSync(htaccessPublic)) {
  fs.copyFileSync(htaccessPublic, htaccessDist);
}

// Ensure robots.txt exists in dist
const robotsPublic = path.join(rootDir, 'public', 'robots.txt');
const robotsDist = path.join(distDir, 'robots.txt');
if (!fs.existsSync(robotsDist) && fs.existsSync(robotsPublic)) {
  fs.copyFileSync(robotsPublic, robotsDist);
}

// Ensure sitemap.xml exists in dist
const sitemapPublic = path.join(rootDir, 'public', 'sitemap.xml');
const sitemapDist = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapDist) && fs.existsSync(sitemapPublic)) {
  fs.copyFileSync(sitemapPublic, sitemapDist);
}

// Sync index to root for testing
const rootIndex = path.join(rootDir, 'index.html');
fs.copyFileSync(indexHtmlPath, rootIndex);
const root404 = path.join(rootDir, '404.html');
fs.copyFileSync(indexHtmlPath, root404);

console.log('--- Step 3: Packaging with Linux-compatible forward-slash ZIP archive ---');
if (fs.existsSync(zipOutputProject)) {
  fs.unlinkSync(zipOutputProject);
}

const psScript = path.join(__dirname, 'create-clean-zip.ps1');
execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScript}" -SourceDir "${distDir}" -ZipFilePath "${zipOutputProject}"`, { stdio: 'inherit' });

console.log(`Successfully created ZIP archive: ${zipOutputProject}`);

// Copy to Desktop if Desktop exists
if (fs.existsSync(desktopPath)) {
  try {
    fs.copyFileSync(zipOutputProject, zipOutputDesktop);
    console.log(`Copied ZIP to Desktop: ${zipOutputDesktop}`);
  } catch (copyErr) {
    console.warn('Could not copy to Desktop directly:', copyErr.message);
  }
}

console.log('\n======================================================');
console.log('  GODADDY DEPLOYMENT PACKAGE IS READY!');
console.log('======================================================');

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
  console.warn('Warning: index.html still contains /Shrikha_Finserv/. Fixing paths to root /...');
  const fixedContent = indexContent.replace(/\/Shrikha_Finserv\//g, '/');
  fs.writeFileSync(indexHtmlPath, fixedContent, 'utf8');
}

// Ensure .htaccess exists in dist
const htaccessPublic = path.join(rootDir, 'public', '.htaccess');
const htaccessDist = path.join(distDir, '.htaccess');
if (!fs.existsSync(htaccessDist) && fs.existsSync(htaccessPublic)) {
  fs.copyFileSync(htaccessPublic, htaccessDist);
  console.log('Copied .htaccess to dist.');
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

// Also sync to root for compatibility
const rootIndex = path.join(rootDir, 'index.html');
fs.copyFileSync(indexHtmlPath, rootIndex);
const root404 = path.join(rootDir, '404.html');
fs.copyFileSync(indexHtmlPath, root404);

console.log('--- Step 3: Creating GoDaddy deployment ZIP archive ---');
if (fs.existsSync(zipOutputProject)) {
  fs.unlinkSync(zipOutputProject);
}

// Use PowerShell Compress-Archive to package files directly at root of ZIP
const powershellCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${distDir}', '${zipOutputProject}')"`;
execSync(powershellCmd, { stdio: 'inherit' });

console.log(`Successfully created ZIP archive: ${zipOutputProject}`);

// Copy to Desktop if Desktop exists
if (fs.existsSync(desktopPath)) {
  try {
    fs.copyFileSync(zipOutputProject, zipOutputDesktop);
    console.log(`Also copied ZIP to Desktop for easy access: ${zipOutputDesktop}`);
  } catch (copyErr) {
    console.warn('Could not copy to Desktop directly:', copyErr.message);
  }
}

console.log('\n======================================================');
console.log('  GODADDY DEPLOYMENT PACKAGE IS READY!');
console.log('======================================================');
console.log('Zip file location:');
console.log('  1) ' + zipOutputProject);
if (fs.existsSync(zipOutputDesktop)) {
  console.log('  2) ' + zipOutputDesktop + ' (Directly on your Desktop!)');
}
console.log('\nHow to upload to GoDaddy:');
console.log('  1. Log into your GoDaddy account and open cPanel.');
console.log('  2. Click "File Manager" and open the "public_html" folder.');
console.log('  3. Click "Upload" and choose godaddy-shrikhafinserv-deploy.zip.');
console.log('  4. Right-click the zip file in public_html and click "Extract".');
console.log('  5. Done! Your site is live.');

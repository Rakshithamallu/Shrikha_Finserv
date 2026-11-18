const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  if (fs.existsSync(distDir)) {
    // 1. Copy index.html and create 404.html for GitHub Pages SPA routing
    const distIndex = path.join(distDir, 'index.html');
    if (fs.existsSync(distIndex)) {
      fs.copyFileSync(distIndex, path.join(rootDir, 'index.html'));
      fs.copyFileSync(distIndex, path.join(rootDir, '404.html'));
      console.log('Successfully synced index.html and 404.html to root.');
    }

    // 2. Sync static folder
    const distStatic = path.join(distDir, 'static');
    if (fs.existsSync(distStatic)) {
      copyFolderSync(distStatic, path.join(rootDir, 'static'));
      console.log('Successfully synced static assets to root.');
    }

    // 3. Sync assets folder
    const distAssets = path.join(distDir, 'assets');
    if (fs.existsSync(distAssets)) {
      copyFolderSync(distAssets, path.join(rootDir, 'assets'));
      console.log('Successfully synced public assets to root.');
    }

    // 4. Sync favicon.ico
    const distFavicon = path.join(distDir, 'favicon.ico');
    if (fs.existsSync(distFavicon)) {
      fs.copyFileSync(distFavicon, path.join(rootDir, 'favicon.ico'));
    }
  }
} catch (err) {
  console.error('Error syncing dist to root:', err);
}

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const tempDir = path.join(os.tmpdir(), 'shrikha-dist-deploy');

const minGit = `${process.env.LOCALAPPDATA}\\MinGit\\cmd\\git.exe`;
const gitCmd = fs.existsSync(minGit) ? `"${minGit}"` : 'git';
const token = process.env.GITHUB_TOKEN;
const authUrl = token ? `https://${token}@github.com/Rakshithamallu/Shrikha_Finserv.git` : 'origin';

console.log('1. Copying dist to temp directory:', tempDir);
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.cpSync(distDir, tempDir, { recursive: true });

console.log('2. Fetching and checking out gh-pages branch');
execSync(`${gitCmd} fetch origin gh-pages`, { cwd: rootDir, stdio: 'inherit' });
execSync(`${gitCmd} checkout -B gh-pages origin/gh-pages`, { cwd: rootDir, stdio: 'inherit' });

console.log('3. Cleaning old gh-pages files');
const items = fs.readdirSync(rootDir);
for (const item of items) {
  if (item === '.git' || item === 'node_modules') continue;
  fs.rmSync(path.join(rootDir, item), { recursive: true, force: true });
}

console.log('4. Copying updated dist files to gh-pages root');
fs.cpSync(tempDir, rootDir, { recursive: true });

// Ensure CNAME exists and contains shrikhafinserv.com
fs.writeFileSync(path.join(rootDir, 'CNAME'), 'shrikhafinserv.com\n', 'utf8');

// Ensure .nojekyll exists
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

// Ensure .gitignore exists on gh-pages to exclude node_modules
fs.writeFileSync(path.join(rootDir, '.gitignore'), 'node_modules\ndist\n*.zip\n*.log\n', 'utf8');

console.log('5. Staging and committing to gh-pages');
execSync(`${gitCmd} add -A`, { cwd: rootDir, stdio: 'inherit' });
try {
  execSync(`${gitCmd} commit -m "Deploy production build with WhatsApp 8792953082 and success popup modal"`, { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.log('Nothing new to commit or already committed.');
}

console.log('6. Pushing to origin/gh-pages');
execSync(`${gitCmd} push ${authUrl} gh-pages`, { cwd: rootDir, stdio: 'inherit' });

console.log('7. Switching back to main branch');
execSync(`${gitCmd} checkout main`, { cwd: rootDir, stdio: 'inherit' });

console.log('Successfully deployed latest production build to gh-pages!');

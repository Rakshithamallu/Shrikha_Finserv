/**
 * Helper to resolve static asset paths correctly across both local dev and GitHub Pages hosting.
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // 1. Injected at build time by Webpack DefinePlugin
  let base = process.env.PUBLIC_URL || '';

  // 2. Runtime fallback for GitHub Pages repository subpath
  if (!base && typeof window !== 'undefined' && window.location && window.location.pathname) {
    if (window.location.pathname.toLowerCase().includes('shrikha_finserv')) {
      base = '/Shrikha_Finserv';
    }
  }

  base = base.replace(/\/+$/, '');
  return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
};

export default getAssetPath;

/**
 * Helper to resolve static asset paths correctly across both local dev and GitHub Pages hosting.
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const publicUrl = typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL !== undefined
    ? process.env.PUBLIC_URL
    : '/Shrikha_Finserv';

  return `${publicUrl}/${cleanPath}`;
};

export default getAssetPath;

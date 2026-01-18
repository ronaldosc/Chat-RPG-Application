import { isSafeNavigationPath } from './validateNavigation';

/**
 * Encodes URL paths for safe navigation.
 * 
 * Security: Validates each path segment to prevent CVE-2025-68470 vulnerability.
 * Rejects absolute URLs and dangerous protocols that could cause external redirects.
 * 
 * @param URLPaths - Array of path segments to encode
 * @returns Encoded URL path starting with /
 * @throws Error if any path segment is unsafe
 */
export const encodeURL = (URLPaths: (string | number | undefined | null)[]) => {
  const validatedPaths = URLPaths.map((path) => {
    const pathStr = String(path);
    
    // Security validation: Use centralized validation to prevent CVE-2025-68470
    if (!isSafeNavigationPath(pathStr)) {
      throw new Error('External navigation paths are not allowed');
    }
    
    return pathStr.replace(/[/]/g, '&sol;').replace(/[?]/g, '&quest;');
  }).filter((path) => path !== '');
  
  return `/${validatedPaths.join('/')}`;
};

export const decodeURL = (url: string | undefined) => {
  const path = url?.replace(/&sol;/g, '/').replace(/&quest;/g, '?');
  return `${path}`;
};

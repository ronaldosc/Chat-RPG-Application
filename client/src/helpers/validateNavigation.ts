/**
 * Security validation helpers for navigation paths.
 * 
 * These functions help prevent CVE-2025-68470 (GHSA-9jcx-v3wj-wh4m) vulnerability
 * in React Router that allows unintended external redirects through untrusted paths.
 * 
 * Reference: Issue #55, Dependabot alerts #106 and #107
 */

/**
 * Validates if a navigation path is safe (internal to the application).
 * 
 * Blocks:
 * - Absolute URLs (http://, https://, //)
 * - Dangerous protocols (javascript:, data:, vbscript:, file:)
 * - Any path containing :// (protocol separator)
 * 
 * Example malicious payloads that are blocked:
 * - "https://evil.com"
 * - "//evil.com"
 * - "javascript:alert(1)"
 * - "data:text/html,<script>alert(1)</script>"
 * 
 * @param path - Path to be validated
 * @returns true if the path is safe, false otherwise
 */
export const isSafeNavigationPath = (path: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  
  // Reject absolute URLs (starting with http://, https://, or //)
  if (path.match(/^(https?:)?\/\//i)) {
    console.error('[Security] Blocked absolute URL navigation attempt:', path);
    return false;
  }
  
  // Reject dangerous protocols
  if (path.match(/^(javascript|data|vbscript|file):/i)) {
    console.error('[Security] Blocked dangerous protocol navigation attempt:', path);
    return false;
  }
  
  // Reject any path containing :// (generic protocol separator)
  if (path.includes('://')) {
    console.error('[Security] Blocked external navigation attempt:', path);
    return false;
  }
  
  return true;
};

/**
 * Validates if a string is a valid MongoDB ObjectId format.
 * 
 * MongoDB ObjectIds are 24-character hexadecimal strings.
 * This validation prevents injection of malicious paths in ID parameters.
 * 
 * @param id - ID string to validate
 * @returns true if valid ObjectId format, false otherwise
 */
export const isValidObjectId = (id: string | undefined): boolean => {
  if (!id || typeof id !== 'string') return false;
  return /^[a-f\d]{24}$/i.test(id);
};

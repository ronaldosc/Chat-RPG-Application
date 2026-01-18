import RateLimit from 'express-rate-limit';

/**
 * Rate limiter for authentication endpoints (login, signup)
 * Strict limits to prevent brute force attacks and account enumeration
 * - 5 requests per 15 minutes per IP
 */
export const authRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Rate limiter for logout endpoint
 * More lenient than login since it's less prone to abuse
 * - 10 requests per 15 minutes per IP
 */
export const logoutRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many logout attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for content creation endpoints (posts, comments, messages)
 * Prevents spam and abuse while allowing legitimate use
 * - 30 requests per 15 minutes per IP
 */
export const contentCreationRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many content creation requests, please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for user action endpoints (likes, joins, deletes)
 * Moderate limits to prevent manipulation and abuse
 * - 50 requests per 15 minutes per IP
 */
export const userActionRateLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many actions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

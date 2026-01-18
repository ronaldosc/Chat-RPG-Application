import { rateLimit } from 'express-rate-limit';

/**
 * Rate limiter for authentication endpoints (login, signup)
 * Strict limits to prevent brute force attacks and account enumeration
 * - 5 requests per 15 minutes per IP
 */
export const authRateLimiter = rateLimit({
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
export const logoutRateLimiter = rateLimit({
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
export const contentCreationRateLimiter = rateLimit({
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
export const userActionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many actions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for read-only GET endpoints (fetching data)
 * Prevents excessive data scraping and enumeration attacks
 * More lenient than write operations but still controlled
 * - 100 requests per 15 minutes per IP
 * 
 * References:
 * - OWASP API Security Top 10 (API4:2023 - Unrestricted Resource Consumption)
 * - CWE-770: Allocation of Resources Without Limits or Throttling
 */
export const readRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

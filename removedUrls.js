import SEO_DATA from './src/seoData.js';

// Keep the page check aligned with the site's published SEO routes.
const PAGE_PATHS = new Set([...Object.keys(SEO_DATA), '/login', '/admin']);

// 301 Permanent Redirects for old WordPress / PHP website paths to new React routes
export const LEGACY_REDIRECTS = {
  // Index & Home duplicates
  '/index.html': '/',
  '/index.php': '/',
  '/index': '/',
  '/home': '/',
  '/visas': '/',
  '/story': '/',
  '/pay-online': '/contact',

  // Policies & Company
  '/about-us': '/about',
  '/refund-policy': '/policies/refund-policy',
  '/terms': '/policies/terms-of-service',

  // Citizenship programs
  '/citizenship-by-investment-cbi': '/citizenship',
  '/antigua-and-barbuda-citizenship-by-investment': '/citizenship/antigua-barbuda',
  '/st-kitts-and-nevis-citizenship-by-investment': '/citizenship/st-kitts-nevis',
  '/malta-citizenship-by-investment': '/citizenship/malta',

  // Residency programs
  '/latvia-golden-visa-investment-program': '/residency/latvia',

  // PR & Visas
  '/canada-immigration/canada-express-entry': '/pr/canada',
  '/canada-permanent-residency-visa': '/pr/canada',
  '/canada-startup-visa': '/pr/canada',
  '/quebec-immigrant-investor-program-3': '/pr/canada',
  '/ontario-immigrant-nominee-program': '/pr/canada',
  '/students-visa-for-canada': '/services/study-visas',
  '/tourist-visa': '/services/business-visas',
  '/australia-permanent-residency-visa': '/pr/australia',
  '/australia-immigration': '/pr/australia',
  '/australia-immigration/australia-partner-visa-subclass-309-100': '/pr/australia',
  '/australia-immigration/australia-skilled-independent-visa': '/pr/australia',
  '/australia-immigration/australia-skilled-nominated-visa': '/pr/australia',
  '/australia-immigration/australia-skilled-regional-provisional-visa': '/pr/australia',
  '/subclass-491': '/pr/australia',
  '/regional-sponsored-migration-scheme-subclass-187': '/pr/australia',
  '/child-visa-subclass-802-101-and-contributory-parent-visa': '/pr/australia',

  // Coaching
  '/coachings/job-assistance': '/other-services',
  '/coachings/case-refusal-and-refilling': '/other-services',
  '/coachings': '/other-services',
};

export function getLegacyRedirect(pathname) {
  try {
    const raw = decodeURIComponent(pathname).toLowerCase().replace(/\/+$/, '') || '/';
    return LEGACY_REDIRECTS[raw] || null;
  } catch {
    return null;
  }
}

export function isLegacyWordPressPath(pathname) {
  try {
    const p = decodeURIComponent(pathname).toLowerCase();
    return (
      p.startsWith('/wp-admin') ||
      p.startsWith('/wp-content') ||
      p.startsWith('/wp-includes') ||
      p.startsWith('/wp-json') ||
      p.startsWith('/comments') ||
      p.startsWith('/author') ||
      p.startsWith('/cdn-cgi') ||
      /\.php($|\?)/i.test(p) ||
      p.includes('wp-login') ||
      p.includes('admin-ajax')
    );
  } catch {
    return false;
  }
}

export function normalizePagePath(pathname) {
  try {
    const path = decodeURIComponent(pathname).toLowerCase().replace(/\/+$/, '') || '/';
    return path === '/license' ? '/licenses' : path;
  } catch {
    return null;
  }
}

export function isKnownPage(pathname) {
  return PAGE_PATHS.has(normalizePagePath(pathname));
}

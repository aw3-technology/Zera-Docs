/**
 * Central data registry
 * Import categories and articles from their individual files and export
 * unified arrays that localData.ts consumes.
 *
 * To add content:
 *   1. Create a file in src/data/categories/ or src/data/articles/<category>/
 *   2. Import and add it to the arrays below
 */

// ─── Categories ──────────────────────────────────────────────────────────────
import { gettingStartedCategory } from './categories/getting-started';
import { componentsCategory } from './categories/components';
import { guidesCategory } from './categories/guides';
import { apiReferenceCategory } from './categories/api-reference';
import { troubleshootingCategory } from './categories/troubleshooting';

export const categories = [
  gettingStartedCategory,
  componentsCategory,
  guidesCategory,
  apiReferenceCategory,
  troubleshootingCategory,
];

// ─── Articles: Getting Started ────────────────────────────────────────────────
import { welcomeArticle } from './articles/getting-started/welcome';
import { installationArticle } from './articles/getting-started/installation';
import { quickStartArticle } from './articles/getting-started/quick-start';

// ─── Articles: Template Components ───────────────────────────────────────────
import { componentsOverviewArticle } from './articles/components/overview';
import { heroBlockArticle } from './articles/components/hero-block';
import { textBlockArticle } from './articles/components/text-block';
import { codeBlockArticle } from './articles/components/code-block';
import { ctaBlockArticle } from './articles/components/cta-block';
import { faqBlockArticle } from './articles/components/faq-block';
import { sidebarBlockArticle } from './articles/components/sidebar-block';
import { searchBlockArticle } from './articles/components/search-block';

// ─── Articles: Guides ─────────────────────────────────────────────────────────
import { configurationArticle } from './articles/guides/configuration';
import { themingArticle } from './articles/guides/theming';
import { addingContentArticle } from './articles/guides/adding-content';

// ─── Articles: API Reference ──────────────────────────────────────────────────
import { apiIntroductionArticle } from './articles/api-reference/introduction';
import { apiAuthenticationArticle } from './articles/api-reference/authentication';

// ─── Articles: Troubleshooting ────────────────────────────────────────────────
import { commonErrorsArticle } from './articles/troubleshooting/common-errors';
import { performanceArticle } from './articles/troubleshooting/performance';

export const articles = [
  // Getting Started
  welcomeArticle,
  installationArticle,
  quickStartArticle,
  // Template Components
  componentsOverviewArticle,
  heroBlockArticle,
  textBlockArticle,
  codeBlockArticle,
  ctaBlockArticle,
  faqBlockArticle,
  sidebarBlockArticle,
  searchBlockArticle,
  // Guides
  configurationArticle,
  themingArticle,
  addingContentArticle,
  // API Reference
  apiIntroductionArticle,
  apiAuthenticationArticle,
  // Troubleshooting
  commonErrorsArticle,
  performanceArticle,
];

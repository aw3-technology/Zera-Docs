/**
 * Central data registry — ZERA Network Documentation
 * Import categories, articles, and folders from their individual files.
 * localData.ts consumes these exports.
 */

// ─── Folders ──────────────────────────────────────────────────────────────────
export { folders } from './folders';

// ─── Categories ──────────────────────────────────────────────────────────────
import { gettingStartedCategory } from './categories/getting-started';
import { governanceCategory } from './categories/governance';
import { treasuryCategory } from './categories/treasury';
import { decentralizationCategory } from './categories/decentralization';
import { regulatoryResilienceCategory } from './categories/regulatory-resilience';
import { technologyCategory } from './categories/technology';
import { aceCategory } from './categories/ace';
import { legalCategory } from './categories/legal';
import { tokenomicsCategory } from './categories/tokenomics';
import { forTokensCategory } from './categories/for-tokens';
import { programsCategory } from './categories/programs';
import { developersCategory } from './categories/developers';
import { daoCategory } from './categories/dao';
import { institutionsCategory } from './categories/institutions';
import { visionCategory } from './categories/vision';
import { compareCategory } from './categories/compare';
import { blogCategory } from './categories/blog';
import { goSdkCategory } from './categories/go-sdk';

export const categories = [
  gettingStartedCategory,
  governanceCategory,
  treasuryCategory,
  decentralizationCategory,
  regulatoryResilienceCategory,
  technologyCategory,
  aceCategory,
  legalCategory,
  tokenomicsCategory,
  forTokensCategory,
  programsCategory,
  developersCategory,
  daoCategory,
  institutionsCategory,
  visionCategory,
  compareCategory,
  blogCategory,
  goSdkCategory,
];

// ─── Articles: Getting Started ────────────────────────────────────────────────
import { whatIsZeraArticle } from './articles/getting-started/what-is-zera';
import { zeraOverviewArticle } from './articles/getting-started/zera-overview';
import { gettingStartedArticle } from './articles/getting-started/getting-started';

// ─── Articles: Governance ─────────────────────────────────────────────────────
import { governanceOverviewArticle } from './articles/governance/governance-overview';
import { lifecycleModelsArticle } from './articles/governance/lifecycle-models';
import { protocolUpgradesArticle } from './articles/governance/protocol-upgrades';
import { iitBackgroundArticle } from './articles/governance/iit-background';
import { zmtBackgroundArticle } from './articles/governance/zmt-background';
import { zipBackgroundArticle } from './articles/governance/zip-background';

// ─── Articles: Treasury ───────────────────────────────────────────────────────
import { treasuryOverviewArticle } from './articles/treasury/treasury-overview';
import { fundingSourcesArticle } from './articles/treasury/funding-sources';
import { fundingWhatMattersArticle } from './articles/treasury/funding-what-matters';
import { bitcoinVsZeraArticle } from './articles/treasury/bitcoin-vs-zera';
import { treasuryDiversificationArticle } from './articles/treasury/treasury-diversification';

// ─── Articles: Decentralization & Autonomy ────────────────────────────────────
import { decentralizationOverviewArticle } from './articles/decentralization/decentralization-overview';

// ─── Articles: Regulatory Resilience ──────────────────────────────────────────
import { regulatoryResilienceOverviewArticle } from './articles/regulatory-resilience/regulatory-resilience-overview';

// ─── Articles: Technology ─────────────────────────────────────────────────────
import { technologyOverviewArticle } from './articles/technology/technology-overview';
import { smartContractsOverviewArticle } from './articles/technology/smart-contracts-overview';
import { techStackOverviewArticle } from './articles/technology/tech-stack-overview';
import { feesOverviewArticle } from './articles/technology/fees-overview';
import { bridgesOverviewArticle } from './articles/technology/bridges-overview';

// ─── Articles: ACE ────────────────────────────────────────────────────────────
import { aceOverviewArticle } from './articles/ace/ace-overview';

// ─── Articles: Legal ─────────────────────────────────────────────────────────
import { termsOfServiceArticle } from './articles/legal/terms-of-service';
import { privacyPolicyArticle } from './articles/legal/privacy-policy';
import { disclaimerArticle } from './articles/legal/disclaimer';
import { recognitionDisclaimerArticle } from './articles/legal/recognition-disclaimer';

// ─── Articles: Tokenomics ─────────────────────────────────────────────────────
import { zraOverviewArticle } from './articles/tokenomics/zra-overview';
import { aceIntegrationArticle } from './articles/tokenomics/ace-integration';
import { supplyManagementArticle } from './articles/tokenomics/supply-management';
import { feeStructureArticle } from './articles/tokenomics/fee-structure';
import { howToBuyWzraArticle } from './articles/tokenomics/how-to-buy-wzra';
import { tokenBenefitsArticle } from './articles/tokenomics/token-benefits';

// ─── Articles: Why Tokens Come to ZERA ────────────────────────────────────────
import { forTokensOverviewArticle } from './articles/for-tokens/for-tokens-overview';

// ─── Articles: Programs ───────────────────────────────────────────────────────
import { programsOverviewArticle } from './articles/programs/programs-overview';

// ─── Articles: Developers ─────────────────────────────────────────────────────
import { whyBuildOnZeraArticle } from './articles/developers/why-build-on-zera';
import { smartContractsArticle } from './articles/developers/smart-contracts';
import { smartContractEngineArticle } from './articles/developers/smart-contract-engine';
import { developerPathwaysArticle } from './articles/developers/developer-pathways';
import { interoperabilityArticle } from './articles/developers/interoperability';
import { sdkArchitectureArticle } from './articles/developers/sdk-architecture';
import { sdkModulesArticle } from './articles/developers/sdk-modules';
import { sdkInternalsArticle } from './articles/developers/sdk-internals';
import { buildingWithZerajsArticle } from './articles/developers/building-with-zerajs';

// ─── Articles: DAOs ───────────────────────────────────────────────────────────
import { daoOverviewArticle } from './articles/dao/dao-overview';

// ─── Articles: Institutions ───────────────────────────────────────────────────
import { institutionsOverviewArticle } from './articles/institutions/institutions-overview';

// ─── Articles: Vision ─────────────────────────────────────────────────────────
import { visionOverviewArticle } from './articles/vision/vision-overview';
import { visionDemocracyArticle } from './articles/vision/vision-democracy';

// ─── Articles: Compare ────────────────────────────────────────────────────────
import { compareOverviewArticle } from './articles/compare/compare-overview';

// ─── Articles: Go SDK ────────────────────────────────────────────────────────
import { goSdkOverviewArticle } from './articles/go-sdk/overview';
import { goSdkCoreConceptsArticle } from './articles/go-sdk/core-concepts';
import { goSdkWalletAndHelpersArticle } from './articles/go-sdk/wallet-and-helpers';
import { goSdkTransactionsArticle } from './articles/go-sdk/transactions';
import { goSdkContractsArticle } from './articles/go-sdk/contracts';
import { goSdkExamplesArticle } from './articles/go-sdk/examples-and-errors';

// ─── Articles: Blog ───────────────────────────────────────────────────────────
import { zeraForDummiesArticle } from './articles/blog/zera-for-dummies';
import { zeraExplainedArticle } from './articles/blog/zera-explained';
import { decentralizationByDesignArticle } from './articles/blog/decentralization-by-design';
import { tokenomicsBackgroundArticle } from './articles/blog/tokenomics-background';
import { zeraVsSolanaArticle } from './articles/blog/zera-vs-solana';
import { zeraNetworkBackgroundArticle } from './articles/blog/zera-network-background';
import { corePrinciplesOverviewArticle } from './articles/blog/core-principles-overview';
import { governanceDesignPrinciplesArticle } from './articles/blog/governance-design-principles';
import { marketingSwotAnalysisArticle } from './articles/blog/marketing-swot-analysis';

export const articles = [
  // Getting Started
  whatIsZeraArticle,
  zeraOverviewArticle,
  gettingStartedArticle,
  // Governance
  governanceOverviewArticle,
  lifecycleModelsArticle,
  protocolUpgradesArticle,
  iitBackgroundArticle,
  zmtBackgroundArticle,
  zipBackgroundArticle,
  // Treasury
  treasuryOverviewArticle,
  fundingSourcesArticle,
  fundingWhatMattersArticle,
  bitcoinVsZeraArticle,
  treasuryDiversificationArticle,
  // Decentralization & Autonomy
  decentralizationOverviewArticle,
  // Regulatory Resilience
  regulatoryResilienceOverviewArticle,
  // Technology
  technologyOverviewArticle,
  smartContractsOverviewArticle,
  techStackOverviewArticle,
  feesOverviewArticle,
  bridgesOverviewArticle,
  // ACE
  aceOverviewArticle,
  // Legal
  termsOfServiceArticle,
  privacyPolicyArticle,
  disclaimerArticle,
  recognitionDisclaimerArticle,
  // Tokenomics
  zraOverviewArticle,
  aceIntegrationArticle,
  supplyManagementArticle,
  feeStructureArticle,
  howToBuyWzraArticle,
  tokenBenefitsArticle,
  // Why Tokens Come to ZERA
  forTokensOverviewArticle,
  // Programs
  programsOverviewArticle,
  // Developers
  whyBuildOnZeraArticle,
  smartContractsArticle,
  smartContractEngineArticle,
  developerPathwaysArticle,
  interoperabilityArticle,
  sdkArchitectureArticle,
  sdkModulesArticle,
  sdkInternalsArticle,
  buildingWithZerajsArticle,
  // DAOs
  daoOverviewArticle,
  // Institutions
  institutionsOverviewArticle,
  // Vision
  visionOverviewArticle,
  visionDemocracyArticle,
  // Compare
  compareOverviewArticle,
  // Go SDK
  goSdkOverviewArticle,
  goSdkCoreConceptsArticle,
  goSdkWalletAndHelpersArticle,
  goSdkTransactionsArticle,
  goSdkContractsArticle,
  goSdkExamplesArticle,
  // Blog
  zeraForDummiesArticle,
  zeraExplainedArticle,
  decentralizationByDesignArticle,
  tokenomicsBackgroundArticle,
  zeraVsSolanaArticle,
  zeraNetworkBackgroundArticle,
  corePrinciplesOverviewArticle,
  governanceDesignPrinciplesArticle,
  marketingSwotAnalysisArticle,
];

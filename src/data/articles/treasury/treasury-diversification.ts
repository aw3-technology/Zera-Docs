import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, expandable } from '../../blocks';

export const treasuryDiversificationArticle = {
  id: 'treasury-diversification',
  title: 'Treasury Diversification',
  slug: 'treasury-diversification',
  excerpt: 'A background paper on how the ZERA Treasury can create yielding investments, diversify holdings, measure risk, and approach asset valuation.',
  category_id: 'treasury',
  is_published: true,
  display_order: 5,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([

    // ── I. Introduction ──────────────────────────────────────────────────────
    h2('Introduction'),
    p('This background paper addresses what the community can do with the ZERA Treasury to create yielding investments. As the Treasury builds up a significant amount of ZERA over time from network activities, two key issues emerge: how to allocate assets for yield, and how to address valuation of "Asset Backed" holdings including non-listed investments like Rubies.'),
    p('This paper covers the role of a Treasury in general, diversification strategies, measuring risks (Alpha and Beta), listed vs. non-listed investments, key community questions, a guide to Ruby valuations, and conclusions.'),

    divider(),

    // ── II. Treasury Role in General ─────────────────────────────────────────
    h2('Treasury Role in General'),
    p('The role of a treasury is to manage financial assets, liquidity, and risks to ensure financial stability and support long-term strategy. Key functions include cash and liquidity management, risk management, mitigating financial risks like foreign exchange exposure, managing banking and credit relationships, and overseeing investments. Treasury also ensures regulatory compliance and provides critical financial insights to guide strategic decision-making.'),

    h3('Core Functions'),

    expandable('Cash and Liquidity Management', 'The treasury ensures enough cash is available to pay employees, suppliers, and cover operational needs. It manages cash flow, forecasting, and accounts to maintain adequate liquidity.'),
    expandable('Financial Risk Management', 'The team identifies, monitors, and manages financial risks such as interest rate volatility, foreign currency fluctuations, and counterparty risk.'),
    expandable('Investment Management', 'Treasury invests excess cash in financial instruments to optimize returns while maintaining a low risk profile.'),
    expandable('Banking Relationships', 'Treasury builds and maintains strong relationships with banks and other financial institutions to secure financing and other financial services.'),
    expandable('Funding and Capital Markets', 'The department obtains the necessary funds for operations and long-term projects, which can involve borrowing from banks or issuing bonds in the capital markets.'),
    expandable('Regulatory Compliance', 'Treasury ensures adherence to financial regulations and handles the required financial reporting, promoting transparency with investors and stakeholders.'),

    h3('Strategic Importance'),
    bullet('Supports Strategy — Treasury aligns its financial tactics with long-term goals, providing critical insights for decision-making at the highest levels.'),
    bullet('Optimizes Capital — By managing cash, investments, and funding, treasury helps optimize capital structure and efficiency.'),
    bullet('Mitigates Threats — It acts as a crucial defense against financial uncertainties and market volatility, protecting assets and financial health.'),

    divider(),

    // ── III. Diversification of the ZERA Treasury ────────────────────────────
    h2('Diversification of the ZERA Treasury'),
    p('Diversification is essential for managing treasury risk and generating sustainable yield. Below are the primary strategies available to a crypto-native treasury.'),

    h3('Ways to Diversify'),

    numbered('Stablecoins — Hold a portion in stable assets (USDC, DAI, USDT, GHO, etc.) to reduce volatility and cover operational costs.'),
    numbered('Blue-chip crypto assets — Diversify into ETH, Solana, and other liquid, established assets for long-term growth and security.'),
    numbered('Yield-bearing assets — Allocate treasury funds to low-risk DeFi protocols (Aave, Compound, Maker, Lido staking, etc.) for passive income.'),
    numbered('Native token management — Avoid overexposure to your project\'s native token by strategically selling or using OTC deals to convert into other assets.'),
    numbered('Real-world assets (RWA) — Consider tokenized treasury bills, bonds, or other regulated RWAs for stable yield and diversification.'),
    numbered('Partnership allocations — Hold tokens of ecosystems you collaborate with (governance partners or infrastructure providers).'),
    numbered('Emergency reserves — Keep a liquidity buffer in highly liquid assets (ETH, stablecoins) for runway stability.'),

    callout('info', 'A balanced treasury allocation might look like: 40% stables (operations + safety), 30% ETH/Solana (blue-chip growth), 20% yield-bearing DeFi/RWA (passive income), 10% strategic assets/partnerships.'),

    divider(),

    // ── IV. Measuring Risks: Alpha and Beta ──────────────────────────────────
    h2('Measuring Risks: Alpha and Beta'),
    p('Understanding the difference between Alpha and Beta risk is critical for any treasury making investment decisions.'),

    h3('Beta Risk (Systematic Risk)'),
    p('Beta measures a portfolio\'s sensitivity to overall market movements (systematic risk). It cannot be diversified away since it\'s tied to macroeconomic, geopolitical, or systemic market events.'),
    bullet('β = 1 → portfolio moves in line with the market.'),
    bullet('β > 1 → portfolio is more volatile than the market (amplifies gains & losses).'),
    bullet('β < 1 → portfolio is less volatile than the market.'),
    bullet('β = 0 → portfolio is uncorrelated with market movements.'),
    bullet('Negative β → moves opposite to the market (e.g., gold sometimes).'),
    p('Management: Adjust exposure through diversification, hedging with derivatives, or asset allocation (e.g., bonds vs. equities).'),

    h3('Alpha Risk (Active Management Risk)'),
    p('Alpha is the excess return of a portfolio relative to its benchmark after adjusting for beta. Positive alpha means the portfolio manager added value; negative alpha means underperformance.'),
    bullet('Risk Source: Comes from active management decisions — security selection (stock picking), timing trades (market timing), and sector or style tilts.'),
    bullet('Alpha Risk = the risk that active bets do not pay off (manager underperforms after costs and risks).'),
    bullet('Management: Careful due diligence when selecting active managers, monitoring performance consistency, and balancing active vs. passive strategies.'),

    callout('note', 'In practice: Passive index funds → accept beta risk, avoid alpha risk. Active funds / hedge funds → take on both beta and alpha risks. Alpha shows excess returns, while Beta reveals how volatile an asset is compared to the market.'),

    divider(),

    // ── V. Listed vs Non-Listed Investments ──────────────────────────────────
    h2('Listed vs Non-Listed Investments'),

    tabs([
      {
        label: 'Listed Investments',
        body: 'Investments traded on a recognized exchange (e.g., stock exchange). They are publicly traded (shares, bonds, ETFs on NYSE, LSE, NSE), offer high liquidity, transparent real-time market pricing, strict regulatory disclosure, and are accessible to both retail and institutional investors. Examples: stocks of Apple, Infosys, ETFs, listed REITs, government securities.',
      },
      {
        label: 'Non-Listed Investments',
        body: 'Investments not traded on a public exchange. They are privately held, offer low liquidity (long lock-in periods, limited buyers), have complex valuations (negotiations, private appraisals), less regulation, and are often limited to accredited/institutional investors. Examples: private equity, venture capital, real estate, hedge funds, unlisted company shares, private debt.',
      },
    ]),

    h3('Key Differences'),
    bullet('Market: Listed = public exchange; Non-listed = private/off-market.'),
    bullet('Liquidity: Listed = high; Non-listed = low.'),
    bullet('Transparency: Listed = high (market price); Non-listed = low (private valuation).'),
    bullet('Regulation: Listed = strict; Non-listed = limited.'),
    bullet('Accessibility: Listed = open to all; Non-listed = mostly accredited/institutional.'),
    bullet('Risk/Return: Listed = generally moderate; Non-listed = potentially higher risk & return.'),

    callout('tips', 'In short: Listed = liquid, transparent, regulated, lower risk. Non-listed = illiquid, opaque, less regulated, higher potential returns (but higher risk).'),

    divider(),

    // ── VI. Key Questions for the ZERA Treasury ──────────────────────────────
    h2('Key Questions for the ZERA Treasury'),
    p('The community needs to decide on several fundamental questions regarding treasury management:'),

    numbered('Does the community want to diversify out of the ZERA held by the Treasury and exchange existing assets (e.g. Ruby\'s) for other investments?'),
    numbered('What diversification strategy do we want to adopt?'),
    numbered('Does the Treasury want to invest in only Alpha risk like tracker funds and ETFs, or is it willing to accept Beta risk?'),

    p('Another issue is the valuation of non-listed investments. The institutional fund management industry has adopted monthly/quarterly reporting of Net Asset Value (NAV), among others. This requires resources. Likewise, valuing other assets like Ruby\'s might be costly as well.'),

    divider(),

    // ── VII. Ruby Valuation Guide ────────────────────────────────────────────
    h2('Ruby Valuation Guide'),
    p('Rubies are one of the "Big Three" precious colored stones (alongside emerald and sapphire). Their value is determined by the 4Cs (color, clarity, cut, carat), plus origin and treatment.'),

    h3('1. Color (Most Important Factor)'),
    bullet('Pigeon Blood Red → Pure, vivid red with a hint of blue. Rarest and most expensive.'),
    bullet('Vivid Red / Crimson → Slightly lighter or darker than pigeon blood, still highly valuable.'),
    bullet('Pinkish Red / Orangish Red / Purplish Red → Lower value compared to pure red.'),
    bullet('Too dark or too light → Price drops significantly.'),
    callout('note', 'Rule: The more intense and pure the red, the higher the value.'),

    h3('2. Clarity'),
    bullet('Rubies naturally contain inclusions ("silk").'),
    bullet('Eye-clean rubies (no visible inclusions to the naked eye) are very rare and command premiums.'),
    bullet('Heavily included stones (cloudy, cracks, visible lines) = much lower value.'),

    h3('3. Cut'),
    bullet('Cut should maximize brilliance and color.'),
    bullet('Common cuts: oval, cushion, and round (rounds are rare).'),
    bullet('Poorly cut stones look dull and are discounted.'),

    h3('4. Carat Weight'),
    bullet('Rubies above 1 carat rise steeply in price per carat.'),
    bullet('Over 5 carats in fine quality are extremely rare and auction-level expensive.'),

    h3('5. Origin'),
    bullet('Myanmar (Burma): Most prized (especially Mogok region).'),
    bullet('Mozambique: Excellent modern source, very fine stones.'),
    bullet('Sri Lanka, Thailand, Vietnam: Good quality, but generally lower value than Burmese.'),

    h3('6. Treatment'),
    bullet('Untreated rubies → Rarest, highest price.'),
    bullet('Heat-treated rubies → Common; accepted in trade but valued lower than untreated.'),
    bullet('Fracture-filled or glass-filled rubies → Much cheaper, often only worth 5–10% of natural heated ruby prices.'),

    h3('Price Guide (2025 Market Approx.)'),
    p('Per Carat, Retail Range — actual prices vary by dealer/auction:'),

    tabs([
      {
        label: 'Commercial, treated',
        body: 'Small Stones (<1 ct): $100–$800 | 1–3 ct: $500–$2,000 | 3–5 ct: $1,500–$4,000 | 5+ ct: $3,000–$6,000',
      },
      {
        label: 'Fine, heated',
        body: 'Small Stones (<1 ct): $1,000–$3,000 | 1–3 ct: $2,000–$8,000 | 3–5 ct: $5,000–$12,000 | 5+ ct: $10,000–$25,000',
      },
      {
        label: 'Fine, untreated',
        body: 'Small Stones (<1 ct): $5,000–$15,000 | 1–3 ct: $8,000–$30,000 | 3–5 ct: $20,000–$50,000 | 5+ ct: $40,000–$100,000+',
      },
      {
        label: 'Top-tier Pigeon Blood',
        body: 'Burmese, untreated. Small Stones (<1 ct): $15,000–$30,000 | 1–3 ct: $30,000–$80,000 | 3–5 ct: $80,000–$150,000 | 5+ ct: $150,000–$500,000+',
      },
    ]),

    h3('7. Certificates'),
    p('Always check if the ruby has a gemological report (e.g., GIA, SSEF, AGL). These certify origin, authenticity, and whether it has been treated.'),

    divider(),

    // ── VIII. Conclusion ─────────────────────────────────────────────────────
    h2('Conclusion'),
    p('The ZERA community needs to address how it wants to deal with the ZERA Treasury. Diversifying away from Ruby\'s (or leveraging them) and the Treasury-held ZERA coins (partial diversification?) seems inevitable for the Treasury if it wants to produce yielding assets with the lowest possible risk profile for a given asset class.'),
    callout('info', 'The key decisions around diversification strategy, risk appetite, and asset valuation methodology will shape the Treasury\'s ability to generate sustainable returns for the community.'),

  ]),
};

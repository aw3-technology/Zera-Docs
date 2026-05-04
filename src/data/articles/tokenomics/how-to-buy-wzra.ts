import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, step, expandable } from '../../blocks';

export const howToBuyWzraArticle = {
  id: 'how-to-buy-wzra',
  title: 'How to Buy wZRA',
  slug: 'how-to-buy-wzra',
  excerpt: 'Step-by-step guide to buying wZRA — from setting up a wallet to swapping on Raydium. Works even if you\'ve never touched crypto before.',
  category_id: 'tokenomics',
  is_published: true,
  display_order: 5,
  sidebar_title: 'How to Buy wZRA' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('wZRA is the native token of the ZERA Network — a blockchain where community votes execute automatically. Here\'s how to buy it, even if you\'ve never touched crypto before.'),

    callout('info', 'wZRA is the wrapped version of ZRA on the Solana blockchain. Each wZRA is backed 1:1 by a real ZRA token on the ZERA Network.'),

    divider(),

    // ─── Step 1: Get a Wallet ──────────────────────────────────────────────────
    h2('Step 1 — Get a Wallet'),
    p('A crypto wallet is an app that holds your tokens — think of it like a bank account app, except only you hold the password and nobody can freeze your funds. Because wZRA lives on the Solana blockchain, you need a Solana-compatible wallet.'),

    cardGroup(2, [
      {
        icon: 'hugeicons:wallet-03',
        title: 'Vision Hub (Recommended)',
        body: 'The wallet built specifically for the ZERA ecosystem. Native ZERA Bridge, built-in governance voting, Swiss privacy, and multi-chain swaps. Available on iOS and Android.',
        href: 'https://visionhub.app',
      },
      {
        icon: 'hugeicons:global',
        title: 'Phantom (Alternative)',
        body: 'A widely-used Solana wallet with a clean interface. Good if you already have it installed or prefer a browser extension. Available on Chrome, Firefox, Brave, iOS, and Android.',
        href: 'https://phantom.app',
      },
    ]),

    h3('Why Vision Hub?'),
    bullet('Native ZERA Bridge — move tokens directly between the ZERA Network and Solana without a third-party bridge.'),
    bullet('Governance built-in — vote on ZERA proposals directly from your wallet.'),
    bullet('Swiss privacy — fully self-custodial. Private keys never leave your device. Operates under Swiss law.'),
    bullet('Multi-chain swaps — swap tokens across decentralised networks natively within the app.'),

    callout('warning', 'Write down your seed phrase. When you create any wallet, you\'ll be given a 12- or 24-word recovery phrase. Write it on paper and store it somewhere safe and offline. This is the only way to recover your wallet if your device is lost or broken. Never share it with anyone — ever.'),

    divider(),

    // ─── Step 2: Buy SOL or USDC ───────────────────────────────────────────────
    h2('Step 2 — Buy SOL or USDC on an Exchange'),
    p('To buy wZRA, you\'ll swap either SOL (Solana\'s currency) or USDC (a dollar-pegged stablecoin) for wZRA on Raydium. You buy SOL or USDC using regular money on a centralised exchange — the same way you\'d buy currency at a bureau de change.'),

    callout('tips', 'wZRA is paired with USDC on Raydium, so buying USDC is the most direct route. You can also buy SOL and swap it for USDC on Raydium first if your exchange doesn\'t offer USDC withdrawals to Solana.'),

    h3('Choose an Exchange'),
    cardGroup(2, [
      {
        icon: 'hugeicons:shield-01',
        title: 'Coinbase — Best for USA Beginners',
        body: 'Publicly traded, US-regulated. Easiest interface. Accepts bank transfer, debit card, PayPal. Slightly higher fees but very beginner-friendly.',
        href: 'https://coinbase.com',
      },
      {
        icon: 'hugeicons:security',
        title: 'Kraken — Best All-Round Option',
        body: 'Low fees, strong security (never hacked since 2011). Accepts credit/debit card, bank transfer. Available in most countries.',
        href: 'https://kraken.com',
      },
      {
        icon: 'hugeicons:coins-01',
        title: 'Binance — Lowest Fees Globally',
        body: 'World\'s largest exchange. Accepts card and bank transfer. Very low fees. Check availability in your country — not available in all US states.',
        href: 'https://binance.com',
      },
      {
        icon: 'hugeicons:globe-02',
        title: 'KuCoin — Wide Altcoin Selection',
        body: 'Large variety of tokens. Good option if Binance isn\'t available in your region. Credit card and bank transfers supported.',
        href: 'https://kucoin.com',
      },
    ]),

    step(1, 'Create and verify your account', 'Sign up with your email. You\'ll need to verify your identity (photo ID) — this is standard and required by law. Takes 5–15 minutes.'),
    step(2, 'Add a payment method', 'Connect a debit card, bank account, or use Apple/Google Pay where available. Bank transfers are cheaper; cards are faster.'),
    step(3, 'Buy USDC on the Solana network (recommended)', 'Search for USDC. Make sure you select Solana network when purchasing — not Ethereum. Buy slightly more than you want to spend on wZRA to cover small network fees (a few cents).'),
    step(4, 'Or buy SOL instead', 'If USDC on Solana isn\'t available on your exchange, buy SOL instead. You\'ll swap it for USDC (or directly for wZRA) once it\'s in your wallet.'),

    divider(),

    // ─── Step 3: Send to Your Wallet ───────────────────────────────────────────
    h2('Step 3 — Send to Your Wallet'),
    p('wZRA is only available via Vision Hub\'s built-in swap or on Raydium. Either way, your funds need to be in your own wallet first. This step moves them there.'),

    step(1, 'Copy your wallet address', 'Open your wallet app and copy your Solana address. In Vision Hub, tap Receive. In Phantom, click your wallet name at the top. Your address starts with a mix of letters and numbers (e.g. 7xKXtg2…). This is like your bank account number — safe to share.'),
    step(2, 'Withdraw from your exchange', 'On the exchange, go to Withdraw → select USDC → paste your wallet address → select Solana (SPL) as the network. Double-check the address before confirming. This usually takes under a minute.'),
    step(3, 'Confirm it arrived', 'Open Vision Hub or Phantom — your USDC balance should appear within 60 seconds. You also need a tiny amount of SOL in your wallet (even $1–2 worth) to cover Solana network fees when you swap.'),

    callout('warning', 'Always select the Solana (SPL) network when withdrawing. If you accidentally send on the Ethereum or another network, your funds will not arrive in your Solana wallet. Always double-check the network before confirming.'),

    divider(),

    // ─── What is wZRA? ─────────────────────────────────────────────────────────
    h2('What is wZRA?'),
    p('The short answer: wZRA is the same asset as ZRA — the native token of the ZERA Network — but packaged in a way that lets it travel on the Solana blockchain. The "w" stands for wrapped.'),

    p('ZERA is its own independent blockchain — a network built from the ground up for community governance and automatic execution of decisions. Its native token, ZRA, lives and operates on that chain.'),

    p('Different blockchains can\'t directly hold each other\'s tokens — they speak different technical languages. A wrapped token solves this. When ZRA is wrapped for Solana, the original tokens are locked up on the ZERA Network, and an equivalent number of wZRA tokens are created on Solana. Each wZRA is fully backed 1:1 by a real ZRA token.'),

    p('Think of it like exchanging cash for casino chips. Your chips represent real money and can be exchanged back — they just work within a specific environment. wZRA works within the Solana ecosystem, including on Raydium where the liquidity pool lives.'),

    cardGroup(2, [
      {
        icon: 'hugeicons:blockchain-02',
        title: 'ZRA — Native Token',
        body: 'Lives on the ZERA Network. Used for governance, staking, and on-chain voting. The real, underlying asset.',
      },
      {
        icon: 'hugeicons:link-01',
        title: 'wZRA — Wrapped on Solana',
        body: 'Backed 1:1 by ZRA. Tradeable on Solana DEXes like Raydium. Part of the same ecosystem — just accessible on a different chain.',
      },
    ]),

    divider(),

    // ─── Step 4: Swap for wZRA ─────────────────────────────────────────────────
    h2('Step 4 — Swap for wZRA'),

    callout('warning', 'Always verify the contract address before swapping. The wZRA contract address is: 9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15'),

    p('The wZRA / USDC liquidity pool address on Raydium (Solana): CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg'),

    tabs([
      {
        label: 'Vision Hub (Recommended)',
        body: 'Open Vision Hub and go to the Swap section. Your USDC balance will already be visible.\n\nSelect USDC as the token you\'re swapping from. Search for wZRA in the "To" field — or paste the contract address 9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15 to be sure you have the right token.\n\nEnter how much USDC you want to spend, review the wZRA amount you\'ll receive, and confirm the swap. It settles in seconds and wZRA appears in your wallet automatically.',
      },
      {
        label: 'Phantom + Raydium',
        body: 'Visit raydium.io/swap. Click "Connect Wallet" and select Phantom. Approve the connection in your Phantom app.\n\nSelect USDC in the "From" field. In the "To" field, paste the contract address 9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15 to find wZRA.\n\nEnter your USDC amount, check the wZRA you\'ll receive, then click "Swap". Approve the transaction in Phantom. wZRA will appear in your wallet within seconds.',
      },
    ]),

    accordion('What is slippage?', 'Slippage is how much the price can move between when you click "Swap" and when the trade executes. Set slippage to 1–3% in Raydium\'s settings. If your swap keeps failing, try increasing it slightly.'),

    divider(),

    // ─── Verify Your Purchase ──────────────────────────────────────────────────
    h2('Verify Your Purchase'),
    p('Check your Vision Hub or Phantom wallet — wZRA should appear in your token list automatically after the swap. If it doesn\'t show, look for an option to add a custom token and enter the contract address.'),

    step(1, 'Verify on Solscan', 'You can verify your transaction by searching your wallet address on solscan.io — Solana\'s public block explorer. Every trade is permanently and publicly recorded.'),
    step(2, 'Track the price', 'Track wZRA\'s price and trading activity on DEX Screener, GeckoTerminal (CoinGecko), or Birdeye. These show live price charts and trading volume for the wZRA/USDC pair.'),
    step(3, 'Keep your wallet safe', 'Your wZRA is now in your wallet — you fully own it. Keep your seed phrase safe and offline. Never share it. Consider a hardware wallet (like Ledger) for larger amounts.'),

    callout('success', 'You\'re all set! Start with Vision Hub, fund with USDC, and swap for wZRA in minutes.'),
  ]),
};

import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const fundingWhatMattersArticle = {
  id: 'funding-what-matters',
  title: 'Funding What Matters',
  slug: 'funding-what-matters',
  excerpt: 'The ZERA Treasury fuels the ecosystem by backing community-approved initiatives.',
  category_id: 'treasury',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Fueling the Ecosystem'),
    p('The ZERA Treasury exists to back community-approved initiatives that strengthen and grow the network. It is not a slush fund, not a marketing budget, and not a founder allocation. Every expenditure is proposed, debated, and voted on by the community.'),

    callout('info', 'The Treasury can fund anything the community believes will make the network better — but only if the community votes for it.'),

    h2('What the Treasury Can Fund'),
    p('Proposals can unlock Treasury support for a wide range of initiatives. The only requirement is that the community approves them through governance.'),

    cardGroup(3, [
      {
        icon: 'hugeicons:code',
        title: 'Protocol Upgrades',
        body: 'Fund core protocol improvements, performance optimizations, and new chain-level features.',
      },
      {
        icon: 'hugeicons:user-group',
        title: 'Developer Grants',
        body: 'Support builders creating tools, libraries, SDKs, and infrastructure for the ecosystem.',
      },
      {
        icon: 'hugeicons:apps',
        title: 'New dApps',
        body: 'Back teams building decentralized applications that bring users and utility to the network.',
      },
      {
        icon: 'hugeicons:book-open-01',
        title: 'Education',
        body: 'Fund tutorials, courses, documentation, and learning resources for developers and users.',
      },
      {
        icon: 'hugeicons:megaphone-01',
        title: 'Awareness Campaigns',
        body: 'Support marketing, outreach, and community growth initiatives approved by governance.',
      },
      {
        icon: 'hugeicons:safe',
        title: 'Strategic Reserves',
        body: 'Maintain protocol reserves for liquidity, partnerships, and long-term ecosystem stability.',
      },
    ]),

    p('All chosen by the community to strengthen and grow the network. No central committee decides what gets funded — the token holders do.'),

    divider(),

    h2('Governance in Control'),
    p('There are no keys, no middlemen, and no discretionary spending. Treasury activity runs entirely through governance-owned contracts. Every movement of funds is visible, verifiable, and bound to the community\'s decisions.'),

    quote('Every Treasury transaction is a direct expression of community will. No one can spend what the community has not approved.'),

    bullet('No admin keys or multisig wallets — governance contracts enforce all rules'),
    bullet('Every allocation tied to a specific passed proposal'),
    bullet('Full on-chain transparency — anyone can audit at any time'),
    bullet('No override mechanism — the community vote is final'),

    divider(),

    h2('Governance in Action'),
    p('Here is how Treasury funding works in practice across different types of initiatives.'),

    h3('Development Funding'),
    step(1, 'Community Votes', 'A developer or team submits a proposal for a specific feature, tool, or improvement. The community reviews and votes.'),
    step(2, 'Treasury Allocates', 'Once the proposal passes, the governance contract automatically releases the approved funds from the Treasury.'),
    step(3, 'Developers Get Paid', 'The allocated funds are distributed to the developer or team according to the proposal terms.'),
    step(4, 'Feature Built', 'The work is completed, delivered, and the network benefits from the improvement.'),

    h3('Marketing Initiatives'),
    step(1, 'Community Approves Campaign', 'A marketing proposal is submitted with a clear budget, goals, and timeline. The community votes to approve.'),
    step(2, 'ZMT Releases Funds', 'The ZERA Marketing Treasury releases the approved budget — no central marketing team needed.'),
    step(3, 'Campaign Launches', 'The campaign executes without requiring approval from any central authority. Results are reported back to governance.'),

    h3('Protocol Upgrades'),
    step(1, 'Proposed Through ZIP', 'A ZERA Improvement Proposal (ZIP) outlines the technical change, its rationale, and the resources needed.'),
    step(2, 'Community Votes Yes', 'Token holders review the ZIP and vote. If it passes, the upgrade is authorized.'),
    step(3, 'Network Updates', 'The upgrade is implemented and deployed. No gatekeeping, no veto power, no central authority blocking progress.'),

    divider(),

    h2('Specific Treasury Programs'),
    p('The ZERA ecosystem includes several dedicated programs that operate under Treasury governance.'),

    tabs([
      {
        label: 'Treasury Grants',
        body: 'The general-purpose grants program for any initiative that strengthens the network. Proposals can range from small developer tools to large infrastructure projects. All subject to community vote and on-chain execution.',
      },
      {
        label: 'IIT',
        body: 'The Innovation & Incubation Treasury holds 30M+ ZERA dedicated to experiments, research, and hackathons. Designed to fund early-stage ideas that may not yet have a clear ROI but could produce breakthrough innovations for the ecosystem.',
      },
      {
        label: 'ZMT',
        body: 'The ZERA Marketing Treasury funds marketing, adoption, and education initiatives. From awareness campaigns to developer education programs, ZMT ensures the network can grow its community without relying on a centralized marketing department.',
      },
      {
        label: 'ZIP',
        body: 'ZERA Improvement Proposals are the mechanism for funding protocol upgrades. ZIPs cover technical changes to the core protocol, from performance optimizations to new consensus features. Every ZIP goes through community review and vote before execution.',
      },
    ]),

    callout('success', 'Every program, every grant, every allocation — all governed by the community. The Treasury is not a promise. It is working infrastructure.'),

    expandable('How do I submit a Treasury proposal?', 'Proposals are submitted through the ZERA governance portal. You will need to provide a clear description of the initiative, the requested budget, milestones, and expected outcomes. The community then reviews and votes on your proposal during the active voting period.'),
    expandable('What is the minimum amount for a Treasury grant?', 'There is no fixed minimum. The community evaluates each proposal on its merits. Small grants for developer tools and large grants for infrastructure projects are both welcome — what matters is the value to the network.'),
    expandable('How is the IIT different from general Treasury Grants?', 'The Innovation & Incubation Treasury (IIT) is specifically reserved for experimental and early-stage projects — research, hackathons, and proof-of-concept work. General Treasury Grants are for more established initiatives with clearer deliverables and timelines.'),
  ]),
};

import { bn, h2, h3, p, bullet, callout, divider } from '../../blocks';

export const privacyPolicyArticle = {
  id: 'privacy-policy',
  title: 'Privacy Policy',
  slug: 'privacy-policy',
  excerpt: 'How ZERA Community Operators collect, use, disclose, and protect personal information.',
  category_id: 'legal',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2025-10-22T00:00:00Z',
  updated_at: '2025-10-22T00:00:00Z',
  content: bn([
    p('Last updated: October 22, 2025'),

    p('This Privacy Policy ("Policy") describes how ZERA Community Operators ("ZERA," "we," "us," or "our") collect, use, disclose, and protect personal information when you visit www.zera.net (the "Site") or otherwise interact with us. The Site serves as a community portal for information, tools, and updates relating to the ZERA Network — a decentralized, open-source blockchain protocol.'),

    callout('info', 'Nobody, including us, controls the ZERA Network. This Policy applies only to the Site and related off-chain services we operate, not to data recorded on the ZERA Network or handled by third parties.'),

    p('By accessing or using the Site, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the Site.'),

    p('We may modify this Policy from time to time by updating the "Last updated" date above. It is your responsibility to review this Policy periodically. Continued use of the Site after changes are posted constitutes acceptance of the revised Policy.'),

    divider(),

    h2('Who Runs This Site'),
    p('The Site is operated by various community groups (collectively, "we", "us", or "Site Operators"). The Service is provided as a portal for information, community resources and tools relating to the ZERA Network (the "ZERA Network"). The ZERA Network is an open-source decentralized protocol; nobody — including the Site Operators — controls or can guarantee or modify the ZERA Network, its transactions, validators, data, operation, or availability. You acknowledge and accept this lack of control.'),

    h2('Scope and Limitations'),
    p('The ZERA Network is decentralized and permissionless. Information recorded on-chain is public, permanent, and globally accessible.'),
    p('We do not operate or control validators, nodes, wallets, smart contracts, or on-chain data. This Policy does not apply to on-chain activity or third-party services (wallets, RPC providers, forums, analytics tools, etc.) even if linked from the Site.'),

    h2('Information We Collect'),

    h3('(a) Information You Provide'),
    p('We collect information you provide directly, including:'),
    bullet('Contact details (name, email address) when you subscribe, contact us, or submit a form.'),
    bullet('Community submissions, feedback, or participation in events.'),
    bullet('Optional information you voluntarily include in correspondence.'),
    p('We do not collect payment card data or financial information through the Site.'),

    h3('(b) Information Collected Automatically'),
    p('When you access the Site, we automatically collect:'),
    bullet('Device and Usage Data: IP address, browser type, device identifiers, operating system, referring pages, access times, and navigation paths.'),
    bullet('Cookies and Similar Technologies: We use cookies and related technologies for site functionality, analytics, and security. See the Cookies section below for your cookie options.'),

    h3('(c) Information from Third Parties'),
    p('We may obtain limited information from:'),
    bullet('Service providers assisting with hosting, analytics, or communications.'),
    bullet('Public or community sources (e.g., posts or messages you make in public channels).'),

    h2('Use of Information'),
    p('We use personal information to:'),
    bullet('Operate, maintain, and improve the Site and community services.'),
    bullet('Respond to inquiries and provide customer or community support.'),
    bullet('Send service-related notices, technical alerts, or updates.'),
    bullet('Conduct analytics to understand Site usage and performance.'),
    bullet('Prevent fraud, abuse, or security incidents.'),
    bullet('Comply with legal obligations and enforce our Terms of Service.'),
    bullet('Carry out any other purpose disclosed at the time of collection.'),

    p('Legal bases for processing (under Swiss and EU law) include:'),
    bullet('Performance of a contract or pre-contractual steps,'),
    bullet('Compliance with legal obligations,'),
    bullet('Legitimate interests (operation, security, improvement of the Site), or'),
    bullet('Consent (for communications or cookies, where required).'),

    h2('Sharing of Information'),
    p('We may share personal information as follows:'),
    bullet('Service Providers: Hosting, analytics, communication, and technical support vendors, bound by confidentiality and data protection agreements.'),
    bullet('Professional Advisors: Lawyers, auditors, and consultants under confidentiality.'),
    bullet('Authorities: When legally required or necessary to protect rights, safety, or property.'),
    bullet('Community Partners: Limited sharing with verified contributors assisting in operating the Site.'),
    bullet('With Consent: When you explicitly direct or permit us to do so.'),
    p('We may also share aggregated or de-identified data that cannot reasonably identify any individual.'),

    h2('Analytics and Tracking'),
    p('We may use privacy-respecting analytics tools to understand Site traffic and performance. Cookies or tracking technologies (if used) are limited to functionality and analytics; we do not use them for cross-site advertising or profiling.'),
    p('If third-party tools such as Google Analytics are used, they will be configured for IP anonymization and data minimization. You may disable cookies at any time (see Cookies section below).'),

    h2('International Transfers'),
    p('We operate globally and may process personal data in various countries where our service providers are located.'),

    h2('Data Retention'),
    p('We retain personal data only as long as necessary to fulfill the purposes set forth in this Policy or as required by law.'),

    h2('Cookies and Your Choices'),

    h3('(a) Cookies'),
    p('Cookies are small text files placed on your device to support core functionality and performance. You may configure your browser to block or delete cookies. Disabling essential cookies may limit Site functionality.'),

    h3('(b) Communications'),
    p('If you subscribe to updates or newsletters, you can opt out at any time via the unsubscribe link in any email.'),

    h3('(c) Privacy Rights'),
    p('Depending on your jurisdiction, you may have rights to:'),
    bullet('Access, correct, or erase your personal data;'),
    bullet('Restrict or object to processing;'),
    bullet('Withdraw consent; and'),
    bullet('Request data portability.'),
    p('To exercise these rights, contact us via forms.'),
    p('We cannot alter or remove data recorded on public blockchains.'),

    h2('Data Security'),
    p('We use commercially reasonable technical and organizational measures to secure personal data, including encryption in transit, access control, and data minimization.'),
    callout('warning', 'No Internet-based service can guarantee absolute security. On-chain transactions and blockchain data are inherently public and cannot be secured or deleted by us.'),

    h2('Children\'s Privacy'),
    p('The Site is not directed to or intended for use by persons under 18 years of age. We do not knowingly collect personal data from minors. If you believe a child has provided data, please contact us via forms.'),

    h2('Third-Party Links and Embeds'),
    p('The Site may contain links or integrations to third-party websites or services. We are not responsible for their content or data practices. Use of third-party sites is governed by their respective privacy policies.'),

    h2('International and Regional Disclosures'),

    h3('(a) European Economic Area, United Kingdom, and Switzerland'),
    p('If you are located in the EEA, UK, or Switzerland, you have additional rights under applicable data protection law:'),
    bullet('Access, rectification, erasure, restriction, objection, portability, and withdrawal of consent.'),
    p('We aim to resolve concerns promptly.'),

    h3('(b) California (CCPA/CPRA)'),
    p('If you are a California resident:'),
    bullet('We have collected identifiers, usage data, and limited geolocation data in the past 12 months.'),
    bullet('We do not sell or share personal information as defined by the CCPA/CPRA.'),
    bullet('You may request access, correction, deletion, or information on disclosures by submitting a form.'),
    p('We will verify requests consistent with California law.'),

    h2('Governing Law'),
    p('This Policy and any disputes arising out of or relating to it are governed by the laws of Switzerland, without regard to conflict-of-law principles.'),
    p('Any dispute not subject to arbitration shall be resolved exclusively in the competent courts of Zug, Switzerland.'),

    h2('Contact'),
    p('For notices, questions or disputes, contact us via site forms.'),
  ]),
};

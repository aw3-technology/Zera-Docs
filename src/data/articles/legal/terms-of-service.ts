import { bn, h2, h3, p, bullet, callout, divider } from '../../blocks';

export const termsOfServiceArticle = {
  id: 'terms-of-service',
  title: 'Terms of Service',
  slug: 'terms-of-service',
  excerpt: 'Terms governing your access to and use of zera.net and related services.',
  category_id: 'legal',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2025-10-22T00:00:00Z',
  updated_at: '2025-10-22T00:00:00Z',
  content: bn([
    p('Last updated: October 22, 2025'),

    p('Please read these Terms of Service ("Terms") carefully and keep a copy for your records. These Terms govern your access to and use of the ZERA.net available at https://zera.net and any related websites, social media, articles, mobile sites, APIs, widgets, or other services offered by us (collectively, the "Service" or "Site"). By accessing or using the Service you agree to be bound by these Terms. If you do not agree, do not use the Service.'),

    divider(),

    h2('Who Runs This Site / Scope'),
    p('The Site is operated by various community groups (collectively, "we", "us", or "Site Operators"). The Service is provided as a portal for information, community resources and tools relating to the ZERA Network (the "ZERA Network"). The ZERA Network is an open-source decentralized protocol; nobody — including the Site Operators — controls or can guarantee or modify the ZERA Network, its transactions, validators, data, operation, or availability. You acknowledge and accept this lack of control.'),

    h2('Acceptance; Changes'),
    p('By using the Service you accept and agree to these Terms and any additional rules, policies, or notices posted on the Site. We may modify these Terms at any time in our sole discretion by posting revised Terms on the Site with a new "Last updated" date; your continued use of the Service after posting constitutes acceptance of the revised Terms. It is your responsibility to review these Terms periodically.'),

    h2('Eligibility'),
    p('The Service is intended for persons who can form legally binding contracts under Swiss law. You represent and warrant you are at least 18 years old (or the age of majority where you live) and capable of entering into these Terms. If you use the Service on behalf of an entity, you represent you are authorized to bind that entity.'),

    h2('License; Restrictions'),
    p('Subject to these Terms and your compliance with them, the Site Operators grant you a limited, non-exclusive, revocable, non-transferable license to access and use the Services.'),
    p('You must not: (a) interfere with or attempt to gain unauthorized access to the Service or its systems; (b) use the Service in a manner that violates applicable law or these Terms.'),

    h2('User Content; Community Contributions'),
    p('You retain ownership of content you post ("User Content"). By posting User Content you grant the Site Operators a perpetual, worldwide, royalty-free, transferable, sublicensable license to use, copy, reproduce, distribute, prepare derivative works of, display and perform the User Content in connection with the Service and the Site Operators\' business. You are solely responsible for User Content you submit.'),
    p('You represent and warrant that you have all rights necessary to post User Content and that such content does not infringe others\' rights or violate law. We may remove or block User Content at our discretion.'),

    h2('Copyright / Infringement Policy'),
    p('We comply with copyright laws applicable in Switzerland and may, in our discretion, remove material that we believe infringes third-party intellectual property rights. Report suspected infringement through our support forms.'),
    p('Include: your contact details, a description of the copyrighted work and the allegedly infringing material, location (URL), and a statement under penalty of perjury that the information is accurate and you are the rights holder or authorized to act on behalf of the rights holder. We may disclose information you provide to the poster of the content.'),

    h2('Site Management; Suspension'),
    p('We reserve the right to (a) monitor the Site; (b) remove or disable access to any content that violates these Terms or applicable law; (c) block IPs or restrict access for any reason; and (d) terminate or suspend the Service (or your access) at any time without liability.'),

    h2('Disclaimers; No Control of ZERA Network'),
    callout('warning', 'THE SERVICE IS PROVIDED AS-IS AND AS-AVAILABLE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SITE OPERATORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, AND NON-INFRINGEMENT. THE SITE OPERATORS DO NOT WARRANT THAT THE SERVICE IS UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.'),
    callout('warning', 'YOU ACKNOWLEDGE AND AGREE THAT THE SITE OPERATORS DO NOT CONTROL, OPERATE, OR GUARANTEE THE ZERA NETWORK, ITS VALIDATORS, TRANSACTIONS OR DATA, AND MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE ZERA NETWORK. ANY ACTIONS TAKEN BY YOU BASED ON CONTENT ON THE SITE ARE AT YOUR OWN RISK.'),

    h2('Limitation of Liability'),
    callout('warning', 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE SITE OPERATORS, THEIR AFFILIATES, CONTRIBUTORS OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, OR LOSS OF GOODWILL) ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE SITE OPERATORS\' AGGREGATE LIABILITY FOR ANY AND ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICE WILL NOT EXCEED THE GREATER OF (A) CHF 200 OR (B) THE AMOUNTS YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATIONS OF LIABILITY; WHERE SUCH LIMITATIONS ARE NOT ENFORCEABLE, LIABILITY WILL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.'),

    h2('Indemnification'),
    p('You agree to indemnify, defend and hold harmless the Site Operators, their affiliates, agents and employees from any claim, loss, liability, damages, costs or expenses (including reasonable attorneys\' fees) arising out of or related to: (a) your breach of these Terms; (b) your User Content; (c) your violation of law; or (d) your use of the Service.'),

    h2('Privacy'),
    p('Our Privacy Policy (available at https://zera.net/privacy-policy) explains how we collect and use personal information. By using the Service you consent to such processing and warrant that any information you provide is accurate.'),

    h2('Electronic Communications'),
    p('You consent to receive communications electronically. We may provide communications via email or by posting notices on the Site. Electronic communications satisfy any legal requirement that such communications be in writing.'),

    h2('Dispute Resolution; Arbitration; No Class Actions'),
    callout('info', 'PLEASE READ CAREFULLY — THIS SECTION AFFECTS YOUR RIGHTS.'),

    h3('Governing Law'),
    p('These Terms are governed by and construed in accordance with the laws of Switzerland, without regard to conflict-of-law principles.'),

    h3('Mandatory Individual Arbitration'),
    p('Except as otherwise set forth below, any dispute, claim or controversy arising out of or relating to these Terms, the Service, or the relationship between you and the Site Operators (each, a "Dispute") shall be finally resolved by binding arbitration administered in accordance with the Swiss Rules of International Arbitration (Swiss Rules) of the Swiss Chambers\' Arbitration Institution then in effect. The seat of arbitration shall be Zug, Canton of Zug, Switzerland. The language of the arbitration shall be English. The arbitration shall be heard by a single arbitrator experienced in technology, blockchain, and internet matters. The arbitrator shall apply Swiss substantive law.'),
    p('You and we each expressly waive any right to a jury trial and to participate in a class, collective, representative or consolidated action or arbitration. The arbitrator may only decide the dispute between you and the Site Operators; the arbitrator may not consolidate claims of multiple claimants or preside over any class, collective, or representative action.'),

    h3('Interim Relief'),
    p('Nothing in this section prevents either party from seeking interim injunctive or equitable relief from a court of competent jurisdiction in Switzerland to preserve the status quo or prevent irreparable harm, provided any such application is limited to provisional measures and not the merits of the Dispute.'),

    h3('Time Limit'),
    p('Any claim must be brought within one (1) year from the date the claim arose; otherwise it is permanently barred.'),

    h3('Enforceability'),
    p('If the waiver of class/collective claims or arbitration provisions are found to be unenforceable with respect to a particular claim, then such claim shall be severed and litigated only in the courts of Zug, Switzerland, and the remainder of this arbitration provision shall continue in full force.'),

    h2('Governing Law; Venue'),
    p('Subject to the arbitration provisions above, these Terms and any dispute not subject to arbitration shall be governed by Swiss law and heard exclusively in the courts located in Zug, Switzerland.'),

    h2('Export; Compliance'),
    p('You shall comply with all applicable export and sanctions laws and regulations. We make no representation that the Service is appropriate or available in all jurisdictions. Access from territories where provision of the Service would be illegal is prohibited.'),

    h2('Third-Party Links; No Endorsement'),
    p('The Site may contain links to third-party websites or services. We do not endorse and are not responsible for third-party content or practices. Use of third-party sites is at your own risk.'),

    h2('Changes to Service; Termination'),
    p('We may modify, suspend or discontinue the Service (or any part) at any time, for any reason, without liability. We may also terminate or restrict access for any user violating these Terms or for business reasons. Upon termination, any rights granted to you hereunder will immediately cease.'),

    h2('Data; Backups'),
    p('We reserve the right to perform routine backups, but you are solely responsible for any data you transmit or store via the Service. WE ARE NOT LIABLE FOR ANY LOSS OR CORRUPTION OF USER DATA.'),

    h2('Miscellaneous'),
    p('These Terms constitute the entire agreement between you and the Site Operators regarding the Service and supersede all prior agreements. If any provision is held invalid or unenforceable, the remaining provisions will remain in full force. No waiver of any right is effective unless in writing and signed by us. We may assign or transfer these Terms, in whole or in part, without your consent.'),

    h2('Contact'),
    p('For notices, questions or disputes, contact us via site forms.'),
  ]),
};

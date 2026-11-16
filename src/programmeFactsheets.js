// Content supplied by the client in the Argentina, Grenada and Latvia factsheets.
const whyUs = {
  title: 'Why Dream Country Visas',
  items: [
    'Personal assessment of your eligibility and family composition',
    'Choice of investment option to suit your goals',
    'Preparation and submission of your complete application',
  ],
};

export const CITIZENSHIP_FACTSHEETS = {
  argentina: {
    name: 'Argentina',
    tagline: 'Citizenship by Investment Programme',
    banner: '/images/country-argentina.webp',
    price: 'from USD 350,000',
    time: 'Under 4 months',
    visaFree: '160+',
    family: 'Spouse & children aged 25 or younger',
    urlCom: 'https://dreamcountryvisas.com/citizenship/argentina',
    urlIn: 'https://dreamcountryvisas.in/citizenship/argentina',
    overview: 'Citizenship of a G20 country, starting from USD 350,000, with no ongoing residence requirement. Applications are currently open for expressions of interest.',
    applicationLabel: 'Register Your Interest',
    factsheet: [
      { title: 'Programme Status', paragraphs: ['Applications are currently open for expressions of interest.'] },
      { title: 'Argentina · South America', rows: [
        ['Capital city', 'Buenos Aires'], ['Currency', 'Argentine peso (ARS)'], ['Global standing', 'G20 Member'],
        ['Language', 'Spanish'], ['Population', '46,044,703 (2022 Census)'], ['Regional bloc', 'Mercosur Founding Member'],
        ['Time zone', 'Argentina Time (UTC−03:00)'], ['Neighbouring countries', 'Chile, Bolivia, Paraguay, Brazil, Uruguay'],
      ] },
      { title: 'Climate · Buenos Aires', rows: [['Annual mean temperature', '18.0 °C'], ['Annual rainfall', '1,158 mm']],
        paragraphs: ['Population: INDEC, 2022 National Census. Climate: average annual temperature (2001–2011) and average annual rainfall (1981–2011), City of Buenos Aires. Source: Government of the City of Buenos Aires.'] },
      { title: 'Programme Overview', paragraphs: [
        'Argentina has officially launched South America’s first Citizenship by Investment programme, marking a significant development in the global investment migration market. As a G20 country with a globally recognised passport, Argentina’s programme permits dual citizenship and has no ongoing residence requirement, making it an attractive option for international investors.',
        'Citizenship of a G20 country, starting from USD 350,000, with no ongoing residence requirement.',
      ] },
      { title: 'Lifestyle', paragraphs: ['Beyond its citizenship proposition, Argentina is one of the world’s great lifestyle destinations. Buenos Aires offers European architecture, world-class dining, tango culture, luxury shopping, and nightlife that runs well into the early hours. Mendoza delivers Malbec vineyards set against the Andes, while Patagonia offers glaciers, lakes, mountains, skiing, horseback riding, and more.'] },
      { title: 'Programme at a Glance', rows: [
        ['Processing time', 'Under 4 months'], ['Visa-free travel', '160+ countries'], ['Minimum investment', 'From USD 350,000'], ['Family', 'Spouse & children aged 25 or younger'],
      ] },
      { title: 'Key Benefits', items: [
        'G20 Citizenship — Citizenship of a G20 country.',
        'No Residence Requirement — No ongoing residence requirement.',
        'Dual Citizenship — Dual citizenship permitted.',
        'Mercosur Access — Provides access to Mercosur residence rights, making it easier to live and work in participating South American countries.',
        'Global Mobility — Visa-free or visa-on-arrival access to 160+ countries.',
        'One Visit Only — Upon approval, only one in-person visit to Argentina is required to capture biometrics, with no further physical presence requirements.',
        '10-Year Passport — Passport valid for 10 years.',
        'Fast Processing — Processing in under four months.',
      ] },
      { title: 'Investment Options', rows: [
        ['Option 1 · Treasury Contribution', 'A non-refundable minimum contribution of USD 350,000 to the Argentine Treasury.'],
        ['Option 2 · Sovereign Bond', 'An investment of USD 800,000 in an Argentine sovereign bond.'],
      ] },
      { title: 'Family Members · Additional Contributions', paragraphs: ['The principal applicant’s spouse and children may apply. An additional contribution to the National Treasury applies. Adult children are not required to prove financial dependency.'], rows: [
        ['Spouse', 'USD 100,000'], ['Each child aged 18 to 25 inclusive', 'USD 100,000; never married and with no children'], ['Each child under 18', 'USD 25,000'],
      ] },
      { title: 'Who Can Apply?', items: [
        'Main applicant — Must be over 18, satisfy due diligence requirements, demonstrate lawful source of funds, and complete the qualifying investment.',
        'Spouse — May be included in the same application as the main applicant. This also applies to same-sex spouses.',
        'Children — Those aged 25 or younger can be included. Applicants aged 18 to 25 must be single and have no children of their own.',
      ] },
      { title: 'Taxation', items: [
        'Tax residence — Argentine nationals are deemed tax resident if they live in Argentina. Foreign nationals living in Argentina for at least 12 months are also considered residents.',
        'Income tax — Residents are taxed on worldwide income at progressive rates from 5% to 35%; non-residents are taxed only on Argentine-source income.',
        'Personal assets tax — 0.5% to 1% on worldwide assets of tax residents above ARS 384.7 million (FY 2025); non-residents pay 0.5% on Argentine assets only.',
        'Inheritance tax — None at national level; levied only by the Province of Buenos Aires.',
      ], paragraphs: ['Source: Deloitte, International Tax – Argentina Highlights 2026 (updated April 2026).'] },
      { title: 'Process Overview', paragraphs: ['The application process takes under four months once a complete file is submitted.'], steps: [
        'Initial Assessment', 'Client Onboarding', 'Application Preparation', 'Application Submission',
        'Government Review and Due Diligence', 'Approval and Investment Completion', 'Visit, Citizenship, and Passport',
      ] },
      { ...whyUs, items: [...whyUs.items, 'Support through approval, your visit and passport'] },
    ],
  },
  grenada: {
    name: 'Grenada',
    tagline: 'Citizenship by Investment Programme',
    banner: '/images/country-grenada.webp',
    price: 'from USD 235,000',
    time: 'Contact us for timelines',
    visaFree: '140+',
    family: 'Spouse, children under 30, siblings, parents & grandparents',
    urlCom: 'https://dreamcountryvisas.com/citizenship/grenada',
    urlIn: 'https://dreamcountryvisas.in/citizenship/grenada',
    overview: 'Citizenship for your family and future generations, from a minimum contribution of USD 235,000. Choose a donation to the National Transformation Fund or approved real estate, with visa-free access to over 140 destinations.',
    factsheet: [
      { title: 'Grenada · The Spice Isle', rows: [
        ['Capital city', 'St. George’s'], ['Currency', 'Eastern Caribbean dollar'], ['Economy', 'Tourism-based'], ['Language', 'English'],
        ['Total area', '344 km²'], ['Commonwealth', 'Member State'], ['Time zone', 'Atlantic Standard Time (UTC−04:00)'], ['Population', '114,300'],
      ] },
      { title: 'Climate · Grenada', rows: [
        ['Annual mean temperature', '27.5 °C'], ['Coolest month (January)', '26.5 °C'], ['Warmest months (May, September)', '28.2 °C'], ['Annual rainfall', '1,161 mm'],
      ], paragraphs: ['Climate: mean monthly temperature (1985–2015) and mean annual rainfall (1986–2015), Maurice Bishop International Airport. Source: Caribbean Institute for Meteorology and Hydrology (CIMH), Grenada Country Profile.'] },
      { title: 'Grenada', paragraphs: ['Grenada, known as the ‘Spice Isle’, is one of the most beautiful and lush islands of the West Indies. The archipelago consists of the island of Grenada itself and two smaller islands in the southeastern Caribbean Sea. Grenada is a member of the Commonwealth, entitling its citizens to certain privileges in the UK and other member states.'] },
      { title: 'Programme Overview', rows: [['Minimum contribution', 'USD 235,000'], ['Visa-free destinations', '140+'], ['Qualifying options', 'Donation or approved real estate']],
        paragraphs: ['Citizenship for your family, future generations, and visa-free access to over 140 destinations.'] },
      { title: 'Legal Basis', paragraphs: ['The programme is established under the Grenada Citizenship by Investment Act, 2013. The current contribution amounts were set by the Grenada Citizenship by Investment (Amendment) (No. 2) Regulations, S.R.O. 15 of 2024, in force since 1 July 2024.'] },
      { title: 'Key Benefits', items: [
        'Freedom of Travel — Freedom of travel to Grenada, China, Russia, Singapore, the UK, and Europe’s Schengen Area, among others.',
        'Future Generations — Citizenship transferable to new spouses and future generations.',
        'Dual Citizenship — No restrictions on dual citizenship in Grenada.',
        'Access to the USA (E-2) — Eligibility to apply to the USA for a nonimmigrant investor visa after being domiciled in Grenada for a continuous period of at least three years, due to the country’s E-2 Investor Visa treaty.',
        'Include Your Family — Include a spouse, children under 30, unmarried siblings aged 18 and over, parents, and grandparents of the main applicant and spouse of any age.',
        'No Minimum Stay — No minimum stay required.',
      ], paragraphs: ['Visa-free, visa-on-arrival, and ETA rules can be updated, amended, or adjusted at any time due to changes in diplomatic, security, health, migration, or reciprocal policies.'] },
      { title: 'Main Applicant Requirements', items: ['A minimum age of 18 years', 'No criminal record', 'Satisfy one of the two qualifying investment options'] },
      { title: 'Who Can Be Included', items: ['Spouse', 'Children under 30', 'Unmarried siblings aged 18 and over', 'Parents and grandparents of the main applicant and spouse, of any age'] },
      { title: 'Option 1 · Donation', rows: [['National Transformation Fund', 'USD 235,000 for a single applicant or a family of up to four members']] },
      { title: 'Option 2 · Real Estate', rows: [
        ['Minimum shared purchase', 'USD 270,000 per share in an approved Tourism Accommodation project, where two or more individuals buy a unit valued at a total minimum of USD 540,000.'],
        ['Whole unit', 'Minimum USD 350,000.'],
        ['Additional non-refundable contribution', 'Minimum USD 50,000 for a single applicant or a family of up to four members.'],
      ], paragraphs: ['If the property is resold as a qualifying investment to another citizenship by investment investor, it must be held for five years. Alternatively, it can be sold at any point after purchase.'] },
      { title: 'Additional Family Members', paragraphs: ['For both options, an additional contribution applies. Additional fees apply.'], rows: [
        ['Each family member after the fourth', 'USD 25,000, excluding qualifying siblings and dependent parents aged 55 and under.'],
        ['Each parent aged 55 and under', 'USD 50,000'], ['Each qualifying sibling', 'USD 75,000'],
      ] },
      { title: 'Procedures', paragraphs: ['The government authority responsible for administering the programme processes all applications. They thoroughly examine each application and may request additional information or documentation, if necessary.'], steps: [
        'Client contacts Dream Country Visas', 'Dream Country Visas initial due diligence checks completed',
        'Client agreement signed and retainer paid', 'Prepare application for Grenada citizenship and submit to government',
        'Mandatory virtual interview for all applicants aged 16 and older', 'Government due diligence checks completed',
        'Application approved', 'Post-approval requirements fulfilled', 'Full citizenship received',
      ] },
      { ...whyUs, items: [...whyUs.items, 'Support through the interview and post-approval'] },
    ],
  },
};

export const RESIDENCY_FACTSHEETS = {
  latvia: {
    name: 'Latvia',
    tagline: 'Golden Visa · Residence by Investment Programme',
    banner: '/images/res-latvia.webp',
    price: 'from €50,000',
    time: '6–8 months',
    pr: 'After 5 years, subject to requirements',
    family: 'Spouse & dependent children under 18',
    overview: 'EU residence through an investment of €50,000 in a Latvian company, plus a €10,000 government fee, with a pathway to permanent residence and citizenship. The temporary residence permit is issued for two years, renewable for a further two-year period.',
    factsheet: [
      { title: 'Latvia · Golden Visa', rows: [
        ['Capital city', 'Riga'], ['Currency', 'Euro € (since 2014)'], ['Location', 'Baltic Sea, between Lithuania and Estonia'], ['Official language', 'Latvian'],
        ['Total area', '64,594 km²'], ['EU / NATO / Schengen', 'EU & NATO since 2004; Schengen since 2007'], ['Time zone', 'Eastern European Time (UTC+02:00)'], ['Population', '1.83 million (2025 estimate)'],
      ] },
      { title: 'Climate · Latvia', rows: [['Annual mean temperature', '6.8 °C'], ['Annual rainfall', '684.6 mm']], paragraphs: ['Area: European Union (Eurostat, 2025). Climate: national average annual air temperature and precipitation, 1991–2020 climate normals. Source: Latvian Environment, Geology and Meteorology Centre.'] },
      { title: 'Latvia', paragraphs: ['Latvia is a country located on the Baltic Sea, between Lithuania and Estonia. The capital is Riga and the official language is Latvian. Latvia joined the European Union and NATO in 2004 and has been a member of the euro zone since 2014. It offers a healthy and safe environment and a 0% corporate income tax on undistributed profits.'] },
      { title: 'General Programme Overview', paragraphs: [
        'Latvia’s Golden Visa has been operational since 2010 and saw its investor application volume peak in 2014, a year in which Latvia approved some 2,500 applicants. With a minimum investment threshold of just €50,000, it remains one of the most affordable routes to residency by investment.',
        'The RBI programme allows foreign investors to obtain a temporary residence permit for an initial period of 2 years, renewable for a further 2-year period effective 15 September 2026, by investing into the share capital of a Latvian company. Latvian residency provides a pathway to EU permanent residency and citizenship.',
      ], rows: [['Equity investment', '€50,000 into the share capital of a Latvian company'], ['Government fee', '€10,000'], ['Investment refund', 'After 6 or 8 years, depending on the agreement and applicable investment structure']] },
      { title: 'Key Benefits', items: [
        'Most cost-effective EU residence by investment programme', 'Freedom of movement, but not settlement, within Schengen',
        'Permits dual/multiple citizenship; exceptions apply', 'Inclusion of spouse and children under 18', 'Lower taxes',
        'Increased visa-free travel', 'Path to citizenship', 'Short processing time: 6–8 months',
        'EU private and corporate bank account opening possibilities', 'Safety and security',
      ] },
      { title: 'Who Can Apply', paragraphs: [
        'Any third-country national (non-EU/EEA/Swiss) who meets the programme’s eligibility criteria, including making a qualifying investment and proving sufficient financial capacity.',
        'At the moment, Russian and Belarus passport holders are not qualified for RBI Latvia. Nationals of countries subject to EU and bank sanctions are also not eligible, as transfers from these countries cannot be made. Under banking regulations, Latvian banks may refuse to accept funds from high-risk countries.',
      ] },
      { title: 'Programme Timeline', paragraphs: ['6–8 months. In some circumstances it can be longer, by an additional 2–4 months.'] },
      { title: 'Eligibility Criteria', items: [
        'Valid passport', 'Main applicant must be over 18 years old', 'Qualifying investment in Latvia', 'Proof of financial stability',
        'Documents confirming the legal origin of income', 'Clean criminal record', 'No active travel bans or deportation records in the EU/Schengen Area',
        'The applicant is not listed on international or EU sanctions lists', 'Investment is made from the personal bank account of the main applicant',
      ] },
      { title: 'Investment & Financial Requirements', items: [
        'Types of investment — The Immigration Law currently provides for investment into company share capital (€50,000).',
        'Choice of company — Investments are made into companies that have passed due diligence and financial monitoring.',
        'Refund of investment — Returned after 6 or 8 years, depending on the agreement and applicable investment structure.',
        'Source of funds — A legal and traceable source must be shown. Funds cannot originate from countries subject to EU and bank sanctions.',
      ] },
      { title: 'Proof of Financial Capacity', paragraphs: ['At the moment of application, a bank statement showing the following minimum balance is required:'], rows: [
        ['Main applicant', '€9,360'], ['Spouse', '€9,360'], ['Each child', '€2,808'],
      ] },
      { title: 'Third-Party Sponsorship', paragraphs: ['Third-party sponsorship is possible, but the investment must be made from the personal bank account of the main applicant. The bank may currently accept these source-of-funds structures where the investment is funded through a loan or gift:'], items: [
        'Loan from a natural person — Only if the lender is a relative, spouse or official business partner.',
        'Loan from a bank or other licensed credit institution.',
        'Loan from a company with which the main applicant has a direct connection, as a shareholder or board member.',
        'Gift from a natural person — Only if the donor is a relative or spouse.',
      ] },
      { title: 'Residence Permit & Renewals', paragraphs: [
        'Effective 15 September 2026, the Temporary Residence Permit (TRP) is issued for an initial period of 2 years and can be renewed for a further 2-year period. The residence card is valid for 2 years, matching the permit period.',
        'Depending on the applicable investment structure, the qualifying investment may need to be held for 6 to 8 years in total.',
      ], rows: [
        ['Application', '€10,000 state fee; temporary residence permit issued for 2 years'],
        ['Year 2', 'Renewed for a further 2 years; OCMA and renewal fees apply'],
        ['Year 4', 'Renewal; OCMA and renewal fees apply'],
        ['Year 6', '€2,000 state fee payable at renewal, then at each subsequent renewal every 2 years'],
      ] },
      { title: 'How Is the TRP Renewed?', paragraphs: [
        'After the initial 2-year period, applicants must maintain their investment and may renew their residence permit for a further 2-year period, subject to the applicable Office of Citizenship and Migration Affairs (OCMA) fee and a legal renewal fee of €500 per person.',
        'After 5 years of residence, a state fee of €2,000 applies on renewal, provided the renewal is made within 90 days and the investment remains unchanged. As the residence card is issued for 2 years, this fee is not in practice payable in year 5; it is payable at the renewal in year 6. After year 6, the €2,000 state fee is payable at each subsequent renewal, every 2 years.',
        'Physical presence — The applicant and family members must be physically present in Latvia for approximately 5 business days at each renewal, every 2 years, to renew the card. No constant physical presence is needed to hold the TRP.',
      ] },
      { title: 'Renewal Costs · Every 2 Years', rows: [
        ['OCMA fee · standard (30 days)', '€160'], ['OCMA fee · 10 business days', '€280'], ['OCMA fee · 5 business days', '€560'],
        ['Biometrics, per person', '€45–€80'], ['Legal renewal fee, per person', '€500'],
      ] },
      { title: 'What If an Application Is Denied?', paragraphs: ['Denial is possible if the applicant does not meet the TRP criteria. Dream Country Visas works proactively to identify any issues early and guide clients accordingly.'] },
      { title: 'Permanent Residency & Citizenship', items: [
        'Permanent residency — After holding a TRP for 5 years, meeting stay requirements of 8 months per year during 4 out of 5 years, and passing a Latvian language exam, PR can be granted. PR is issued for 5 years.',
        'Citizenship — After 10 years of residency (5 years TRP + 5 years PR), a language exam, history, anthem and constitutional knowledge tests, and proof of financial sufficiency.',
        'Dual citizenship — Allowed only with countries Latvia recognises for dual nationality: EU/EFTA members, NATO countries, Australia, Brazil or New Zealand.',
      ] },
      { title: 'Family & Social Rights', items: [
        'Who can be included? — Spouse through official marriage and dependent children under 18 can be added to the application.',
        'Right to work — Both the main applicant and spouse can legally work in Latvia with a TRP.',
        'Healthcare & education — Residents have access to Latvia’s education and healthcare systems, though health insurance is initially required.',
        'Address in Latvia — A declaration address in Latvia is mandatory to receive the TRP. The investment company might provide such an address, with an annual fee of €300.',
      ] },
      { title: 'Travel & Mobility', paragraphs: [
        'With a Latvian TRP you can travel visa-free within the Schengen Area for up to 90 days in any 180-day period. The TRP allows freedom of travel, but not freedom of resettlement.',
        'The investor and family members are independently responsible for calculating their allowed days of stay in the Schengen Area. Any violation of Schengen entry and exit rules, or overstay in other Schengen countries excluding Latvia, may result in penalties and revocation of the Latvian TRP.',
      ] },
      { title: 'Health & Documentation', items: [
        'Health insurance — Mandatory for the TRP application.',
        'Medical certificate — A medical certificate issued in Latvia, including a lung X-ray report confirming the absence of certain infectious diseases, is required before receiving the TRP card at OCMA.',
        'Children under 14 — A lung X-ray can be made for children aged 14 and above. For younger children, a doctor’s certificate confirming tuberculosis vaccination is required; bring the child’s vaccination record. An appointment is arranged with a pulmonologist at the Tuberculosis and Lung Disease Centre.',
        'Depending on the child’s age, a blood test (€65, one working day) or a Mantoux test (€4, four working days) may be prescribed; newborns are not tested.',
        'Approximate cost per child — €70 for the doctor’s visit plus the test.',
      ] },
      { title: 'Taxes', paragraphs: [
        'Only income earned in Latvia is taxed, unless you spend more than 183 days a year in Latvia or register as a tax resident.',
        'Corporate tax: 0% on undistributed profits; 25% applies when profits are distributed as dividends.',
      ] },
    ],
  },
};

export const FACTSHEET_FAQS = {
  citizenship: {
    argentina: [
      { q: 'What is the minimum investment for Argentina citizenship?', a: 'The factsheet sets out a non-refundable USD 350,000 Treasury contribution or an USD 800,000 sovereign bond investment. Applications are currently open for expressions of interest.' },
      { q: 'How long does the Argentina programme take?', a: 'Processing takes under four months once a complete file is submitted. One in-person visit is required upon approval to capture biometrics, with no ongoing residence requirement.' },
      { q: 'Who can be included in an Argentina application?', a: 'A spouse, including a same-sex spouse, and children aged 25 or younger. Children aged 18 to 25 must never have married and have no children of their own; financial dependency is not required.' },
      { q: 'What are the additional family contributions?', a: 'USD 100,000 for the spouse, USD 100,000 for each eligible child aged 18 to 25, and USD 25,000 for each child under 18, contributed to the National Treasury.' },
      { q: 'What mobility benefits does Argentina offer?', a: 'The factsheet lists G20 citizenship, dual citizenship, Mercosur residence rights, a 10-year passport, and visa-free or visa-on-arrival access to 160+ countries.' },
    ],
    grenada: [
      { q: 'What are Grenada’s qualifying investment options?', a: 'A USD 235,000 National Transformation Fund donation for a single applicant or family of up to four; or approved real estate from USD 270,000 per qualifying share, with a minimum USD 50,000 additional non-refundable contribution. A whole unit requires at least USD 350,000.' },
      { q: 'Who can be included in a Grenada application?', a: 'A spouse, children under 30, unmarried siblings aged 18 and over, and parents and grandparents of the main applicant and spouse of any age.' },
      { q: 'What are the additional Grenada family contributions?', a: 'USD 25,000 for each member after the fourth, excluding qualifying siblings and dependent parents aged 55 and under; USD 50,000 for each parent aged 55 and under; and USD 75,000 for each qualifying sibling. Additional fees apply.' },
      { q: 'What is the USA E-2 domicile condition?', a: 'Eligibility to apply for the USA nonimmigrant investor visa follows continuous domicile in Grenada for at least three years, under Grenada’s E-2 Investor Visa treaty.' },
      { q: 'Who must attend the mandatory virtual interview?', a: 'All applicants aged 16 and older must attend the mandatory virtual interview.' },
      { q: 'Is there a minimum stay or property holding requirement?', a: 'There is no minimum stay requirement. Property must be held for five years if resold as a qualifying investment to another citizenship by investment investor; alternatively it can be sold at any point after purchase.' },
    ],
  },
  residency: {
    latvia: [
      { q: 'What investment does the Latvia factsheet describe?', a: 'An investment of €50,000 into the share capital of a Latvian company, plus a €10,000 government fee. The investment is returned after 6 or 8 years, depending on the agreement and applicable structure.' },
      { q: 'How long does Latvia residence processing take?', a: '6–8 months, with an additional 2–4 months possible in some circumstances.' },
      { q: 'How long is the Latvia residence permit valid?', a: 'Effective 15 September 2026, the TRP and residence card are issued for 2 years and are renewable for further 2-year periods, subject to the investment and renewal requirements.' },
      { q: 'What financial capacity must my family demonstrate?', a: 'A bank statement must show at least €9,360 for the main applicant, €9,360 for the spouse, and €2,808 for each child. A spouse and dependent children under 18 may be included.' },
      { q: 'Does Latvia residence allow settlement elsewhere in Schengen?', a: 'No. It permits travel in the Schengen Area for up to 90 days in any 180-day period, not resettlement. Overstays can result in penalties and revocation of the Latvian TRP.' },
      { q: 'What are the renewal and citizenship requirements?', a: 'Renewals take place every 2 years, with approximately 5 business days of physical presence. PR after 5 years requires 8 months per year during 4 out of 5 years and a Latvian language exam. Citizenship after 10 years requires the applicable language, history, anthem and constitutional knowledge tests and financial sufficiency.' },
      { q: 'Which applicants are excluded?', a: 'Russian and Belarus passport holders, applicants on international or EU sanctions lists, and nationals of countries subject to EU and bank sanctions are not eligible under the supplied factsheet. Latvian banks may also refuse high-risk-country funds.' },
    ],
  },
};

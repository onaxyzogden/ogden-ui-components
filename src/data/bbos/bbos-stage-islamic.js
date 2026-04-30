// BBOS Stage Islamic Data — full stage-scoped spiritual framing
// Each entry matches the MODULE_ATTRS shape from islamic-data.js:
//   attrs[], dua{}, readiness{frame, rows[], governing[], notYet[]}, reflection{frame, governing[], notYet[]}
// Consumed by IslamicPanel and ThresholdModal when activeBbosStage is set.

export const BBOS_STAGE_ISLAMIC = {
  IDY: {
    attrs: [
      {
        name: 'Al-Awwal',
        name_ar: 'الأوّل',
        title: 'The First',
        body: 'Al-Awwal precedes all creation. Every business begins not with your decision but with His permission. Founding a venture in His name anchors it to the only source that cannot be taken away.',
      },
      {
        name: 'Al-Badi',
        name_ar: 'البديع',
        title: 'The Originator',
        body: 'Al-Badi creates without precedent. Your foundation need not copy what already exists — it is an invitation for Him to originate something new through your effort and surrender.',
      },
    ],
    dua: {
      title: 'Before Establishing the Foundation',
      resumeTitle: 'Before Returning to Foundation Work',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: 'Rabbi ashraḥ lī ṣadrī wa yassir lī amrī',
      meaning: 'My Lord, expand for me my breast and ease for me my task.',
      source: 'Surah Ta-Ha 20:25–26',
    },
    readiness: {
      frame: 'Al-Awwal asks: does this foundation begin with His name or my ambition?',
      yesLabel: 'This foundation begins with His name when',
      notYetLabel: 'This foundation begins with my ambition when',
      rows: [
        {
          id: 'A1', attr: 'Al-Awwal', attr_ar: 'الأوّل', attrTitle: 'The First',
          attrFrame: 'Is this beginning His or mine?',
          yesLabel: 'This beginning is His when',
          notYetLabel: 'This beginning is still mine when',
          governing: 'My niyyah (intention) for this business is clear, halal, and stated before Allah.',
          notYet: 'I have not yet articulated why I am building this — the foundation is on assumption.',
        },
        {
          id: 'A2', attr: 'Al-Awwal',
          governing: 'The mission and values I am establishing would survive scrutiny before Allah.',
          notYet: 'The stated values and the actual plan are not yet aligned.',
        },
        {
          id: 'B1', attr: 'Al-Badi', attr_ar: 'البديع', attrTitle: 'The Originator',
          attrFrame: 'Am I building something genuinely new, or imitating without purpose?',
          yesLabel: "I'm building something new when",
          notYetLabel: 'I am imitating without purpose when',
          governing: 'I have identified what is distinctive about this venture and can articulate it clearly.',
          notYet: 'The offering is a copy of existing work without original purpose or differentiation.',
        },
        {
          id: 'B2', attr: 'Al-Badi',
          governing: 'I am open to Al-Badi reshaping the foundation as I build — not rigidly attached to my original design.',
          notYet: 'I am too attached to my initial vision to allow it to be refined.',
        },
      ],
      governing: [
        'My niyyah for this business is clear, halal, and stated before Allah.',
        'The mission and values I am establishing would survive scrutiny before Allah.',
        'I have identified what is distinctive about this venture and can articulate it clearly.',
        'I am open to Al-Badi reshaping the foundation as I build.',
      ],
      notYet: [
        'I have not yet articulated why I am building this — the foundation is on assumption.',
        'The stated values and the actual plan are not yet aligned.',
        'The offering is a copy of existing work without original purpose or differentiation.',
        'I am too attached to my initial vision to allow it to be refined.',
      ],
    },
    reflection: {
      frame: 'Al-Badi originated this work through me. Al-Awwal gave it a beginning.',
      yesLabel: 'Originality and intention were present when',
      notYetLabel: 'The work was mechanical when',
      governing: [
        'The foundation I established today is something I would not be ashamed to present to Allah.',
        'Something emerged in this work that surprised me — a sign that Al-Badi was active.',
      ],
      notYet: [
        'The work today was mechanical rather than intentional.',
        'I built on assumption rather than on verified foundation.',
      ],
    },
  },

  CRD: {
    attrs: [
      {
        name: "Al-Mu'min",
        name_ar: 'المؤمن',
        title: 'The Giver of Security',
        body: "Al-Mu'min establishes security through truth. Trust in a business is not manufactured — it is earned by consistent truthfulness, authenticated claims, and promises kept. Build your credibility as an act of worship.",
      },
      {
        name: 'Al-Wakil',
        name_ar: 'الوكيل',
        title: 'The Trustee',
        body: 'Al-Wakil holds the outcomes. You are responsible for the truth you put into the world; He is responsible for what grows from it. Make every claim honest, then trust the Trustee with the result.',
      },
    ],
    dua: {
      title: 'Before Building Trust and Credibility',
      resumeTitle: 'Before Returning to Truth Work',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَتَّقُوا اللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا وَيُكَفِّرْ عَنكُمْ سَيِّئَاتِكُمْ وَيَغْفِرْ لَكُمْ ۗ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ',
      trans: 'Yā ayyuhā alladhīna āmanū in tattaqū Allāha yajʿal lakum furqānā wa yukaffir ʿankum sayyiʾātikum wa yaghfir lakum, wa Allāhu dhū al-faḍli al-ʿaẓīm',
      meaning: 'O you who have believed, if you fear Allah, He will grant you a criterion and will remove from you your misdeeds and forgive you. And Allah is the possessor of great bounty.',
      source: 'Surah Al-Anfal 8:29',
    },
    readiness: {
      frame: "Al-Mu'min asks: is every claim I am making today verifiable and true?",
      yesLabel: 'My claims are verifiable and true when',
      notYetLabel: 'My claims fall short of truth when',
      rows: [
        {
          id: 'M1', attr: "Al-Mu'min", attr_ar: 'المؤمن', attrTitle: 'The Giver of Security',
          attrFrame: 'Can everything I am publishing be authenticated?',
          yesLabel: 'Everything I publish is authenticated when',
          notYetLabel: 'My claims are not yet substantiated when',
          governing: 'Every claim, testimonial, and credential I am presenting can be independently verified.',
          notYet: 'Some of what I am presenting is aspirational rather than substantiated.',
        },
        {
          id: 'M2', attr: "Al-Mu'min",
          governing: 'I have not exaggerated results or omitted relevant limitations.',
          notYet: 'I am shaping the truth to look better than it is — this is gharar.',
        },
        {
          id: 'W1', attr: 'Al-Wakil', attr_ar: 'الوكيل', attrTitle: 'The Trustee',
          attrFrame: 'Am I at peace with Allah knowing the full truth of what I am presenting?',
          yesLabel: 'I am at peace with the truth when',
          notYetLabel: 'I am adjusting the truth when',
          governing: 'I have released attachment to how the market receives my truth.',
          notYet: 'I am adjusting the truth to manage perception — trusting my spin more than Al-Wakil.',
        },
        {
          id: 'W2', attr: 'Al-Wakil',
          governing: 'My amanah (trustworthiness) is more important to me than any short-term conversion.',
          notYet: 'I am tempted to overstate in order to close faster.',
        },
      ],
      governing: [
        'Every claim, testimonial, and credential I am presenting can be independently verified.',
        'I have not exaggerated results or omitted relevant limitations.',
        'I have released attachment to how the market receives my truth.',
        'My amanah is more important to me than any short-term conversion.',
      ],
      notYet: [
        'Some of what I am presenting is aspirational rather than substantiated.',
        'I am shaping the truth to look better than it is — this is gharar.',
        'I am adjusting the truth to manage perception — trusting my spin more than Al-Wakil.',
        'I am tempted to overstate in order to close faster.',
      ],
    },
    reflection: {
      frame: "Al-Mu'min secured my reputation through truth. Al-Wakil held the outcomes.",
      yesLabel: 'Truth and trust were present when',
      notYetLabel: 'Truth was compromised when',
      governing: [
        'I can point to something today where I chose honesty over advantage.',
        'I trusted Al-Wakil with a result I could not control.',
      ],
      notYet: [
        'I compromised on a claim and told myself it was acceptable.',
        'I am still carrying anxiety about how my truth was received.',
      ],
    },
  },

  STR: {
    attrs: [
      {
        name: 'Al-Musawwir',
        name_ar: 'المصوّر',
        title: 'The Fashioner of Forms',
        body: 'Al-Musawwir gives shape to creation. Strategy is the act of fashioning form from possibility — defining how things will be arranged. Bring His precision to your operational design.',
      },
      {
        name: 'Al-Mudabbir',
        name_ar: 'المدبّر',
        title: 'The Arranger',
        body: 'Al-Mudabbir arranges all affairs with perfect wisdom. Your strategy is not a substitute for His planning — it is your faithful cooperation with the order He has made possible. Plan thoroughly, then release the arrangement to Him.',
      },
    ],
    dua: {
      title: 'Before Strategic Planning',
      resumeTitle: 'Before Returning to Strategy Work',
      arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
      trans: 'Rabbanā lā tuzigh qulūbanā baʿda idh hadaytanā wa hab lanā min ladunka raḥmah, innaka anta al-Wahhāb',
      meaning: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
      source: 'Surah Aal-Imran 3:8',
    },
    readiness: {
      frame: 'Al-Musawwir asks: does the structure I am building reflect wisdom, or just urgency?',
      yesLabel: 'The structure reflects wisdom when',
      notYetLabel: 'The structure reflects urgency when',
      rows: [
        {
          id: 'S1', attr: 'Al-Musawwir', attr_ar: 'المصوّر', attrTitle: 'The Fashioner of Forms',
          attrFrame: 'Is the structure I am designing genuinely purposeful?',
          yesLabel: 'The structure is purposeful when',
          notYetLabel: 'The structure is cosmetic when',
          governing: 'The system or process I am designing serves real needs — not organizational aesthetics.',
          notYet: 'I am building structure that looks organized but does not reduce actual friction.',
        },
        {
          id: 'S2', attr: 'Al-Musawwir',
          governing: 'The team architecture and roles reflect the actual work to be done, not titles desired.',
          notYet: 'Roles are defined around people, not around what the business genuinely needs.',
        },
        {
          id: 'D1', attr: 'Al-Mudabbir', attr_ar: 'المدبّر', attrTitle: 'The Arranger',
          attrFrame: 'Have I made the plan, then handed the arrangement to Allah?',
          yesLabel: 'I have planned and released when',
          notYetLabel: 'I am still gripping the arrangement when',
          governing: 'I have planned thoroughly and am at peace with what He will arrange from my plan.',
          notYet: "I am still gripping the outcomes of my strategy — not trusting Al-Mudabbir's arrangement.",
        },
        {
          id: 'D2', attr: 'Al-Mudabbir',
          governing: 'My strategy is simple enough that the team can execute without constant re-explanation.',
          notYet: 'The strategy is complex because it has not yet been refined to its essential form.',
        },
      ],
      governing: [
        'The system or process I am designing serves real needs — not organizational aesthetics.',
        'The team architecture and roles reflect the actual work to be done, not titles desired.',
        'I have planned thoroughly and am at peace with what He will arrange from my plan.',
        'My strategy is simple enough that the team can execute without constant re-explanation.',
      ],
      notYet: [
        'I am building structure that looks organized but does not reduce actual friction.',
        'Roles are defined around people, not around what the business genuinely needs.',
        "I am still gripping the outcomes of my strategy — not trusting Al-Mudabbir's arrangement.",
        'The strategy is complex because it has not yet been refined to its essential form.',
      ],
    },
    reflection: {
      frame: 'Al-Musawwir gave form to my planning. Al-Mudabbir held the arrangement.',
      yesLabel: 'Wisdom and release were present when',
      notYetLabel: 'Urgency or control remained when',
      governing: [
        'The strategy I worked on today is clearer and more executable than when I started.',
        'I released control of the outcome of at least one planning decision.',
      ],
      notYet: [
        'The planning session added complexity rather than clarity.',
        'I am still carrying the weight of how the strategy will land rather than trusting the Arranger.',
      ],
    },
  },

  OFR: {
    attrs: [
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'All provision flows from Ar-Razzaq. Pricing your offering is an act of stewardship, not extraction — you name a price that reflects genuine value and trust that He will bring the right clients. Greed constricts; trust opens.',
      },
      {
        name: 'Al-Karim',
        name_ar: 'الكريم',
        title: 'The Generous',
        body: 'Al-Karim gives beyond what is deserved, with nobility. Build generosity into your offer — not as a loss-leader tactic, but as an expression of His character flowing through your work. Generosity in the offer is barakah in the business.',
      },
    ],
    dua: {
      title: 'Before Defining and Pricing the Offering',
      resumeTitle: 'Before Returning to Offering Work',
      arabic: 'وَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا ۚ وَاتَّقُوا اللَّهَ الَّذِي أَنتُم بِهِ مُؤْمِنُونَ',
      trans: 'Wa kulū mimmā razaqakumu Allāhu ḥalālan ṭayyibā, wa-ttaqū Allāha alladhī antum bihi muʾminūn',
      meaning: 'And eat of what Allah has provided for you which is lawful and good. And fear Allah, in whom you are believers.',
      source: 'Surah Al-Ma\'idah 5:88',
    },
    readiness: {
      frame: 'Ar-Razzaq asks: is this offer free from deception and driven by genuine value?',
      yesLabel: 'The offer is driven by genuine value when',
      notYetLabel: 'The offer contains deception when',
      rows: [
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Is the provision I am offering genuinely what the client needs?',
          yesLabel: 'The provision is genuine when',
          notYetLabel: 'The provision falls short when',
          governing: 'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
          notYet: 'The pricing reflects extraction rather than fair exchange.',
        },
        {
          id: 'R2', attr: 'Ar-Razzaq',
          governing: 'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
          notYet: 'The offer contains undefined elements that the client cannot accurately evaluate.',
        },
        {
          id: 'K1', attr: 'Al-Karim', attr_ar: 'الكريم', attrTitle: 'The Generous',
          attrFrame: 'Is generosity built into this offer beyond the transactional minimum?',
          yesLabel: 'Generosity is built in when',
          notYetLabel: 'The offer is transactional when',
          governing: 'There is genuine generosity in this offer — something given that was not required.',
          notYet: 'The offer is designed to give the minimum required to close the deal.',
        },
        {
          id: 'K2', attr: 'Al-Karim',
          governing: 'The value the client receives exceeds what I have charged — I would be proud to show this to Allah.',
          notYet: 'The price-to-value ratio advantages me disproportionately over the client.',
        },
      ],
      governing: [
        'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
        'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
        'There is genuine generosity in this offer — something given that was not required.',
        'The value the client receives exceeds what I have charged.',
      ],
      notYet: [
        'The pricing reflects extraction rather than fair exchange.',
        'The offer contains undefined elements that the client cannot accurately evaluate.',
        'The offer is designed to give the minimum required to close the deal.',
        'The price-to-value ratio advantages me disproportionately over the client.',
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq provided through the offer. Al-Karim expressed His generosity through mine.',
      yesLabel: 'Value and generosity were present when',
      notYetLabel: 'Extraction or ambiguity entered when',
      governing: [
        'The offer I worked on today is something I would be proud to present to Allah.',
        'I built in more generosity than was commercially necessary.',
      ],
      notYet: [
        'The offer was shaped more by competitive pressure than by genuine value.',
        'I did not make it as clear as it could be — ambiguity remains.',
      ],
    },
  },

  OUT: {
    attrs: [
      {
        name: 'Al-Hadi',
        name_ar: 'الهادي',
        title: 'The Guide',
        body: 'Al-Hadi guides whom He wills to the straight path. Ethical outreach is guidance, not manipulation — you put the right thing in front of the right people and trust Him with who responds. You are not engineering consent; you are extending an invitation.',
      },
      {
        name: 'An-Nur',
        name_ar: 'النور',
        title: 'The Light',
        body: 'An-Nur is the Light of the heavens and the earth. Your outreach carries His light when it illuminates a real problem and offers a genuine path forward — not when it uses darkness (fear, scarcity, pressure) to drive action.',
      },
    ],
    dua: {
      title: 'Before Reaching Out',
      resumeTitle: 'Before Resuming Outreach',
      arabic: 'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',
      trans: 'Allāhumma ihdinī wa saddidnī',
      meaning: 'O Allah, guide me and keep me on the right course.',
      source: 'Sahih Muslim 2725',
    },
    readiness: {
      frame: 'Al-Hadi asks: am I guiding, or am I manipulating?',
      yesLabel: 'I am guiding when',
      notYetLabel: 'I am manipulating when',
      rows: [
        {
          id: 'H1', attr: 'Al-Hadi', attr_ar: 'الهادي', attrTitle: 'The Guide',
          attrFrame: 'Is my outreach guiding or engineering?',
          yesLabel: 'My outreach is guiding when',
          notYetLabel: 'My outreach is engineering when',
          governing: 'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
          notYet: 'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        },
        {
          id: 'H2', attr: 'Al-Hadi',
          governing: 'I have identified the right people to reach — those who genuinely need what I offer.',
          notYet: 'I am broadcasting broadly rather than serving specifically.',
        },
        {
          id: 'N1', attr: 'An-Nur', attr_ar: 'النور', attrTitle: 'The Light',
          attrFrame: 'Does my outreach illuminate or obscure?',
          yesLabel: 'My outreach illuminates when',
          notYetLabel: 'My outreach obscures when',
          governing: 'The message is honest about what I offer and what it cannot do.',
          notYet: 'The message is misleadingly positive — limitations are hidden.',
        },
        {
          id: 'N2', attr: 'An-Nur',
          governing: 'I am comfortable with Allah witnessing every message and interaction in this outreach.',
          notYet: 'There are tactics in the outreach I would not want brought to account.',
        },
      ],
      governing: [
        'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
        'I have identified the right people to reach — those who genuinely need what I offer.',
        'The message is honest about what I offer and what it cannot do.',
        'I am comfortable with Allah witnessing every message and interaction in this outreach.',
      ],
      notYet: [
        'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        'I am broadcasting broadly rather than serving specifically.',
        'The message is misleadingly positive — limitations are hidden.',
        'There are tactics in the outreach I would not want brought to account.',
      ],
    },
    reflection: {
      frame: 'Al-Hadi guided through my outreach. An-Nur illuminated the path for those reached.',
      yesLabel: 'Guidance and light were present when',
      notYetLabel: 'Manipulation or darkness entered when',
      governing: [
        'The outreach I executed today was something I would be comfortable presenting to Allah.',
        'I chose honesty over persuasion at at least one point.',
      ],
      notYet: [
        'The messaging was shaped more by conversion goals than by genuine guidance.',
        'I used a tactic today I would not want on my account.',
      ],
    },
  },

  SLS: {
    attrs: [
      {
        name: 'As-Sami',
        name_ar: 'السميع',
        title: 'The All-Hearing',
        body: 'As-Sami hears every word spoken and every word left unsaid. Sales is not a performance — it is a conversation witnessed by the All-Hearing. Every claim, every promise, and every silence is on the record. Sell as though Allah is listening, because He is.',
      },
      {
        name: 'Al-Basir',
        name_ar: 'البصير',
        title: 'The All-Seeing',
        body: 'Al-Basir sees the full reality of the person in front of you — their need, their capacity, their situation. Consultative selling begins with genuine sight: seeing what the prospect actually needs, not what would benefit you most.',
      },
    ],
    dua: {
      title: 'Before Sales Conversations',
      resumeTitle: 'Before Resuming Sales Work',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا ۝ يُصْلِحْ لَكُمْ أَعْمَالَكُمْ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ',
      trans: 'Yā ayyuhā alladhīna āmanū ittaqū Allāha wa qūlū qawlan sadīdā. Yuṣliḥ lakum aʿmālakum wa yaghfir lakum dhunūbakum',
      meaning: 'O you who have believed, fear Allah and speak words of appropriate justice. He will amend for you your deeds and forgive you your sins.',
      source: 'Surah Al-Ahzab 33:70–71',
    },
    readiness: {
      frame: 'As-Sami asks: am I entering this conversation to listen, or to perform?',
      yesLabel: 'I am entering to listen when',
      notYetLabel: 'I am entering to perform when',
      rows: [
        {
          id: 'S1', attr: 'As-Sami', attr_ar: 'السميع', attrTitle: 'The All-Hearing',
          attrFrame: 'Am I genuinely listening or waiting to speak?',
          yesLabel: 'I am genuinely listening when',
          notYetLabel: 'I am waiting to speak when',
          governing: 'I am entering this conversation with the intention to understand the prospect first.',
          notYet: 'I am entering with a script rather than an open posture of listening.',
        },
        {
          id: 'S2', attr: 'As-Sami',
          governing: 'Every commitment I make in this conversation is one I can keep.',
          notYet: 'I am tempted to promise things I am not sure I can deliver.',
        },
        {
          id: 'B1', attr: 'Al-Basir', attr_ar: 'البصير', attrTitle: 'The All-Seeing',
          attrFrame: 'Am I seeing their real need, or projecting my desired outcome?',
          yesLabel: 'I am seeing their real need when',
          notYetLabel: 'I am projecting my desired outcome when',
          governing: "I can clearly articulate the prospect's actual situation and whether my offer genuinely fits.",
          notYet: 'I am trying to sell regardless of fit — the offer is not right for this person right now.',
        },
        {
          id: 'B2', attr: 'Al-Basir',
          governing: 'If this offer is not the right fit, I am willing to say so honestly.',
          notYet: 'I am pushing toward a close even where there is doubt about fit.',
        },
      ],
      governing: [
        'I am entering this conversation with the intention to understand the prospect first.',
        'Every commitment I make in this conversation is one I can keep.',
        "I can clearly articulate the prospect's actual situation and whether my offer genuinely fits.",
        'If this offer is not the right fit, I am willing to say so honestly.',
      ],
      notYet: [
        'I am entering with a script rather than an open posture of listening.',
        'I am tempted to promise things I am not sure I can deliver.',
        'I am trying to sell regardless of fit — the offer is not right for this person right now.',
        'I am pushing toward a close even where there is doubt about fit.',
      ],
    },
    reflection: {
      frame: 'As-Sami heard every word of my conversations. Al-Basir saw the reality beneath them.',
      yesLabel: 'Listening and sight were present when',
      notYetLabel: 'Performance or projection entered when',
      governing: [
        'I listened before speaking in at least one conversation today.',
        'I kept every promise made — or clarified a commitment before it became a breach.',
      ],
      notYet: [
        'A conversation today was more performance than service.',
        'I made a commitment I am not fully confident I can keep.',
      ],
    },
  },

  DEL: {
    attrs: [
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Excellence-Giver',
        body: 'Al-Muhsin perfects rather than merely fulfils. Delivery with ihsan means exceeding the specification not for commercial advantage but because the work deserves to be done well. Every deliverable is an act of worship when it carries genuine excellence.',
      },
      {
        name: 'Al-Latif',
        name_ar: 'اللطيف',
        title: 'The Subtle, The All-Aware',
        body: 'Al-Latif attends to the finest details — the subtleties that others miss. In delivery, this means attending to what the client did not explicitly ask for but genuinely needs: the communication, the care, the quality of presence, the unspoken expectation.',
      },
    ],
    dua: {
      title: 'Before Delivering Work',
      resumeTitle: 'Before Resuming Delivery',
      arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
      trans: 'Fa-dhkurūnī adhkurkum, wa-shkurū lī wa lā takfurūn',
      meaning: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
      source: 'Surah Al-Baqarah 2:152',
    },
    readiness: {
      frame: 'Al-Muhsin asks: am I bringing ihsan to this delivery, or just getting it done?',
      yesLabel: 'I am bringing ihsan to this delivery when',
      notYetLabel: 'I am just getting it done when',
      rows: [
        {
          id: 'M1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Am I delivering with ihsan or with adequacy?',
          yesLabel: 'I am delivering with ihsan when',
          notYetLabel: 'I am delivering with adequacy when',
          governing: 'I am approaching this deliverable with the intention of excellence, not just completion.',
          notYet: 'I am doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'M2', attr: 'Al-Muhsin',
          governing: 'I would redo this if it fell short — from genuine care, not perfectionism.',
          notYet: 'The work feels like an obligation to discharge rather than an act to offer.',
        },
        {
          id: 'L1', attr: 'Al-Latif', attr_ar: 'اللطيف', attrTitle: 'The Subtle',
          attrFrame: 'Am I attending to what was not said but genuinely needed?',
          yesLabel: 'I am attending to the unspoken when',
          notYetLabel: 'I am delivering only what was specified when',
          governing: 'I have considered the unspoken expectations and subtle needs behind the explicit deliverable.',
          notYet: 'I am delivering exactly what was specified without asking whether it is what was actually needed.',
        },
        {
          id: 'L2', attr: 'Al-Latif',
          governing: 'My communication quality during delivery matches my work quality.',
          notYet: 'I am delivering good work but communicating poorly — the client cannot see what they are receiving.',
        },
      ],
      governing: [
        'I am approaching this deliverable with the intention of excellence, not just completion.',
        'I would redo this if it fell short — from genuine care, not perfectionism.',
        'I have considered the unspoken expectations and subtle needs behind the explicit deliverable.',
        'My communication quality during delivery matches my work quality.',
      ],
      notYet: [
        'I am doing the minimum that will pass, not the most genuinely possible right now.',
        'The work feels like an obligation to discharge rather than an act to offer.',
        'I am delivering exactly what was specified without asking whether it is what was actually needed.',
        'I am delivering good work but communicating poorly — the client cannot see what they are receiving.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of my delivery. Al-Latif attended to the subtleties I brought.',
      yesLabel: 'Ihsan and subtlety were present when',
      notYetLabel: 'Adequacy or inattention entered when',
      governing: [
        'I can point to at least one place in the delivery today where I chose quality over speed.',
        'I attended to something the client did not ask for but genuinely needed.',
      ],
      notYet: [
        'I cut corners on something and justified it as efficiency.',
        'The communication around the delivery fell short of the work itself.',
      ],
    },
  },

  RET: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Loving',
        body: 'Al-Wadud loves with constancy — not conditional on performance. Client retention rooted in genuine care outlasts retention built on tactics. Love the client enough to tell them hard truths, to invest in their growth, to remember them when there is nothing to sell.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Preserver',
        body: 'Al-Hafiz preserves and protects what has been entrusted. Every client relationship is an amanah — a trust placed in your care. Retention is faithful stewardship of that trust: remembering, protecting, and nurturing what was built.',
      },
    ],
    dua: {
      title: 'Before Client Retention and Relationship Work',
      resumeTitle: 'Before Returning to Retention Work',
      arabic: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ',
      trans: 'Wa allafa bayna qulūbihim. Law anfaqta mā fī al-arḍi jamīʿan mā allafta bayna qulūbihim wa lākinna Allāha allafa baynahum, innahu ʿazīzun ḥakīm',
      meaning: 'And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.',
      source: 'Surah Al-Anfal 8:63',
    },
    readiness: {
      frame: 'Al-Wadud asks: is my care for this client genuine, or purely commercial?',
      yesLabel: 'My care is genuine when',
      notYetLabel: 'My care is purely commercial when',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Loving',
          attrFrame: 'Is my investment in this relationship genuine?',
          yesLabel: 'My investment is genuine when',
          notYetLabel: 'My investment is transactional when',
          governing: 'My care for this client would persist even if they stopped paying — it is not purely transactional.',
          notYet: 'My attention to this client is driven entirely by their commercial value.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am willing to tell this client hard truths that serve them even if it risks the relationship.',
          notYet: 'I am managing the relationship rather than genuinely serving the client.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Am I faithfully preserving what was built with this client?',
          yesLabel: 'I am faithfully preserving when',
          notYetLabel: 'I am letting commitments erode when',
          governing: 'I have kept track of what matters to this client and followed through on commitments made.',
          notYet: 'Commitments made in the early relationship have not been systematically honored.',
        },
        {
          id: 'H2', attr: 'Al-Hafiz',
          governing: "I am actively protecting this client's outcomes — not waiting for them to raise problems.",
          notYet: 'I am reactive rather than proactive in preserving client value.',
        },
      ],
      governing: [
        'My care for this client would persist even if they stopped paying — it is not purely transactional.',
        'I am willing to tell this client hard truths that serve them even if it risks the relationship.',
        'I have kept track of what matters to this client and followed through on commitments made.',
        "I am actively protecting this client's outcomes — not waiting for them to raise problems.",
      ],
      notYet: [
        'My attention to this client is driven entirely by their commercial value.',
        'I am managing the relationship rather than genuinely serving the client.',
        'Commitments made in the early relationship have not been systematically honored.',
        'I am reactive rather than proactive in preserving client value.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud loved through my care. Al-Hafiz preserved what was built.',
      yesLabel: 'Love and preservation were present when',
      notYetLabel: 'Commerce or neglect entered when',
      governing: [
        'I invested in a client relationship today where there was nothing immediate to sell.',
        'I protected a client outcome without being asked.',
      ],
      notYet: [
        'My client interactions today were driven by commercial need, not genuine care.',
        'Something that was promised to a client earlier was not preserved or followed through.',
      ],
    },
  },

  OPT: {
    attrs: [
      {
        name: 'Al-Hasib',
        name_ar: 'الحسيب',
        title: 'The Reckoner',
        body: 'Al-Hasib keeps perfect account of every act. Optimization begins with honest reckoning — what worked, what did not, and why. Fudging the numbers or avoiding the hard truth delays the accountability that Al-Hasib has already completed.',
      },
      {
        name: 'Al-Khabir',
        name_ar: 'الخبير',
        title: 'The All-Aware',
        body: 'Al-Khabir is aware of the subtlest dynamics — the hidden causes, the lagging indicators, the patterns not yet visible. Review your outcomes not just with metrics but with wisdom: what did the results actually tell you, and what did you miss?',
      },
    ],
    dua: {
      title: 'Before Reviewing and Optimizing',
      resumeTitle: 'Before Returning to Optimization Work',
      arabic: 'قَدْ جَاءَكُم بَصَائِرُ مِن رَّبِّكُمْ ۖ فَمَنْ أَبْصَرَ فَلِنَفْسِهِ ۖ وَمَنْ عَمِيَ فَعَلَيْهَا',
      trans: 'Qad jāʾakum baṣāʾiru min rabbikum, fa-man abṣara fa-li-nafsih, wa man ʿamiya fa-ʿalayhā',
      meaning: 'There has come to you enlightenment from your Lord. So whoever will see does so for the benefit of his soul, and whoever is blind does harm against it.',
      source: 'Surah Al-An\'am 6:104',
    },
    readiness: {
      frame: 'Al-Hasib asks: am I willing to reckon honestly — even where the numbers are uncomfortable?',
      yesLabel: 'I am reckoning honestly when',
      notYetLabel: 'I am reckoning selectively when',
      rows: [
        {
          id: 'H1', attr: 'Al-Hasib', attr_ar: 'الحسيب', attrTitle: 'The Reckoner',
          attrFrame: 'Am I reckoning honestly or selectively?',
          yesLabel: 'I am reckoning honestly when',
          notYetLabel: 'I am reckoning selectively when',
          governing: 'I am looking at the full picture — including what failed and what I do not understand yet.',
          notYet: 'I am emphasizing favorable metrics and avoiding honest engagement with failures.',
        },
        {
          id: 'H2', attr: 'Al-Hasib',
          governing: 'The decisions I make from this review are based on what the data actually says, not what I hoped it would say.',
          notYet: 'I am confirmation-biased — using the review to validate what I already believed.',
        },
        {
          id: 'K1', attr: 'Al-Khabir', attr_ar: 'الخبير', attrTitle: 'The All-Aware',
          attrFrame: 'Am I looking beneath the surface metrics?',
          yesLabel: 'I am looking beneath the surface when',
          notYetLabel: 'I am staying on the surface when',
          governing: 'I am asking why results came in as they did — not just recording what happened.',
          notYet: 'The review is superficial — capturing metrics without understanding causes.',
        },
        {
          id: 'K2', attr: 'Al-Khabir',
          governing: 'I have identified at least one insight in this cycle that surprised me — evidence that Al-Khabir revealed something.',
          notYet: 'The review confirmed everything I already knew — no genuine learning emerged.',
        },
      ],
      governing: [
        'I am looking at the full picture — including what failed and what I do not understand yet.',
        'The decisions I make from this review are based on what the data actually says, not what I hoped.',
        'I am asking why results came in as they did — not just recording what happened.',
        'I have identified at least one insight in this cycle that surprised me.',
      ],
      notYet: [
        'I am emphasizing favorable metrics and avoiding honest engagement with failures.',
        'I am confirmation-biased — using the review to validate what I already believed.',
        'The review is superficial — capturing metrics without understanding causes.',
        'The review confirmed everything I already knew — no genuine learning emerged.',
      ],
    },
    reflection: {
      frame: 'Al-Hasib completed the account. Al-Khabir revealed what was hidden.',
      yesLabel: 'Honest reckoning was present when',
      notYetLabel: 'Selective reckoning entered when',
      governing: [
        'I reckoned honestly today — including with what I did not want to see.',
        'Something emerged in the review that genuinely surprised or taught me.',
      ],
      notYet: [
        'The review was more comfortable than honest.',
        'I am carrying forward an unresolved pattern without committing to change it.',
      ],
    },
  },
};

/** Get Islamic data for a BBOS stage by ID */
export function getBbosStageIslamic(stageId) {
  return BBOS_STAGE_ISLAMIC[stageId] || null;
}

import { SSCQuestion } from '../types';

export const SET_2_QUESTIONS: SSCQuestion[] = [
  // TELUGU - 10 Qs (1 to 10)
  {
    id: 's2_tel_01',
    subjectId: 'telugu',
    questionNumber: 1,
    questionText: '"ధన్యుడు" పాఠ్యభాగంలో హిరణ్యకుడు అను ఎలుక ఏ మిత్రునితో సంభాషిస్తుంది?',
    options: ['మంథరకుడు (తాబేలు)', 'లఘుపతనకుడు (కాకి)', 'చిత్రాంగుడు (జింక)', 'పుండరీకుడు (పులి)'],
    correctOptionIndex: 1,
    topic: 'పాఠ్యభాగ విషయ సంగ్రహం',
    difficulty: 'Easy',
    explanation: 'హితోపదేశం నీతిచంద్రిక కథలో హిరణ్యకుడు (ఎలుకల రాజు) లఘుపతనకుడు అను కాకితో స్నేహ సంభాషణ చేస్తుంది.'
  },
  {
    id: 's2_tel_02',
    subjectId: 'telugu',
    questionNumber: 2,
    questionText: '"సూర్యోదయము" పదం ఏ సంధికి ఉదాహరణ?',
    options: ['గుణ సంధి', 'సవర్ణదీర్ఘ సంధి', 'వృద్ధి సంధి', 'ఉత్వ సంధి'],
    correctOptionIndex: 0,
    topic: 'సంధులు',
    difficulty: 'Easy',
    explanation: 'సూర్య + ఉదయము = సూర్యోదయము (అ-కారమునకు ఉ పరమైనప్పుడు "ఓ" ఏకాదేశమగును - గుణ సంధి).'
  },
  {
    id: 's2_tel_03',
    subjectId: 'telugu',
    questionNumber: 3,
    questionText: '"చంపకమాల" వృత్త పద్య పాదంలో గణాలు ఏవి?',
    options: ['న జ భ జ జ జ ర', 'భ ర న భ భ ర వ', 'స భ ర న మ య వ', 'మ స జ స త త గ'],
    correctOptionIndex: 0,
    topic: 'ఛందస్సు',
    difficulty: 'Medium',
    explanation: 'చంపకమాల వృత్త పద్యంలో "న-జ-భ-జ-జ-జ-ర" అను గణాలు ఉంటాయి (21 అక్షరాలు, 11వ అక్షరం యతి).'
  },
  {
    id: 's2_tel_04',
    subjectId: 'telugu',
    questionNumber: 4,
    questionText: '"ముక్కంటి" పదంలోని సమాసము ఏది?',
    options: ['ద్విగు సమాసం', 'బహువ్రీహి సమాసం', 'ద్వంద్వ సమాసం', 'తత్పురుష సమాసం'],
    correctOptionIndex: 1,
    topic: 'సమాసాలు',
    difficulty: 'Medium',
    explanation: '"మూడు కన్నులు కలవాడు" (శివుడు) - అన్యపదార్థ ప్రాధాన్యం గలది కాబట్టి బహువ్రీహి సమాసం.'
  },
  {
    id: 's2_tel_05',
    subjectId: 'telugu',
    questionNumber: 5,
    questionText: '"కల్పవృక్షం" పదానికి సమానార్థక పదం ఏది?',
    options: ['కోరిన కోర్కెలు తీర్చే పవిత్ర చెట్టు', 'పెద్ద మర్రి చెట్టు', 'విష వృక్షం', 'ఎడారి చెట్టు'],
    correctOptionIndex: 0,
    topic: 'అర్థాలు & పర్యాయాలు',
    difficulty: 'Easy',
    explanation: 'కల్పవృక్షం లేదా కల్పతరువు అనగా కోరిన కోర్కెలు తీర్చే అమరలోక వృక్షం.'
  },
  {
    id: 's2_tel_06',
    subjectId: 'telugu',
    questionNumber: 6,
    questionText: '"అగ్గి" పదానికి సంస్కృత ప్రకృతి రూపం ఏది?',
    options: ['అగ్ని', 'మంట', 'జ్వాల', 'నిప్పు'],
    correctOptionIndex: 0,
    topic: 'ప్రకృతి - వికృతి',
    difficulty: 'Easy',
    explanation: 'సంస్కృత ప్రకృతి "అగ్ని" కి సమానమైన తద్భవ వికృతి రూపం "అగ్గి".'
  },
  {
    id: 's2_tel_07',
    subjectId: 'telugu',
    questionNumber: 7,
    questionText: '"ఆకాశరామన్న ఉత్తరం" అనే జాతీయాన్ని ఏ సందర్భంలో వాడతారు?',
    options: ['రచయిత పేరు లేని అజ్ఞాత లేఖ', 'దేవునికి రాసిన ఉత్తరం', 'విమానంలో పంపిన లేఖ', 'ప్రేమ లేఖ'],
    correctOptionIndex: 0,
    topic: 'జాతీయాలు',
    difficulty: 'Easy',
    explanation: 'ఎవరు రాశారో తెలియని అనామక లేదా అజ్ఞాత ఉత్తరాన్ని "ఆకాశరామన్న ఉత్తరం" అంటారు.'
  },
  {
    id: 's2_tel_08',
    subjectId: 'telugu',
    questionNumber: 8,
    questionText: '"మా ఊరి చెరువు సముద్రమా అన్నట్లున్నది" - ఏ అలంకారము?',
    options: ['ఉత్ప్రేక్షాలంకారము', 'ఉపమాలంకారము', 'రూపకాలంకారము', 'అతిశయోక్తి'],
    correctOptionIndex: 0,
    topic: 'అలంకారాలు',
    difficulty: 'Medium',
    explanation: 'ఉపమేయాన్ని ఉపమానముగా సంభావించినచో (ఊహించినచో) అది ఉత్ప్రేక్షాలంకారము అగును.'
  },
  {
    id: 's2_tel_09',
    subjectId: 'telugu',
    questionNumber: 9,
    questionText: '"దేశమును ప్రేమించుమన్నా మంచియన్నది పెంచుమన్నా" అని ప్రబోధించిన కవి ఎవరు?',
    options: ['గురజాడ అప్పారావు', 'రాయప్రోలు సుబ్బారావు', 'దేవులపల్లి కృష్ణశాస్త్రి', 'శ్రీశ్రీ'],
    correctOptionIndex: 0,
    topic: 'కవుల పరిచయం',
    difficulty: 'Easy',
    explanation: 'ఆధునిక తెలుగు నాటక, కవితా పితామహుడు గురజాడ అప్పారావు గారు ఈ దేశభక్తి గేయాన్ని రాశారు.'
  },
  {
    id: 's2_tel_10',
    subjectId: 'telugu',
    questionNumber: 10,
    questionText: '"దయచేసి నన్ను క్షమించండి" - ఇది ఏ రకమైన వాక్యము?',
    options: ['ప్రార్థనార్థక వాక్యం', 'ఆశ్చర్యార్థక వాక్యం', 'విధ్యర్థక వాక్యం', 'నిషేధార్థక వాక్యం'],
    correctOptionIndex: 0,
    topic: 'వాక్య రకాలు',
    difficulty: 'Easy',
    explanation: 'దయచేసి, వేడుకొనుట వంటి ప్రార్థనను సూచించే వాక్యాలను ప్రార్థనార్థక వాక్యాలు అంటారు.'
  },

  // ENGLISH - 10 Qs (11 to 20)
  {
    id: 's2_eng_11',
    subjectId: 'english',
    questionNumber: 11,
    questionText: 'Identify the sentence with the correct use of article:',
    options: ['He is an European citizen.', 'He is a European citizen.', 'He is the European citizen in general.', 'He is an unique teacher.'],
    correctOptionIndex: 1,
    topic: 'Articles',
    difficulty: 'Easy',
    explanation: '"European" begins with the consonant sound /juː/ (yu), hence takes the indefinite article "a".'
  },
  {
    id: 's2_eng_12',
    subjectId: 'english',
    questionNumber: 12,
    questionText: 'Change into Comparative Degree: "Mount Everest is the highest peak in the world."',
    options: [
      'Mount Everest is higher than any other peak in the world.',
      'Mount Everest is as high as other peaks in the world.',
      'No other peak is higher than Mount Everest.',
      'Mount Everest is more high than all peaks in the world.'
    ],
    correctOptionIndex: 0,
    topic: 'Degrees of Comparison',
    difficulty: 'Medium',
    explanation: 'Superlative "the highest" transforms to "higher than any other peak" in the Comparative degree.'
  },
  {
    id: 's2_eng_13',
    subjectId: 'english',
    questionNumber: 13,
    questionText: 'Choose the correct synonym of "METICULOUS":',
    options: ['Careless', 'Thorough & Precise', 'Lazy', 'Hasty'],
    correctOptionIndex: 1,
    topic: 'Synonyms',
    difficulty: 'Medium',
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise.'
  },
  {
    id: 's2_eng_14',
    subjectId: 'english',
    questionNumber: 14,
    questionText: 'Which phrasal verb means "to cancel an event or meeting"?',
    options: ['Call off', 'Call on', 'Call out', 'Call in'],
    correctOptionIndex: 0,
    topic: 'Phrasal Verbs',
    difficulty: 'Easy',
    explanation: '"To call off" means to cancel an arranged schedule or match.'
  },
  {
    id: 's2_eng_15',
    subjectId: 'english',
    questionNumber: 15,
    questionText: 'Identify the correct conjunction: "______ he was ill, he attended the annual examination."',
    options: ['Because', 'Although', 'Unless', 'Since'],
    correctOptionIndex: 1,
    topic: 'Conjunctions',
    difficulty: 'Easy',
    explanation: '"Although" expresses contrast between illness and attending.'
  },
  {
    id: 's2_eng_16',
    subjectId: 'english',
    questionNumber: 16,
    questionText: 'Complete with the right tense: "By this time next year, I ______ my SSC board examinations."',
    options: ['will complete', 'will have completed', 'completed', 'had completed'],
    correctOptionIndex: 1,
    topic: 'Future Perfect Tense',
    difficulty: 'Hard',
    explanation: '"By this time next year" requires Future Perfect ("will have + past participle").'
  },
  {
    id: 's2_eng_17',
    subjectId: 'english',
    questionNumber: 17,
    questionText: 'Select the one-word substitute for "A person who can speak two languages fluently":',
    options: ['Monoglot', 'Bilingual', 'Polyglot', 'Linguist'],
    correctOptionIndex: 1,
    topic: 'One Word Substitutes',
    difficulty: 'Easy',
    explanation: 'A person fluent in two languages is termed "Bilingual".'
  },
  {
    id: 's2_eng_18',
    subjectId: 'english',
    questionNumber: 18,
    questionText: 'Choose the correct preposition: "The brave soldiers fought ______ courage and valor."',
    options: ['with', 'by', 'at', 'from'],
    correctOptionIndex: 0,
    topic: 'Prepositions',
    difficulty: 'Easy',
    explanation: 'The preposition "with" is used to indicate manner.'
  },
  {
    id: 's2_eng_19',
    subjectId: 'english',
    questionNumber: 19,
    questionText: 'Identify the noun form of the adjective "BRAVE":',
    options: ['Bravely', 'Bravery', 'Braver', 'Braving'],
    correctOptionIndex: 1,
    topic: 'Parts of Speech',
    difficulty: 'Easy',
    explanation: '"Bravery" is the abstract noun form of the adjective "Brave".'
  },
  {
    id: 's2_eng_20',
    subjectId: 'english',
    questionNumber: 20,
    questionText: 'Identify the error part: "One of my friends (A) / are preparing (B) / for the SSC exam (C) / diligently (D)."',
    options: ['Part A', 'Part B', 'Part C', 'No error'],
    correctOptionIndex: 1,
    topic: 'Spotting Errors',
    difficulty: 'Medium',
    explanation: 'The subject "One" is singular, so it takes singular verb "is preparing", not "are preparing".'
  },

  // HINDI - 10 Qs (21 to 30)
  {
    id: 's2_hin_21',
    subjectId: 'hindi',
    questionNumber: 21,
    questionText: '"प्रत्येक" शब्द का सही संधि-विच्छेद क्या है?',
    options: ['प्र + प्रत्येक', 'प्रति + एक', 'प्रत्या + एक', 'प्रत्य + एक'],
    correctOptionIndex: 1,
    topic: 'संधि विच्छेद',
    difficulty: 'Medium',
    explanation: 'प्रति + एक = प्रत्येक (इ + ए = ये, यह यण स्वर संधि का उदाहरण है)।'
  },
  {
    id: 's2_hin_22',
    subjectId: 'hindi',
    questionNumber: 22,
    questionText: '"माता-पिता" में कौन-सा समास है?',
    options: ['तत्पुरुष समास', 'द्वंद्व समास', 'द्विगु समास', 'अव्ययीभाव समास'],
    correctOptionIndex: 1,
    topic: 'समास',
    difficulty: 'Easy',
    explanation: '"माता और पिता" - जिसमें दोनों पद प्रधान होते हैं, उसे द्वंद्व समास कहते हैं।'
  },
  {
    id: 's2_hin_23',
    subjectId: 'hindi',
    questionNumber: 23,
    questionText: '"गंगा" का पर्यायवाची शब्द नहीं है:',
    options: ['भागीरथी', 'सुरसरि', 'मंदाकिनी', 'कालिंदी'],
    correctOptionIndex: 3,
    topic: 'पर्यायवाची शब्द',
    difficulty: 'Medium',
    explanation: '"कालिंदी" यमुना नदी का पर्यायवाची है, गंगा का नहीं।'
  },
  {
    id: 's2_hin_24',
    subjectId: 'hindi',
    questionNumber: 24,
    questionText: '"अंधे की लाठी" मुहावरे का सही अर्थ क्या है?',
    options: ['एकमात्र सहारा', 'अंधे को लकड़ी देना', 'रास्ता भूलना', 'कमजोर होना'],
    correctOptionIndex: 0,
    topic: 'मुहावरे',
    difficulty: 'Easy',
    explanation: '"अंधे की लाठी होना" अर्थात् एकमात्र सहारा या संबल होना।'
  },
  {
    id: 's2_hin_25',
    subjectId: 'hindi',
    questionNumber: 25,
    questionText: '"सत्य" शब्द का विलोम शब्द क्या है?',
    options: ['असत्य / झूठ', 'धर्म', 'न्याय', 'अहिंसा'],
    correctOptionIndex: 0,
    topic: 'विलोम शब्द',
    difficulty: 'Easy',
    explanation: 'सत्य का सीधा विलोम शब्द असत्य या मिथ्या होता है।'
  },
  {
    id: 's2_hin_26',
    subjectId: 'hindi',
    questionNumber: 26,
    questionText: '"सज्जन" शब्द का सही संधि विच्छेद क्या होगा?',
    options: ['सत् + जन', 'सज + जन', 'सत + जन', 'सद् + जन'],
    correctOptionIndex: 0,
    topic: 'व्यंजन संधि',
    difficulty: 'Medium',
    explanation: 'सत् + जन = सज्जन (व्यंजन संधि)।'
  },
  {
    id: 's2_hin_27',
    subjectId: 'hindi',
    questionNumber: 27,
    questionText: '"कवि" शब्द का सही स्त्रीलिंग रूप क्या है?',
    options: ['कवयित्री', 'कवियत्री', 'कविनी', 'कविपत्नी'],
    correctOptionIndex: 0,
    topic: 'लिंग',
    difficulty: 'Medium',
    explanation: 'कवि का व्याकरणिक दृष्टि से शुद्ध स्त्रीलिंग रूप "कवयित्री" होता है।'
  },
  {
    id: 's2_hin_28',
    subjectId: 'hindi',
    questionNumber: 28,
    questionText: '"सुंदरता" शब्द में कौन-सी संज्ञा है?',
    options: ['व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक संज्ञा', 'द्रव्यवाचक'],
    correctOptionIndex: 2,
    topic: 'संज्ञा',
    difficulty: 'Easy',
    explanation: 'सुंदर (विशेषण) में "ता" प्रत्यय जुड़कर "सुंदरता" भाववाचक संज्ञा बनती है।'
  },
  {
    id: 's2_hin_29',
    subjectId: 'hindi',
    questionNumber: 29,
    questionText: '"पुस्तकालय" का समास विग्रह क्या होगा?',
    options: ['पुस्तकों के लिए आलय', 'पुस्तक और आलय', 'पुस्तक का काल', 'पुस्तकों से भरा'],
    correctOptionIndex: 0,
    topic: 'समास विग्रह',
    difficulty: 'Easy',
    explanation: 'पुस्तकालय = पुस्तकों के लिए आलय (सम्प्रदान तत्पुरुष समास)।'
  },
  {
    id: 's2_hin_30',
    subjectId: 'hindi',
    questionNumber: 30,
    questionText: '"बरसते बादल" कविता के रचयिता कौन हैं?',
    options: ['सुमित्रानंदन पंत', 'सूर्यकांत त्रिपाठी निराला', 'हरिवंश राय बच्चन', 'मैथिलीशरण गुप्त'],
    correctOptionIndex: 0,
    topic: 'साहित्य',
    difficulty: 'Easy',
    explanation: 'प्रकृति के सुकुमार कवि सुमित्रानंदन पंत जी "बरसते बादल" कविता के रचयिता हैं।'
  },

  // MATHS - 10 Qs (31 to 40)
  {
    id: 's2_mat_31',
    subjectId: 'maths',
    questionNumber: 31,
    questionText: 'What type of decimal expansion does the rational number 13/3125 have? / హేతుబద్ధ సంఖ్య 13/3125 ఏ రకమైన దశాంశ విస్తరణను కలిగి ఉంది?',
    options: ['Terminating decimal / దశాంశాన్ని ముగించడం', 'Non-terminating repeating / నాన్-టర్మినేటింగ్ రిపీటింగ్', 'Non-terminating non-repeating / నాన్-టర్మినేటింగ్ కాని రిపీటింగ్', 'Undefined / నిర్వచించబడదు'],
    correctOptionIndex: 0,
    topic: 'Real Numbers',
    difficulty: 'Medium',
    explanation: 'Denominator 3125 = 5⁵ = 2⁰ × 5⁵. Since denominator is of form 2ⁿ 5ᵐ, it terminates.'
  },
  {
    id: 's2_mat_32',
    subjectId: 'maths',
    questionNumber: 32,
    questionText: 'If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is n(A ∪ B)? / A = {1, 2, 3, 4} మరియు B = {3, 4, 5, 6} అయితే, n(A ∪ B) విలువ ఎంత?',
    options: ['4', '6', '8', '2'],
    correctOptionIndex: 1,
    topic: 'Sets',
    difficulty: 'Easy',
    explanation: 'A ∪ B = {1, 2, 3, 4, 5, 6}. Hence n(A ∪ B) = 6.'
  },
  {
    id: 's2_mat_33',
    subjectId: 'maths',
    questionNumber: 33,
    questionText: 'Solve for x and y: x + y = 14 and x - y = 4. What is the value of xy? / x మరియు y కోసం పరిష్కరించండి: x + y = 14 మరియు x - y = 4. xy విలువ ఎంత?',
    options: ['40', '45', '48', '50'],
    correctOptionIndex: 1,
    topic: 'Linear Equations',
    difficulty: 'Easy',
    explanation: '2x = 18 => x = 9; y = 5. Thus xy = 9 × 5 = 45.'
  },
  {
    id: 's2_mat_34',
    subjectId: 'maths',
    questionNumber: 34,
    questionText: 'Find the sum of the first 20 natural numbers using Sₙ = n(n+1)/2: / Sₙ = n(n+1)/2ని ఉపయోగించి మొదటి 20 సహజ సంఖ్యల మొత్తాన్ని కనుగొనండి:',
    options: ['200', '210', '220', '190'],
    correctOptionIndex: 1,
    topic: 'Progressions',
    difficulty: 'Easy',
    explanation: 'S₂₀ = 20(21)/2 = 10 × 21 = 210.'
  },
  {
    id: 's2_mat_35',
    subjectId: 'maths',
    questionNumber: 35,
    questionText: 'The midpoint of the line segment joining P(-2, 8) and Q(-6, -4) is: / P(-2, 8) మరియు Q(-6, -4)ని కలిపే లైన్ సెగ్మెంట్ మధ్య బిందువు:',
    options: ['(-4, 2) / (-4, 2)', '(-8, 4) / (-8, 4)', '(-4, 6) / (-4, 6)', '(2, -4) / (2, -4)'],
    correctOptionIndex: 0,
    topic: 'Coordinate Geometry',
    difficulty: 'Easy',
    explanation: 'Midpoint = [(-2 - 6)/2, (8 - 4)/2] = [-8/2, 4/2] = (-4, 2).'
  },
  {
    id: 's2_mat_36',
    subjectId: 'maths',
    questionNumber: 36,
    questionText: 'Evaluate: (sin² 30° + cos² 30°) + (sec² 45° - tan² 45°): / మూల్యాంకనం చేయండి: (sin² 30° + cos² 30°) + (sec² 45° - tan² 45°):',
    options: ['1', '2', '3', '0'],
    correctOptionIndex: 1,
    topic: 'Trigonometry',
    difficulty: 'Easy',
    explanation: 'Identities: sin² θ + cos² θ = 1, and sec² θ - tan² θ = 1. So 1 + 1 = 2.'
  },
  {
    id: 's2_mat_37',
    subjectId: 'maths',
    questionNumber: 37,
    questionText: 'A ladder 10 m long reaches a window 8 m above the ground. The distance of the foot from the wall is: / 10 మీటర్ల పొడవు ఉన్న నిచ్చెన నేల నుండి 8 మీటర్ల ఎత్తులో ఉన్న కిటికీకి చేరుకుంటుంది. గోడ నుండి అడుగు దూరం:',
    options: ['6 m / 6 మీ', '7 m / 7 మీ', '8 m / 8 మీ', '9 m / 9 మీ'],
    correctOptionIndex: 0,
    topic: 'Triangles & Pythagoras',
    difficulty: 'Easy',
    explanation: 'Base = √(10² - 8²) = √(100 - 64) = √36 = 6 m.'
  },
  {
    id: 's2_mat_38',
    subjectId: 'maths',
    questionNumber: 38,
    questionText: 'The volume of a cone of base radius r = 3 cm and height h = 7 cm is (π = 22/7): / మూల వ్యాసార్థం r = 3 cm మరియు ఎత్తు h = 7 cm (π = 22/7):',
    options: ['66 cm³ / 66 సెం.మీ', '198 cm³ / 198 సెం.మీ', '132 cm³ / 132 సెం.మీ', '88 cm³ / 88 సెం.మీ'],
    correctOptionIndex: 0,
    topic: 'Mensuration',
    difficulty: 'Medium',
    explanation: 'Volume = (1/3)πr²h = (1/3) × (22/7) × 9 × 7 = 66 cm³.'
  },
  {
    id: 's2_mat_39',
    subjectId: 'maths',
    questionNumber: 39,
    questionText: 'Two dice are rolled simultaneously. What is the probability of getting a doublet? / రెండు పాచికలు ఏకకాలంలో చుట్టబడతాయి. రెట్టింపు పొందే సంభావ్యత ఎంత?',
    options: ['1/6 / 1/6', '1/12 / 1/12', '1/36 / 1/36', '1/4 / 1/4'],
    correctOptionIndex: 0,
    topic: 'Probability',
    difficulty: 'Medium',
    explanation: '6 doublets out of 36 possible outcomes = 6/36 = 1/6.'
  },
  {
    id: 's2_mat_40',
    subjectId: 'maths',
    questionNumber: 40,
    questionText: 'The median of the given observations: 3, 7, 8, 12, 14, 17, 21 is: / ఇచ్చిన పరిశీలనల మధ్యస్థం: 3, 7, 8, 12, 14, 17, 21:',
    options: ['8', '12', '14', '10'],
    correctOptionIndex: 1,
    topic: 'Statistics',
    difficulty: 'Easy',
    explanation: 'Number of observations n = 7 (odd). Median is the 4th term = 12.'
  },

  // PHYSICAL SCIENCE - 5 Qs (41 to 45)
  {
    id: 's2_ps_41',
    subjectId: 'physical_science',
    questionNumber: 41,
    questionText: 'The refractive index of Diamond is 2.42. What does this mean regarding the speed of light in diamond? / డైమండ్ యొక్క వక్రీభవన సూచిక 2.42. వజ్రంలో కాంతి వేగం గురించి దీని అర్థం ఏమిటి?',
    options: [
      'Speed of light in diamond is 2.42 times faster than in vacuum',
      'Speed of light in vacuum is 2.42 times the speed of light in diamond',
      'Light does not travel in diamond',
      'Light bends at 90 degrees'
    ],
    correctOptionIndex: 1,
    topic: 'Refraction of Light',
    difficulty: 'Medium',
    explanation: 'Refractive index n = c / v. Hence v = c / 2.42.'
  },
  {
    id: 's2_ps_42',
    subjectId: 'physical_science',
    questionNumber: 42,
    questionText: 'Which gas is evolved when an acid reacts with an active metal (e.g., Zn + 2HCl)? / యాసిడ్ క్రియాశీల లోహంతో చర్య జరిపినప్పుడు ఏ వాయువు ఉద్భవిస్తుంది (ఉదా., Zn + 2HCl)?',
    options: ['Oxygen (O₂) / ఆక్సిజన్ (O₂)', 'Hydrogen (H₂) / హైడ్రోజన్ (H₂)', 'Carbon dioxide (CO₂) / కార్బన్ డయాక్సైడ్ (CO₂)', 'Nitrogen (N₂) / నత్రజని (N₂)'],
    correctOptionIndex: 1,
    topic: 'Acids and Bases',
    difficulty: 'Easy',
    explanation: 'Active metals displace hydrogen from dilute acids, releasing Hydrogen gas (H₂).'
  },
  {
    id: 's2_ps_43',
    subjectId: 'physical_science',
    questionNumber: 43,
    questionText: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. Their equivalent resistance is: / 6 Ω మరియు 3 Ω యొక్క రెండు రెసిస్టర్‌లు సమాంతర సంధానంలో అనుసంధానించబడి ఉన్నాయి. వారి ఫలిత నిరోధం:',
    options: ['9 Ω / 9 Ω', '2 Ω / 2 Ω', '18 Ω / 18 Ω', '4.5 Ω / 4.5 Ω'],
    correctOptionIndex: 1,
    topic: 'Electric Current',
    difficulty: 'Medium',
    explanation: '1/R = 1/6 + 1/3 = 3/6 = 1/2 => R = 2 Ω.'
  },
  {
    id: 's2_ps_44',
    subjectId: 'physical_science',
    questionNumber: 44,
    questionText: 'What is the chemical formula of Plaster of Paris? / ప్లాస్టర్ ఆఫ్ పారిస్ రసాయన సూత్రం ఏమిటి?',
    options: ['CaSO₄ · 2H₂O / CaSO₄ · 2H₂O', 'CaSO₄ · ½H₂O / CaSO₄ · ½H₂O', 'Na₂CO₃ · 10H₂O / Na₂CO₃ · 10H₂O', 'CaOCl₂ / CaOCl₂'],
    correctOptionIndex: 1,
    topic: 'Salts & Chemistry',
    difficulty: 'Medium',
    explanation: 'Plaster of Paris is Calcium Sulphate Hemihydrate (CaSO₄ · ½H₂O).'
  },
  {
    id: 's2_ps_45',
    subjectId: 'physical_science',
    questionNumber: 45,
    questionText: 'Which rule is used to determine the direction of magnetic field lines around a straight current-carrying wire? / స్ట్రెయిట్ కరెంట్ మోసే వైర్ చుట్టూ ఉన్న అయస్కాంత క్షేత్ర రేఖల దిశను నిర్ణయించడానికి ఏ నియమం ఉపయోగించబడుతుంది?',
    options: ['Fleming’s Left Hand Rule / ఫ్లెమింగ్ యొక్క లెఫ్ట్ హ్యాండ్ రూల్', 'Right Hand Thumb Rule / కుడి చేతి బొటనవేలు నియమం', 'Fleming’s Right Hand Rule / ఫ్లెమింగ్ రైట్ హ్యాండ్ రూల్', 'Pascal’s Law / పాస్కల్ చట్టం'],
    correctOptionIndex: 1,
    topic: 'Electromagnetism',
    difficulty: 'Easy',
    explanation: 'Right Hand Thumb Rule gives the direction of magnetic field lines around a current-carrying wire.'
  },

  // BIOLOGICAL SCIENCE - 5 Qs (46 to 50)
  {
    id: 's2_bs_46',
    subjectId: 'biological_science',
    questionNumber: 46,
    questionText: 'The site of dark reaction (light-independent phase of photosynthesis) in chloroplast is the: / క్లోరోప్లాస్ట్‌లో డార్క్ రియాక్షన్ (కిరణజన్య సంయోగక్రియ యొక్క కాంతి-స్వతంత్ర దశ) యొక్క ప్రదేశం:',
    options: ['Grana / గ్రానా', 'Stroma / స్ట్రోమా', 'Thylakoid membrane / థైలాకోయిడ్ పొర', 'Mitochondria / మైటోకాండ్రియా'],
    correctOptionIndex: 1,
    topic: 'Photosynthesis',
    difficulty: 'Medium',
    explanation: 'Dark reactions (Calvin cycle) take place in the Stroma.'
  },
  {
    id: 's2_bs_47',
    subjectId: 'biological_science',
    questionNumber: 47,
    questionText: 'Cellular respiration breakdown of glucose into pyruvate during Glycolysis occurs in the: / గ్లైకోలిసిస్ సమయంలో గ్లూకోజ్ పైరువేట్‌గా సెల్యులార్ శ్వాసక్రియ విచ్ఛిన్నం జరుగుతుంది:',
    options: ['Cytoplasm / సైటోప్లాజం', 'Mitochondrial matrix / మైటోకాన్డ్రియల్ మాతృక', 'Nucleus / న్యూక్లియస్', 'Endoplasmic reticulum / ఎండోప్లాస్మిక్ రెటిక్యులం'],
    correctOptionIndex: 0,
    topic: 'Respiration',
    difficulty: 'Easy',
    explanation: 'Glycolysis occurs in the Cytoplasm without requiring oxygen.'
  },
  {
    id: 's2_bs_48',
    subjectId: 'biological_science',
    questionNumber: 48,
    questionText: 'Which blood vessel carries oxygenated blood from the lungs back to the left atrium of the heart? / ఊపిరితిత్తుల నుండి హృదయం యొక్క ఎడమ కర్ణికకు ఆక్సిజన్ ఉన్న రక్తాన్ని ఏ రక్తనాళం తీసుకువెళుతుంది?',
    options: ['Pulmonary Artery / పుపుస ధమని', 'Pulmonary Vein / పల్మనరీ సిర', 'Vena Cava / వెనా కావా', 'Aorta / బృహద్ధమని'],
    correctOptionIndex: 1,
    topic: 'Circulation',
    difficulty: 'Medium',
    explanation: 'Pulmonary veins transport freshly oxygenated blood from lungs to left atrium.'
  },
  {
    id: 's2_bs_49',
    subjectId: 'biological_science',
    questionNumber: 49,
    questionText: 'Which endocrine master gland located at the base of brain controls other endocrine glands? / మెదడు అడుగుభాగంలో ఉన్న ఏ ఎండోక్రైన్ మాస్టర్ గ్రంధి ఇతర ఎండోక్రైన్ గ్రంధులను నియంత్రిస్తుంది?',
    options: ['Thyroid Gland / థైరాయిడ్ గ్రంధి', 'Pituitary Gland / పిట్యూటరీ గ్రంధి', 'Adrenal Gland / అడ్రినల్ గ్రంధి', 'Pancreas / ప్యాంక్రియాస్'],
    correctOptionIndex: 1,
    topic: 'Coordination',
    difficulty: 'Easy',
    explanation: 'The Pituitary Gland is known as the master endocrine gland.'
  },
  {
    id: 's2_bs_50',
    subjectId: 'biological_science',
    questionNumber: 50,
    questionText: 'In Mendel’s monohybrid cross, what is the phenotypic ratio obtained in the F2 generation? / మెండెల్ యొక్క మోనోహైబ్రిడ్ క్రాస్‌లో, F2 జనరేషన్‌లో పొందిన ఫినోటైపిక్ నిష్పత్తి ఎంత?',
    options: ['1 : 2 : 1 / 1 : 2 : 1', '3 : 1 / 3 : 1', '9 : 3 : 3 : 1 / 9 : 3 : 3 : 1', '2 : 1 / 2 : 1'],
    correctOptionIndex: 1,
    topic: 'Heredity',
    difficulty: 'Easy',
    explanation: 'In F2 generation: 3 Tall : 1 Dwarf (Phenotypic ratio is 3:1).'
  },

  // SOCIAL STUDIES - 10 Qs (51 to 60)
  {
    id: 's2_soc_51',
    subjectId: 'social_studies',
    questionNumber: 51,
    questionText: 'The peninsular plateau of India is flanked by Western and Eastern Ghats. Which range is continuous with fewer passes? / భారతదేశం యొక్క ద్వీపకల్ప పీఠభూమి పశ్చిమ మరియు తూర్పు కనుమలచే చుట్టబడి ఉంది. తక్కువ పాస్‌లతో ఏ పరిధి నిరంతరంగా ఉంటుంది?',
    options: ['Western Ghats / పశ్చిమ కనుమలు', 'Eastern Ghats / తూర్పు కనుమలు', 'Aravalli Range / ఆరావళి శ్రేణి', 'Satpura Range / సాత్పురా శ్రేణి'],
    correctOptionIndex: 0,
    topic: 'Physiography',
    difficulty: 'Medium',
    explanation: 'Western Ghats are continuous and higher in average altitude.'
  },
  {
    id: 's2_soc_52',
    subjectId: 'social_studies',
    questionNumber: 52,
    questionText: 'Which river forms the famous Dhuandhar falls in Marble Rocks near Jabalpur? / జబల్‌పూర్ సమీపంలోని మార్బుల్ రాక్స్‌లో ప్రసిద్ధి చెందిన ధుంధర్ జలపాతాన్ని ఏ నది ఏర్పరుస్తుంది?',
    options: ['Godavari / గోదావరి', 'Narmada / నర్మద', 'Krishna / కృష్ణుడు', 'Mahanadi / మహానటి'],
    correctOptionIndex: 1,
    topic: 'Drainage & Rivers',
    difficulty: 'Easy',
    explanation: 'The Narmada river flows through a rift valley and creates Dhuandhar falls.'
  },
  {
    id: 's2_soc_53',
    subjectId: 'social_studies',
    questionNumber: 53,
    questionText: 'The Preamble of Indian Constitution declares India to be a Sovereign, ______ , Secular, Democratic Republic. / భారత రాజ్యాంగ ప్రవేశిక భారతదేశాన్ని సార్వభౌమాధికారం, ______, లౌకిక, ప్రజాస్వామ్య గణతంత్రంగా ప్రకటించింది.',
    options: ['Capitalist / పెట్టుబడిదారీ', 'Socialist / సోషలిస్టు', 'Monarchist / రాచరికవాది', 'Feudal / ఫ్యూడల్'],
    correctOptionIndex: 1,
    topic: 'Indian Constitution',
    difficulty: 'Easy',
    explanation: 'The 42nd Amendment (1976) added "Socialist" and "Secular" to the Preamble.'
  },
  {
    id: 's2_soc_54',
    subjectId: 'social_studies',
    questionNumber: 54,
    questionText: 'Who founded the "Swaraj Party" in 1923 within the Indian National Congress? / 1923లో భారత జాతీయ కాంగ్రెస్‌లో "స్వరాజ్ పార్టీ"ని ఎవరు స్థాపించారు?',
    options: [
      'Motilal Nehru and Chittaranjan Das',
      'Subhas Chandra Bose and Jawaharlal Nehru',
      'Mahatma Gandhi and Sardar Patel',
      'Bhagat Singh and Chandrashekhar Azad'
    ],
    correctOptionIndex: 0,
    topic: 'National Movement',
    difficulty: 'Medium',
    explanation: 'C.R. Das and Motilal Nehru formed the Swaraj Party in January 1923.'
  },
  {
    id: 's2_soc_55',
    subjectId: 'social_studies',
    questionNumber: 55,
    questionText: 'The First World War took place between the years: / మొదటి ప్రపంచ యుద్ధం సంవత్సరాల మధ్య జరిగింది:',
    options: ['1914 – 1918 / 1914 – 1918', '1939 – 1945 / 1939 – 1945', '1905 – 1910 / 1905 – 1910', '1920 – 1925 / 1920 – 1925'],
    correctOptionIndex: 0,
    topic: 'World Wars',
    difficulty: 'Easy',
    explanation: 'World War I occurred between July 1914 and November 1918.'
  },
  {
    id: 's2_soc_56',
    subjectId: 'social_studies',
    questionNumber: 56,
    questionText: 'Which scheme was introduced by the Govt of India to guarantee 100 days of wage employment in rural areas? / గ్రామీణ ప్రాంతాల్లో 100 రోజుల వేతన ఉపాధి హామీ కోసం భారత ప్రభుత్వం ఏ పథకాన్ని ప్రవేశపెట్టింది?',
    options: ['MGNREGA (2005) / MGNREGA (2005)', 'PM-KISAN / PM-కిసాన్', 'Make in India / మేక్ ఇన్ ఇండియా', 'Skill India Mission / స్కిల్ ఇండియా మిషన్'],
    correctOptionIndex: 0,
    topic: 'Employment Programs',
    difficulty: 'Easy',
    explanation: 'MGNREGA 2005 provides 100 days of guaranteed wage employment.'
  },
  {
    id: 's2_soc_57',
    subjectId: 'social_studies',
    questionNumber: 57,
    questionText: 'Which Indian state enjoys the highest literacy rate according to Census records? / జనాభా లెక్కల ప్రకారం అత్యధిక అక్షరాస్యత రేటును కలిగి ఉన్న భారతీయ రాష్ట్రం ఏది?',
    options: ['Kerala / కేరళ', 'Andhra Pradesh / ఆంధ్ర ప్రదేశ్', 'Bihar / బీహార్', 'Maharashtra / మహారాష్ట్ర'],
    correctOptionIndex: 0,
    topic: 'Population & Literacy',
    difficulty: 'Easy',
    explanation: 'Kerala has consistently achieved the highest literacy rate in India (over 94%).'
  },
  {
    id: 's2_soc_58',
    subjectId: 'social_studies',
    questionNumber: 58,
    questionText: 'What is the minimum voting age for Indian citizens as per the 61st Constitutional Amendment Act (1988)? / 61వ రాజ్యాంగ సవరణ చట్టం (1988) ప్రకారం భారతీయ పౌరులకు కనీస ఓటింగ్ వయస్సు ఎంత?',
    options: ['18 years / 18 సంవత్సరాలు', '21 years / 21 సంవత్సరాలు', '25 years / 25 సంవత్సరాలు', '16 years / 16 సంవత్సరాలు'],
    correctOptionIndex: 0,
    topic: 'Democracy & Elections',
    difficulty: 'Easy',
    explanation: 'The 61st Amendment lowered voting age from 21 to 18 years.'
  },
  {
    id: 's2_soc_59',
    subjectId: 'social_studies',
    questionNumber: 59,
    questionText: 'The integration of Indian economy with the world economy through free trade and capital flow is called: / స్వేచ్ఛా వాణిజ్యం మరియు మూలధన ప్రవాహం ద్వారా ప్రపంచ ఆర్థిక వ్యవస్థతో భారత ఆర్థిక వ్యవస్థ ఏకీకరణను అంటారు:',
    options: ['Privatization / ప్రైవేటీకరణ', 'Nationalization / జాతీయీకరణ', 'Globalization / ప్రపంచీకరణ', 'Protectionism / రక్షణవాదం'],
    correctOptionIndex: 2,
    topic: 'Economy',
    difficulty: 'Easy',
    explanation: 'Globalization refers to cross-border integration of trade, ideas, and investments.'
  },
  {
    id: 's2_soc_60',
    subjectId: 'social_studies',
    questionNumber: 60,
    questionText: 'Which river valley project is constructed across the Krishna River on the border of Telangana and Andhra Pradesh? / తెలంగాణ మరియు ఆంధ్రప్రదేశ్ సరిహద్దులో కృష్ణా నది మీదుగా ఏ నది లోయ ప్రాజెక్ట్ నిర్మించబడింది?',
    options: ['Nagarjuna Sagar Dam / నాగార్జున సాగర్ డ్యామ్', 'Hirakud Dam / హిరాకుడ్ ఆనకట్ట', 'Bhakra Nangal Dam / భాక్రా నంగల్ డ్యామ్', 'Sardar Sarovar Dam / సర్దార్ సరోవర్ డ్యామ్'],
    correctOptionIndex: 0,
    topic: 'Water Resources',
    difficulty: 'Easy',
    explanation: 'Nagarjuna Sagar Dam is built across the Krishna River between Telangana and AP.'
  }
];

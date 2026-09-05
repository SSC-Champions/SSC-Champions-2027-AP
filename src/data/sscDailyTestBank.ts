import { SSCTestSet, SSCQuestion } from '../types';

export const SET_1_QUESTIONS: SSCQuestion[] = [
  // --------------------------------------------------------------------------
  // TELUGU - 10 QUESTIONS (Q1 - Q10)
  // --------------------------------------------------------------------------
  {
    id: 's1_tel_01',
    subjectId: 'telugu',
    questionNumber: 1,
    questionText: '"మాతృభావన" పాఠ్యభాగ రచయిత ఎవరు?',
    options: ['శ్రీశ్రీ (శ్రీరంగం శ్రీనివాసరావు)', 'డా॥ గడియారం వేంకట శేషశాస్త్రి', 'నన్నయ భట్టు', 'జాషువా'],
    correctOptionIndex: 1,
    topic: 'కవుల పరిచయం / పాఠ్యభాగం',
    difficulty: 'Easy',
    explanation: '"మాతృభావన" అను పాఠ్యభాగాన్ని రచించినవారు ఆధునిక ఆంధ్ర కవిసింహ డా॥ గడియారం వేంకట శేషశాస్త్రి గారు (శివభారతము కావ్యం నుండి గ్రహించబడింది).'
  },
  {
    id: 's1_tel_02',
    subjectId: 'telugu',
    questionNumber: 2,
    questionText: '"గురుదక్షిణ" పదంలోని సమాసం ఏది?',
    options: ['ద్విగు సమాసం', 'షష్ఠీ తత్పురుష సమాసం', 'చతుర్థీ తత్పురుష సమాసం', 'ద్వంద్వ సమాసం'],
    correctOptionIndex: 2,
    topic: 'సమాసాలు',
    difficulty: 'Medium',
    explanation: '"గురువు కొరకు దక్షిణ" - కొరకున్, కై అను విభక్తులు చతుర్థీ విభక్తికి చెందినవి. కావున ఇది చతుర్థీ తత్పురుష సమాసము.'
  },
  {
    id: 's1_tel_03',
    subjectId: 'telugu',
    questionNumber: 3,
    questionText: '"ఉత్పలమాల" వృత్త పద్య పాదంలోని గణాల వరుస ఏది?',
    options: ['స భ ర న మ య వ', 'భ ర న భ భ ర వ', 'న జ భ జ జ జ ర', 'మ స జ స త త గ'],
    correctOptionIndex: 1,
    topic: 'ఛందస్సు',
    difficulty: 'Medium',
    explanation: 'ఉత్పలమాల పద్య పాదంలో "భ-ర-న-భ-భ-ర-వ" అను గణాలు వరుసగా వస్తాయి. ఇందులో 20 అక్షరాలు ఉంటాయి, 10వ అక్షరం యతి స్థానం.'
  },
  {
    id: 's1_tel_04',
    subjectId: 'telugu',
    questionNumber: 4,
    questionText: '"రాముడు + అతడు = రాముడతడు" - ఇది ఏ సంధి సూత్రం?',
    options: ['యడాగమ సంధి', 'ఉత్వ సంధి (ఉకార సంధి)', 'సవర్ణదీర్ఘ సంధి', 'గుణ సంధి'],
    correctOptionIndex: 1,
    topic: 'సంధులు',
    difficulty: 'Easy',
    explanation: 'ఉత్తునకు అచ్చు పరమగునపుడు సంధి నిత్యముగా నగును (ఉత్వ సంధి).'
  },
  {
    id: 's1_tel_05',
    subjectId: 'telugu',
    questionNumber: 5,
    questionText: '"అమృతం" పదానికి సరైన పర్యాయపదాల జతను గుర్తించండి:',
    options: ['సుధ, పీయూషము', 'సూర్యుడు, భానుడు', 'వారిధి, సముద్రము', 'పవనము, అనిలము'],
    correctOptionIndex: 0,
    topic: 'పర్యాయపదాలు',
    difficulty: 'Easy',
    explanation: 'అమృతం అనగా సుధ, పీయూషము, అమియము అను పర్యాయపదాలు సరిపోతాయి.'
  },
  {
    id: 's1_tel_06',
    subjectId: 'telugu',
    questionNumber: 6,
    questionText: '"చేతికి చిక్కడం" అనే జాతీయానికి అర్థం ఏమిటి?',
    options: ['చేతి గాయం అవ్వడం', 'స్వాధీనమగుట / లభించుట', 'చేతితో కొట్టుట', 'దానం చేయుట'],
    correctOptionIndex: 1,
    topic: 'జాతీయాలు',
    difficulty: 'Easy',
    explanation: '"చేతికి చిక్కడం" అనగా ఏదైనా వస్తువు లేదా అవకాశం మన వశమగుట లేదా లభించుట అని అర్థం.'
  },
  {
    id: 's1_tel_07',
    subjectId: 'telugu',
    questionNumber: 7,
    questionText: '"విద్య" పదానికి ప్రకృతి-వికృతి జంట ఏది?',
    options: ['విద్య - జ్ఞానం', 'విద్య - వెజ్జ', 'విద్య - విద్దె', 'విద్య - చదువు'],
    correctOptionIndex: 2,
    topic: 'ప్రకృతి - వికృతి',
    difficulty: 'Easy',
    explanation: 'విద్య (సంస్కృత ప్రకృతి) కి సమానమైన తెలుగు తద్భవ వికృతి రూపం "విద్దె".'
  },
  {
    id: 's1_tel_08',
    subjectId: 'telugu',
    questionNumber: 8,
    questionText: '"ఉపమాన ఉపమేయములకు చక్కని సాదృశ్యము చెప్పునది" ఏ అలంకారము?',
    options: ['రూపక అలంకారము', 'ఉపమాలంకారము', 'ఉత్ప్రేక్షాలంకారము', 'అతిశయోక్తి అలంకారము'],
    correctOptionIndex: 1,
    topic: 'అలంకారాలు',
    difficulty: 'Medium',
    explanation: 'ఉపమాన ఉపమేయములకు మనోహరమైన పోలికను చెప్పినచో అది ఉపమాలంకారము అగును (ఉపమేయం, ఉపమానం, ఉపమావాచకం, సమానధర్మం ఉంటాయి).'
  },
  {
    id: 's1_tel_09',
    subjectId: 'telugu',
    questionNumber: 9,
    questionText: 'ఆంధ్ర మహాభారతాన్ని రచించిన కవిత్రయంలోని మూడవ కవి ఎవరు?',
    options: ['నన్నయ', 'తిక్కన', 'ఎర్రన', 'పోతన'],
    correctOptionIndex: 2,
    topic: 'సాహిత్య పరిచయం',
    difficulty: 'Easy',
    explanation: 'ఆంధ్ర మహాభారత కవిత్రయంలో నన్నయ, తిక్కన, ఎర్రన (అరణ్య పర్వ శేషం పూర్తి చేసిన మూడవ కవి).'
  },
  {
    id: 's1_tel_10',
    subjectId: 'telugu',
    questionNumber: 10,
    questionText: '"ధర్మరాజు సత్యవాక్యపరిపాలకుడు" - ఈ వాక్యం ఏ రకమైన వాక్యం?',
    options: ['ప్రశ్నార్థక వాక్యం', 'సామర్థ్యార్థక వాక్యం', 'నిశ్చయార్థక వాక్యం', 'ఆశ్చర్యార్థక వాక్యం'],
    correctOptionIndex: 2,
    topic: 'వాక్య రకాలు',
    difficulty: 'Medium',
    explanation: 'ఒక నిర్దిష్ట విషయాన్ని సూటిగా దృఢంగా నిశ్చయించి తెలిపే వాక్యాన్ని నిశ్చయార్థక వాక్యం అంటారు.'
  },

  // --------------------------------------------------------------------------
  // ENGLISH - 10 QUESTIONS (Q11 - Q20)
  // --------------------------------------------------------------------------
  {
    id: 's1_eng_11',
    subjectId: 'english',
    questionNumber: 11,
    questionText: 'Choose the correct form of the verb: "Neither the teacher nor the students ______ present in the auditorium yesterday."',
    options: ['was', 'were', 'is', 'are'],
    correctOptionIndex: 1,
    topic: 'Subject-Verb Agreement',
    difficulty: 'Medium',
    explanation: 'When subjects are joined by "neither... nor", the verb agrees with the closer subject ("the students" is plural, past tense "were").'
  },
  {
    id: 's1_eng_12',
    subjectId: 'english',
    questionNumber: 12,
    questionText: 'Convert into Passive Voice: "The doctor examined the patient thoroughly."',
    options: [
      'The patient was examined thoroughly by the doctor.',
      'The patient has been examined thoroughly by the doctor.',
      'The patient is examined thoroughly by the doctor.',
      'The patient had examined thoroughly by the doctor.'
    ],
    correctOptionIndex: 0,
    topic: 'Active & Passive Voice',
    difficulty: 'Easy',
    explanation: 'Simple past "examined" changes to "was examined" in the passive voice.'
  },
  {
    id: 's1_eng_13',
    subjectId: 'english',
    questionNumber: 13,
    questionText: 'Identify the suitable preposition: "He has been suffering from fever ______ Monday last."',
    options: ['for', 'since', 'from', 'in'],
    correctOptionIndex: 1,
    topic: 'Prepositions',
    difficulty: 'Easy',
    explanation: '"Since" is used to denote a specific point of time in the past with the Present Perfect Continuous tense.'
  },
  {
    id: 's1_eng_14',
    subjectId: 'english',
    questionNumber: 14,
    questionText: 'Choose the correct Indirect Speech for: She said, "I will call you tomorrow."',
    options: [
      'She said that she will call me tomorrow.',
      'She said that she would call me the next day.',
      'She said that she can call me the following day.',
      'She told that she should call me tomorrow.'
    ],
    correctOptionIndex: 1,
    topic: 'Direct & Indirect Speech',
    difficulty: 'Medium',
    explanation: '"Will" changes to "would", "I" becomes "she", and "tomorrow" becomes "the next day" in Indirect Speech.'
  },
  {
    id: 's1_eng_15',
    subjectId: 'english',
    questionNumber: 15,
    questionText: 'What is the correct Question Tag for: "Let’s start the examination now, ______?"',
    options: ['won’t we', 'shall we', 'can’t we', 'aren’t we'],
    correctOptionIndex: 1,
    topic: 'Question Tags',
    difficulty: 'Medium',
    explanation: 'Imperative sentences beginning with "Let’s" take the question tag "shall we?".'
  },
  {
    id: 's1_eng_16',
    subjectId: 'english',
    questionNumber: 16,
    questionText: 'What is the meaning of the idiom "To burn the midnight oil"?',
    options: [
      'To waste oil in lamps',
      'To work or study late into the night',
      'To sleep early in the evening',
      'To cause a sudden accident'
    ],
    correctOptionIndex: 1,
    topic: 'Idioms and Phrases',
    difficulty: 'Easy',
    explanation: '"To burn the midnight oil" means to study or work very hard late into the night.'
  },
  {
    id: 's1_eng_17',
    subjectId: 'english',
    questionNumber: 17,
    questionText: 'Select the antonym for the word "ABUNDANT":',
    options: ['Plentiful', 'Scarce', 'Lavish', 'Ample'],
    correctOptionIndex: 1,
    topic: 'Vocabulary & Antonyms',
    difficulty: 'Easy',
    explanation: '"Abundant" means existing in large quantities; its direct opposite (antonym) is "Scarce".'
  },
  {
    id: 's1_eng_18',
    subjectId: 'english',
    questionNumber: 18,
    questionText: 'Choose the correctly spelled word:',
    options: ['Accomodation', 'Accommodation', 'Acommodation', 'Accomadation'],
    correctOptionIndex: 1,
    topic: 'Spelling Accuracy',
    difficulty: 'Medium',
    explanation: 'The standard spelling is "Accommodation" with double "c" and double "m".'
  },
  {
    id: 's1_eng_19',
    subjectId: 'english',
    questionNumber: 19,
    questionText: 'Complete the Conditional sentence: "If you had worked hard, you ______ the examination."',
    options: [
      'will pass',
      'would pass',
      'would have passed',
      'had passed'
    ],
    correctOptionIndex: 2,
    topic: 'Conditional Clauses (Type 3)',
    difficulty: 'Hard',
    explanation: 'In Third Conditional ("If + past perfect"), the main clause uses "would have + past participle" (would have passed).'
  },
  {
    id: 's1_eng_20',
    subjectId: 'english',
    questionNumber: 20,
    questionText: 'Identify the figure of speech in: "The wind whispered through the dark trees."',
    options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
    correctOptionIndex: 2,
    topic: 'Figures of Speech',
    difficulty: 'Easy',
    explanation: 'Giving human traits (whispering) to non-human elements (the wind) is Personification.'
  },

  // --------------------------------------------------------------------------
  // HINDI - 10 QUESTIONS (Q21 - Q30)
  // --------------------------------------------------------------------------
  {
    id: 's1_hin_21',
    subjectId: 'hindi',
    questionNumber: 21,
    questionText: '"विद्या + आलय = विद्यालय" में कौन-सी संधि है?',
    options: ['गुण संधि', 'दीर्घ स्वर संधि', 'वृद्धि संधि', 'यण संधि'],
    correctOptionIndex: 1,
    topic: 'संधि (Sandhi)',
    difficulty: 'Easy',
    explanation: 'ह्रस्व या दीर्घ अ, इ, उ के बाद समान स्वर आने पर दीर्घ (आ, ई, ऊ) हो जाता है। अतः यह दीर्घ स्वर संधि है।'
  },
  {
    id: 's1_hin_22',
    subjectId: 'hindi',
    questionNumber: 22,
    questionText: '"दशानन" शब्द में कौन-सा समास है?',
    options: ['द्विगु समास', 'द्वंद्व समास', 'कर्मधारय समास', 'बहुव्रीहि समास'],
    correctOptionIndex: 3,
    topic: 'समास (Samas)',
    difficulty: 'Medium',
    explanation: '"दस हैं आनन (मुख) जिसके अर्थात् रावण"। यहाँ दोनों पद मिलकर तीसरे विशेष अर्थ की ओर संकेत करते हैं, अतः बहुव्रीहि समास है।'
  },
  {
    id: 's1_hin_23',
    subjectId: 'hindi',
    questionNumber: 23,
    questionText: '"आँखों का तारा होना" मुहावरे का सही अर्थ क्या है?',
    options: ['बहुत प्यारा होना', 'आँखों में दर्द होना', 'तारा देखना', 'अंधा होना'],
    correctOptionIndex: 0,
    topic: 'मुहावरे (Idioms)',
    difficulty: 'Easy',
    explanation: '"आँखों का तारा होना" का अर्थ होता है - अत्यधिक प्रिय या बहुत प्यारा होना।'
  },
  {
    id: 's1_hin_24',
    subjectId: 'hindi',
    questionNumber: 24,
    questionText: '"सूर्य" शब्द का पर्यायवाची शब्द समूह कौन-सा है?',
    options: ['रवि, दिनकर, भास्कर', 'शशि, राकेश, चंद्रमा', 'जल, नीर, तोय', 'पवन, वायु, समीर'],
    correctOptionIndex: 0,
    topic: 'पर्यायवाची शब्द',
    difficulty: 'Easy',
    explanation: 'सूर्य के पर्यायवाची शब्द रवि, दिनकर, भास्कर, भानु, आदित्य आदि हैं।'
  },
  {
    id: 's1_hin_25',
    subjectId: 'hindi',
    questionNumber: 25,
    questionText: '"अमृत" शब्द का सही विलोम शब्द क्या है?',
    options: ['सुधा', 'विष', 'जल', 'मधु'],
    correctOptionIndex: 1,
    topic: 'विलोम शब्द',
    difficulty: 'Easy',
    explanation: 'अमृत का विपरीतार्थक (विलोम) शब्द "विष" या "गरल" होता है।'
  },
  {
    id: 's1_hin_26',
    subjectId: 'hindi',
    questionNumber: 26,
    questionText: '"अभिमान" शब्द में कौन-सा उपसर्ग लगा है?',
    options: ['अ', 'अभी', 'अभि', 'मान'],
    correctOptionIndex: 2,
    topic: 'उपसर्ग एवं प्रत्यय',
    difficulty: 'Easy',
    explanation: '"अभि + मान = अभिमान" में मूल शब्द "मान" के पूर्व "अभि" उपसर्ग प्रयुक्त हुआ है।'
  },
  {
    id: 's1_hin_27',
    subjectId: 'hindi',
    questionNumber: 27,
    questionText: '"वह कल विद्यालय जाएगा।" यह वाक्य किस काल का है?',
    options: ['भूतकाल', 'वर्तमान काल', 'भविष्यत काल', 'अपूर्ण भूतकाल'],
    correctOptionIndex: 2,
    topic: 'काल (Tense)',
    difficulty: 'Easy',
    explanation: 'क्रिया के जिस रूप से आने वाले समय में कार्य होने का बोध हो, उसे सामान्य भविष्यत काल कहते हैं।'
  },
  {
    id: 's1_hin_28',
    subjectId: 'hindi',
    questionNumber: 28,
    questionText: 'शुद्ध वर्तनी वाले शब्द का चयन कीजिए:',
    options: ['उज्वल', 'उज्ज्वल', 'उजवल', 'उज्जवल'],
    correctOptionIndex: 1,
    topic: 'वर्तनी शुद्धि',
    difficulty: 'Medium',
    explanation: 'शुद्ध वर्तनी "उज्ज्वल" (उ + उत् + ज्वल) है जिसमें दोनों "ज" आधे आते हैं।'
  },
  {
    id: 's1_hin_29',
    subjectId: 'hindi',
    questionNumber: 29,
    questionText: '"पेड़ से पत्ता गिरा।" इस वाक्य में "से" किस कारक का चिह्न है?',
    options: ['करण कारक', 'अपादान कारक', 'कर्म कारक', 'अधिकरण कारक'],
    correctOptionIndex: 1,
    topic: 'कारक (Case)',
    difficulty: 'Medium',
    explanation: 'जब किसी वस्तु का किसी स्थान से अलग होने का भाव हो, तो वहाँ अपादान कारक (पंचमी विभक्ति) होता है।'
  },
  {
    id: 's1_hin_30',
    subjectId: 'hindi',
    questionNumber: 30,
    questionText: '"ईदगाह" कहानी के प्रसिद्ध लेखक कौन हैं?',
    options: ['जयशंकर प्रसाद', 'मुंशी प्रेमचंद', 'महादेवी वर्मा', 'सूर्यकांत त्रिपाठी निराला'],
    correctOptionIndex: 1,
    topic: 'साहित्यिक परिचय',
    difficulty: 'Easy',
    explanation: 'प्रसिद्ध मानवीय संवेदनाओं पर आधारित कहानी "ईदगाह" मुंशी प्रेमचंद जी द्वारा रचित है।'
  },

  // --------------------------------------------------------------------------
  // MATHEMATICS - 10 QUESTIONS (Q31 - Q40)
  // --------------------------------------------------------------------------
  {
    id: 's1_mat_31',
    subjectId: 'maths',
    questionNumber: 31,
    questionText: 'If HCF(306, 657) = 9, what is the LCM(306, 657)? / HCF(306, 657) = 9 అయితే, LCM(306, 657) విలువ ఎంత?',
    options: ['22338', '21338', '22438', '20338'],
    correctOptionIndex: 0,
    topic: 'Real Numbers',
    difficulty: 'Medium',
    explanation: 'Formula: HCF × LCM = Product of numbers. LCM = (306 × 657) / 9 = 34 × 657 = 22,338.'
  },
  {
    id: 's1_mat_32',
    subjectId: 'maths',
    questionNumber: 32,
    questionText: 'Find the value of log₁₀(1000) + log₂(32): / log₁₀(1000) + log₂(32) విలువను కనుగొనండి:',
    options: ['7', '8', '6', '15'],
    correctOptionIndex: 1,
    topic: 'Logarithms & Real Numbers',
    difficulty: 'Easy',
    explanation: 'log₁₀(10³) = 3 and log₂(2⁵) = 5. Therefore, 3 + 5 = 8.'
  },
  {
    id: 's1_mat_33',
    subjectId: 'maths',
    questionNumber: 33,
    questionText: 'If α and β are zeroes of quadratic polynomial p(x) = x² - 7x + 12, find (α + β) and (αβ): / α మరియు β లు వర్గ బహుపది p(x) = x² - 7x + 12 యొక్క శూన్యాలు అయితే, కనుగొనండి (α + β) మరియు (αβ):',
    options: ['α + β = 7, αβ = 12 / α + β = 7, αβ = 12', 'α + β = -7, αβ = 12 / α + β = -7, αβ = 12', 'α + β = 12, αβ = 7 / α + β = 12, αβ = 7', 'α + β = 7, αβ = -12 / α + β = 7, αβ = -12'],
    correctOptionIndex: 0,
    topic: 'Polynomials',
    difficulty: 'Easy',
    explanation: 'For ax² + bx + c: Sum of zeroes (α + β) = -b/a = -(-7)/1 = 7. Product (αβ) = c/a = 12/1 = 12.'
  },
  {
    id: 's1_mat_34',
    subjectId: 'maths',
    questionNumber: 34,
    questionText: 'Find the 10th term of the Arithmetic Progression (A.P.): 2, 7, 12, 17, ... / అంకశ్రేఢి (A.P.) యొక్క 10వ పదాన్ని కనుగొనండి: 2, 7, 12, 17, ...',
    options: ['45', '47', '52', '50'],
    correctOptionIndex: 1,
    topic: 'Progressions (AP & GP)',
    difficulty: 'Easy',
    explanation: 'First term a = 2, common difference d = 7 - 2 = 5. The n-th term a₁₀ = a + 9d = 2 + 9(5) = 47.'
  },
  {
    id: 's1_mat_35',
    subjectId: 'maths',
    questionNumber: 35,
    questionText: 'Find the distance between the points A(2, 3) and B(6, 6): / A(2, 3) మరియు B(6, 6) పాయింట్ల మధ్య దూరాన్ని కనుగొనండి:',
    options: ['4 units / 4 యూనిట్లు', '5 units / 5 యూనిట్లు', '6 units / 6 యూనిట్లు', '7 units / 7 యూనిట్లు'],
    correctOptionIndex: 1,
    topic: 'Coordinate Geometry',
    difficulty: 'Easy',
    explanation: 'Distance = √[(6 - 2)² + (6 - 3)²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units.'
  },
  {
    id: 's1_mat_36',
    subjectId: 'maths',
    questionNumber: 36,
    questionText: 'If sin θ = 3/5, find the value of (tan θ + sec θ): / పాపం θ = 3/5 అయితే, (టాన్ θ + సెకను θ) విలువను కనుగొనండి:',
    options: ['1', '2', '3', '4/5 / 4/5'],
    correctOptionIndex: 1,
    topic: 'Trigonometry',
    difficulty: 'Medium',
    explanation: 'Since sin θ = 3/5, adjacent side = √(5² - 3²) = 4. tan θ = 3/4, sec θ = 5/4. Hence tan θ + sec θ = 8/4 = 2.'
  },
  {
    id: 's1_mat_37',
    subjectId: 'maths',
    questionNumber: 37,
    questionText: 'The total surface area of a solid hemisphere of radius 7 cm is (use π = 22/7): / 7 సెం.మీ వ్యాసార్థం కలిగిన ఘన అర్ధగోళం యొక్క మొత్తం ఉపరితల వైశాల్యం (π = 22/7 ఉపయోగించండి):',
    options: ['308 cm² / 308 సెం.మీ', '462 cm² / 462 సెం.మీ', '616 cm² / 616 సెం.మీ', '154 cm² / 154 సెం.మీ'],
    correctOptionIndex: 1,
    topic: 'Mensuration',
    difficulty: 'Medium',
    explanation: 'TSA of solid hemisphere = 3πr² = 3 × (22/7) × 7 × 7 = 3 × 22 × 7 = 462 cm².'
  },
  {
    id: 's1_mat_38',
    subjectId: 'maths',
    questionNumber: 38,
    questionText: 'A card is drawn from a well-shuffled pack of 52 playing cards. What is the probability of getting a Red Face Card? / 52 ప్లేయింగ్ కార్డ్‌ల బాగా షఫుల్ చేసిన ప్యాక్ నుండి కార్డ్ డ్రా చేయబడింది. రెడ్ ఫేస్ కార్డ్ పొందే సంభావ్యత ఎంత?',
    options: ['3/26 / 3/26', '6/52 / 6/52', '3/13 / 3/13', '1/13 / 1/13'],
    correctOptionIndex: 0,
    topic: 'Probability',
    difficulty: 'Medium',
    explanation: 'Total cards = 52. Red face cards = 3 hearts + 3 diamonds = 6. Probability = 6/52 = 3/26.'
  },
  {
    id: 's1_mat_39',
    subjectId: 'maths',
    questionNumber: 39,
    questionText: 'If Mean = 24 and Median = 26, find the Mode using empirical relation (Mode = 3 Median - 2 Mean): / మీన్ = 24 మరియు మధ్యస్థ = 26 అయితే, అనుభావిక సంబంధాన్ని ఉపయోగించి మోడ్‌ను కనుగొనండి (మోడ్ = 3 మధ్యస్థం - 2 మీన్):',
    options: ['28', '30', '32', '25'],
    correctOptionIndex: 1,
    topic: 'Statistics',
    difficulty: 'Easy',
    explanation: 'Mode = 3(Median) - 2(Mean) = 3(26) - 2(24) = 78 - 48 = 30.'
  },
  {
    id: 's1_mat_40',
    subjectId: 'maths',
    questionNumber: 40,
    questionText: 'If the roots of quadratic equation 2x² - 8x + k = 0 are real and equal, find the value of k: / వర్గ సమీకరణం 2x² - 8x + k = 0 మూలాలు నిజమైనవి మరియు సమానంగా ఉంటే, k విలువను కనుగొనండి:',
    options: ['k = 4 / k = 4', 'k = 8 / k = 8', 'k = 16 / k = 16', 'k = 6 / k = 6'],
    correctOptionIndex: 1,
    topic: 'Quadratic Equations',
    difficulty: 'Medium',
    explanation: 'For real and equal roots, Discriminant D = b² - 4ac = 0. (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.'
  },

  // --------------------------------------------------------------------------
  // PHYSICAL SCIENCE - 5 QUESTIONS (Q41 - Q45)
  // --------------------------------------------------------------------------
  {
    id: 's1_ps_41',
    subjectId: 'physical_science',
    questionNumber: 41,
    questionText: 'Look at the ray diagram of a concave mirror below. An object AB is placed between the Center of Curvature (C) and Focus (F). What is the nature and position of the image A\'B\' formed? / దిగువన ఉన్న పుటాకార దర్పణం యొక్క కిరణ చిత్రాన్ని చూడండి. AB వక్రతా కేంద్రం (C) మరియు నాభి (F) మధ్య ఉంచబడుతుంది. ఏ\'B\' ప్రతిబింబం ఏర్పడిన స్వభావం మరియు స్థానం ఏమిటి?',
    options: [
      'Real, Inverted, and Magnified formed beyond C',
      'Virtual, Erect, and Diminished behind mirror',
      'Real, Inverted, and Same size formed at C',
      'Real, Inverted, and Highly Diminished at Focus F'
    ],
    correctOptionIndex: 0,
    topic: 'Refraction & Mirrors (Ray Diagram)',
    difficulty: 'Easy',
    explanation: 'For a concave mirror, when an object is placed between C and F, the reflected rays converge beyond C to form a Real, Inverted, and Magnified image (A\'B\').',
    academicStandard: 'AS5: Communication through Drawing (Ray Diagrams)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'ray_diagram',
      variant: 'concave_mirror',
      title: 'Concave Mirror Ray Diagram (Object between C and F)'
    }
  },
  {
    id: 's1_ps_42',
    subjectId: 'physical_science',
    questionNumber: 42,
    questionText: 'What is the pH value of a neutral aqueous solution at 25°C? / 25°C వద్ద తటస్థ సజల ద్రావణం యొక్క pH విలువ ఎంత?',
    options: ['0', '7', '14', '1'],
    correctOptionIndex: 1,
    topic: 'Acids, Bases and Salts',
    difficulty: 'Easy',
    explanation: 'At 25°C, neutral pure water has pH = 7. (pH < 7 is acidic, pH > 7 is basic).',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_ps_43',
    subjectId: 'physical_science',
    questionNumber: 43,
    questionText: 'In the provided electrical circuit schematic, two resistors R₁ = 4 Ω and R₂ = 6 Ω are connected in series with a 12V battery and a key. What is the total equivalent resistance of the circuit? / అందించిన ఎలక్ట్రికల్ సర్క్యూట్ స్కీమాటిక్‌లో, రెండు రెసిస్టర్‌లు R₁ = 4 Ω మరియు R₂ = 6 Ω 12V బ్యాటరీ మరియు కీతో శ్రేణి సంధానంలో కలిపారు. సర్క్యూట్ యొక్క మొత్తం ఫలిత నిరోధం ఎంత?',
    options: ['2.4 Ω / 2.4 Ω', '10 Ω / 10 Ω', '24 Ω / 24 Ω', '1.5 Ω / 1.5 Ω'],
    correctOptionIndex: 1,
    topic: 'Electric Current & Circuits',
    difficulty: 'Easy',
    explanation: 'For resistors connected in series: R_eq = R₁ + R₂ = 4 Ω + 6 Ω = 10 Ω. (Current I = V/R = 12/10 = 1.2 A).',
    academicStandard: 'AS5: Communication through Drawing (Circuit Schematics)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'circuit',
      variant: 'resistors_series',
      title: 'Series Resistor Circuit Schematic'
    }
  },
  {
    id: 's1_ps_44',
    subjectId: 'physical_science',
    questionNumber: 44,
    questionText: 'The modern periodic table classification is based on increasing order of: / ఆధునిక ఆవర్తన పట్టిక వర్గీకరణ పెరుగుతున్న క్రమంలో ఆధారపడి ఉంటుంది:',
    options: ['Atomic mass / పరమాణు ద్రవ్యరాశి', 'Atomic number / పరమాణు సంఖ్య', 'Mass number / మాస్ సంఖ్య', 'Valency electrons only / వాలెన్సీ ఎలక్ట్రాన్లు మాత్రమే'],
    correctOptionIndex: 1,
    topic: 'Periodic Classification',
    difficulty: 'Easy',
    explanation: 'Modern Periodic Law states that properties of elements are periodic functions of their Atomic Numbers (Z).',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_ps_45',
    subjectId: 'physical_science',
    questionNumber: 45,
    questionText: 'Observe the experimental apparatus for the reaction of Zinc (Zn) granules with dilute H₂SO₄. Which combustible gas "X" is collected over water that extinguishes a burning candle with a "POP" sound? / పలుచన H₂SO₄ తో జింక్ (Zn) రేణువుల ప్రతిచర్య కోసం ప్రయోగాత్మక ఉపకరణాన్ని గమనించండి. "POP" ధ్వనితో మండే కొవ్వొత్తిని ఆర్పే "X" అనే మండే వాయువు నీటిపై సేకరించబడుతుంది?',
    options: ['Oxygen (O₂) / ఆక్సిజన్ (O₂)', 'Hydrogen (H₂) / హైడ్రోజన్ (H₂)', 'Carbon dioxide (CO₂) / కార్బన్ డయాక్సైడ్ (CO₂)', 'Nitrogen (N₂) / నత్రజని (N₂)'],
    correctOptionIndex: 1,
    topic: 'Chemical Reactions & Gas Evolution',
    difficulty: 'Medium',
    explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑. Hydrogen gas is liberated which burns with a distinct "pop" sound when tested with a flame.',
    academicStandard: 'AS3: Experimentation and Field Investigation',
    academicStandardCode: 'AS3',
    diagramData: {
      type: 'chemistry_setup',
      variant: 'hydrogen_gas',
      markedPoint: 'X',
      title: 'Laboratory Preparation of Hydrogen Gas'
    }
  },

  // --------------------------------------------------------------------------
  // BIOLOGICAL SCIENCE - 5 QUESTIONS (Q46 - Q50)
  // --------------------------------------------------------------------------
  {
    id: 's1_bs_46',
    subjectId: 'biological_science',
    questionNumber: 46,
    questionText: 'Which enzyme present in human saliva helps in the initial breakdown of starch into maltose? / మానవ లాలాజలంలో ఉండే ఏ ఎంజైమ్ స్టార్చ్‌ను మాల్టోస్‌గా జీర్ణం చేయడంలో సహాయపడుతుంది?',
    options: ['Pepsin / పెప్సిన్', 'Trypsin / ట్రిప్సిన్', 'Salivary Amylase (Ptyalin) / లాలాజల అమైలేస్ (ప్టియాలిన్)', 'Lipase / లిపేస్'],
    correctOptionIndex: 2,
    topic: 'Nutrition & Digestion',
    difficulty: 'Easy',
    explanation: 'Salivary amylase (Ptyalin) converts complex starch into simpler maltose sugar in the mouth.',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_bs_47',
    subjectId: 'biological_science',
    questionNumber: 47,
    questionText: 'Observe the structural diagram of a human nephron below. Identify the cup-shaped double-walled structure enclosing the glomerulus marked as "X": / దిగువ మానవ నెఫ్రాన్ యొక్క నిర్మాణ రేఖాచిత్రాన్ని గమనించండి. "X"గా గుర్తించబడిన గ్లోమెరులస్‌ను చుట్టుముట్టే కప్పు ఆకారపు ద్విపొరల నిర్మాణాన్ని గుర్తించండి:',
    options: ["Loop of Henle / హెన్లే యొక్క లూప్", "Bowman's Capsule / బౌమాన్ కాప్సూల్", "Glomerulus / గ్లోమెరులస్", "Tubule / ట్యూబ్యూల్"],
    correctOptionIndex: 1,
    topic: 'Excretion - Renal System',
    difficulty: 'Easy',
    explanation: 'The cup-shaped structure marked X is the Bowman\'s Capsule, which houses the capillary network (glomerulus) where ultrafiltration occurs.',
    academicStandard: 'AS5: Drawing & Model Making (Biological Structures)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'bio_diagram',
      variant: 'nephron',
      markedPoint: 'X',
      title: 'Structural Diagram of Human Nephron'
    }
  },
  {
    id: 's1_bs_48',
    subjectId: 'biological_science',
    questionNumber: 48,
    questionText: 'Which plant hormone is responsible for cell elongation and phototropism towards light? / కాంతి వైపు కణాల పెరుగుదల మరియు ఫోటోట్రోపిజమ్‌కు కారణమయ్యే వృక్ష హార్మోన్ ఏది?',
    options: ['Abscisic acid (ABA) / అబ్సిసిక్ యాసిడ్ (ABA)', 'Auxin / ఆక్సిన్', 'Ethylene / ఇథిలిన్', 'Cytokinin / సైటోకినిన్'],
    correctOptionIndex: 1,
    topic: 'Coordination in Plants',
    difficulty: 'Medium',
    explanation: 'Auxins synthesized at shoot tips promote cellular elongation and cause bending towards the light source (Phototropism).',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_bs_49',
    subjectId: 'biological_science',
    questionNumber: 49,
    questionText: 'Normal resting blood pressure in a healthy human adult is measured as: / ఆరోగ్యకరమైన మానవునిలో సాధారణ విశ్రాంతి రక్తపోటు విలువ::',
    options: ['80/120 mm Hg / 80/120 mm Hg', '120/80 mm Hg / 120/80 mm Hg', '140/90 mm Hg / 140/90 mm Hg', '100/60 mm Hg / 100/60 mm Hg'],
    correctOptionIndex: 1,
    topic: 'Transportation & Heart',
    difficulty: 'Easy',
    explanation: 'Standard systolic / diastolic pressure is 120 / 80 mm of Hg.',
    academicStandard: 'AS6: Appreciation and Application to Daily Life',
    academicStandardCode: 'AS6'
  },
  {
    id: 's1_bs_50',
    subjectId: 'biological_science',
    questionNumber: 50,
    questionText: 'Who is recognized as the "Father of Genetics" for his foundational experiments on Garden Pea plants (Pisum sativum)? / తోట బఠానీ మొక్కలపై (పిసమ్ సాటివమ్) అతని మూల ప్రయోగాలకు "జన్యుశాస్త్ర పితామహుడు"గా ఎవరు గుర్తింపు పొందారు?',
    options: ['Charles Darwin / చార్లెస్ డార్విన్', 'Gregor Johann Mendel / గ్రెగర్ జోహన్ మెండెల్', 'Jean-Baptiste Lamarck / జీన్-బాప్టిస్ట్ లామార్క్', 'Alexander Fleming / అలెగ్జాండర్ ఫ్లెమింగ్'],
    correctOptionIndex: 1,
    topic: 'Heredity & Genetics',
    difficulty: 'Easy',
    explanation: 'Gregor Johann Mendel discovered the fundamental laws of inheritance through experiments on garden peas.',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },

  // --------------------------------------------------------------------------
  // SOCIAL STUDIES - 10 QUESTIONS (Q51 - Q60)
  // --------------------------------------------------------------------------
  {
    id: 's1_soc_51',
    subjectId: 'social_studies',
    questionNumber: 51,
    questionText: 'Observe the given outline map of India. Which longitudinal meridian marked as line "X" (82° 30′ E) is officially chosen as the Standard Meridian of India (IST)? / భారతదేశం యొక్క ఇచ్చిన పటాన్ని గమనించండి. "X" రేఖ (82° 30′ E)గా గుర్తించబడిన ఏ రేఖాంశ మెరిడియన్ అధికారికంగా స్టాండర్డ్ మెరిడియన్ ఆఫ్ ఇండియా (IST)గా ఎంపిక చేయబడింది?',
    options: ['80° 30′ E Meridian / 80° 30′ E మెరిడియన్', '82° 30′ E Standard Meridian (IST) / 82° 30′ E ప్రామాణిక మెరిడియన్ (IST)', '85° 00′ E Meridian / 85° 00′ E మెరిడియన్', '78° 15′ E Meridian / 78° 15′ E మెరిడియన్'],
    correctOptionIndex: 1,
    topic: 'India: Relief Features (Map Skills)',
    difficulty: 'Easy',
    explanation: '82° 30′ E longitude passing near Mirzapur (UP) and Kakinada (A.P.) is the Standard Meridian of India (+5:30 hrs ahead of GMT).',
    academicStandard: 'AS5: Mapping Skills (Map Reading & Pointing)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'india_map',
      variant: 'standard_meridian',
      markedPoint: 'X',
      title: 'Map of India - Standard Meridian of India (82°30\' E)'
    }
  },
  {
    id: 's1_soc_52',
    subjectId: 'social_studies',
    questionNumber: 52,
    questionText: 'Look at the provided physical map of India. Identify the continuous mountain range marked as "X" parallel to the western Arabian Sea coastline: / అందించిన భారతదేశ భౌతిక పటాన్ని చూడండి. పశ్చిమ అరేబియా సముద్ర తీరానికి సమాంతర సంధానంలో "X"గా గుర్తించబడిన అవిచ్ఛిన్న పర్వత శ్రేణిని గుర్తించండి:',
    options: ['Eastern Ghats / తూర్పు కనుమలు', 'Western Ghats (Sahyadri) / పశ్చిమ కనుమలు (సహ్యాద్రి)', 'Aravalli Range / ఆరావళి శ్రేణి', 'Satpura Range / సాత్పురా శ్రేణి'],
    correctOptionIndex: 1,
    topic: 'Physiographic Divisions (Map Skills)',
    difficulty: 'Medium',
    explanation: 'The continuous mountain chain marked as X running parallel to the western coast is the Western Ghats (Sahyadri), having Anamudi (2,695 m) as its highest peak.',
    academicStandard: 'AS5: Mapping Skills (Map Pointing)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'india_map',
      variant: 'western_ghats',
      markedPoint: 'X',
      title: 'Map of India - Western Ghats Mountain Range'
    }
  },
  {
    id: 's1_soc_53',
    subjectId: 'social_studies',
    questionNumber: 53,
    questionText: 'Who was the Chairman of the Drafting Committee of the Indian Constitution? / భారత రాజ్యాంగ ముసాయిదా కమిటీ (Drafting Committee) ఛైర్మన్‌గా ఎవరు ఉన్నారు?',
    options: ['Dr. Rajendra Prasad / డాక్టర్ రాజేంద్ర ప్రసాద్', 'Dr. B.R. Ambedkar / డాక్టర్ బి.ఆర్. అంబేద్కర్', 'Jawaharlal Nehru / జవహర్‌లాల్ నెహ్రూ', 'Sardar Vallabhbhai Patel / సర్దార్ వల్లభాయ్ పటేల్'],
    correctOptionIndex: 1,
    topic: 'Constitution of India',
    difficulty: 'Easy',
    explanation: 'Dr. Bhimrao Ramji Ambedkar was appointed Chairman of the Drafting Committee on August 29, 1947.',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_soc_54',
    subjectId: 'social_studies',
    questionNumber: 54,
    questionText: 'In which year did the historic Quit India Movement launch under the leadership of Mahatma Gandhi? / మహాత్మా గాంధీ నాయకత్వంలో చారిత్రాత్మక క్విట్ ఇండియా ఉద్యమం ఏ సంవత్సరంలో ప్రారంభమైంది?',
    options: ['1920', '1930', '1942', '1947'],
    correctOptionIndex: 2,
    topic: 'National Movement',
    difficulty: 'Easy',
    explanation: 'The Quit India Movement with the call "Do or Die" was launched in August 1942 in Bombay.',
    academicStandard: 'AS2: Reading the Text & Interpretation',
    academicStandardCode: 'AS2'
  },
  {
    id: 's1_soc_55',
    subjectId: 'social_studies',
    questionNumber: 55,
    questionText: 'Observe the World Map below. Identify the strategic sea body marked as "X" connecting the Atlantic Ocean and bordered by Europe, Asia, and Africa: / దిగువన ఉన్న ప్రపంచ పటాన్ని గమనించండి. అట్లాంటిక్ మహాసముద్రాన్ని కలుపుతూ మరియు యూరప్, ఆసియా మరియు ఆఫ్రికా సరిహద్దులుగా "X"గా గుర్తించబడిన వ్యూహాత్మక సముద్ర భాగాన్ని గుర్తించండి:',
    options: ['Baltic Sea / బాల్టిక్ సముద్రం', 'Mediterranean Sea / మధ్యధరా సముద్రం', 'Red Sea / ఎర్ర సముద్రం', 'Black Sea / నల్ల సముద్రం'],
    correctOptionIndex: 1,
    topic: 'The World Between Wars (World Map Skills)',
    difficulty: 'Medium',
    explanation: 'The body of water marked X is the Mediterranean Sea, which played a central geopolitical role during the World Wars and trade routes.',
    academicStandard: 'AS5: Mapping Skills (World Map Reading)',
    academicStandardCode: 'AS5',
    diagramData: {
      type: 'world_map',
      variant: 'mediterranean',
      markedPoint: 'X',
      title: 'World Map - Mediterranean Sea'
    }
  },
  {
    id: 's1_soc_56',
    subjectId: 'social_studies',
    questionNumber: 56,
    questionText: 'Sex Ratio is defined in the Indian Census as the number of females per: / భారత జనగణనలో లింగ నిష్పత్తిని ప్రతి స్త్రీల సంఖ్యగా నిర్వచించారు:',
    options: ['100 males / 100 మంది పురుషులు', '1,000 males / 1,000 మంది పురుషులు', '10,000 males / 10,000 మంది పురుషులు', '1,00,000 males / 1,00,000 మంది పురుషులు'],
    correctOptionIndex: 1,
    topic: 'Population & Demographics',
    difficulty: 'Easy',
    explanation: 'Sex ratio represents the number of female individuals per 1,000 male individuals in the population.',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_soc_57',
    subjectId: 'social_studies',
    questionNumber: 57,
    questionText: 'Based on the sectoral contribution table below, which sector contributes the highest percentage share to India\'s Gross Domestic Product (GDP)? / దిగువన ఉన్న సెక్టోరల్ కంట్రిబ్యూషన్ టేబుల్ ఆధారంగా, భారతదేశ స్థూల దేశీయోత్పత్తి (GDP)కి ఏ రంగం అత్యధిక శాతం వాటాను అందిస్తుంది?',
    options: ['Primary Sector (Agriculture) / ప్రాథమిక రంగం (వ్యవసాయం)', 'Secondary Sector (Manufacturing) / సెకండరీ సెక్టార్ (తయారీ)', 'Tertiary Sector (Services) / తృతీయ రంగం (సేవలు)', 'Mining Sector / మైనింగ్ రంగం'],
    correctOptionIndex: 2,
    topic: 'Sectors of Economy (Information Skills)',
    difficulty: 'Easy',
    explanation: 'The Tertiary (Service) sector contributes over 53.5% to India’s GDP as shown in the data table, making it the largest contributor.',
    academicStandard: 'AS4: Information Skills (Data Interpretation)',
    academicStandardCode: 'AS4',
    diagramData: {
      type: 'data_table',
      tableHeaders: ['Sector', 'Share in GDP (%)', 'Share in Employment (%)'],
      tableRows: [
        ['Primary (Agriculture)', '18.2%', '45.6%'],
        ['Secondary (Manufacturing)', '28.3%', '24.4%'],
        ['Tertiary (Services)', '53.5%', '30.0%']
      ]
    }
  },
  {
    id: 's1_soc_58',
    subjectId: 'social_studies',
    questionNumber: 58,
    questionText: 'Under which Article of the Indian Constitution is the "Right to Equality" guaranteed as a Fundamental Right? / భారత రాజ్యాంగంలోని ఏ ఆర్టికల్ కింద "సమానత్వపు హక్కు" ప్రాథమిక హక్కుగా హామీ ఇవ్వబడింది?',
    options: ['Articles 14 to 18 / ఆర్టికల్స్ 14 నుండి 18', 'Articles 19 to 22 / ఆర్టికల్స్ 19 నుండి 22', 'Articles 25 to 28 / ఆర్టికల్స్ 25 నుండి 28', 'Articles 32 / ఆర్టికల్స్ 32'],
    correctOptionIndex: 0,
    topic: 'Indian Constitution & Rights',
    difficulty: 'Medium',
    explanation: 'Articles 14 through 18 of the Indian Constitution safeguard the Fundamental Right to Equality.',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
  {
    id: 's1_soc_59',
    subjectId: 'social_studies',
    questionNumber: 59,
    questionText: 'The "Chipko Movement" was a famous environmental conservation campaign initiated to protect: / "చిప్కో ఉద్యమం" అనేది రక్షించడానికి ప్రారంభించబడిన ఒక ప్రసిద్ధ పర్యావరణ పరిరక్షణ ప్రచారం:',
    options: ['River waters in Kerala / కేరళలో నదీ జలాలు', 'Forest trees in the Garhwal Himalayas / గర్వాల్ హిమాలయాల్లో అటవీ చెట్లు', 'Tigers in Sundarbans / సుందర్‌బన్స్‌లో పులులు', 'Agricultural lands from salinity / లవణీయత నుండి వ్యవసాయ భూములు'],
    correctOptionIndex: 1,
    topic: 'Sustainable Development',
    difficulty: 'Easy',
    explanation: 'The Chipko Movement started in Uttarakhand (Garhwal) where villagers hugged trees to prevent deforestation.',
    academicStandard: 'AS6: Appreciation and Sensitivity',
    academicStandardCode: 'AS6'
  },
  {
    id: 's1_soc_60',
    subjectId: 'social_studies',
    questionNumber: 60,
    questionText: 'Human Development Index (HDI) published by UNDP is calculated based on which three key dimensions? / UNDP ప్రచురించిన మానవ అభివృద్ధి సూచిక (HDI) ఏ మూడు కీలక కోణాల ఆధారంగా లెక్కించబడుతుంది?',
    options: [
      'Life Expectancy, Per Capita Income, and Educational Attainment',
      'Military Power, GDP, and Population size',
      'Exports, Imports, and Industrial Production',
      'Gold Reserves, Land Area, and Highway Length'
    ],
    correctOptionIndex: 0,
    topic: 'Development & Economics',
    difficulty: 'Medium',
    explanation: 'HDI is a composite index measuring Life Expectancy (Health), Mean/Expected Years of Schooling (Education), and GNI per capita (Standard of living).',
    academicStandard: 'AS1: Conceptual Understanding',
    academicStandardCode: 'AS1'
  },
];

import { SET_2_QUESTIONS } from './sscDailyTestBankSet2';
import { SET_3_QUESTIONS } from './sscDailyTestBankSet3';
import { SET_4_QUESTIONS } from './sscDailyTestBankSet4';
import { SET_5_QUESTIONS } from './sscDailyTestBankSet5';
import { SET_6_QUESTIONS } from './sscDailyTestBankSet6';

export const SSC_TEST_SETS: SSCTestSet[] = [
  {
    id: 'ssc_daily_set_01',
    title: "SSC Board Model Paper 01 (Official Standard)",
    code: "SSC-SET-01",
    description: "Standard Speed Mock Test covering Telugu (10), English (10), Hindi (10), Mathematics (10), Physical Science (5), Biological Science (5), and Social Studies (10).",
    targetDate: new Date().toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_1_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_02',
    title: "SSC State Grand Model Test 02 (High-Yield)",
    code: "SSC-SET-02",
    description: "Curated high-scoring practice set with comprehensive grammar, arithmetic progressions & scientific concepts.",
    targetDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_2_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_03',
    title: "SSC Board Revision Paper 03 (Core Concept Master)",
    code: "SSC-SET-03",
    description: "Essential textbook questions covering Sanskrit/Telugu sandhulu, English voice/speech, Hindi vyakaran & geometry.",
    targetDate: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_3_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_04',
    title: "SSC Public Exam Booster 04 (Problem Solving & Logic)",
    code: "SSC-SET-04",
    description: "Challenging questions with in-depth explanations on logarithms, electricity, chemistry & Indian geography.",
    targetDate: new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_4_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_05',
    title: "SSC State Ranker Challenge 05 (Advanced Mastery)",
    code: "SSC-SET-05",
    description: "Precision test targeting 10/10 GPA with deep questions in trigonometry, periodic trends & Indian national movement.",
    targetDate: new Date(Date.now() - 4 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_5_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_06',
    title: "SSC Final Touch Grand Mock 06 (Full Spectrum)",
    code: "SSC-SET-06",
    description: "Comprehensive evaluation set across all 7 subjects testing speed, recall and conceptual clarity.",
    targetDate: new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_6_QUESTIONS,
  }
];


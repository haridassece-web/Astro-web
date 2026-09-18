// ஸ்ரீ பச்சையம்மன் துணை • ஸ்ரீ கங்கையம்மன் துணை
// Subhathuvam, Sookshuma Valu & Papathuvam Knowledge Base & Evaluation Engine
// சுபத்துவம், சூட்சும வலு மற்றும் பாபத்துவ விதிகள் & கணிப்பு முறை

window.PGAstro = window.PGAstro || {};

(function() {
  const SUBHATHUVAM_DATA = {
    title: "சுபத்துவம் & சூட்சும வலு கோட்பாடுகள்",
    subTitle: "PG Astrologer ஜோதிட ஆய்வு முறை",
    
    // Core Rules from the provided text and image
    coreRules: [
      {
        id: "rule_1",
        title: "1. வளர்பிறை சந்திரனின் பார்வை பெற்ற கிரகம்",
        badge: "அதி சுபத்துவம் (+5)",
        badgeColor: "gold",
        desc: "வளர்பிறை சந்திரனின் நேர் பார்வை (ஏழாம் பார்வை) பெற்ற எந்தவொரு கிரகமும் அளப்பரிய சுபத்துவ ஆற்றலைப் பெறுகிறது. இது ஜாதகருக்கு மனத்தெளிவு, புகழுக்குரிய வளர்ச்சி மற்றும் நற்பலன்களை வாரி வழங்கும்."
      },
      {
        id: "rule_2",
        title: "2. பங்கப்படாத சுப கிரகங்களின் தொடர்பு",
        badge: "உயர் சுபத்துவம் (+4 / +5)",
        badgeColor: "gold",
        desc: "பங்கப்படாத குரு (5, 7, 9 பார்வை அல்லது சேர்க்கை), ஆட்சி/உச்ச சுக்கிரன், வளர்பிறை சந்திரன் மற்றும் பாவர்கள் சேர்க்கை பெறாத தனித்த புதன் ஆகியவை தொடர்பு பெற்ற கிரகமானது அதிக சுபத்துவம் பெறும்."
      },
      {
        id: "rule_3",
        title: "3. மறைவு ஸ்தானங்களிலும் சுபத்துவ கிரகங்கள் யோகம் தரும்",
        badge: "ஆதிபத்தியத்தை விஞ்சும் விதி",
        badgeColor: "cyan",
        desc: "சுபத்துவம் பெற்ற கிரகம் கேந்திரம் (1, 4, 7, 10) அல்லது திரிகோணத்தில் (1, 5, 9) தான் இருக்க வேண்டும் என்பதில்லை. 6, 8, 12 போன்ற மறைவு ஸ்தானங்களில் நின்றாலும், மேற்கண்ட சுபத் தொடர்பு பெற்றிருந்தால், அக்கிரகத்தின் தசா காலங்களில் சாதகருக்கு அளப்பரிய யோக பலன்களை அள்ளித் தரும்."
      },
      {
        id: "rule_4",
        title: "4. இயற்கை பாவர்கள் & பலவீன கிரகங்கள் சுபத்துவம் பெறுதல்",
        badge: "சுபத்துவ மாற்றம்",
        badgeColor: "green",
        desc: "இயற்கை பாவ கிரகங்களான சனி, செவ்வாய், ராகு ஆகியவையும், அஸ்தமனம், வக்ரம் மற்றும் மறைவிடங்களில் ஏறி நின்ற பலவீன கிரகங்களும் கூட, வளர்பிறைச் சந்திரன், குரு, சுக்கிரன், தனித்த புதன் தொடர்பைப் பெறும் போது தங்கள் தீய குணங்களை இழந்து நன்மைகளைச் செய்யும் சுபத்துவத் தன்மையை அடைகின்றன."
      }
    ],

    // Special Ketu & Saturn-Mars Papathuvam Principles
    ketuAndPapathuvamRules: [
      {
        id: "ketu_sookshuma",
        title: "கேது தரும் சூட்சும வலு (Ketu's Sookshuma Valu)",
        type: "positive",
        badge: "சூட்சும வலு (+3)",
        desc: "பாப கிரகங்களான சனி அல்லது செவ்வாயோடு கேது இணையும் போது அல்லது தொடர்பு கொள்ளும் போது, கேது அக்கிரகத்திற்கு சூட்சும வலுவை அளிக்கிறார். இதனால் அந்த பாவ கிரகம் மறைமுக நன்மைகளைச் செய்யத் தொடங்குகிறது."
      },
      {
        id: "saturn_mars_ketu_exception",
        title: "முக்கிய விதிவிலக்கு: சனி + செவ்வாய் இணைவில் கேதுவின் நிலை",
        type: "warning",
        badge: "கடும் பாபத்துவம் (-6)",
        desc: "செவ்வாயும் சனியும் ஓரிடத்தில் இணைந்திருக்கும் பொழுதோ அல்லது சம சப்தமமாக (1-7) பார்த்துக் கொள்ளும் போதோ, அல்லது செவ்வாயின் 4-ஆம் பார்வை சனிக்கும், சனியின் 10-ஆம் பார்வை செவ்வாய்க்கும் ஒரே நேரத்தில் இருக்கும் போதோ கடுமையான பாபத்துவம் உருவாகிறது. இப்படிப்பட்ட அமைப்பில் இவர்களுடன் கேது இணைந்திருந்தாலும் 'இருவரும் சூட்சும வலு அடைந்துள்ளார்கள்' என்று கணிக்கக் கூடாது! இந்த ஓர் இடத்தில் மட்டும் கேது தரும் சூட்சும வலுவை விட பாபத்துவமே மேலோங்கி நிற்கும். கேதுவின் தொடர்பைப் பெறும் சனி மற்றும் செவ்வாய் இருவரும் சூட்சும வலுவை இழந்து மிகக் கடுமையான பாபத்துவத்தை அடைகிறார்கள். தான் இருக்கும் இடத்தை பாழ்படுத்துவதோடு, தொடர்பு கொள்ளும் கிரகத்தையும் நன்மைகளைச் செய்ய விடாமல் தடுப்பார்கள்."
      },
      {
        id: "venus_affliction",
        title: "சுக்கிரன் காம இழப்பு & திருமண பாதிப்பு விதி",
        type: "warning",
        badge: "காம இழப்பு / தாமதம்",
        desc: "சுக்கிரன் செவ்வாயோடு இணைந்திருக்கும் நிலையில் சனியின் பார்வையையும் பெற்றிருந்தால், அங்கே சுக்கிரன் தனது மிக முக்கிய காரகத்துவமான காமத்தை தர இயலாத நிலை ஏற்படும். இதனால் திருமணம் கண்டிப்பாக தாமதமாகும் அல்லது திருமண வாழ்க்கை சரியான அமைப்பில் இருக்காது."
      },
      {
        id: "combustion_rule",
        title: "சூரியனால் அஸ்தமனம் (Combustion / Asthamanam)",
        type: "danger",
        badge: "அஸ்தமன பாபத்துவம் (-3)",
        desc: "கிரகங்கள் சூரியனுடன் மிக நெருக்கமாக சில பாகைகளுக்குள் இணையும் போது தனது சுய ஒளியை இழந்து அஸ்தமனம் அடைகின்றன. சுப கிரகங்கள் அஸ்தமனம் ஆனால் நற்பலன் குறையும்; பாப கிரகங்கள் அஸ்தமனம் ஆனால் அவைகளின் தீய வீரியம் மாறும்."
      },
      {
        id: "foreign_residence_rule",
        title: "வெளிநாட்டு வாசம் & நிரந்தர குடியுரிமை விதி (8 மற்றும் 12 ஆம் பாவங்கள்)",
        type: "info",
        badge: "8 & 12 பாவங்கள்",
        desc: "சர ராசிகள் (மேஷம், கடகம், துலாம், மகரம்) மற்றும் ஜல ராசியான கடகத்தில் இருக்கும் கிரகங்கள் தசா காலத்தில் வெளிநாட்டு வாசம் தரும். மேற்கு திசையைக் குறிக்கும் சனி 12-ல் அமைந்தால் மேற்கு நாடுகள் (அரபு நாடுகள், ஐரோப்பா, அமெரிக்கா) வாய்ப்பு கிட்டும். ஆனால் 8 மற்றும் 12 ஆம் பாவங்கள் சுபத்துவமாக இருந்தால் மட்டுமே ஒருவர் நிரந்தரமாக வெளிநாட்டில் குடியமர்வார். 8-ல் ராகு போன்ற பாவர்கள் அமர்ந்து பாபத்துவம் பெற்றால், அவர் பொருள் ஈட்டிவிட்டு மீண்டும் தாய்நாட்டிற்கே திரும்பி விடுவார்."
      },
      {
        id: "career_selection_rule",
        title: "அதிக சுபத்துவ கிரகமே தொழில் தரும் கோட்பாடு",
        type: "success",
        badge: "முதன்மைத் தொழில்",
        desc: "ஒருவரின் ஜாதகத்தில் எந்த கிரகம் அதிக சுபத்துவமாக இருக்கிறதோ, அதன் முக்கிய காரகத்துவமே அவரது முதன்மைத் தொழிலாக அமையும். உதாரணமாக, ஆட்சி சுக்கிரனுடன் மிக நெருக்கமாக இணைந்த சனி சுபத்துவமடைந்தால், சனியின் காரகமான பெட்ரோலிய எண்ணெய் கிணறு தொழில் அமையும். சூரியன் மற்றும் சிம்மம் குரு பார்வையில் சுபத்துவம் பெற்றால் அரசு துறை பணி அமையும்."
      }
    ],

    // Career Descriptions based on Highest Subhathuvam Planet
    careerGuidance: {
      "சூரியன்": {
        title: "அரசுத் துறை, நிர்வாகம், அரசியல் & மருத்துவம்",
        desc: "சூரியன் அதிக சுபத்துவம் பெற்றிருப்பதால் அரசுப் பணி, அரசு ஒப்பந்தங்கள், ஐஏஎஸ்/ஐபிஎஸ் நிர்வாகப் பொறுப்புகள், அரசியல் தலைமை, தந்தை வழி தொழில், தலைமை மருத்துவர் மற்றும் கௌரவப் பதவிகள் யோகம் தரும்."
      },
      "சந்திரன்": {
        title: "உணவு, திரவப் பொருட்கள், நீர் & வெளிநாட்டு வர்த்தகம்",
        desc: "சந்திரன் அதிக சுபத்துவம் பெற்றிருப்பதால் உணவுப் பொருட்கள், ஹோட்டல் துறை, பால் & குளிர்பானங்கள், நீர் மேலாண்மை, வெளிநாட்டு பயணம் & அயல்நாட்டு வேலை, நர்சிங், புகைப்படக் கலை மற்றும் மக்கள் தொடர்புத் தொழில் சிறக்கும்."
      },
      "செவ்வாய்": {
        title: "பொறியியல், ரியல் எஸ்டேட், பாதுகாப்பு & இயந்திரங்கள்",
        desc: "செவ்வாய் சுபத்துவம் அடைந்துள்ளதால் சிவில்/மெக்கானிக்கல் பொறியியல், கட்டிடக்கலை, பூமி/நிலம் & ரியல் எஸ்டேட், மின்சாரம், ராணுவம்/காவல்துறை, அறுவை சிகிச்சை மருத்துவம் மற்றும் உலைக்களத் தொழில்கள் பெரும் வெற்றி தரும்."
      },
      "புதன்": {
        title: "மென்பொருள் (IT), ஆடிட்டிங், கணிதம் & வணிகம்",
        desc: "புதன் சுபத்துவம் பெற்றிருப்பதால் தகவல் தொழில்நுட்பம் (Software/IT), ஆடிட்டிங், கணக்காளர், வங்கித் துறை, ஜோதிடம், பத்திரிகை, எழுத்து, கமிஷன் வர்த்தகம் மற்றும் கல்வி நிறுவனங்கள் மூலம் பெரும் தனலாபம் கிட்டும்."
      },
      "குரு": {
        title: "கல்வி, நிதித்துறை, நீதி & ஆன்மீக வழிகாட்டல்",
        desc: "குரு அதிக சுபத்துவம் பெற்றிருப்பதால் பேராசிரியர்/ஆசிரியர் பணி, நீதிபதி, வழக்கறிஞர், நிதி ஆலோசனை & முதலீடு, அறக்கட்டளை, ஆன்மீகத் தலைமை, வேத சாஸ்திரங்கள் மற்றும் வங்கி மேலாண்மைத் துறைகளில் பெரும் செல்வாக்கு உண்டாகும்."
      },
      "சுக்கிரன்": {
        title: "கலைத்துறை, சொகுசு வாகனங்கள், ஆபரணங்கள் & ஜவுளி",
        desc: "சுக்கிரன் அதிக சுபத்துவம் அடைந்துள்ளதால் சினிமா/டிவி/இசை கலைத்துறை, தங்க நகைகள், சொகுசு கார்கள்/வாகனங்கள், ஆடை வடிவமைப்பு (Fashion/Textile), அழகு சாதனங்கள், ஹோட்டல் மற்றும் பெண்கள் சார்ந்த தொழில்கள் சிறக்கும்."
      },
      "சனி": {
        title: "உற்பத்தி, பெட்ரோலியம், இரும்பு, சுரங்கம் & விவசாயம்",
        desc: "சனி சுபத்துவம் பெற்றிருப்பதால் எண்ணெய் கிணறுகள், பெட்ரோலியம் மற்றும் வாயு சுத்திகரிப்பு, இரும்பு & உலோகத் தொழிற்சாலைகள், சுரங்கத் தொழில், விவசாயப் பண்ணைகள், பழைய பொருட்கள் மறுசுழற்சி மற்றும் தொழிலாளர் மேலாண்மை பெரும் வருமானம் தரும்."
      },
      "ராகு": {
        title: "விமானத் துறை, கெமிக்கல்ஸ், ஆன்லைன் வர்த்தகம் & வெளிநாடு",
        desc: "ராகு சுபத்துவம் அடைந்துள்ளதால் விண்வெளி/விமானத் துறை, மருந்துகள் & ரசாயனம், ஆன்லைன்/ஈ-காமர்ஸ் வர்த்தகம், அந்நிய நாட்டு வர்த்தகம், அனிமேஷன் மற்றும் மாயா உலக சினிமாத் தயாரிப்பு பெரும் லாபம் தரும்."
      },
      "கேது": {
        title: "மருத்துவம், ஆயுர்வேதம், கம்ப்யூட்டர் கோடிங் & ஆன்மீகம்",
        desc: "கேது சுபத்துவம்/சூட்சும வலு பெற்றிருப்பதால் சித்த/ஆயுர்வேத மருத்துவம், மூலிகை ஆராய்ச்சி, கம்ப்யூட்டர் புரோகிராமிங் (Coding), மைக்ரோ எலக்ட்ரானிக்ஸ், ஆன்மீக ஆசிரமங்கள் மற்றும் துறவறம்/ஞான சிந்தனைகள் வழிகாட்டும்."
      }
    },

    // Papathuvam Health & Obstacle Warnings and Remedies
    papathuvamWarnings: {
      "சூரியன்": {
        warning: "தலைவலி, கண் கோளாறு, எலும்பு தேய்மானம், இதய அழுத்தம், தந்தை நல பாதிப்பு அல்லது அரசு வழியில் இழுபறி.",
        remedy: "தினமும் ஆதித்ய ஹிருதய ஸ்தோத்திரம் படித்தல் அல்லது ஞாயிறு தோறும் சிவபெருமானுக்கு செவ்வரளி மாலை சாற்றி நெய்தீபம் ஏற்றுதல்."
      },
      "சந்திரன்": {
        warning: "மன அழுத்தம், அதீத பயம், தூக்கமின்மை, சளி/நுரையீரல் உபாதைகள், தாயாருடன் கருத்து மோதல்.",
        remedy: "திங்கட்கிழமை தோறும் அம்பாள் அல்லது பராசக்தி வழிபாடு செய்தல், அமாவாசை தோறும் முன்னோர்களுக்கு அன்னதானம் தருதல்."
      },
      "செவ்வாய்": {
        warning: "இரத்தக் கொதிப்பு, விபத்துக்கள், வெட்டுக் காயங்கள், சகோதரர்களுடன் விரோதம், மனைவியிடம் கணவருக்கு பிணக்கு.",
        remedy: "செவ்வாய்க்கிழமைகளில் முருகப் பெருமானுக்கு செவ்வரளி அர்ச்சனை செய்தல், கந்த சஷ்டி கவசம் படித்தல்."
      },
      "புதன்": {
        warning: "நரம்புத் தளர்ச்சி, தோல் நோய்கள், மறதி, பேச்சில் தடுமாற்றம், கல்வி அல்லது பத்திரப் பதிவுகளில் இழுபறி.",
        remedy: "புதன்கிழமைகளில் மகா விஷ்ணு அல்லது பெருமாளுக்கு துளசி மாலை சாற்றுதல், பச்சைப்பயறு தானம் செய்தல்."
      },
      "குரு": {
        warning: "கொழுப்பு அதிகரிப்பு, கல்லீரல் பாதிப்பு, சர்க்கரை வியாதி, குழந்தை பிறப்பில் தாமதம், நற்பெயருக்கு பங்கம்.",
        remedy: "வியாழக்கிழமைகளில் தட்சிணாமூர்த்திக்கு கொண்டைக்கடலை மாலை சாற்றுதல், ஏழை மாணவர்களின் கல்விக்கு உதவுதல்."
      },
      "சுக்கிரன்": {
        warning: "காம உணர்வுகளில் தளர்ச்சி, திருமணத் தாமதம், சிறுநீரகக் கோளாறுகள், பெண்களால் சங்கடங்கள்.",
        remedy: "வெள்ளிக்கிழமைகளில் மகாலட்சுமிக்கு மல்லிகை மலர் சாற்றுதல், சுமங்கலிப் பெண்களுக்கு தாம்பூலம் வழங்கி ஆசி பெறுதல்."
      },
      "சனி": {
        warning: "மூட்டு வலி, வாதம், இடுப்பு/முழங்கால் நோய்கள், தொழிலில் மந்த நிலை, தேவையற்ற கடன்கள் & மன உளைச்சல்.",
        remedy: "சனிக்கிழமை தோறும் நரசிம்மர் அல்லது ஆஞ்சநேயர் வழிபாடு செய்தல், மாற்றுத்திறனாளிகள் அல்லது தூய்மைப் பணியாளர்களுக்கு அன்னதானம் வழங்குதல்."
      },
      "ராகு": {
        warning: "விஷக்கடி பயம், ஒவ்வாமை (Allergy), அடையாளம் தெரியாத நோய்கள், மாயப் பிரமைகள், வழக்குகள்.",
        remedy: "ராகு காலத்தில் துர்க்கை அம்மனுக்கு எலுமிச்சம்பழ தீபம் ஏற்றுதல், நாகர் வழிபாடு செய்தல்."
      },
      "கேது": {
        warning: "மூல நோய், சரும அரிப்பு, நரம்பு முடிச்சு உபாதைகள், தனிமை உணர்வு, தற்கொலை எண்ணம்/விரக்தி.",
        remedy: "விநாயகப் பெருமானுக்கு அருகம்புல் சாற்றி வழிபடுதல், ஏழை நோயாளிகளுக்கு மருத்துவ உதவி செய்தல்."
      }
    },

    // Real Case Study Horoscope
    caseStudy: {
      title: "உதாரண ஜாதக ஆய்வு (Live Case Study)",
      nativeName: "அரபு நாட்டு அரசு பெட்ரோலியத் துறை ஊழியர்",
      dob: "1972-07-11",
      time: "04:45",
      place: "திருச்சி (Trichy)",
      lagna: "மிதுனம்",
      rasi: "மிதுனம்",
      keyPoints: [
        {
          label: "லக்னம் & ராசி",
          detail: "மிதுன லக்னம், மிதுன ராசியில் அமாவாசை சூரியன் + சந்திரன் சேர்க்கை. ஏழில் ஆட்சி பெற்ற குரு அதிவக்ர நிலையில் நேருக்கு நேர் பார்த்து சுபத்துவம் அளிக்கிறார்."
        },
        {
          label: "அரசு வேலை",
          detail: "சூரியனும் சிம்மமும் ஆட்சி பெற்ற குருவின் பார்வையில் சுபத்துவம் பெற்றுள்ளதால் அரபு நாட்டில் அரசுப் பணி அமைந்தது."
        },
        {
          label: "பெட்ரோலியத் துறை பணி",
          detail: "ஆட்சி பெற்ற சுக்கிரனுடன் மிக நெருக்கமாக சில டிகிரிக்குள் இணைந்துள்ள சனியின் முக்கிய காரகத்துவமான பெட்ரோலிய எண்ணெய் கிணறு நிறுவனத்தில் பணி."
        },
        {
          label: "வெளிநாட்டு வாசம்",
          detail: "கடகம் ஜல ராசி என்பதால் அங்குள்ள கிரகமும், மேற்கு திசையைக் குறிக்கும் சனி வெளிநாட்டைக் குறிக்கும் 12-ல் அமர்ந்து தன லாப பாக்கியாதிபதியாக இருப்பதால் மேற்கு நாடான UAE-ல் பணி."
        },
        {
          label: "புதன் தசை குடும்ப பாதிப்பு",
          detail: "இளமைப் பருவ புதன் தசை நீச செவ்வாய் சேர்க்கை மற்றும் சனியின் பார்வையைப் பெற்றதால் நிம்மதியான குடும்ப அமைப்பை தரவில்லை."
        },
        {
          label: "கேது தசை சனி புக்தி",
          detail: "தசாநாதன் கேது செவ்வாய் மற்றும் சனியின் பார்வையைப் பெற்றுள்ளதால் குடும்பத்தில் மனைவியின் மனப்போக்கில் கடுமையான பாதிப்புகள்."
        },
        {
          label: "தாயகம் திரும்புதல்",
          detail: "8-ல் ராகு அமர்ந்து பாபத்துவம் அடைந்துள்ளதால் நிரந்தரமாக வெளிநாட்டில் தங்க முடியாது; 60 வயதிற்கு மேல் சுக்கிர தசை பிற்பகுதியில் தாயகம் திரும்பி குழந்தைகளுடன் வாழ்வார்."
        }
      ]
    }
  };

  // Helper to evaluate Subhathuvam, Sookshuma Valu & Papathuvam
  // chartInput can be { rasiId: [ { planet, degree, isRetrograde, isExalted, isDebilitated, isCombust } ] } or simple { rasiId: [names] }
  function evaluateChartSubhathuvam(chartInput, options = {}) {
    if (!chartInput || Object.keys(chartInput).length === 0) {
      return null;
    }

    const PLANET_NAMES = ["சூரியன்", "சந்திரன்", "செவ்வாய்", "புதன்", "குரு", "சுக்கிரன்", "சனி", "ராகு", "கேது"];
    const planetPositions = {}; // planetName -> { rasiId, degree, isRetrograde, isExalted, isDebilitated, isCombust }
    const signPlanets = {};     // signId -> array of planet names

    for (let sign = 1; sign <= 12; sign++) {
      signPlanets[sign] = [];
      const items = chartInput[sign] || [];
      items.forEach(item => {
        const pName = typeof item === "string" ? item : item.planet;
        if (pName) {
          signPlanets[sign].push(pName);
          planetPositions[pName] = {
            rasiId: sign,
            degree: item.degree !== undefined ? parseFloat(item.degree) : 15.0,
            isRetrograde: !!item.isRetrograde,
            isExalted: !!item.isExalted,
            isDebilitated: !!item.isDebilitated,
            isCombust: !!item.isCombust
          };
        }
      });
    }

    const sunPos = planetPositions["சூரியன்"];
    const moonPos = planetPositions["சந்திரன்"];
    const marsPos = planetPositions["செவ்வாய்"];
    const mercPos = planetPositions["புதன்"];
    const jupPos = planetPositions["குரு"];
    const venPos = planetPositions["சுக்கிரன்"];
    const satPos = planetPositions["சனி"];
    const rahuPos = planetPositions["ராகு"];
    const ketuPos = planetPositions["கேது"];

    // 1. Check Waxing / Waning Moon
    let isWaxingMoon = true;
    if (sunPos && moonPos) {
      const diffHouses = (moonPos.rasiId - sunPos.rasiId + 12) % 12;
      // 0 to 6 houses forward is waxing (வளர்பிறை: 1 to 7th house), 7 to 11 is waning (தேய்பிறை)
      isWaxingMoon = (diffHouses >= 1 && diffHouses <= 7);
      if (diffHouses === 0) {
        // Conjunction with Sun is Amavasya (அமாவாசை)
        isWaxingMoon = false;
      }
    }

    // 2. Check Saturn - Mars Severe Mutual Affliction
    let saturnMarsSevereAffliction = false;
    let saturnMarsAfflictionDetails = "";
    if (satPos && marsPos) {
      // Direct Conjunction
      if (satPos.rasiId === marsPos.rasiId) {
        saturnMarsSevereAffliction = true;
        saturnMarsAfflictionDetails = "ஒரே ராசியில் சனி + செவ்வாய் நேரடி இணைவு";
      }
      // 1-7 Opposition
      const diff = Math.abs(satPos.rasiId - marsPos.rasiId);
      if (diff === 6) {
        saturnMarsSevereAffliction = true;
        saturnMarsAfflictionDetails = "சமசப்தமமாக சனி ↔ செவ்வாய் நேருக்கு நேர் பார்த்துக் கொள்ளுதல் (1-7 பார்வை)";
      }
      // Mars 4th aspect on Saturn (Mars + 3)
      if (((marsPos.rasiId + 3 - 1) % 12 + 1) === satPos.rasiId) {
        saturnMarsSevereAffliction = true;
        saturnMarsAfflictionDetails = "செவ்வாயின் 4-ஆம் பார்வை சனி மீது படுதல்";
      }
      // Saturn 10th aspect on Mars (Saturn + 9)
      if (((satPos.rasiId + 9 - 1) % 12 + 1) === marsPos.rasiId) {
        saturnMarsSevereAffliction = true;
        saturnMarsAfflictionDetails = "சனியின் 10-ஆம் பார்வை செவ்வாய் மீது படுதல்";
      }
    }

    // 3. Check Venus Affliction (Mars conjunction + Saturn aspect/conjunction)
    let venusAfflictionFound = false;
    if (venPos && marsPos && satPos) {
      const withMars = (venPos.rasiId === marsPos.rasiId);
      const saturnAspects = [
        satPos.rasiId,
        (satPos.rasiId + 2 - 1) % 12 + 1, // 3rd
        (satPos.rasiId + 6 - 1) % 12 + 1, // 7th
        (satPos.rasiId + 9 - 1) % 12 + 1  // 10th
      ];
      if (withMars && saturnAspects.includes(venPos.rasiId)) {
        venusAfflictionFound = true;
      }
    }

    // 4. Evaluate Each Planet
    const results = [];

    PLANET_NAMES.forEach(pName => {
      const pos = planetPositions[pName];
      if (!pos) return;

      const sign = pos.rasiId;
      let subhaScore = 0;
      let sookshumaScore = 0;
      let papaScore = 0;
      const subhaReasons = [];
      const sookshumaReasons = [];
      const papaReasons = [];

      // ==========================
      // A. சுபத்துவ விதிகள் (Subhathuvam)
      // ==========================

      // 1. Jupiter (குரு) 5, 7, 9 aspect or conjunction
      if (jupPos && pName !== "குரு") {
        if (sign === jupPos.rasiId) {
          subhaScore += 4;
          subhaReasons.push("குருவுடன் சேர்க்கை (+4 சுபத்துவம்)");
        } else {
          const jupAspectSigns = [
            (jupPos.rasiId + 4 - 1) % 12 + 1, // 5th aspect
            (jupPos.rasiId + 6 - 1) % 12 + 1, // 7th aspect
            (jupPos.rasiId + 8 - 1) % 12 + 1  // 9th aspect
          ];
          if (jupAspectSigns.includes(sign)) {
            subhaScore += 5;
            subhaReasons.push("குருவின் திரிகோண/ஏழாம் பார்வை (+5 அதி சுபத்துவம்)");
          }
        }
      }

      // 2. Waxing Moon (வளர்பிறை சந்திரன்) 7th aspect or conjunction
      if (moonPos && pName !== "சந்திரன்") {
        if (((moonPos.rasiId + 6 - 1) % 12 + 1) === sign) {
          if (isWaxingMoon) {
            subhaScore += 5;
            subhaReasons.push("வளர்பிறை சந்திரனின் நேர் ஏழாம் பார்வை (+5 அதி சுபத்துவம்)");
          } else {
            subhaScore += 2;
            subhaReasons.push("சந்திரனின் நேர் பார்வை (+2 சுபத்துவம்)");
          }
        } else if (moonPos.rasiId === sign) {
          if (isWaxingMoon) {
            subhaScore += 4;
            subhaReasons.push("வளர்பிறை சந்திரனுடன் இணைவு (+4 சுபத்துவம்)");
          }
        }
      }

      // 3. Venus (சுக்கிரன்) conjunction or 7th aspect
      if (venPos && pName !== "சுக்கிரன்") {
        if (sign === venPos.rasiId) {
          subhaScore += 3;
          subhaReasons.push("சுக்கிரனுடன் சேர்க்கை (+3 சுபத்துவம்)");
        } else if (((venPos.rasiId + 6 - 1) % 12 + 1) === sign) {
          subhaScore += 3;
          subhaReasons.push("சுக்கிரனின் ஏழாம் பார்வை (+3 சுபத்துவம்)");
        }
      }

      // 4. Unafflicted Mercury (தனித்த புதன்)
      if (mercPos && pName !== "புதன்") {
        const mercHasMalefic = signPlanets[mercPos.rasiId].some(pl => ["சனி", "செவ்வாய்", "ராகு"].includes(pl));
        if (!mercHasMalefic) {
          if (sign === mercPos.rasiId) {
            subhaScore += 2;
            subhaReasons.push("தனித்த சுப புதனின் சேர்க்கை (+2 சுபத்துவம்)");
          } else if (((mercPos.rasiId + 6 - 1) % 12 + 1) === sign) {
            subhaScore += 2;
            subhaReasons.push("தனித்த சுப புதனின் பார்வை (+2 சுபத்துவம்)");
          }
        }
      }

      // 5. Exaltation (உச்ச பலம்)
      if (pos.isExalted) {
        subhaScore += 2;
        subhaReasons.push("உச்ச பலம் பெற்று சுபத்துவ உயர்வு (+2)");
      }

      // ==========================
      // B. சூட்சும வலு விதிகள் (Sookshuma Valu)
      // ==========================

      // Ketu contact with Saturn or Mars
      if (ketuPos && (pName === "சனி" || pName === "செவ்வாய்")) {
        if (sign === ketuPos.rasiId) {
          if (saturnMarsSevereAffliction) {
            // Cancel Sookshuma Valu, become severe Papathuvam!
            papaScore += 6;
            papaReasons.push("⚠️ சனி-செவ்வாய் பாபத்துவத்தில் கேது: சூட்சும வலு ரத்தாகி மிகக் கடுமையான பாபத்துவம் (-6)");
          } else {
            sookshumaScore += 3;
            sookshumaReasons.push("கேதுவின் சேர்க்கையால் மறைமுக நன்மைகளைத் தரும் சூட்சும வலு (+3)");
          }
        }
      }

      // Retrograde in Upachaya or Kendra
      if (pos.isRetrograde && (pName === "சனி" || pName === "செவ்வாய்" || pName === "குரு" || pName === "சுக்கிரன்")) {
        sookshumaScore += 2;
        sookshumaReasons.push("வக்கிர நிலை பெற்றதால் சூட்சும ஆற்றல் பெருக்கம் (+2)");
      }

      // ==========================
      // C. பாபத்துவ விதிகள் (Papathuvam)
      // ==========================

      // 1. Saturn (சனி) conjunction or 3, 7, 10 aspects
      if (satPos && pName !== "சனி") {
        const satAspects = [
          (satPos.rasiId + 2 - 1) % 12 + 1, // 3rd aspect
          (satPos.rasiId + 6 - 1) % 12 + 1, // 7th aspect
          (satPos.rasiId + 9 - 1) % 12 + 1  // 10th aspect
        ];
        if (sign === satPos.rasiId) {
          papaScore += 3;
          papaReasons.push("சனியின் நேரடி சேர்க்கை (-3 பாபத்துவம்)");
        } else if (satAspects.includes(sign)) {
          papaScore += 2;
          papaReasons.push("சனியின் பார்வை தொடர்பு (-2 பாபத்துவம்)");
        }
      }

      // 2. Mars (செவ்வாய்) conjunction or 4, 7, 8 aspects
      if (marsPos && pName !== "செவ்வாய்") {
        const marsAspects = [
          (marsPos.rasiId + 3 - 1) % 12 + 1, // 4th aspect
          (marsPos.rasiId + 6 - 1) % 12 + 1, // 7th aspect
          (marsPos.rasiId + 7 - 1) % 12 + 1  // 8th aspect
        ];
        if (sign === marsPos.rasiId) {
          papaScore += 3;
          papaReasons.push("செவ்வாயின் நேரடி சேர்க்கை (-3 பாபத்துவம்)");
        } else if (marsAspects.includes(sign)) {
          papaScore += 2;
          papaReasons.push("செவ்வாயின் பார்வை தொடர்பு (-2 பாபத்துவம்)");
        }
      }

      // 3. Rahu (ராகு) conjunction
      if (rahuPos && pName !== "ராகு") {
        if (sign === rahuPos.rasiId) {
          papaScore += 3;
          papaReasons.push("ராகுவின் நேரடி சேர்க்கை / கிரகணம் (-3 பாபத்துவம்)");
        }
      }

      // 4. Combustion by Sun (சூரியனால் அஸ்தமனம்)
      if (sunPos && pName !== "சூரியன்") {
        let isComb = pos.isCombust;
        if (!isComb && sign === sunPos.rasiId) {
          const diffDeg = Math.abs(pos.degree - sunPos.degree);
          if (diffDeg <= 10.0) isComb = true;
        }
        if (isComb) {
          papaScore += 3;
          papaReasons.push("சூரியனுடன் இணைந்து அஸ்தமனம் (-3 அஸ்தமன பாபத்துவம்)");
        }
      }

      // 5. Debilitation (நீச நிலை)
      if (pos.isDebilitated) {
        papaScore += 3;
        papaReasons.push("நீச நிலை அடைந்து பலவீனம் (-3 பாபத்துவம்)");
      }

      // 6. Waning / Amavasya Moon Contact
      if (!isWaxingMoon && moonPos && pName !== "சந்திரன்" && sign === moonPos.rasiId) {
        papaScore += 2;
        papaReasons.push("அமாவாசை / தேய்பிறை சந்திரன் சேர்க்கை (-2 பாபத்துவம்)");
      }

      // 7. Special Venus Affliction
      if (pName === "சுக்கிரன்" && venusAfflictionFound) {
        papaScore += 4;
        papaReasons.push("⚡ செவ்வாய் சேர்க்கை + சனி பார்வை: காம இழப்பு & திருமணத் தாமத பாபத்துவம் (-4)");
      }

      // Net Score Calculation
      const netScore = subhaScore + sookshumaScore - papaScore;

      // Status classification
      let status = "சமநிலை (Neutral)";
      let badgeClass = "badge-neutral";
      let statusType = "neutral";

      if (netScore >= 4) {
        status = "அதி சுபத்துவம் (Highly Benefic)";
        badgeClass = "badge-exalted";
        statusType = "high_subha";
      } else if (netScore >= 1) {
        status = "சுபத்துவம் (Subhathuvam)";
        badgeClass = "badge-benefic";
        statusType = "subha";
      } else if (sookshumaScore >= 2 && netScore >= 0) {
        status = "சூட்சும வலு (Sookshuma Valu)";
        badgeClass = "badge-sookshuma";
        statusType = "sookshuma";
      } else if (netScore <= -4) {
        status = "கடும் பாபத்துவம் (Severe Papathuvam)";
        badgeClass = "badge-debilitated";
        statusType = "severe_papa";
      } else if (netScore < 0 || papaScore >= 3) {
        status = "பாபத்துவம் (Papathuvam)";
        badgeClass = "badge-border";
        statusType = "papa";
      }

      // Aggregate all reasons
      const allReasons = [
        ...subhaReasons.map(r => ({ type: "subha", text: r })),
        ...sookshumaReasons.map(r => ({ type: "sookshuma", text: r })),
        ...papaReasons.map(r => ({ type: "papa", text: r }))
      ];

      results.push({
        planet: pName,
        signId: sign,
        degree: pos.degree,
        subhaScore: subhaScore,
        sookshumaScore: sookshumaScore,
        papaScore: papaScore,
        netScore: netScore,
        status: status,
        statusType: statusType,
        badgeClass: badgeClass,
        reasons: allReasons.length > 0 ? allReasons : [{ type: "neutral", text: "தனித்த இயல்பு நிலை" }],
        careerGuidance: SUBHATHUVAM_DATA.careerGuidance[pName] || null,
        papathuvamWarning: SUBHATHUVAM_DATA.papathuvamWarnings[pName] || null
      });
    });

    // Sort by highest Net Score (most Subhathuvam first)
    results.sort((a, b) => b.netScore - a.netScore);

    // Filter top Subhathuvam planet (primary career indicator)
    const topSubhaPlanet = results[0] && results[0].netScore >= 1 ? results[0] : results[0];

    // Filter top Papathuvam planet (highest papaScore)
    const sortedByPapa = [...results].sort((a, b) => b.papaScore - a.papaScore);
    const topPapaPlanet = sortedByPapa[0] && sortedByPapa[0].papaScore >= 2 ? sortedByPapa[0] : null;

    return {
      evaluatedAt: new Date().toLocaleTimeString(),
      isWaxingMoon: isWaxingMoon,
      saturnMarsAffliction: saturnMarsSevereAffliction,
      saturnMarsDetails: saturnMarsAfflictionDetails,
      venusAffliction: venusAfflictionFound,
      topSubhathuvamPlanet: topSubhaPlanet,
      topPapathuvamPlanet: topPapaPlanet,
      planets: results
    };
  }

  // Public API
  window.PGAstro.subhathuvam = {
    data: SUBHATHUVAM_DATA,
    evaluate: evaluateChartSubhathuvam
  };
})();


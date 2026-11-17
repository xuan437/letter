export type MailStage = 'closed' | 'unsealing' | 'sliding' | 'open';

export type SealColor = 'crimson' | 'emerald' | 'navy' | 'gold';

export type PaperTheme = 'ivory' | 'blush' | 'sage';

export type LanguageCode = 'en' | 'tl' | 'ceb' | 'war';

export interface LetterData {
  recipient: string;
  sender: string;
  date: string;
  salutation: string;
  body: string;
  closing: string;
  signature: string;
  sealColor: SealColor;
  paperTheme: PaperTheme;
}

export interface LanguageUiStrings {
  label: string;
  forLabel: string;
  hint: string;
  lockedHint: string;
  foldButton: string;
  confirmTitle: string;
  confirmMessage: string;
  confirmCancel: string;
  confirmAccept: string;
  replyButton: string;
  replyModalTitle: string;
  replyToLabel: string;
  replyFromLabel: string;
  replyPlaceholder: string;
  replyCancel: string;
  replySend: string;
  replySentTitle: string;
  replySentMessage: string;
  replySentClose: string;
  prankTitle: string;
  prankMessage: string;
  prankRestoreButton: string;
}

export const LANGUAGE_OPTIONS: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'ceb', label: 'Bisaya' },
  { code: 'war', label: 'Waray' },
];

export const UI_TRANSLATIONS: Record<LanguageCode, LanguageUiStrings> = {
  en: {
    label: 'English',
    forLabel: 'For',
    hint: 'Click the wax seal to open your letter',
    lockedHint: 'Name the little messenger & answer his questions first to unlock ♥',
    foldButton: 'Fold & Seal',
    confirmTitle: 'Open This Letter?',
    confirmMessage: 'Are you sure you want to break the wax seal and open this letter from Emjay?',
    confirmCancel: 'Not yet',
    confirmAccept: 'Yes, open it',
    replyButton: 'Send a Letter Back',
    replyModalTitle: 'Write a Letter Back',
    replyToLabel: 'To',
    replyFromLabel: 'From',
    replyPlaceholder: 'Write what is in your heart...',
    replyCancel: 'Cancel',
    replySend: 'Seal & Send Back',
    replySentTitle: 'Your Letter Was Sent ♥',
    replySentMessage: 'Your reply has been sealed with love and sent back to Emjay.',
    replySentClose: 'Back to Letter',
    prankTitle: 'Just Kidding! It’s a Prank! 😄',
    prankMessage: 'Gotcha! I wouldn’t really burn Emjay’s letter—he poured his whole heart into it. Go ahead and read it!',
    prankRestoreButton: 'Restore the Letter ♥',
  },
  tl: {
    label: 'Tagalog',
    forLabel: 'Para kay',
    hint: 'Pindutin ang wax seal upang buksan ang sulat',
    lockedHint: 'Pangalanan muna ang mensahero at sagutin ang mga tanong niya ♥',
    foldButton: 'Tiklupin at Isara',
    confirmTitle: 'Buksan ang Sulat?',
    confirmMessage: 'Sigurado ka bang gusto mong buksan ang selyadong sulat na ito mula kay Emjay?',
    confirmCancel: 'Huwag muna',
    confirmAccept: 'Oo, buksan',
    replyButton: 'Magpadala ng Sagot',
    replyModalTitle: 'Sumulat ng Sagot',
    replyToLabel: 'Para kay',
    replyFromLabel: 'Mula kay',
    replyPlaceholder: 'Isulat ang nilalaman ng iyong puso...',
    replyCancel: 'Kanselahin',
    replySend: 'Isara at Ipadala',
    replySentTitle: 'Naipadala na ang Sulat ♥',
    replySentMessage: 'Ang iyong sagot ay maingat na naisara at naipadala pabalik kay Emjay.',
    replySentClose: 'Bumalik sa Sulat',
    prankTitle: 'Joke lang! Prank lang iyon! 😄',
    prankMessage: 'Huli ka! Hindi ko talaga susunugin ang sulat ni Emjay—buong puso niya itong isinulat para sa iyo. Basahin mo na!',
    prankRestoreButton: 'Ibalik ang Sulat ♥',
  },
  ceb: {
    label: 'Bisaya',
    forLabel: 'Para kang',
    hint: 'Pindota ang wax seal aron ablihan ang sulat',
    lockedHint: 'Ngalani una ang mensahero ug tubaga ang iyang mga pangutana ♥',
    foldButton: 'Pil-a ug Isira',
    confirmTitle: 'Ablihan Kini nga Sulat?',
    confirmMessage: 'Sigurado ka ba nga gusto nimong ablihan kining sinelyohan nga sulat gikan kang Emjay?',
    confirmCancel: 'Dili pa',
    confirmAccept: 'Oo, ablihi',
    replyButton: 'Padala og Balos nga Sulat',
    replyModalTitle: 'Pagsulat og Balos',
    replyToLabel: 'Para kang',
    replyFromLabel: 'Gikan kang',
    replyPlaceholder: 'Isulat ang naa sa imong kasingkasing...',
    replyCancel: 'Kanselahon',
    replySend: 'Selyohi ug Ipadala',
    replySentTitle: 'Napadala na ang Imong Sulat ♥',
    replySentMessage: 'Ang imong balos nga sulat gisilyohan uban sa gugma ug gipadala balik kang Emjay.',
    replySentClose: 'Balik sa Sulat',
    prankTitle: 'Joke lang! Prank ra to! 😄',
    prankMessage: 'Nadakpan ka! Dili gyud nako sunugon ang sulat ni Emjay—gikan gyud na sa iyang kasingkasing. Basaha na!',
    prankRestoreButton: 'Ibalik ang Sulat ♥',
  },
  war: {
    label: 'Waray',
    forLabel: 'Para kan',
    hint: 'Pinduta an wax seal para abrihan an surat',
    lockedHint: 'Ngarani anay an mensahero ngan batona an iya mga pakiana ♥',
    foldButton: 'Pil-a ngan Isara',
    confirmTitle: 'Abrihan Ini nga Surat?',
    confirmMessage: 'Sigurado ka ba nga karuyag mo abrihan ini nga sinelyohan nga surat tikang kan Emjay?',
    confirmCancel: 'Diri anay',
    confirmAccept: 'Oo, abriha',
    replyButton: 'Pagpadara hin Balos nga Surat',
    replyModalTitle: 'Pagsurat hin Balos',
    replyToLabel: 'Para kan',
    replyFromLabel: 'Tikang kan',
    replyPlaceholder: 'Isurat an aada ha imo kasingkasing...',
    replyCancel: 'Kanselahon',
    replySend: 'Selyohi ngan Ipadara',
    replySentTitle: 'Napadara na an Imo Surat ♥',
    replySentMessage: 'An imo balos nga surat ginselyohan hin gugma ngan iginpadara pabalik kan Emjay.',
    replySentClose: 'Balik ha Surat',
    prankTitle: 'Joke la! Prank la ito! 😄',
    prankMessage: 'Nadakpan ka! Diri ko gud susunugon an surat ni Emjay—tikang gud ito ha iya kasingkasing. Basaha na!',
    prankRestoreButton: 'Ibalik an Surat ♥',
  },
};

export const LETTER_TRANSLATIONS: Record<LanguageCode, LetterData> = {
  en: {
    recipient: 'Cherry',
    sender: 'Emjay',
    date: 'November 18, 2026',
    salutation: 'Dear Cherry,',
    body: `I’m not great with words, especially when it comes to saying what’s really in my heart. I’ve tried a few times to say this to your face and it never comes out right, so I’m writing it down instead. Please bear with me if it sounds clumsy.

First, I’m sorry. I’m sorry for all the mistakes I made and the bad choices that hurt you. I can’t take them back, and I won’t pretend they didn’t matter. You deserved better from me, and I know that. I’m trying hard to learn from all of it.

When I met you, I became the happiest man in the world. You brought light into my life in a way I never knew I needed, and that feeling has never gone away. Every good thing in me came out because of you, and I never want to forget that.

I also want you to know that no matter what happens, I still love you. I love you with everything I have, with all my heart’s content. That doesn’t change, even on the days when things between us are hard or uncertain.

And I will never break my promise to you. I know I’ve let you down before, but this is one thing I’m holding onto, and I’ll keep working to be the person you deserve.

I hope that someday I can give you everything you want, not just the things money can buy, but the comfort and peace you’ve always wished for. And I hope that one day, we can travel the world together. I can picture it, the two of us in places we’ve only talked about, laughing and making memories side by side.

I hope to experience more adventures with you, just like the world sets us free to enjoy its view.`,
    closing: 'Always yours,',
    signature: 'Emjay',
    sealColor: 'crimson',
    paperTheme: 'blush',
  },
  tl: {
    recipient: 'Cherry',
    sender: 'Emjay',
    date: 'Nobyembre 18, 2026',
    salutation: 'Mahal kong Cherry,',
    body: `Hindi ako magaling sa mga salita, lalo na pagdating sa pagsasabi ng tunay na nilalaman ng puso ko. Ilang beses ko nang sinubukang sabihin ito sa harap mo pero hindi lumalabas nang maayos, kaya isinulat ko na lang. Pagpasensyahan mo sana kung medyo magulo pakinggan.

Una, patawad. Patawad sa lahat ng pagkakamaling nagawa ko at sa mga maling desisyon na nakasakit sa iyo. Hindi ko na iyon mababawi, at hindi ko itatanggi na may bigat ang mga iyon. Mas nararapat ka sa mas mabuting pagtrato mula sa akin, at alam ko iyon. Nagsusumikap akong matuto mula sa lahat ng nangyari.

Nang makilala kita, naging pinakamasayang lalaki ako sa buong mundo. Nagdala ka ng liwanag sa buhay ko sa paraang hindi ko inakalang kailangan ko, at hindi kailanman nawala ang pakiramdam na iyon. Lahat ng kabutihan sa akin ay lumabas dahil sa iyo, at hinding-hindi ko gustong makalimutan iyon.

Gusto ko ring malaman mo na kahit anong mangyari, mahal pa rin kita. Mahal kita nang buong-buo, nang buong puso ko. Hindi iyon magbabago, kahit sa mga araw na mahirap o hindi tiyak ang sitwasyon sa pagitan natin.

At hinding-hindi ko sisirain ang pangako ko sa iyo. Alam kong nabigo kita noon, pero ito ang isang bagay na pinanghahawakan ko, at patuloy akong magsisikap na maging taong karapat-dapat para sa iyo.

Sana balang araw ay maibigay ko sa iyo ang lahat ng gusto mo—hindi lang ang mga bagay na nabibili ng pera, kundi ang ginhawa at kapayapaang matagal mo nang hinihiling. At sana isang araw, makapaglakbay tayong dalawa sa buong mundo. Naiisip ko na tayong dalawa sa mga lugar na dati ay pinag-uusapan lang natin, nagtatawanan at gumagawa ng mga alaala nang magkasama.

Umaasa akong makaranas pa ng mas maraming paglalakbay kasama ka, gaya ng mundong nagpapalaya sa atin upang masilayan ang ganda nito.`,
    closing: 'Habambuhay na sa iyo,',
    signature: 'Emjay',
    sealColor: 'crimson',
    paperTheme: 'blush',
  },
  ceb: {
    recipient: 'Cherry',
    sender: 'Emjay',
    date: 'Nobyembre 18, 2026',
    salutation: 'Pinangga kong Cherry,',
    body: `Dili ko maayo sa mga pulong, labi na kon bahin sa pagsulti sa tinuod nga naa sa akong kasingkasing. Pipila na ka higayon nga gisulayan nako kini isulti sa imong atubangan pero dili gyud mogawas og tarong, mao nga gisulat na lang nako. Pasayloa ko kon medyo bakikaw kini paminawon.

Una, pasayloa ko. Pasayloa ko sa tanang sayop nga akong nabuhat ug sa mga dili maayong desisyon nga nakapasakit nimo. Dili na nako kana mabalik, ug dili ko magpakaaron-ingnon nga wala kadto’y bili. Angay ka sa mas maayo gikan kanako, ug kabalo ko ana. Naningkamot gyud ko nga makakat-on gikan sa tanan.

Sukad nga nagkaila ta, nahimo kong pinakamalipayon nga lalaki sa tibuok kalibotan. Nagdala ka og kahayag sa akong kinabuhi sa paagi nga wala ko damha nga gikinahanglan diay nako, ug kadtong pagbati wala gyud mawala. Tanan nga maayo sa akong kaugalingon nigawas tungod nimo, ug dili gyud ko gusto nga makalimot ana.

Gusto usab nako nga mahibalo ka nga bisan unsay mahitabo, gihigugma gihapon tika. Gihigugma tika sa tanan nakong makaya, sa tibuok nakong kasingkasing. Dili kana mausab, bisan sa mga adlaw nga lisod o dili sigurado ang tanan tali kanato.

Ug dili gyud nako gub-on ang akong saad nimo. Kabalo ko nga napakyas tika kaniadto, pero kini ang usa ka butang nga akong gikuptan, ug magpadayon ko sa pagpaningkamot nga mahimong tawo nga angay para nimo.

Naglaom ko nga moabot ang adlaw nga mahatag nako nimo ang tanan nimong gipangandoy—dili lang ang mga butang nga mapalit sa kwarta, kondili ang kahupayan ug kalinaw nga dugay na nimong gipangayo. Ug naglaom ko nga usa ka adlaw, makasuroy ta sa tibuok kalibotan nga magkauban. Mahunahunaan na nako kitang duha sa mga lugar nga kaniadto ato lang gistoryahan, nagkatawa ug naghimo og mga handumanan nga nagtupad.

Naglaom ko nga makaagi pa og daghang panimpalad uban nimo, sama sa kalibotan nga naghatag kanato og kagawasan aron matagamtam ang kanindot niini.`,
    closing: 'Kanimo hangtod sa hangtod,',
    signature: 'Emjay',
    sealColor: 'crimson',
    paperTheme: 'blush',
  },
  war: {
    recipient: 'Cherry',
    sender: 'Emjay',
    date: 'Nobyembre 18, 2026',
    salutation: 'Hinigugma ko nga Cherry,',
    body: `Diri ako maupay ha mga pulong, labi na kon mahitungod ha pagsumat han tinuod nga aada ha akon kasingkasing. Pira na ka beses ko ginsari pagyakan ini ha imo atubangan pero diri gud nagawas hin maupay, sanglit ginsurat ko na la. Pasayloa ako kon baga hin diri maupay pamatian.

Una, pasayloa ako. Pasayloa ako ha ngatanan nga mga sayop nga akon nabuhat ngan ha mga maraot nga desisyon nga nakasakit ha imo. Diri ko na ito mababalik, ngan diri ako magpapakunwari nga waray ito kapulsanan. Angay ka hin mas maupay tikang ha akon, ngan maaram ako hito. Naningkamot gud ako nga makatuon tikang ha ngatanan.

Han nakilala ko ikaw, nagin pinakamalipayon ako nga lalaki ha bug-os nga kalibotan. Nagdara ka hin kapawa ha akon kinabuhi ha paagi nga waray ko hunahunaa nga kinahanglan ko ngay-an, ngan ito nga pagbati waray gud mawara. Ngatanan nga maupay ha akon ginawas tungod ha imo, ngan diri ko gud karuyag nga hingalimtan ito.

Karuyag ko gihapon nga mahibaro ka nga bisan ano an mahitabo, hinigugma ko ikaw gihapon. Hinigugma ko ikaw ha ngatanan nga aada ha akon, ha bug-os ko nga kasingkasing. Diri ito magbabag-o, bisan ha mga adlaw nga makuri o diri sigurado an butang ha butnga naton.

Ngan diri ko gud rurub-on an akon saad ha imo. Maaram ako nga napakyas ko ikaw hadto, pero ini an usa nga butang nga akon gin kakaptan, ngan magpapadayon ako ha pagtrabaho basi magin tawo nga angay para ha imo.

Naglalaom ako nga ha usa ka adlaw maihatag ko ha imo an ngatanan nga imo karuyag—diri la an mga butang nga mapapalit han kwarta, kundi an kahayahay ngan kamurayawan nga maiha mo na gin-aampo. Ngan naglalaom ako nga ha usa ka adlaw, makakalakat kita ha bug-os nga kalibotan nga magkaupod. Nakikita ko na kita nga duha ha mga lugar nga hadto gin-iistoryahan la naton, nagtatawa ngan naghihimo hin mga hinumduman nga magkaupod.

Naglalaom ako nga makaagi pa hin mas damo nga pagbiyahe kaupod ka, sugad han kalibotan nga naghahatag ha aton hin kagawasan basi matagamtaman an iya kahusay.`,
    closing: 'Ha imo ha kadayunan,',
    signature: 'Emjay',
    sealColor: 'crimson',
    paperTheme: 'blush',
  },
};

export const DEFAULT_LETTER: LetterData = LETTER_TRANSLATIONS.en;

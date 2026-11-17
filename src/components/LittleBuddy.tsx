import React, { useCallback, useEffect, useState } from 'react';
import { LanguageCode } from '../types/letter';

interface LittleBuddyProps {
  language: LanguageCode;
  onCompleteQuestions?: () => void;
  onAnswerNo?: () => void;
  nudgeSignal?: number;
}

interface BuddyCopy {
  introMessage: string;
  namePlaceholder: string;
  nameSubmitLabel: string;
  nameGreeting: (name: string) => string;
  questions: string[];
  yesLabel: string;
  noLabel: string;
  yesReactions: string[];
  noReaction: string;
  finalMessage: string;
  askAgainLabel: string;
  chanceTitle: string;
  chanceQuestion: string;
  chanceYesResponse: string;
  chanceNoResponse: string;
  chanceCloseLabel: string;
  answerFirstNudge: string;
}

interface BuddySpot {
  top: string;
  left: string;
  alignRight: boolean;
  bubbleBelow: boolean;
}

const BUDDY_SPOTS: BuddySpot[] = [
  { top: '12%', left: '4%', alignRight: false, bubbleBelow: true },
  { top: '12%', left: '78%', alignRight: true, bubbleBelow: true },
  { top: '44%', left: '3%', alignRight: false, bubbleBelow: false },
  { top: '44%', left: '80%', alignRight: true, bubbleBelow: false },
  { top: '72%', left: '5%', alignRight: false, bubbleBelow: false },
  { top: '72%', left: '78%', alignRight: true, bubbleBelow: false },
];

const pickRandomSpot = (currentIndex?: number): number => {
  if (BUDDY_SPOTS.length <= 1) return 0;
  let next = Math.floor(Math.random() * BUDDY_SPOTS.length);
  while (next === currentIndex) {
    next = Math.floor(Math.random() * BUDDY_SPOTS.length);
  }
  return next;
};

const BUDDY_COPY: Record<LanguageCode, BuddyCopy> = {
  en: {
    introMessage:
      'Hi Cherry! I’m Emjay’s little messenger. What would you like to name me?',
    namePlaceholder: 'Give me a name...',
    nameSubmitLabel: 'Meet Me ♥',
    nameGreeting: (name) => `Yay! I love the name ${name}! ♥`,
    questions: [
      'Do you like this guy?',
      'Do you miss him?',
      'Do you need him?',
      'Do you still smile when you see his name?',
      'Do you remember the day you two first met?',
      'Did he make you feel special?',
      'Do you still think about the good memories?',
      'Would you let him hold your hand again?',
      'Do you believe he is trying his best to change?',
      'Do you forgive him for his past mistakes?',
      'Do you still care about him?',
      'Would you let him cook or buy your favorite food?',
      'Do you want late-night talks with him again?',
      'Would you go on a sunset walk with him?',
      'Do you want to visit Paris with him someday?',
      'Do you want to see cherry blossoms in Japan together?',
      'Would you ride a gondola in Venice with him?',
      'Do you want to watch the sunrise in Santorini together?',
      'Do you still feel a little spark for him?',
      'Will you let him prove how much he loves you?',
      'Will you travel the world with him someday?',
    ],
    yesLabel: 'Yes ♥',
    noLabel: 'No',
    yesReactions: [
      'Hehe, I knew it! ♥',
      'Aww, he misses you too!',
      'He’s always right here for you.',
      'Your smile is his favorite thing!',
      'That day changed his life forever.',
      'You deserve to feel special every day ♥',
      'He treasures every single one of them.',
      'He’ll never let go this time ♥',
      'He’s working hard every day for you!',
      'Thank you for having such a kind heart ♥',
      'He cares about you more than words can say.',
      'Anything you’re craving, he’s on it!',
      'He misses those late-night laughs so much.',
      'Hand in hand, just the two of you ♥',
      'Paris is waiting for you two!',
      'Sakura season with you sounds like a dream!',
      'A romantic boat ride in Venezia ♥',
      'Blue domes and golden sunsets together!',
      'That little spark means everything ♥',
      'He won’t waste a single moment!',
      'The whole world is waiting for you two! ♥',
    ],
    noReaction: 'Hmm... are you sure? Try reading his letter again!',
    finalMessage: 'Call him now, he’s waiting! ♥',
    askAgainLabel: 'Ask again',
    chanceTitle: 'One Honest Question',
    chanceQuestion: 'If given a chance, will you start again with him?',
    chanceYesResponse:
      'Thank you for giving love another chance ♥ He promises to treasure your heart and do things right.',
    chanceNoResponse:
      'That’s completely okay. Thank you for taking the time to read his heart—he’ll always wish you peace and happiness.',
    chanceCloseLabel: 'Close',
    answerFirstNudge: 'Hehe, answer my mini questions first before opening the letter! ♥',
  },
  tl: {
    introMessage:
      'Hi Cherry! Ako ang maliit na mensahero ni Emjay. Ano ang gusto mong ipangalan sa akin?',
    namePlaceholder: 'Bigyan mo ako ng pangalan...',
    nameSubmitLabel: 'Simulan ♥',
    nameGreeting: (name) => `Yehey! Ang ganda ng pangalang ${name}! ♥`,
    questions: [
      'Gusto mo ba ang lalaking ito?',
      'Nami-miss mo ba siya?',
      'Kailangan mo ba siya?',
      'Napapangiti ka pa rin ba kapag nakikita mo ang pangalan niya?',
      'Naaalala mo pa ba ang araw na una kayong nagkakilala?',
      'Ipinaramdam ba niya sa iyo na espesyal ka?',
      'Iniisip mo pa rin ba ang masasayang alaala ninyo?',
      'Papayag ka bang hawakan niya ulit ang kamay mo?',
      'Naniniwala ka bang nagsusumikap siyang magbago?',
      'Pinapatawad mo na ba siya sa mga pagkakamali niya noon?',
      'May pakialam ka pa rin ba sa kanya?',
      'Papayag ka bang ipagluto o bilhin niya ang paborito mong pagkain?',
      'Gusto mo pa ba ng mga late-night talks kasama siya?',
      'Sasama ka bang maglakad kasama siya sa paglubog ng araw?',
      'Gusto mo bang pumunta sa Paris kasama siya balang araw?',
      'Gusto mo bang makita ang cherry blossoms sa Japan nang magkasama?',
      'Sasakay ka ba ng gondola sa Venice kasama siya?',
      'Gusto mo bang panoorin ang pagsikat ng araw sa Santorini nang magkasama?',
      'May nararamdaman ka pa rin bang spark para sa kanya?',
      'Hahayaan mo ba siyang patunayan kung gaano ka niya kamahal?',
      'Sasama ka bang maglakbay sa buong mundo kasama siya balang araw?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Hindi',
    yesReactions: [
      'Hehe, sabi na nga ba! ♥',
      'Aww, nami-miss ka rin niya!',
      'Lagi siyang nandiyan para sa iyo.',
      'Ang ngiti mo ang paborito niya sa lahat!',
      'Binago ng araw na iyon ang buhay niya.',
      'Karapat-dapat kang maramdamang espesyal araw-araw ♥',
      'Pinapahalagahan niya ang bawat alaala ninyo.',
      'Hindi na niya bibitawan ngayon ♥',
      'Nagsusumikap siya araw-araw para sa iyo!',
      'Salamat sa napakabuti mong puso ♥',
      'Sobrang mahalaga ka sa kanya higit sa salita.',
      'Kahit anong craving mo, ibibigay niya!',
      'Miss na miss niya ang mga tawanan ninyo sa gabi.',
      'Magkahawak-kamay, kayong dalawa lang ♥',
      'Naghihintay ang Paris sa inyong dalawa!',
      'Parang panaginip ang sakura season kasama ka!',
      'Romantikong biyahe sa Venezia ♥',
      'Mga asul na simboryo at gintong paglubog ng araw!',
      'Ang munting spark na iyon ang lahat para sa kanya ♥',
      'Hindi niya sasayangin ang kahit isang sandali!',
      'Naghihintay ang buong mundo sa inyong dalawa! ♥',
    ],
    noReaction: 'Hmm... sigurado ka ba? Basahin mo ulit ang sulat niya!',
    finalMessage: 'Tawagan mo na siya ngayon, naghihintay siya! ♥',
    askAgainLabel: 'Magtanong ulit',
    chanceTitle: 'Isang Totoong Tanong',
    chanceQuestion:
      'Kung bibigyan ng pagkakataon, handa ka bang magsimula muli kasama siya?',
    chanceYesResponse:
      'Salamat sa pagbibigay ng isa pang pagkakataon ♥ Pangako niyang iingatan ang puso mo at itatama ang lahat.',
    chanceNoResponse:
      'Ayos lang iyon. Salamat sa pagbabasa ng nilalaman ng puso niya—palagi niyang hinihiling ang iyong kapayapaan at saya.',
    chanceCloseLabel: 'Isara',
    answerFirstNudge: 'Hehe, sagutin mo muna ang mga tanong ko bago buksan ang sulat! ♥',
  },
  ceb: {
    introMessage:
      'Hi Cherry! Ako ang gamay nga mensahero ni Emjay. Unsay gusto nimo nga ipangalan nako?',
    namePlaceholder: 'Hatagi ko og ngalan...',
    nameSubmitLabel: 'Sugdi ♥',
    nameGreeting: (name) => `Yehey! Ganahan kaayo ko sa ngalang ${name}! ♥`,
    questions: [
      'Ganahan ba ka aning lakiha?',
      'Gimingaw ba ka niya?',
      'Gikinahanglan ba nimo siya?',
      'Makapahiyom pa ba ka kon makita nimo ang iyang ngalan?',
      'Nahinumdom pa ba ka sa adlaw nga una mong nagkaila?',
      'Gipabati ba ka niya nga espesyal ka?',
      'Naghunahuna pa ba ka sa nindot ninyong mga handumanan?',
      'Mosugot ba ka nga gunitan niya pag-usab ang imong kamot?',
      'Mituo ba ka nga naningkamot siya nga magbag-o?',
      'Gipasaylo na ba nimo siya sa iyang mga sayop kaniadto?',
      'Nagpakabana pa ba ka niya?',
      'Mosugot ba ka nga lutoan o palitan ka niya sa imong paboritong pagkaon?',
      'Gusto pa ba ka og late-night talks uban niya?',
      'Mokuyog ba ka niya maglakaw sa pagsalop sa adlaw?',
      'Gusto ba ka moadto sa Paris uban niya puhon?',
      'Gusto ba ka makakita og cherry blossoms sa Japan nga magkauban?',
      'Mosakay ba ka og gondola sa Venice uban niya?',
      'Gusto ba ka motan-aw sa pagsubang sa adlaw sa Santorini nga magkauban?',
      'Naa pa ba kay gamay nga spark alang niya?',
      'Tugotan ba nimo siya nga pamatud-an kon unsa ka niya gihigugma?',
      'Mokuyog ba ka niya sa pagsuroy sa tibuok kalibotan puhon?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Dili',
    yesReactions: [
      'Hehe, kabalo gyud ko! ♥',
      'Aww, gimingaw pud siya nimo!',
      'Naa ra gyud siya kanunay para nimo.',
      'Ang imong pahiyom ang iyang paborito!',
      'Kadtong adlawa nakapausab sa iyang kinabuhi.',
      'Angay kang mobati nga espesyal matag adlaw ♥',
      'Giampingan niya ang matag handumanan ninyo.',
      'Dili na gyud siya mobuhi karon ♥',
      'Naningkamot siya matag adlaw para nimo!',
      'Salamat sa imong malumo nga kasingkasing ♥',
      'Mas dako pa sa mga pulong ang iyang pagtagad nimo.',
      'Bisan unsay imong gusto, ihatag niya!',
      'Gimingaw kaayo siya sa inyong mga katawa sa gabii.',
      'Gunitay sa kamot, kamong duha lang ♥',
      'Naghuwat ang Paris ninyong duha!',
      'Murag damgo ang sakura season uban nimo!',
      'Romantikong sakay sa Venezia ♥',
      'Mga asul nga simboryo ug bulawanong pagsalop sa adlaw!',
      'Kanang gamay nga spark dako kaayo og kahulogan ♥',
      'Dili gyud niya usikan ang bisan unsang higayon!',
      'Naghuwat ang tibuok kalibotan ninyong duha! ♥',
    ],
    noReaction: 'Hmm... sigurado ka? Basaha pag-usab ang iyang sulat!',
    finalMessage: 'Tawgi na siya karon, naghuwat siya! ♥',
    askAgainLabel: 'Pangutana pag-usab',
    chanceTitle: 'Usa ka Tinud-anay nga Pangutana',
    chanceQuestion:
      'Kon hatagan og higayon, mosugot ba ka nga magsugod pag-usab uban niya?',
    chanceYesResponse:
      'Salamat sa paghatag og lain nga higayon ♥ Nagsaad siya nga ampingan ang imong kasingkasing ug tarungon ang tanan.',
    chanceNoResponse:
      'Okay ra gyud na. Salamat sa paggahin og oras sa pagbasa sa iyang gibati—kanunay siyang nanghinaut sa imong kalinaw ug kalipay.',
    chanceCloseLabel: 'Isira',
    answerFirstNudge: 'Hehe, tubaga sa ang akong mga pangutana una nimo ablihan ang sulat! ♥',
  },
  war: {
    introMessage:
      'Hi Cherry! Ako an gutiay nga mensahero ni Emjay. Ano an karuyag mo nga ipangaran ha akon?',
    namePlaceholder: 'Tagi ako hin ngaran...',
    nameSubmitLabel: 'Tikangi ♥',
    nameGreeting: (name) => `Yehey! Naruruyag gud ako han ngaran nga ${name}! ♥`,
    questions: [
      'Naruruyag ka ba hini nga lalaki?',
      'Nahihidlaw ka ba ha iya?',
      'Kinahanglan mo ba hiya?',
      'Nahiyom ka pa ba gihapon kon nakikita mo an iya ngaran?',
      'Nahihinumdoman mo pa ba an adlaw nga una kamo nagkakilala?',
      'Ginpaabat ba niya ha imo nga espesyal ka?',
      'Ginhuhunahuna mo pa ba an mag-upay niyo nga mga hinumduman?',
      'Maruruyag ka ba nga kaptan niya utro an imo kamot?',
      'Natoo ka ba nga naniningkamot hiya pagbag-o?',
      'Ginpapasaylo mo na ba hiya ha iya mga sayop hadto?',
      'May pagtagad ka pa ba ha iya?',
      'Maruruyag ka ba nga lutoan o palitan ka niya han imo paborito nga pagkaon?',
      'Karuyag mo pa ba hin late-night talks kaupod hiya?',
      'Maupod ka ba ha iya maglakat ha pagtunod han adlaw?',
      'Karuyag mo ba kumadto ha Paris kaupod hiya ha usa ka adlaw?',
      'Karuyag mo ba makakita hin cherry blossoms ha Japan nga magkaupod?',
      'Masakay ka ba hin gondola ha Venice kaupod hiya?',
      'Karuyag mo ba pagkita han pagsirang han adlaw ha Santorini nga magkaupod?',
      'May-ada pa ba gutiay nga spark ha imo kasingkasing para ha iya?',
      'Tutugotan mo ba hiya nga pamatud-an kon mationan-o ka niya hinigugma?',
      'Maupod ka ba ha iya paglibot ha bug-os nga kalibotan ha usa ka adlaw?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Diri',
    yesReactions: [
      'Hehe, maaram gud ako! ♥',
      'Aww, nahihidlaw gihapon hiya ha imo!',
      'Aada la hiya pirme para ha imo.',
      'An imo hiyom an iya paborito ha ngatanan!',
      'Ito nga adlaw nagbag-o han iya kinabuhi.',
      'Angay ka umabat nga espesyal kada adlaw ♥',
      'Gin-aampingan niya an tagsa nga hinumduman niyo.',
      'Diri na gud hiya mabuhi yana ♥',
      'Naniningkamot hiya kada adlaw para ha imo!',
      'Salamat han imo maupay nga kasingkasing ♥',
      'Mas dako pa ha mga pulong an iya paghigugma ha imo.',
      'Bisan ano an imo karuyag, ihahatag niya!',
      'Nahihidlaw gud hiya han iyo mga katawa ha gab-i.',
      'Magkakaptan hin kamot, kamo la nga duha ♥',
      'Naghuhulat an Paris ha iyo nga duha!',
      'Sugad hin inop an sakura season kaupod ka!',
      'Romantiko nga sakay ha Venezia ♥',
      'Mga asul nga simboryo ngan bulawanon nga pagtunod han adlaw!',
      'Ito nga gutiay nga spark dako gud an kahulogan ♥',
      'Diri gud niya sasayangan an bisan usa nga higayon!',
      'Naghuhulat an bug-os nga kalibotan ha iyo nga duha! ♥',
    ],
    noReaction: 'Hmm... sigurado ka? Basaha utro an iya surat!',
    finalMessage: 'Tawagi na hiya yana, naghuhulat hiya! ♥',
    askAgainLabel: 'Pakiana utro',
    chanceTitle: 'Usa nga Tinuod nga Pakiana',
    chanceQuestion:
      'Kon tagan hin higayon, maruruyag ka ba nga magtikang utro kaupod hiya?',
    chanceYesResponse:
      'Salamat ha paghatag hin usa pa nga higayon ♥ Nagsasaad hiya nga aampingan an imo kasingkasing ngan aayuson an ngatanan.',
    chanceNoResponse:
      'Maupay la ito. Salamat ha pagbasa han aada ha iya kasingkasing—pirme hiya naghihingyap han imo kamurayawan ngan kalipay.',
    chanceCloseLabel: 'Isara',
    answerFirstNudge: 'Hehe, batona anay an akon mga pakiana san-o abrihan an surat! ♥',
  },
};

export const LittleBuddy: React.FC<LittleBuddyProps> = ({
  language,
  onCompleteQuestions,
  onAnswerNo,
  nudgeSignal = 0,
}) => {
  const [step, setStep] = useState(0);
  const [reaction, setReaction] = useState<string | null>(null);
  const [mood, setMood] = useState<'idle' | 'happy' | 'shy'>('idle');
  const [isMinimized, setIsMinimized] = useState(false);
  const [spotIndex, setSpotIndex] = useState(() => pickRandomSpot());
  const [popKey, setPopKey] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [isChanceModalOpen, setIsChanceModalOpen] = useState(false);
  const [chanceAnswer, setChanceAnswer] = useState<'yes' | 'no' | null>(null);
  const [callGrowthSteps, setCallGrowthSteps] = useState(0);
  const [buddyName, setBuddyName] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState('');

  const copy = BUDDY_COPY[language];
  const isFinished = step >= copy.questions.length;
  const spot = BUDDY_SPOTS[spotIndex];

  const hopToRandomSpot = useCallback(() => {
    setSpotIndex((prev) => pickRandomSpot(prev));
    setPopKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!isMinimized && !reaction && buddyName !== null) {
        hopToRandomSpot();
      }
    }, 9500);
    return () => window.clearInterval(interval);
  }, [isMinimized, reaction, buddyName, hopToRandomSpot]);

  useEffect(() => {
    if (!isFinished) {
      setCallGrowthSteps(0);
      return;
    }
    const growInterval = window.setInterval(() => {
      setCallGrowthSteps((prev) => Math.min(prev + 1, 6));
    }, 10000);
    return () => window.clearInterval(growInterval);
  }, [isFinished]);

  useEffect(() => {
    if (nudgeSignal > 0) {
      setIsMinimized(false);
      setMood('shy');
      setReaction(copy.answerFirstNudge);
      const t = window.setTimeout(() => {
        setReaction(null);
        setMood('idle');
      }, 2400);
      return () => window.clearTimeout(t);
    }
  }, [nudgeSignal, copy.answerFirstNudge]);

  const dodgeNoButton = useCallback(() => {
    setNoOffset((prev) => {
      let nextX = (Math.random() - 0.5) * 160;
      let nextY = (Math.random() - 0.5) * 110;
      // Ensure a noticeable jump away from the cursor
      if (Math.hypot(nextX - prev.x, nextY - prev.y) < 55) {
        nextX = prev.x >= 0 ? -75 : 75;
        nextY = prev.y >= 0 ? -50 : 50;
      }
      return { x: Math.round(nextX), y: Math.round(nextY) };
    });
  }, []);

  const handleYes = () => {
    setMood('happy');
    setNoOffset({ x: 0, y: 0 });
    setReaction(copy.yesReactions[step] ?? copy.yesReactions[0]);
    window.setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      setReaction(null);
      setMood('idle');
      if (nextStep >= copy.questions.length) {
        setIsChanceModalOpen(true);
      } else {
        hopToRandomSpot();
      }
    }, 1050);
  };

  const handleNo = () => {
    dodgeNoButton();
    setMood('shy');
    setReaction(copy.noReaction);
    window.setTimeout(() => {
      hopToRandomSpot();
    }, 900);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = nameDraft.trim();
    if (!cleaned) return;
    setBuddyName(cleaned);
    setMood('happy');
    setReaction(copy.nameGreeting(cleaned));
    window.setTimeout(() => {
      setReaction(null);
      setMood('idle');
      hopToRandomSpot();
    }, 1250);
  };

  const handleReset = () => {
    setStep(0);
    setNoOffset({ x: 0, y: 0 });
    setReaction(null);
    setMood('idle');
    setChanceAnswer(null);
    setCallGrowthSteps(0);
    hopToRandomSpot();
  };

  const callScale = 1 + callGrowthSteps * 0.14;

  return (
    <div
      key={popKey}
      className={`little-buddy ${
        spot.alignRight ? 'little-buddy--right' : 'little-buddy--left'
      } ${spot.bubbleBelow ? 'little-buddy--bubble-below' : ''}`}
      style={{ top: spot.top, left: spot.left }}
      aria-live="polite"
    >
      {!isMinimized && (
        <div
          className={`little-buddy__bubble ${
            spot.alignRight
              ? 'little-buddy__bubble--right'
              : 'little-buddy__bubble--left'
          } ${spot.bubbleBelow ? 'little-buddy__bubble--below' : ''} ${
            isFinished && !reaction ? 'little-buddy__bubble--growing' : ''
          }`}
          style={
            isFinished && !reaction
              ? { transform: `scale(${callScale})` }
              : undefined
          }
        >
          {reaction ? (
            <p className="little-buddy__text little-buddy__text--reaction">
              {reaction}
            </p>
          ) : buddyName === null ? (
            <form onSubmit={handleNameSubmit} className="buddy-name-form">
              <p className="little-buddy__text">{copy.introMessage}</p>
              <input
                type="text"
                className="buddy-name-input"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder={copy.namePlaceholder}
                maxLength={24}
                required
              />
              <div className="little-buddy__actions">
                <button
                  type="submit"
                  className="buddy-btn buddy-btn--yes"
                  disabled={!nameDraft.trim()}
                >
                  {copy.nameSubmitLabel}
                </button>
              </div>
            </form>
          ) : isFinished ? (
            <>
              <p className="little-buddy__text little-buddy__text--call">
                {copy.finalMessage}
              </p>
              <div className="little-buddy__actions">
                <button
                  type="button"
                  className="buddy-btn buddy-btn--yes"
                  onClick={handleReset}
                >
                  {copy.askAgainLabel}
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="little-buddy__progress">
                {step + 1} / {copy.questions.length}
              </span>
              <p className="little-buddy__text">{copy.questions[step]}</p>
              <div className="little-buddy__actions">
                <button
                  type="button"
                  className="buddy-btn buddy-btn--yes"
                  onClick={handleYes}
                >
                  {copy.yesLabel}
                </button>
                <button
                  type="button"
                  className="buddy-btn buddy-btn--no"
                  style={{
                    transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  }}
                  onMouseEnter={dodgeNoButton}
                  onTouchStart={dodgeNoButton}
                  onClick={handleNo}
                >
                  {copy.noLabel}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className={`little-buddy__avatar little-buddy__avatar--${mood}`}
        onClick={() => setIsMinimized((prev) => !prev)}
        aria-label={
          isMinimized ? 'Show little messenger' : 'Hide little messenger speech'
        }
        title={isMinimized ? 'Click to talk' : 'Click to hide bubble'}
      >
        {mood === 'happy' && (
          <span className="little-buddy__heart" aria-hidden="true">
            ♥
          </span>
        )}
        <svg viewBox="0 0 80 80" className="little-buddy__svg" aria-hidden="true">
          {/* Tiny heart antenna */}
          <line x1="40" y1="18" x2="40" y2="10" stroke="#f4b8be" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M40 12 C40 12 34 8 34 5 C34 3.2 35.5 2 37.2 2 C38.4 2 39.4 2.7 40 3.7 C40.6 2.7 41.6 2 42.8 2 C44.5 2 46 3.2 46 5 C46 8 40 12 40 12 Z"
            fill="#d9485b"
          />

          {/* Cute round body/head */}
          <ellipse cx="40" cy="46" rx="24" ry="22" fill="#fbf0ea" stroke="#c99778" strokeWidth="2" />

          {/* Rosy cheeks */}
          <ellipse cx="26" cy="49" rx="4.2" ry="2.6" fill="#f29aa3" opacity="0.7" />
          <ellipse cx="54" cy="49" rx="4.2" ry="2.6" fill="#f29aa3" opacity="0.7" />

          {/* Eyes */}
          {mood === 'happy' ? (
            <>
              <path d="M27 42 Q30 38 33 42" fill="none" stroke="#332225" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M47 42 Q50 38 53 42" fill="none" stroke="#332225" strokeWidth="2.4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="30" cy="42" r="2.8" fill="#332225" />
              <circle cx="50" cy="42" r="2.8" fill="#332225" />
              <circle cx="31" cy="41" r="0.9" fill="#ffffff" />
              <circle cx="51" cy="41" r="0.9" fill="#ffffff" />
            </>
          )}

          {/* Mouth */}
          {mood === 'shy' ? (
            <path d="M36 53 Q40 50 44 53" fill="none" stroke="#332225" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M35 51 Q40 56 45 51" fill="none" stroke="#332225" strokeWidth="2.2" strokeLinecap="round" />
          )}

          {/* Tiny envelope satchel */}
          <rect x="31" y="59" width="18" height="12" rx="2" fill="#9b2232" />
          <path d="M31 59 L40 66 L49 59" fill="none" stroke="#fbe8e2" strokeWidth="1.4" />
        </svg>
        {buddyName && <span className="little-buddy__nametag">{buddyName}</span>}
      </button>

      {isChanceModalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chance-modal-title"
          onClick={() => setIsChanceModalOpen(false)}
        >
          <div
            className="romantic-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="romantic-modal__crest" aria-hidden="true">
              ♥
            </div>
            <h2 id="chance-modal-title" className="romantic-modal__title">
              {copy.chanceTitle}
            </h2>

            {chanceAnswer === null ? (
              <>
                <p className="romantic-modal__text">{copy.chanceQuestion}</p>
                <div className="romantic-modal__actions">
                  <button
                    type="button"
                    className="btn-modal-secondary"
                    onClick={() => {
                      setIsChanceModalOpen(false);
                      onCompleteQuestions?.();
                      onAnswerNo?.();
                    }}
                  >
                    {copy.noLabel}
                  </button>
                  <button
                    type="button"
                    className="btn-modal-primary"
                    onClick={() => {
                      setChanceAnswer('yes');
                      onCompleteQuestions?.();
                    }}
                  >
                    {copy.yesLabel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="romantic-modal__text">
                  {chanceAnswer === 'yes'
                    ? copy.chanceYesResponse
                    : copy.chanceNoResponse}
                </p>
                <div className="romantic-modal__actions">
                  <button
                    type="button"
                    className="btn-modal-primary"
                    onClick={() => setIsChanceModalOpen(false)}
                  >
                    {copy.chanceCloseLabel}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

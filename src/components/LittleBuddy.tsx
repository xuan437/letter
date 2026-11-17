import React, { useCallback, useEffect, useState } from 'react';
import { LanguageCode } from '../types/letter';

interface LittleBuddyProps {
  language: LanguageCode;
  onCompleteQuestions?: () => void;
  nudgeSignal?: number;
}

interface BuddyCopy {
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
    questions: [
      'Do you like this guy?',
      'Do you miss him?',
      'Do you need him?',
      'Will you travel the world with him someday?',
    ],
    yesLabel: 'Yes ♥',
    noLabel: 'No',
    yesReactions: [
      'Hehe, I knew it! ♥',
      'Aww, he misses you too!',
      'He’s always right here for you.',
      'Paris & Kyoto are waiting for you two!',
    ],
    noReaction: 'Hmm... are you sure? Try reading his letter again!',
    finalMessage: 'Yay! Go send him a little letter back ♥',
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
    questions: [
      'Gusto mo ba ang lalaking ito?',
      'Nami-miss mo ba siya?',
      'Kailangan mo ba siya?',
      'Sasama ka bang maglakbay kasama siya balang araw?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Hindi',
    yesReactions: [
      'Hehe, sabi na nga ba! ♥',
      'Aww, nami-miss ka rin niya!',
      'Lagi siyang nandiyan para sa iyo.',
      'Naghihintay na ang Paris at Kyoto sa inyong dalawa!',
    ],
    noReaction: 'Hmm... sigurado ka ba? Basahin mo ulit ang sulat niya!',
    finalMessage: 'Yehey! Padalhan mo na siya ng sagot ♥',
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
    questions: [
      'Ganahan ba ka aning lakiha?',
      'Gimingaw ba ka niya?',
      'Gikinahanglan ba nimo siya?',
      'Mokuyog ba ka niya sa pagsuroy sa kalibotan?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Dili',
    yesReactions: [
      'Hehe, kabalo gyud ko! ♥',
      'Aww, gimingaw pud siya nimo!',
      'Naa ra gyud siya kanunay para nimo.',
      'Naghuwat na ang Paris ug Kyoto ninyong duha!',
    ],
    noReaction: 'Hmm... sigurado ka? Basaha pag-usab ang iyang sulat!',
    finalMessage: 'Yehey! Padalhi na siya og balos nga sulat ♥',
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
    questions: [
      'Naruruyag ka ba hini nga lalaki?',
      'Nahihidlaw ka ba ha iya?',
      'Kinahanglan mo ba hiya?',
      'Maupod ka ba ha iya paglibot ha kalibotan?',
    ],
    yesLabel: 'Oo ♥',
    noLabel: 'Diri',
    yesReactions: [
      'Hehe, maaram gud ako! ♥',
      'Aww, nahihidlaw gihapon hiya ha imo!',
      'Aada la hiya pirme para ha imo.',
      'Naghuhulat na an Paris ngan Kyoto ha iyo nga duha!',
    ],
    noReaction: 'Hmm... sigurado ka? Basaha utro an iya surat!',
    finalMessage: 'Yehey! Padad-i na hiya hin balos nga surat ♥',
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

  const copy = BUDDY_COPY[language];
  const isFinished = step >= copy.questions.length;
  const spot = BUDDY_SPOTS[spotIndex];

  const hopToRandomSpot = useCallback(() => {
    setSpotIndex((prev) => pickRandomSpot(prev));
    setPopKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!isMinimized && !reaction) {
        hopToRandomSpot();
      }
    }, 9500);
    return () => window.clearInterval(interval);
  }, [isMinimized, reaction, hopToRandomSpot]);

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

  const handleReset = () => {
    setStep(0);
    setNoOffset({ x: 0, y: 0 });
    setReaction(null);
    setMood('idle');
    setChanceAnswer(null);
    hopToRandomSpot();
  };

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
          } ${spot.bubbleBelow ? 'little-buddy__bubble--below' : ''}`}
        >
          {reaction ? (
            <p className="little-buddy__text little-buddy__text--reaction">
              {reaction}
            </p>
          ) : isFinished ? (
            <>
              <p className="little-buddy__text">{copy.finalMessage}</p>
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
                      setChanceAnswer('no');
                      onCompleteQuestions?.();
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

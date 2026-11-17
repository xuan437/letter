import React from 'react';

interface StampCardConfig {
  id: string;
  city: string;
  country: string;
  code: string;
  accent: string;
  bg: string;
  positionClass: string;
  illustration: React.ReactNode;
}

const STAMP_CARDS: StampCardConfig[] = [
  {
    id: 'paris',
    city: 'PARIS',
    country: 'FRANCE',
    code: 'PAR AVION · 20F',
    accent: '#8b2f3c',
    bg: '#f7ebe4',
    positionClass: 'stamp-card--paris',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Crescent moon & stars */}
        <path d="M92 20 A10 10 0 1 0 100 32 A8 8 0 1 1 92 20 Z" fill="currentColor" opacity="0.55" />
        <circle cx="28" cy="22" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="42" cy="15" r="1.2" fill="currentColor" opacity="0.45" />
        {/* Eiffel Tower */}
        <path
          d="M60 12 L57 34 L52 54 L42 78 L49 78 L53 67 L67 67 L71 78 L78 78 L68 54 L63 34 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M55 42 L65 42 M51 56 L69 56" stroke="currentColor" strokeWidth="1.8" />
        <path d="M54 78 C55 71 65 71 66 78" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <line x1="20" y1="78" x2="100" y2="78" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'japan',
    city: 'KYOTO',
    country: 'JAPAN',
    code: 'POST · 80¥',
    accent: '#9c3238',
    bg: '#f8ece6',
    positionClass: 'stamp-card--japan',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Rising sun */}
        <circle cx="84" cy="28" r="11" fill="currentColor" opacity="0.22" />
        {/* Mt. Fuji */}
        <path d="M54 58 L76 32 L84 32 L106 58" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
        <path d="M72 37 L77 39 L80 36 L84 39 L88 37" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        {/* Torii Gate */}
        <path d="M22 36 Q42 40 62 36" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="27" y1="44" x2="57" y2="44" stroke="currentColor" strokeWidth="2" />
        <line x1="33" y1="38" x2="31" y2="76" stroke="currentColor" strokeWidth="2.4" />
        <line x1="51" y1="38" x2="53" y2="76" stroke="currentColor" strokeWidth="2.4" />
        {/* Sakura petals */}
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="64" cy="22" r="1.8" fill="currentColor" opacity="0.45" />
        <line x1="16" y1="76" x2="104" y2="76" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'venice',
    city: 'VENEZIA',
    country: 'ITALIA',
    code: 'POSTA · 50L',
    accent: '#6f4248',
    bg: '#f5eae2',
    positionClass: 'stamp-card--venice',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Arched Venetian Bridge */}
        <path d="M18 60 Q60 32 102 60" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M30 60 Q60 44 90 60" fill="none" stroke="currentColor" strokeWidth="1.6" />
        {/* Gondola */}
        <path d="M36 70 Q60 79 86 68 L82 74 Q60 82 38 74 Z" fill="currentColor" opacity="0.7" />
        <line x1="70" y1="60" x2="76" y2="76" stroke="currentColor" strokeWidth="1.5" />
        {/* Water ripples */}
        <path d="M22 79 Q40 76 58 79 T96 79" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'santorini',
    city: 'SANTORINI',
    country: 'GREECE',
    code: 'HELLAS · 40D',
    accent: '#3e5c76',
    bg: '#f4ece8',
    positionClass: 'stamp-card--santorini',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Sun */}
        <circle cx="32" cy="26" r="9" fill="currentColor" opacity="0.25" />
        {/* Blue Dome Church */}
        <path d="M46 46 A14 14 0 0 1 74 46 Z" fill="currentColor" opacity="0.72" />
        <line x1="60" y1="26" x2="60" y2="33" stroke="currentColor" strokeWidth="1.8" />
        <line x1="57" y1="29" x2="63" y2="29" stroke="currentColor" strokeWidth="1.8" />
        <rect x="44" y="46" width="32" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M56 72 L56 59 A4 4 0 0 1 64 59 L64 72" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Sea waves */}
        <path d="M18 76 Q36 72 54 76 T90 76 T104 76" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      </svg>
    ),
  },
  {
    id: 'london',
    city: 'LONDON',
    country: 'U.K.',
    code: 'ROYAL MAIL · 1P',
    accent: '#7c3f49',
    bg: '#f6ebe3',
    positionClass: 'stamp-card--london',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Big Ben Clock Tower */}
        <rect x="52" y="30" width="16" height="46" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="52,30 60,14 68,30" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M60 40 L60 37 M60 40 L62.5 40" stroke="currentColor" strokeWidth="1.3" />
        {/* Bridge */}
        <line x1="20" y1="70" x2="100" y2="70" stroke="currentColor" strokeWidth="1.8" />
        <path d="M24 76 Q38 66 52 76 M68 76 Q82 66 96 76" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'newyork',
    city: 'NEW YORK',
    country: 'U.S.A.',
    code: 'AIR MAIL · 10¢',
    accent: '#5a504b',
    bg: '#f6ece5',
    positionClass: 'stamp-card--newyork',
    illustration: (
      <svg viewBox="0 0 120 90" className="stamp-card__art" aria-hidden="true">
        {/* Statue / Torch & Skyline */}
        <rect x="26" y="48" width="12" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        <rect x="42" y="34" width="14" height="42" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.65" />
        <path d="M49 34 L49 22" stroke="currentColor" strokeWidth="1.6" opacity="0.65" />
        <rect x="62" y="42" width="14" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        <rect x="80" y="52" width="14" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
        <line x1="18" y1="76" x2="102" y2="76" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      </svg>
    ),
  },
];

const TILT_CLASSES = [
  'stamp-card--tilt-a',
  'stamp-card--tilt-b',
  'stamp-card--tilt-c',
  'stamp-card--tilt-d',
];

const COLLAGE_CARDS = Array.from({ length: 12 }, (_, index) => ({
  ...STAMP_CARDS[index % STAMP_CARDS.length],
  instanceKey: `${STAMP_CARDS[index % STAMP_CARDS.length].id}-${index}`,
  tiltClass: TILT_CLASSES[index % TILT_CLASSES.length],
}));

export const WorldStampCards: React.FC = () => {
  return (
    <div className="stamp-collage" aria-hidden="true">
      {COLLAGE_CARDS.map((card) => (
        <div
          key={card.instanceKey}
          className={`stamp-card ${card.tiltClass}`}
          style={{
            color: card.accent,
            backgroundColor: card.bg,
          }}
        >
          <div className="stamp-card__frame">
            <div className="stamp-card__header">
              <span className="stamp-card__code">{card.code}</span>
            </div>

            {card.illustration}

            <div className="stamp-card__footer">
              <span className="stamp-card__city">{card.city}</span>
              <span className="stamp-card__country">{card.country}</span>
            </div>

            {/* Circular postmark cancellation */}
            <div className="stamp-card__postmark">
              <span>★</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


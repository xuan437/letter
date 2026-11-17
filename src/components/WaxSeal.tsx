import React from 'react';
import { SealColor } from '../types/letter';

interface WaxSealProps {
  color: SealColor;
  isBroken: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SEAL_PALETTES: Record<
  SealColor,
  { base: string; highlight: string; shadow: string; rim: string }
> = {
  crimson: {
    base: '#9b2226',
    highlight: '#c84b4f',
    shadow: '#5e1114',
    rim: '#7c181c',
  },
  emerald: {
    base: '#1f5e43',
    highlight: '#358865',
    shadow: '#113827',
    rim: '#174933',
  },
  navy: {
    base: '#23395d',
    highlight: '#3b5b8c',
    shadow: '#132036',
    rim: '#1b2c49',
  },
  gold: {
    base: '#a67c2e',
    highlight: '#d4a84f',
    shadow: '#6b4d16',
    rim: '#8a6522',
  },
};

export const WaxSeal: React.FC<WaxSealProps> = ({
  color,
  isBroken,
  onClick,
  disabled = false,
}) => {
  const palette = SEAL_PALETTES[color];

  return (
    <button
      type="button"
      className={`wax-seal ${isBroken ? 'wax-seal--broken' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Break wax seal and open letter"
      title="Click to open letter"
    >
      <svg
        viewBox="0 0 100 100"
        className="wax-seal__svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`wax-grad-${color}`} cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor={palette.highlight} />
            <stop offset="55%" stopColor={palette.base} />
            <stop offset="100%" stopColor={palette.shadow} />
          </radialGradient>
        </defs>

        {/* Organic melted wax outer silhouette */}
        <path
          d="M50,6 C62,5 72,11 80,17 C88,24 94,36 93,49 C94,62 88,73 80,82 C71,90 61,95 49,94 C36,95 25,89 17,81 C9,72 5,60 7,48 C6,35 12,23 20,16 C29,9 39,6 50,6 Z"
          fill={`url(#wax-grad-${color})`}
          stroke={palette.shadow}
          strokeWidth="1.5"
        />

        {/* Raised outer wax lip */}
        <circle
          cx="50"
          cy="50"
          r="33"
          fill="none"
          stroke={palette.highlight}
          strokeOpacity="0.45"
          strokeWidth="2.5"
        />

        {/* Recessed inner stamp well */}
        <circle
          cx="50"
          cy="50"
          r="29"
          fill={palette.rim}
          fillOpacity="0.55"
          stroke={palette.shadow}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />

        {/* Embossed romantic heart & botanical wreath crest */}
        <g
          fill="none"
          stroke={palette.highlight}
          strokeOpacity="0.82"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M50 64 C50 64 33 53 33 42 C33 36.5 37.5 32.5 42.5 32.5 C46 32.5 48.7 34.4 50 37 C51.3 34.4 54 32.5 57.5 32.5 C62.5 32.5 67 36.5 67 42 C67 53 50 64 50 64 Z"
            fill={palette.highlight}
            fillOpacity="0.22"
          />
          <path d="M27 56 C25 49 26 42 30 37" strokeOpacity="0.5" />
          <path d="M73 56 C75 49 74 42 70 37" strokeOpacity="0.5" />
        </g>
      </svg>
    </button>
  );
};


import React from 'react';
import { LetterData, MailStage } from '../types/letter';
import { WaxSeal } from './WaxSeal';

interface LetterEnvelopeProps {
  letter: LetterData;
  stage: MailStage;
  onOpen: () => void;
  forLabel?: string;
  hintText?: string;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({
  letter,
  stage,
  onOpen,
  forLabel = 'For',
  hintText = 'Click the wax seal to open your letter',
}) => {
  const isClosed = stage === 'closed';
  const isUnsealing = stage === 'unsealing';
  const isSliding = stage === 'sliding';
  const isOpen = stage === 'open';

  const paragraphs = letter.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`envelope-stage envelope-stage--${stage}`}>
      <div
        className={`envelope ${isClosed ? 'envelope--interactive' : ''}`}
        onClick={isClosed ? onOpen : undefined}
        role={isClosed ? 'button' : undefined}
        tabIndex={isClosed ? 0 : undefined}
        onKeyDown={
          isClosed
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpen();
                }
              }
            : undefined
        }
        aria-label={isClosed ? `Open letter from ${letter.sender}` : undefined}
      >
        {/* Inside back wall of the envelope */}
        <div className="envelope__back" aria-hidden="true">
          <div className="envelope__liner" />
        </div>

        {/* Top triangular flap */}
        <div
          className={`envelope__flap-top ${
            !isClosed ? 'envelope__flap-top--open' : ''
          }`}
          aria-hidden="true"
        >
          <div className="envelope__flap-top-face" />
        </div>

        {/* The Letter Sheet */}
        <article
          className={`letter-sheet letter-sheet--${letter.paperTheme} ${
            isSliding ? 'letter-sheet--sliding' : ''
          } ${isOpen ? 'letter-sheet--open' : ''}`}
          aria-hidden={isClosed || isUnsealing}
        >
          <div className="letter-sheet__fold-crease" aria-hidden="true" />
          <div className="letter-sheet__inner">
            <header className="letter-sheet__header">
              <span className="letter-sheet__monogram" aria-hidden="true">
                ♥
              </span>
              <time className="letter-sheet__date">{letter.date}</time>
            </header>

            <div className="letter-sheet__flourish" aria-hidden="true">
              <span className="letter-sheet__flourish-line" />
              <span className="letter-sheet__flourish-rose">❦</span>
              <span className="letter-sheet__flourish-line" />
            </div>

            <p className="letter-sheet__salutation">{letter.salutation}</p>

            <div className="letter-sheet__body">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <footer className="letter-sheet__footer">
              <p className="letter-sheet__closing">{letter.closing}</p>
              <p className="letter-sheet__signature">{letter.signature}</p>
            </footer>
          </div>
        </article>

        {/* Front pocket (left, right, bottom flaps) */}
        <div className="envelope__pocket" aria-hidden="true">
          <div className="envelope__flap-left" />
          <div className="envelope__flap-right" />
          <div className="envelope__flap-bottom" />

          {/* Postage stamp & postmark on the envelope */}
          <div className="envelope__stamp">
            <div className="envelope__stamp-inner">
              <span className="envelope__stamp-mark">♥</span>
              <span className="envelope__stamp-text">AMOUR</span>
            </div>
          </div>

          <div className="envelope__address">
            <span className="envelope__to-label">{forLabel}</span>
            <span className="envelope__to-name">{letter.recipient}</span>
          </div>
        </div>

        {/* Wax seal */}
        <div
          className="envelope__seal-anchor"
          onClick={(e) => {
            e.stopPropagation();
            if (isClosed) onOpen();
          }}
        >
          <WaxSeal
            color={letter.sealColor}
            isBroken={!isClosed}
            onClick={onOpen}
            disabled={!isClosed}
          />
        </div>
      </div>

      {isClosed && (
        <p className="envelope-hint">{hintText}</p>
      )}
    </div>
  );
};


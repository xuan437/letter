import React from 'react';
import { LetterData, MailStage } from '../types/letter';
import { WaxSeal } from './WaxSeal';

interface LetterEnvelopeProps {
  letter: LetterData;
  stage: MailStage;
  onOpen: () => void;
  forLabel?: string;
  hintText?: string;
  isBurning?: boolean;
  isRestoring?: boolean;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({
  letter,
  stage,
  onOpen,
  forLabel = 'For',
  hintText = 'Click the wax seal to open your letter',
  isBurning = false,
  isRestoring = false,
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
        className={`envelope ${isClosed && !isBurning ? 'envelope--interactive' : ''} ${
          isBurning ? 'envelope--burning' : ''
        } ${isRestoring ? 'envelope--restoring' : ''}`}
        onClick={isClosed && !isBurning ? onOpen : undefined}
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
            if (isClosed && !isBurning) onOpen();
          }}
        >
          <WaxSeal
            color={letter.sealColor}
            isBroken={!isClosed}
            onClick={onOpen}
            disabled={!isClosed || isBurning}
          />
        </div>

        {isBurning && (
          <div className="burn-overlay" aria-hidden="true">
            <div className="burn-overlay__char-edge" />
            <div className="burn-overlay__flames" />
            <div className="burn-overlay__flame-tongues">
              <span className="flame-tongue flame-tongue--1" />
              <span className="flame-tongue flame-tongue--2" />
              <span className="flame-tongue flame-tongue--3" />
              <span className="flame-tongue flame-tongue--4" />
              <span className="flame-tongue flame-tongue--5" />
            </div>
            <div className="burn-overlay__smoke">
              <span className="smoke-wisp smoke-wisp--1" />
              <span className="smoke-wisp smoke-wisp--2" />
              <span className="smoke-wisp smoke-wisp--3" />
            </div>
            <span className="ember ember--1" />
            <span className="ember ember--2" />
            <span className="ember ember--3" />
            <span className="ember ember--4" />
            <span className="ember ember--5" />
            <span className="ember ember--6" />
            <span className="ember ember--7" />
            <span className="ember ember--8" />
            <span className="ash-flake ash-flake--1" />
            <span className="ash-flake ash-flake--2" />
            <span className="ash-flake ash-flake--3" />
            <span className="ash-flake ash-flake--4" />
          </div>
        )}

        {isRestoring && (
          <div className="restore-overlay" aria-hidden="true">
            <div className="restore-overlay__glow" />
            <span className="sparkle sparkle--1">✦</span>
            <span className="sparkle sparkle--2">♥</span>
            <span className="sparkle sparkle--3">✦</span>
            <span className="sparkle sparkle--4">✧</span>
            <span className="sparkle sparkle--5">✦</span>
            <span className="sparkle sparkle--6">♥</span>
            <span className="sparkle sparkle--7">✧</span>
            <span className="sparkle sparkle--8">✦</span>
          </div>
        )}
      </div>

      {isClosed && !isBurning && (
        <p className="envelope-hint">{hintText}</p>
      )}
    </div>
  );
};


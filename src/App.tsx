import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LetterEnvelope } from './components/LetterEnvelope';
import { LittleBuddy } from './components/LittleBuddy';
import { ReplyLetterModal } from './components/ReplyLetterModal';
import { WorldStampCards } from './components/WorldStampCards';
import {
  LANGUAGE_OPTIONS,
  LETTER_TRANSLATIONS,
  LanguageCode,
  MailStage,
  UI_TRANSLATIONS,
} from './types/letter';

export const App: React.FC = () => {
  const [stage, setStage] = useState<MailStage>('closed');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handleRequestOpen = useCallback(() => {
    if (stage !== 'closed') return;
    setIsConfirmOpen(true);
  }, [stage]);

  const handleConfirmOpen = useCallback(() => {
    setIsConfirmOpen(false);
    if (stage !== 'closed') return;
    clearTimers();
    setStage('unsealing');

    const t1 = window.setTimeout(() => {
      setStage('sliding');
    }, 620);

    const t2 = window.setTimeout(() => {
      setStage('open');
    }, 1320);

    timersRef.current.push(t1, t2);
  }, [stage, clearTimers]);

  const handleClose = useCallback(() => {
    clearTimers();
    if (stage === 'open') {
      setStage('sliding');
      const t1 = window.setTimeout(() => {
        setStage('unsealing');
      }, 450);
      const t2 = window.setTimeout(() => {
        setStage('closed');
      }, 950);
      timersRef.current.push(t1, t2);
    } else {
      setStage('closed');
    }
  }, [stage, clearTimers]);

  const currentLetter = LETTER_TRANSLATIONS[language];
  const currentUi = UI_TRANSLATIONS[language];

  return (
    <div className="desk-backdrop">
      <div className="ambient-motes" aria-hidden="true">
        <span className="mote mote--1" />
        <span className="mote mote--2" />
        <span className="mote mote--3" />
        <span className="mote mote--4" />
        <span className="mote mote--5" />
        <span className="mote mote--6" />
        <span className="mote mote--7" />
        <span className="mote mote--8" />
      </div>

      <WorldStampCards />

      <div className="language-switcher" role="group" aria-label="Change language">
        {LANGUAGE_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`lang-pill ${
              language === opt.code ? 'lang-pill--active' : ''
            }`}
            onClick={() => setLanguage(opt.code)}
            aria-pressed={language === opt.code}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <main className="mail-stage-container">
        <LetterEnvelope
          letter={currentLetter}
          stage={stage}
          onOpen={handleRequestOpen}
          forLabel={currentUi.forLabel}
          hintText={currentUi.hint}
        />

        {stage === 'open' && (
          <div className="bottom-actions">
            <button
              type="button"
              className="btn-glass"
              onClick={handleClose}
            >
              {currentUi.foldButton}
            </button>
            <button
              type="button"
              className="btn-glass btn-glass--accent"
              onClick={() => setIsReplyOpen(true)}
            >
              ♥ {currentUi.replyButton}
            </button>
          </div>
        )}
      </main>

      {isConfirmOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-open-title"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            className="romantic-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="romantic-modal__crest" aria-hidden="true">
              ♥
            </div>
            <h2 id="confirm-open-title" className="romantic-modal__title">
              {currentUi.confirmTitle}
            </h2>
            <p className="romantic-modal__text">{currentUi.confirmMessage}</p>
            <div className="romantic-modal__actions">
              <button
                type="button"
                className="btn-modal-secondary"
                onClick={() => setIsConfirmOpen(false)}
              >
                {currentUi.confirmCancel}
              </button>
              <button
                type="button"
                className="btn-modal-primary"
                onClick={handleConfirmOpen}
                autoFocus
              >
                {currentUi.confirmAccept}
              </button>
            </div>
          </div>
        </div>
      )}

      <ReplyLetterModal
        isOpen={isReplyOpen}
        ui={currentUi}
        onClose={() => setIsReplyOpen(false)}
      />

      <LittleBuddy language={language} />
    </div>
  );
};

export default App;


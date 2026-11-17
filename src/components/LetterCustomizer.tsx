import React from 'react';
import {
  DEFAULT_LETTER,
  LetterData,
  PaperTheme,
  SealColor,
} from '../types/letter';

interface LetterCustomizerProps {
  letter: LetterData;
  isOpen: boolean;
  onChange: (updated: LetterData) => void;
  onClose: () => void;
  onReplay: () => void;
}

const SEAL_OPTIONS: { value: SealColor; label: string; swatch: string }[] = [
  { value: 'crimson', label: 'Crimson', swatch: '#9b2226' },
  { value: 'emerald', label: 'Emerald', swatch: '#1f5e43' },
  { value: 'navy', label: 'Navy', swatch: '#23395d' },
  { value: 'gold', label: 'Antique Gold', swatch: '#a67c2e' },
];

const PAPER_OPTIONS: { value: PaperTheme; label: string; swatch: string }[] = [
  { value: 'ivory', label: 'Ivory Cotton', swatch: '#fbf7ef' },
  { value: 'blush', label: 'Rose Parchment', swatch: '#fbf1ef' },
  { value: 'sage', label: 'Sage Linen', swatch: '#f2f5f0' },
];

export const LetterCustomizer: React.FC<LetterCustomizerProps> = ({
  letter,
  isOpen,
  onChange,
  onClose,
  onReplay,
}) => {
  if (!isOpen) return null;

  const updateField = <K extends keyof LetterData>(
    key: K,
    value: LetterData[K]
  ) => {
    onChange({ ...letter, [key]: value });
  };

  return (
    <aside className="customizer-drawer" aria-label="Customize letter">
      <div className="customizer-drawer__header">
        <h2>Compose &amp; Seal</h2>
        <button
          type="button"
          className="btn-icon"
          onClick={onClose}
          aria-label="Close customizer"
        >
          ✕
        </button>
      </div>

      <div className="customizer-drawer__body">
        <div className="form-row">
          <label className="form-field">
            <span>Recipient</span>
            <input
              type="text"
              value={letter.recipient}
              onChange={(e) => updateField('recipient', e.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Sender</span>
            <input
              type="text"
              value={letter.sender}
              onChange={(e) => updateField('sender', e.target.value)}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            <span>Date</span>
            <input
              type="text"
              value={letter.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Salutation</span>
            <input
              type="text"
              value={letter.salutation}
              onChange={(e) => updateField('salutation', e.target.value)}
            />
          </label>
        </div>

        <label className="form-field">
          <span>Message</span>
          <textarea
            rows={5}
            value={letter.body}
            onChange={(e) => updateField('body', e.target.value)}
          />
        </label>

        <div className="form-row">
          <label className="form-field">
            <span>Closing</span>
            <input
              type="text"
              value={letter.closing}
              onChange={(e) => updateField('closing', e.target.value)}
            />
          </label>
          <label className="form-field">
            <span>Signature</span>
            <input
              type="text"
              value={letter.signature}
              onChange={(e) => updateField('signature', e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <span className="form-group__label">Wax Seal</span>
          <div className="swatch-row">
            {SEAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`swatch-btn ${
                  letter.sealColor === opt.value ? 'swatch-btn--active' : ''
                }`}
                onClick={() => updateField('sealColor', opt.value)}
                title={opt.label}
              >
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: opt.swatch }}
                />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <span className="form-group__label">Stationery Paper</span>
          <div className="swatch-row">
            {PAPER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`swatch-btn ${
                  letter.paperTheme === opt.value ? 'swatch-btn--active' : ''
                }`}
                onClick={() => updateField('paperTheme', opt.value)}
                title={opt.label}
              >
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: opt.swatch }}
                />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="customizer-drawer__footer">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onChange(DEFAULT_LETTER)}
        >
          Reset
        </button>
        <button type="button" className="btn-primary" onClick={onReplay}>
          Seal &amp; Replay
        </button>
      </div>
    </aside>
  );
};


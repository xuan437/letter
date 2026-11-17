import React, { useState } from 'react';
import { LanguageUiStrings } from '../types/letter';

interface ReplyLetterModalProps {
  isOpen: boolean;
  ui: LanguageUiStrings;
  onClose: () => void;
}

const RETURN_EMAIL = 'emjaygusela@gmail.com';

export const ReplyLetterModal: React.FC<ReplyLetterModalProps> = ({
  isOpen,
  ui,
  onClose,
}) => {
  const [toEmail, setToEmail] = useState(RETURN_EMAIL);
  const [fromName, setFromName] = useState('Cherry');
  const [replyText, setReplyText] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`A Letter Back from ${fromName.trim() || 'Cherry'}`);
    const body = encodeURIComponent(
      `${replyText.trim()}\n\n— ${fromName.trim() || 'Cherry'}`
    );
    return `mailto:${encodeURIComponent(toEmail.trim() || RETURN_EMAIL)}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const mailtoUrl = buildMailtoUrl();
    window.location.href = mailtoUrl;
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setReplyText('');
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reply-modal-title"
      onClick={handleClose}
    >
      <div
        className="romantic-modal romantic-modal--reply"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSent ? (
          <form onSubmit={handleSubmit} className="reply-form">
            <div className="romantic-modal__crest" aria-hidden="true">
              ♥
            </div>
            <h2 id="reply-modal-title" className="romantic-modal__title">
              {ui.replyModalTitle}
            </h2>

            <div className="reply-form__row">
              <label className="reply-field">
                <span>{ui.replyToLabel}</span>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  required
                />
              </label>
              <label className="reply-field">
                <span>{ui.replyFromLabel}</span>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="reply-field">
              <textarea
                rows={6}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={ui.replyPlaceholder}
                required
                autoFocus
              />
            </label>

            <div className="romantic-modal__actions">
              <button
                type="button"
                className="btn-modal-secondary"
                onClick={handleClose}
              >
                {ui.replyCancel}
              </button>
              <button
                type="submit"
                className="btn-modal-primary"
                disabled={!replyText.trim()}
              >
                {ui.replySend}
              </button>
            </div>
          </form>
        ) : (
          <div className="reply-sent-view">
            <div className="reply-sent-view__seal" aria-hidden="true">
              ♥
            </div>
            <h2 id="reply-modal-title" className="romantic-modal__title">
              {ui.replySentTitle}
            </h2>
            <p className="romantic-modal__text">{ui.replySentMessage}</p>

            <blockquote className="reply-sent-view__quote">
              “{replyText.trim()}”
              <footer>
                — {fromName} → {toEmail}
              </footer>
            </blockquote>

            <div className="romantic-modal__actions">
              <a
                href={buildMailtoUrl()}
                className="btn-modal-secondary"
                style={{ textDecoration: 'none' }}
              >
                Open Email App
              </a>
              <button
                type="button"
                className="btn-modal-primary"
                onClick={handleClose}
              >
                {ui.replySentClose}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

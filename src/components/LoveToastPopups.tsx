import React, { useEffect, useState } from 'react';

interface LovePhrase {
  language: string;
  phrase: string;
}

const LOVE_IN_100_LANGUAGES: LovePhrase[] = [
  { language: 'English', phrase: 'I love you' },
  { language: 'Tagalog', phrase: 'Mahal kita' },
  { language: 'Bisaya (Cebuano)', phrase: 'Gihigugma tika' },
  { language: 'Waray', phrase: 'Hinigugma ko ikaw' },
  { language: 'Ilocano', phrase: 'Ay-ayaten ka' },
  { language: 'Hiligaynon', phrase: 'Palangga ta ikaw' },
  { language: 'Kapampangan', phrase: 'Kaluguran daka' },
  { language: 'Bikolano', phrase: 'Namumutan ta ka' },
  { language: 'Pangasinan', phrase: 'Inaro ta ka' },
  { language: 'French', phrase: 'Je t’aime' },
  { language: 'Spanish', phrase: 'Te amo' },
  { language: 'Italian', phrase: 'Ti amo' },
  { language: 'Portuguese', phrase: 'Eu te amo' },
  { language: 'German', phrase: 'Ich liebe dich' },
  { language: 'Dutch', phrase: 'Ik hou van jou' },
  { language: 'Swedish', phrase: 'Jag älskar dig' },
  { language: 'Norwegian', phrase: 'Jeg elsker deg' },
  { language: 'Danish', phrase: 'Jeg elsker dig' },
  { language: 'Icelandic', phrase: 'Ég elska þig' },
  { language: 'Finnish', phrase: 'Minä rakastan sinua' },
  { language: 'Japanese', phrase: '愛してる (Aishiteru)' },
  { language: 'Korean', phrase: '사랑해 (Saranghae)' },
  { language: 'Mandarin Chinese', phrase: '我爱你 (Wǒ ài nǐ)' },
  { language: 'Cantonese', phrase: '我愛你 (Ngo5 oi3 nei5)' },
  { language: 'Taiwanese Hokkien', phrase: '我愛你 (Góa ài lí)' },
  { language: 'Vietnamese', phrase: 'Anh yêu em' },
  { language: 'Thai', phrase: 'ฉันรักคุณ (Chan rak khun)' },
  { language: 'Indonesian', phrase: 'Aku cinta kamu' },
  { language: 'Malay', phrase: 'Saya cinta padamu' },
  { language: 'Javanese', phrase: 'Aku tresna sampeyan' },
  { language: 'Sundanese', phrase: 'Abdi bogoh ka anjeun' },
  { language: 'Khmer', phrase: 'បងស្រលាញ់អូន (Bong srolanh oon)' },
  { language: 'Lao', phrase: 'ຂ້ອຍຮັກເຈົ້າ (Khony hak chao)' },
  { language: 'Burmese', phrase: 'မင်းကိုချစ်တယ် (Min ko chit tel)' },
  { language: 'Hindi', phrase: 'मैं तुमसे प्यार करता हूँ' },
  { language: 'Urdu', phrase: 'میں تم سے پیار کرتا ہوں' },
  { language: 'Bengali', phrase: 'আমি তোমায় ভালোবাসি' },
  { language: 'Punjabi', phrase: 'ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ' },
  { language: 'Marathi', phrase: 'मी तुझ्यावर प्रेम करतो' },
  { language: 'Tamil', phrase: 'நான் உன்னை காதலிக்கிறேன்' },
  { language: 'Telugu', phrase: 'నేను నిన్ను ప్రేమిస్తున్నాను' },
  { language: 'Gujarati', phrase: 'હું તને પ્રેમ કરું છું' },
  { language: 'Kannada', phrase: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ' },
  { language: 'Malayalam', phrase: 'ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു' },
  { language: 'Nepali', phrase: 'म तिमीलाई माया गर्छु' },
  { language: 'Sinhala', phrase: 'මම ඔයාට ආදරෙයි' },
  { language: 'Arabic', phrase: 'أحبك (Uhibbuka)' },
  { language: 'Persian (Farsi)', phrase: 'دوستت دارم (Dooset daram)' },
  { language: 'Turkish', phrase: 'Seni seviyorum' },
  { language: 'Hebrew', phrase: 'אני אוהב אותך (Ani ohev otach)' },
  { language: 'Greek', phrase: 'Σ’ αγαπώ (S’agapó)' },
  { language: 'Russian', phrase: 'Я тебя люблю' },
  { language: 'Ukrainian', phrase: 'Я тебе кохаю' },
  { language: 'Polish', phrase: 'Kocham cię' },
  { language: 'Czech', phrase: 'Miluji tě' },
  { language: 'Slovak', phrase: 'Ľúbim ťa' },
  { language: 'Hungarian', phrase: 'Szeretlek' },
  { language: 'Romanian', phrase: 'Te iubesc' },
  { language: 'Bulgarian', phrase: 'Обичам те' },
  { language: 'Serbian', phrase: 'Волим те (Volim te)' },
  { language: 'Croatian', phrase: 'Volim te' },
  { language: 'Slovenian', phrase: 'Ljubim te' },
  { language: 'Bosnian', phrase: 'Volim te' },
  { language: 'Macedonian', phrase: 'Те сакам (Te sakam)' },
  { language: 'Albanian', phrase: 'Të dua' },
  { language: 'Lithuanian', phrase: 'Aš tave myliu' },
  { language: 'Latvian', phrase: 'Es tevi mīlu' },
  { language: 'Estonian', phrase: 'Ma armastan sind' },
  { language: 'Irish', phrase: 'Tá grá agam duit' },
  { language: 'Scottish Gaelic', phrase: 'Tha gaol agam ort' },
  { language: 'Welsh', phrase: 'Rwy’n dy garu di' },
  { language: 'Catalan', phrase: 'T’estimo' },
  { language: 'Basque', phrase: 'Maite zaitut' },
  { language: 'Galician', phrase: 'Quérote' },
  { language: 'Corsican', phrase: 'Ti tengu caru' },
  { language: 'Maltese', phrase: 'Inħobbok' },
  { language: 'Luxembourgish', phrase: 'Ech hunn dech gär' },
  { language: 'Latin', phrase: 'Te amo' },
  { language: 'Swahili', phrase: 'Nakupenda' },
  { language: 'Amharic', phrase: 'እወድሃለሁ (Ewedihalehu)' },
  { language: 'Yoruba', phrase: 'Mo nifẹ rẹ' },
  { language: 'Igbo', phrase: 'A hụrụ m gị n’anya' },
  { language: 'Hausa', phrase: 'Ina son ki' },
  { language: 'Zulu', phrase: 'Ngiyakuthanda' },
  { language: 'Xhosa', phrase: 'Ndiyakuthanda' },
  { language: 'Afrikaans', phrase: 'Ek het jou lief' },
  { language: 'Somali', phrase: 'Waan ku jeclahay' },
  { language: 'Malagasy', phrase: 'Tiako ianao' },
  { language: 'Hawaiian', phrase: 'Aloha wau iā ‘oe' },
  { language: 'Maori', phrase: 'Aroha ahau ki a koe' },
  { language: 'Samoan', phrase: 'Ou te alofa ia te oe' },
  { language: 'Tahitian', phrase: 'Ua here vau ia oe' },
  { language: 'Fijian', phrase: 'Au domoni iko' },
  { language: 'Mongolian', phrase: 'Би чамд хайртай' },
  { language: 'Kazakh', phrase: 'Мен сені сүйемін' },
  { language: 'Uzbek', phrase: 'Men seni sevaman' },
  { language: 'Georgian', phrase: 'მიყვარხარ (Miqvarxar)' },
  { language: 'Armenian', phrase: 'Ես քեզ սիրում եմ' },
  { language: 'Azerbaijani', phrase: 'Mən səni sevirəm' },
  { language: 'Esperanto', phrase: 'Mi amas vin' },
];

export const LoveToastPopups: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % LOVE_IN_100_LANGUAGES.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [isVisible]);

  const current = LOVE_IN_100_LANGUAGES[index];

  if (!isVisible) {
    return (
      <button
        type="button"
        className="love-toast-reopen"
        onClick={() => setIsVisible(true)}
        title="Show 'I love you' in 100 languages"
      >
        ♥ 100 Languages
      </button>
    );
  }

  return (
    <div
      className="love-toast"
      role="status"
      aria-live="polite"
      onClick={() =>
        setIndex((prev) => (prev + 1) % LOVE_IN_100_LANGUAGES.length)
      }
      title="Click for next language"
    >
      <button
        type="button"
        className="love-toast__close"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        aria-label="Hide love language popup"
      >
        ✕
      </button>
      <div key={index} className="love-toast__content">
        <span className="love-toast__phrase">♥ {current.phrase}</span>
        <span className="love-toast__meta">
          {index + 1} / {LOVE_IN_100_LANGUAGES.length} · {current.language}
        </span>
      </div>
    </div>
  );
};


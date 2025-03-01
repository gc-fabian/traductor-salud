import React, { useEffect } from "react";

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
  targetLang: string; // Output language code (e.g., "EN", "ES")
}

const TranslationDisplay: React.FC<TranslationDisplayProps> = ({ originalText, translatedText, targetLang }) => {
  useEffect(() => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      // Map the language codes to BCP 47 language tags
      const langMap: Record<string, string> = {
        EN: "en-US",
        ES: "es-ES",
        FR: "fr-FR",
        DE: "de-DE",
        IT: "it-IT",
        PT: "pt-PT",
      };
      utterance.lang = langMap[targetLang] || "en-US";
      
      // Try to select a matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }, [translatedText, targetLang]);

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full max-w-lg">
      {originalText && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Original Text:</h2>
          <p>{originalText}</p>
        </div>
      )}
      {translatedText && (
        <div>
          <h2 className="font-semibold text-lg">Translation ({targetLang}):</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationDisplay;

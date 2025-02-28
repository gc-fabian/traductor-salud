import React, { useEffect } from "react";

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
  targetLang: string; // Recibe el idioma de destino
}

const TranslationDisplay: React.FC<TranslationDisplayProps> = ({ originalText, translatedText, targetLang }) => {
  
  useEffect(() => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      
      // Configurar el idioma correcto
      const langMap: Record<string, string> = {
        EN: "en-US",
        ES: "es-ES",
        FR: "fr-FR",
        DE: "de-DE",
        IT: "it-IT",
        PT: "pt-PT",
      };
      utterance.lang = langMap[targetLang] || "en-US"; // Predeterminado en inglés si no está en la lista

      // Intentar seleccionar una voz que coincida con el idioma
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }, [translatedText, targetLang]); // Se ejecuta cuando cambian estos valores

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full max-w-lg">
      {originalText && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Texto Original:</h2>
          <p>{originalText}</p>
        </div>
      )}
      {translatedText && (
        <div>
          <h2 className="font-semibold text-lg">Traducción ({targetLang}):</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationDisplay;

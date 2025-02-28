import dynamic from "next/dynamic";
import { useState } from "react";
import TranslationDisplay from "../components/TranslationDisplay";

// Cargar AudioRecorder solo en el cliente (sin SSR)
const AudioRecorder = dynamic(() => import("../components/AudioRecorder"), { ssr: false });

export default function Home() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("EN"); // Idioma de salida

  const handleAudioRecorded = async (audioBlob: Blob) => {
    console.log("Audio grabado, enviando al backend...");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    formData.append("targetLang", targetLang);

    try {
      console.log("Enviando solicitud a /api/transcribe...");
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta recibida:", data);

      if (response.ok) {
        setOriginalText(data.originalText);
        setTranslatedText(data.translatedText);
      } else {
        console.error("Error en la transcripción/traducción:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Transcripción y Traducción de Audio</h1>

      <label className="mb-2">
        Seleccionar idioma de salida:
        <select
          className="ml-2 p-2 bg-gray-700 rounded"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="EN">Inglés</option>
          <option value="ES">Español</option>
          <option value="FR">Francés</option>
          <option value="DE">Alemán</option>
          <option value="IT">Italiano</option>
        </select>
      </label>

      <AudioRecorder onRecorded={handleAudioRecorded} isLoading={isLoading} />
      <TranslationDisplay originalText={originalText} translatedText={translatedText} />
    </div>
  );
}

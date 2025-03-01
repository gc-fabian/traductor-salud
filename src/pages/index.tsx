// pages/index.tsx
import dynamic from "next/dynamic";
import { useState } from "react";
import TranslationDisplay from "../components/TranslationDisplay";

// Cargamos AudioRecorder solo en el cliente
const AudioRecorder = dynamic(() => import("../components/AudioRecorder"), { ssr: false });

export default function Home() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("EN");

  const handleAudioRecorded = async (audioBlob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    formData.append("targetLang", targetLang);

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
    
      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        throw new Error("API response is not valid JSON");
      }
    
      if (response.ok) {
        setOriginalText(data.originalText);
        setTranslatedText(data.translatedText);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header fijo en la parte superior */}
      <header className="p-4">
        <h1 className="text-2xl font-bold text-center">Audio Transcription and Translation</h1>
        <div className="mt-2 text-center">
          <label>
            Select output language:
            <select
              className="ml-2 p-2 bg-gray-700 rounded"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="EN">English</option>
              <option value="ES">Spanish</option>
              <option value="FR">French</option>
              <option value="DE">German</option>
              <option value="IT">Italian</option>
            </select>
          </label>
        </div>
      </header>

      {/* Área principal que ocupa el espacio restante */}
      <main className="flex flex-col items-center flex-grow">
        <AudioRecorder onRecorded={handleAudioRecorded} isLoading={isLoading} />
        <TranslationDisplay 
          originalText={originalText} 
          translatedText={translatedText} 
          targetLang={targetLang} 
        />
      </main>

      {/* Footer fijo abajo */}
      <footer className="w-full p-4 text-center bg-gray-800">
        <p className="text-sm">
          Created by <a href="https://github.com/gc-fabian" target="_blank" rel="noopener noreferrer" className="text-blue-400">@gc-fabian</a> | Contact: gc.fabianesteban@gmail.com
        </p>
      </footer>
    </div>
  );
}

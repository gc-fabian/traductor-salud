import dynamic from "next/dynamic";
import { useState } from "react";
import TranslationDisplay from "../components/TranslationDisplay";

// Load AudioRecorder only on the client side (disable SSR)
const AudioRecorder = dynamic(() => import("../components/AudioRecorder"), { ssr: false });

export default function Home() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("EN"); // Output language

  const handleAudioRecorded = async (audioBlob: Blob) => {
    //console.log("Audio recorded, sending to backend...");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    formData.append("targetLang", targetLang);

    try {
      //console.log("Sending request to /api/transcribe...");
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const textResponse = await response.text();
      //console.log("Text received:", textResponse);
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError, textResponse);
        throw new Error("API response is not valid JSON");
      }
    
      //console.log("Response received:", data);
    
      if (response.ok) {
        setOriginalText(data.originalText);
        setTranslatedText(data.translatedText);
      } else {
        console.error("Error in transcription/translation:", data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Audio Transcription and Translation</h1>

      <label className="mb-2">
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

      <AudioRecorder onRecorded={handleAudioRecorded} isLoading={isLoading} />
      <TranslationDisplay 
        originalText={originalText} 
        translatedText={translatedText} 
        targetLang={targetLang} 
      />
    </div>
  );
}

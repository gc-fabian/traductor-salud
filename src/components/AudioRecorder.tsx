import React, { useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

interface AudioRecorderProps {
  onRecorded: (audioBlob: Blob) => void;
  isLoading: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecorded, isLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl) => {
      console.log("Grabación detenida, URL del blob:", blobUrl);
      
      if (blobUrl) {
        try {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          console.log("Blob de audio obtenido, enviando a la función onRecorded...");
          onRecorded(blob);
          clearBlobUrl();
        } catch (error) {
          console.error("Error al procesar el blob de audio:", error);
        }
      } else {
        console.warn("No se generó un blobUrl válido.");
      }
    }
  });

  const handleClick = () => {
    if (isRecording) {
      console.log("Deteniendo grabación...");
      stopRecording();
    } else {
      console.log("Iniciando grabación...");
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <button
      className={`w-24 h-24 rounded-full text-white text-xl focus:outline-none transition-all duration-300 
      ${isRecording ? 'bg-green-500 animate-pulse' : 'bg-red-500'} 
      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? '...' : isRecording ? 'Grabando' : 'Iniciar'}
    </button>
  );
};

export default AudioRecorder;

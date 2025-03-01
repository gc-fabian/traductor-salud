// components/AudioRecorder.tsx
import React, { useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

interface AudioRecorderProps {
  onRecorded: (audioBlob: Blob) => void;
  isLoading: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecorded, isLoading }) => {
  const { startRecording, stopRecording, clearBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl) => {
      if (blobUrl) {
        try {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          onRecorded(blob);
          clearBlobUrl();
        } catch (error) {
          console.error("Error processing audio blob:", error);
        }
      }
    }
  });
  
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  return (
    <button
      className={`w-[30vh] h-[30vh] rounded-full text-white text-2xl font-bold flex items-center justify-center shadow-xl transition-transform duration-200
        ${isRecording ? 'bg-gradient-to-br from-green-500 to-green-700 animate-pulse' : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? '...' : isRecording ? 'Recording' : 'Record'}
    </button>
  );
};

export default AudioRecorder;

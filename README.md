# Healthcare Translation Web App with Generative AI

## Overview
# Healthcare Translation Web App with Generative AI

## Overview
This project is a web-based prototype designed for real-time, multilingual translation between healthcare providers and patients. The application captures spoken audio, transcribes it to text using AI (OpenAI Whisper), and then translates the transcript into a selected target language using Deepseek. Finally, the translated text is automatically read aloud with SpeechSynthesis. The app is built with Next.js and follows a mobile-first design.

## Features
- **Voice-to-Text Transcription:**  
  Uses OpenAI Whisper to transcribe spoken audio into text, optimized for medical terminology.
## Features
- **Voice-to-Text Transcription:**  
  Uses OpenAI Whisper to transcribe spoken audio into text, optimized for medical terminology.

- **Real-Time Translation:**  
  Utilizes Deepseek’s generative AI model to translate the transcribed text into the user’s selected target language. The prompt is carefully tuned to return only the translation without additional commentary.
- **Real-Time Translation:**  
  Utilizes Deepseek’s generative AI model to translate the transcribed text into the user’s selected target language. The prompt is carefully tuned to return only the translation without additional commentary.

- **Audio Playback:**  
  Automatically plays the translated text using the Web Speech API (SpeechSynthesis). The voice language is selected based on the target language.
- **Audio Playback:**  
  Automatically plays the translated text using the Web Speech API (SpeechSynthesis). The voice language is selected based on the target language.

- **Language Selection:**  
  Users can choose the output language from a dropdown menu (English, Spanish, French, German, Italian).
- **Language Selection:**  
  Users can choose the output language from a dropdown menu (English, Spanish, French, German, Italian).

- **Mobile-First Design:**  
  The application is fully responsive and optimized for both mobile and desktop devices.
- **Mobile-First Design:**  
  The application is fully responsive and optimized for both mobile and desktop devices.

- **Generative AI Integration:**  
  The app leverages generative AI tools not only for translation but also for speeding up development.
- **Generative AI Integration:**  
  The app leverages generative AI tools not only for translation but also for speeding up development.

## Technologies Used
- **Next.js:** Framework for building the full-stack React application.
- **React:** For the front-end user interface.
- **OpenAI API (Whisper):** For high-quality audio transcription.
- **Deepseek API:** For generating precise translations.
- **Web Speech API (SpeechSynthesis):** For text-to-speech conversion.
- **Tailwind CSS:** For fast and responsive UI styling.
- **Formidable:** For parsing multipart/form-data in API routes.
- **Vercel:** For deployment (live demo available on Vercel).

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/healthcare-translation-webapp.git
   cd healthcare-translation-webapp
## Technologies Used
- **Next.js:** Framework for building the full-stack React application.
- **React:** For the front-end user interface.
- **OpenAI API (Whisper):** For high-quality audio transcription.
- **Deepseek API:** For generating precise translations.
- **Web Speech API (SpeechSynthesis):** For text-to-speech conversion.
- **Tailwind CSS:** For fast and responsive UI styling.
- **Formidable:** For parsing multipart/form-data in API routes.
- **Vercel:** For deployment (live demo available on Vercel).

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/healthcare-translation-webapp.git
   cd healthcare-translation-webapp

2. **Install dependencies:**
   ```bash
   npm install
2. **Install dependencies:**
   ```bash
   npm install

3. **Configure Environment Variables: Create a .env.local file in the root directory with the following variables:**
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   
3. **Run the Development Server:**
   ```bash
   npm run dev

3. **Configure Environment Variables: Create a .env.local file in the root directory with the following variables:**
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   
3. **Run the Development Server:**
   ```bash
   npm run dev

Open http://localhost:3000 in your browser to see the application.

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own version, follow these steps:
## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own version, follow these steps:

1. **Upload your code to a GitHub repository.**
2. **Sign in to Vercel and import your repository.**
3. **Configure your environment variables in the Vercel dashboard.**
4. **Deploy your project.**  
   Vercel will provide you with a live URL (e.g., `https://your-project.vercel.app`).

---

## Usage Guide

### Select Output Language
- Use the dropdown menu at the top of the page to choose your desired translation language (e.g., English, Spanish, etc.).
1. **Upload your code to a GitHub repository.**
2. **Sign in to Vercel and import your repository.**
3. **Configure your environment variables in the Vercel dashboard.**
4. **Deploy your project.**  
   Vercel will provide you with a live URL (e.g., `https://your-project.vercel.app`).

---

## Usage Guide

### Select Output Language
- Use the dropdown menu at the top of the page to choose your desired translation language (e.g., English, Spanish, etc.).

### Record Audio
- Click the **"Start"** button to begin recording.  
  The button will change to **"Recording"** and display a pulsing animation.
### Record Audio
- Click the **"Start"** button to begin recording.  
  The button will change to **"Recording"** and display a pulsing animation.

### Stop Recording
- Click the same button again to stop recording.  
  The application will automatically process the audio, transcribe it, and translate it into the selected language.
### Stop Recording
- Click the same button again to stop recording.  
  The application will automatically process the audio, transcribe it, and translate it into the selected language.

### Listen to the Translation
- Once the translation is complete, the translated text will be displayed on screen and automatically played back using speech synthesis.
### Listen to the Translation
- Once the translation is complete, the translated text will be displayed on screen and automatically played back using speech synthesis.

### View Transcripts
- Both the original transcribed text and the translated text are displayed on the screen.
### View Transcripts
- Both the original transcribed text and the translated text are displayed on the screen.

---

## Error Handling and Debugging

### Transcription and Translation Errors
- The application logs errors to the console.  
  In case of failure, check the browser console and the server logs on Vercel.
---

## Error Handling and Debugging

### Transcription and Translation Errors
- The application logs errors to the console.  
  In case of failure, check the browser console and the server logs on Vercel.

### Timeout Issues
- If the audio files are too long or if the API responses are delayed, you may encounter timeouts.  
  Consider limiting the duration of the recording.
### Timeout Issues
- If the audio files are too long or if the API responses are delayed, you may encounter timeouts.  
  Consider limiting the duration of the recording.

---

## Security Considerations

### API Keys
- Make sure to keep your API keys secure by using environment variables.  
  These keys are not exposed to the client.
---

## Security Considerations

### API Keys
- Make sure to keep your API keys secure by using environment variables.  
  These keys are not exposed to the client.

### Data Privacy
- User information is not stored persistently.  
  All processing is performed in real-time.  
  Ensure that any medical data complies with the relevant privacy laws.
### Data Privacy
- User information is not stored persistently.  
  All processing is performed in real-time.  
  Ensure that any medical data complies with the relevant privacy laws.

---

## Future Improvements

- **Support for More Languages:**  
  Add additional languages to the selector as needed.
- **Enhanced Error Handling:**  
  Improve user feedback regarding errors during transcription or translation.
- **User Authentication:**  
  Consider adding authentication for secure access in a real healthcare environment.
- **Custom Medical Glossaries:**  
  Integrate a glossary function to improve the accuracy of translating medical terms.

---

## Conclusion

This prototype demonstrates the rapid integration of generative AI tools to address communication challenges in the healthcare sector. It provides a foundation for developing a fully functional translation system that can be used in healthcare settings.
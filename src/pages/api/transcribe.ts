import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import openai from '../../utils/openaiClient';
import deepseek from '../../utils/deepseekClient';

export const config = {
  api: { bodyParser: false },
};

const parseForm = (req: NextApiRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    console.log("📩 Recibiendo archivo...");
    const { fields, files } = await parseForm(req);

    const targetLang = Array.isArray(fields.targetLang) ? fields.targetLang[0] : fields.targetLang || 'EN';
    const audioFile = files.audio;

    if (!audioFile) {
      console.error("❌ No se recibió el archivo de audio");
      return res.status(400).json({ error: 'No se recibió el archivo de audio' });
    }

    const file: FormidableFile = Array.isArray(audioFile) ? audioFile[0] : audioFile;
    
    // ⚠️ Importante: Leer el archivo como Buffer y convertirlo a un File
    const buffer = fs.readFileSync(file.filepath);
    const fileObject = new File([buffer], file.originalFilename || 'audio.wav', { type: 'audio/wav' });

    console.log("📤 Enviando a OpenAI Whisper...");
    const transcriptionResponse = await openai.audio.transcriptions.create({
      file: fileObject, // ✅ Fix: Ahora es un File válido
      model: 'whisper-1',
    });

    const originalText = transcriptionResponse.text;
    console.log("📝 Texto transcrito:", originalText);

    console.log("🔄 Enviando a Deepseek para traducción...");
    const deepseekResponse = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: "Eres un traductor. Traduce el siguiente texto sin agregar comentarios adicionales." },
        { role: 'user', content: `Traduce este texto al ${targetLang}: "${originalText}"` },
      ],
      temperature: 0,
    });

    const translatedText = deepseekResponse.choices[0].message?.content || '';
    console.log("✅ Traducción obtenida:", translatedText);

    res.status(200).json({ originalText, translatedText });
  } catch (error) {
    console.error("❌ Error en transcripción/traducción:", error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

export default handler;

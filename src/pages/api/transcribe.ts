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
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const targetLang = Array.isArray(fields.targetLang)
      ? fields.targetLang[0]
      : fields.targetLang || 'EN';
    const audioFile = files.audio;

    if (!audioFile) {
      console.error("❌ No audio file received");
      return res.status(400).json({ error: 'No audio file received' });
    }

    const file: FormidableFile = Array.isArray(audioFile) ? audioFile[0] : audioFile;
    const buffer = fs.readFileSync(file.filepath);

    // Convert the buffer to a File object (requires Node 18+)
    const fileObject = new File([buffer], file.originalFilename || 'audio.wav', { type: 'audio/wav' });

    const transcriptionResponse = await openai.audio.transcriptions.create({
      file: fileObject,
      model: 'whisper-1',
    });

    const originalText = transcriptionResponse.text;

    // Modified prompt for Deepseek:
    const deepseekResponse = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            "You are a translator. Translate the following text exactly and return only the translated text, without any additional commentary or formatting."
        },
        {
          role: 'user',
          content: `Translate this text to ${targetLang}: "${originalText}"`
        }
      ],
      temperature: 0,
    });

    const translatedText = deepseekResponse.choices[0].message?.content || '';
    res.status(200).json({ originalText, translatedText });
  } catch (error) {
    console.error("❌ Error in transcription/translation:", error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};

export default handler;

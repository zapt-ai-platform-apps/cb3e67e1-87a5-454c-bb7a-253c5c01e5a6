import { createEvent } from '../src/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { cvData, language } = req.body;

    const prompt = `
      قم بإنشاء سيرة ذاتية باستخدام البيانات التالية، وقدمها باللغة ${language}:
      ${JSON.stringify(cvData)}
      يجب أن تكون السيرة الذاتية منظمة وجاهزة للطباعة بصيغة HTML.
    `;

    const result = await createEvent('chatgpt_request', {
      prompt: prompt,
      response_type: 'text',
    });

    res.status(200).json({ cvContent: result });
  } catch (error) {
    console.error('Error generating CV:', error);
    res.status(500).json({ error: 'Error generating CV' });
  }
}
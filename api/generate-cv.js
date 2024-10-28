import { createEvent } from '../src/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { fullName, jobTitle, language } = req.body;

    const prompt = `
      قم بإنشاء سيرة ذاتية احترافية وجذابة لشخص اسمه ${fullName} ويعمل ك${jobTitle}، وقدمها باللغة ${language}.
      يجب أن تكون السيرة الذاتية منظمة، منسقة بشكل احترافي، وتشمل الأقسام التالية:
      - المعلومات الشخصية
      - الملخص المهني
      - المهارات الرئيسية
      - الخبرات العملية (قم بتوليد خبرات مناسبة)
      - التعليم
      - الشهادات والجوائز (إن وجدت)
      قدم السيرة الذاتية بصيغة HTML جاهزة للطباعة، مع مراعاة تنسيق النصوص والعناوين.
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
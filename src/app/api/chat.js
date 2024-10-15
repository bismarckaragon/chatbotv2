// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'El mensaje está vacío' });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });


  const openai = new OpenAIApi(configuration);
  console.log(process.env.OPENAI_API_KEY)
  try {
    const response = await openai.createChatCompletion({
     model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
     /*  max_tokens: 150,
      temperature: 0.7, */
    });

    const reply = response.data.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error al comunicarse con OpenAI:', error);
    res.status(500).json({ error: 'Error al obtener respuesta del asistente' });
  }
}

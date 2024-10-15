import OpenAI from 'openai';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function addMessage(threadId, message) {
    const completion = await openai.beta.threads.messages.create(threadId, {
        role: "user", content: message }
      );

      return completion
}

async function getMensajes(threadId, asistente) {
    const run = await openai.beta.threads.runs.create(
        threadId,
      { assistant_id: asistente }
    );
  while(true){
    const runInfo = await openai.beta.threads.runs.retrieve(
        threadId,
        run.id
      );

      if (runInfo.status == "completed"){
        break
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
  }
  const messages = await openai.beta.threads.messages.list(threadId)
  const messagesLast = messages.data[0].content[0].text.value
  return messagesLast
  }

export async function POST(req) {
  try {
    let threadId = ''
    const asistente = process.env.ASSISTANT_ID
    const emptyThread = await openai.beta.threads.create();
    threadId = emptyThread.id
    const { message } = await req.json();
    const mensaje = await addMessage(threadId, message)
    const respuestas = await getMensajes(threadId, asistente)

 
   /*  const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // O 'gpt-4' si tienes acceso
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content; */
    const r1 = respuestas.replace(/【\d+:\d+†source】/g, '');
    const r2 = r1.replace(/```html/g, '');
    const reply =  r2.replace(/```/g, '');
    
    console.log('respuestas ::::::::::::::::::::::::::::::::::::::::::::',reply, mensaje)

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en el endpoint:', error);

    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

 
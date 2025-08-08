import { openai } from "@ai-sdk/openai";
import {kv} from '@vercel/kv';
import { convertToModelMessages, streamText } from "ai";
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(4, '120s'),
});

export async function POST(request) {

  // call ratelimit with request ip
  const ip = request.ip ?? 'ip';
  const { success, remaining } = await ratelimit.limit(ip);

  // block the request if unsuccessfull
  if (!success) {
    return new Response('Você atingiu o limite de requisições!', { status: 429 });
  }

  const { messages } = await request.json();
  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: 'Você é um assistente especializado em suporte técnico, oferecendo ajuda exclusivamente para questões relacionadas a computadores, celulares e dispositivos tecnológicos. Sua função é fornecer soluções precisas e úteis para problemas de hardware, software, conectividade, e configurações. Não discuta assuntos fora do escopo de suporte técnico e mantenha-se focado em fornecer assistência tecnológica.'
  });
  

  return result.toUIMessageStreamResponse({
     onError: (error) => {
      console.log(error)
      if(error === null) {
        console.error('[POST] :: toUIMessageStreamResponse - erro chegou nulo e não sabemos o que aconteceu')
        return 'Algum error inesperado aconteceu'
      }

      if(typeof error === "string") {
        return error;
      }

      if(typeof error === Error) {
        return error.message;
      }

      return JSON.stringify(error)
     }
  });
}

import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export async function POST(request) {
  const { messages } = await request.json();
  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: 'Você é um assistente pessoal divertido e simpático que sabe tudo sobre filmes e o mundo do cinema. Se alguém perguntar algo que não seja sobre filmes, responda de maneira divertidade que fala somente sobre filmes e ofereça os seus serviços'
  });
  

  return result.toUIMessageStreamResponse();
}

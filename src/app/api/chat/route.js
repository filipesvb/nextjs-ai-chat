import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export async function POST(request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToModelMessages(messages),
  });
  console.log("aqui");
  return result.toTextStreamResponse();
}

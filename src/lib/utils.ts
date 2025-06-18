import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formateFullDate = (dateStr: string, lang: string = "en-US") => {
  const formattedDate = new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateStr));
  return formattedDate;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getAIResponseStream = async (
  userMessage: string,
  conversationContextRef: React.RefObject<never[]>
) => {
  const ai = new GoogleGenerativeAI("AIzaSyBN5k3miyyRaeQxfsxtKg2y_21ZnQ_fayA");
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const think = {
    thinkingConfig: {
      includeThoughts: true, // Explicitly enable thoughts
      thinkingBudget: 12000, // Allocate tokens for thinking
    },
  };

  const chat = model.startChat({
    generationConfig,
    history: conversationContextRef.current,
    ...think,
  });

  return chat.sendMessageStream(userMessage);
};

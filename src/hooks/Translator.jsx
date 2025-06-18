import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Initialize Google Gemini model client
const genAI = new GoogleGenerativeAI("AIzaSyCQ1sKE_D2B8agWv8Xnja7HSoacQszS-UE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "text/plain",
};

async function translateTextBatch(texts, targetLang) {
  // Build messages for the model
  const contents = [];
  // system prompt
  contents.push({
    role: "model",
    parts: [
      {
        text: `You are a translation engine. Translate the following sentences into ${targetLang}.`,
      },
    ],
  });
  texts.forEach((t) => {
    contents.push({ role: "user", parts: [{ text: t }] });
  });

  // Call Google Gemini model
  const result = await model.generateContent({
    contents,
    generationConfig,
  });

  const responseContent = await result.response.text();
  // Expect plain text with each sentence on new line or trimmed
  const lines = responseContent.split(/\r?\n/).filter((l) => l.trim());
  return lines.map((l) => l.replace(/^\d+\.\s*/, "").trim());
}

export default function Translator({ targetLang = "en", batchSize = 20 }) {
  const { pathname } = useLocation();
  const cache = useRef({});

  useEffect(() => {
    // hide body to prevent flash
    document.body.style.visibility = "hidden";

    const els = Array.from(
      document.querySelectorAll("body *:not(script):not(style)")
    );
    const toTranslate = [];
    const mapping = [];

    els.forEach((el) => {
      const txt = el.innerText?.trim();
      if (!txt || el.dataset.translated) return;
      if (cache.current[txt]) {
        el.innerText = cache.current[txt];
        el.dataset.translated = "true";
      } else {
        toTranslate.push(txt);
        mapping.push(el);
      }
    });

    async function runBatches() {
      for (let i = 0; i < toTranslate.length; i += batchSize) {
        const batch = toTranslate.slice(i, i + batchSize);
        try {
          const translated = await translateTextBatch(batch, targetLang);
          translated.forEach((t, idx) => {
            const original = batch[idx];
            const el = mapping[i + idx];
            el.innerText = t;
            el.dataset.translated = "true";
            cache.current[original] = t;
          });
        } catch (err) {
          console.error("Batch translation failed", err);
        }
      }
      // reveal page
      document.body.style.visibility = "visible";
    }

    runBatches();
  }, [pathname, targetLang, batchSize]);

  return null;
}

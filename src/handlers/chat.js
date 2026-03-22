import { AIWrapper } from '../lib/ai.js';

export async function handleAIChat(text, env) {
  const ai = new AIWrapper(env.AI);

  // Anda bisa menambahkan logika tambahan di sini, 
  // misalnya filter kata-kata kasar atau deteksi bahasa.
  
  const systemPrompt = "Anda adalah asisten AI yang cerdas, sopan, dan membantu dalam Bahasa Indonesia.";
  
  try {
    const response = await ai.generateText(text, systemPrompt);
    
    if (!response) {
      return "Maaf, saya tidak bisa memikirkan jawaban saat ini.";
    }
    
    return response;
  } catch (error) {
    console.error("Chat Handler Error:", error);
    return "Terjadi kesalahan saat menghubungi otak AI saya.";
  }
}
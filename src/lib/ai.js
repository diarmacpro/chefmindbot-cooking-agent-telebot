export class AIWrapper {
  constructor(aiBinding) {
    this.ai = aiBinding;
  }

  async generateText(prompt, systemPrompt = "Anda adalah asisten AI yang cerdas.") {
    try {
      const result = await this.ai.run('@cf/meta/llama-3.1-8b-instruct-fast', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      });
      return result.response;
    } catch (error) {
      console.error("AI Generation Error:", error);
      return "Maaf, sistem sedang sibuk.";
    }
  }
}
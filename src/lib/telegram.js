export class TelegramWrapper {
  constructor(token) {
    this.apiUrl = `https://api.telegram.org/bot${token}`;
  }

  async sendMessage(chatId, text, options = {}) {
    const response = await fetch(`${this.apiUrl}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        ...options,
      }),
    });
    return response.json();
  }

  parseUpdate(body) {
    const message = body.message || {};
    return {
      chatId: message.chat?.id,
      text: message.text || '',
      user: message.from || {},
      isCommand: message.text?.startsWith('/'),
    };
  }
}
import { handleTelegramRequest } from './src/telegram-bot.js';

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'POST') {
      return handleTelegramRequest(request, env);
    }
    return new Response('Bot is running!');
  },
};

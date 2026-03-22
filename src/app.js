import { TelegramWrapper } from './lib/telegram.js';
import { handleCommand } from './handlers/commands.js';
import { handleAIChat } from './handlers/chat.js'; // Import chat handler baru

export async function handleTelegramRequest(request, env, ctx) {
  const tg = new TelegramWrapper(env.TELEGRAM_TOKEN);
  
  const body = await request.json();
  const { chatId, text, user, isCommand } = tg.parseUpdate(body);

  if (!chatId || !text) return;

  ctx.waitUntil((async () => {
    let responseText;

    if (isCommand) {
      // Logic: Jika user mengetik /start, /help, dsb
      responseText = await handleCommand(text, user);
    } else {
      // Logic: Jika user ngobrol biasa (diproses oleh AI)
      responseText = await handleAIChat(text, env);
    }

    await tg.sendMessage(chatId, responseText);
  })());
}
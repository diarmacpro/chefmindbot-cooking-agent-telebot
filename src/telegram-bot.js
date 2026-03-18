export async function handleTelegramRequest(request, env) {
  const { message } = await request.json();

  if (!message || !message.text) return new Response('OK');

  const chatId = message.chat.id;
  const text = message.text;
  const user = message.from;

  let responseText = "";

  // Logika Perintah (Command)
  if (text.startsWith('/start')) {
    responseText = "Halo! Saya asisten AI berbasis Llama 3.1. Apa yang bisa saya bantu hari ini?";
  } 
  else if (text.startsWith('/help')) {
    responseText = "Perintah tersedia:\n/start - Mulai bot\n/help - Bantuan\n/me - Info publik Anda\nKetik apapun untuk tanya AI.";
  } 
  else if (text.startsWith('/me')) {
    responseText = `--- INFO PUBLIK ANDA ---\nID: ${user.id}\nNama: ${user.first_name} ${user.last_name || ''}\nUsername: @${user.username || 'n/a'}\nBahasa: ${user.language_code}`;
  } 
  else {
    // Instruksi ke AI (Llama 3.1 8B Instruct Fast)
    const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
      messages: [
        { role: 'system', content: 'Anda adalah asisten AI yang cerdas dan ramah dalam Bahasa Indonesia.' },
        { role: 'user', content: text }
      ]
    });
    responseText = aiResponse.response;
  }

  // Kirim balik ke Telegram
  await fetch(`https://api.telegram.org{env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: responseText,
    }),
  });

  return new Response('OK');
}

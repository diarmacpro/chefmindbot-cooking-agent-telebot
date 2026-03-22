export const commandHandlers = {
  '/start': () => "Halo! Saya asisten AI. Ada yang bisa saya bantu?",
  '/help': () => "Perintah tersedia:\n/start - Mulai\n/help - Bantuan\n/me - Info profil",
  '/me': (user) => {
    return `--- INFO PROFIL ---\nID: ${user.id}\nNama: ${user.first_name}\nUsername: @${user.username || 'n/a'}`;
  }
};

export async function handleCommand(text, user) {
  const command = text.split(' ')[0];
  const handler = commandHandlers[command];
  return handler ? handler(user) : "Perintah tidak dikenal.";
}
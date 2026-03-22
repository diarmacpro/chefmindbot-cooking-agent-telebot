import { handleTelegramRequest } from './src/app.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Health Check
    if (url.pathname === '/health') {
      return new Response('OK', { status: 200 });
    }

    // 2. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 3. Routing Telegram Webhook
    if (request.method === 'POST') {
      try {
        await handleTelegramRequest(request, env, ctx);
        return new Response('Processed', { status: 200, headers: corsHeaders });
      } catch (err) {
        return new Response('Error', { status: 500 });
      }
    }

    return new Response('Bot is running!', { 
      status: 200, 
      headers: { 'Content-Type': 'text/plain', ...corsHeaders } 
    });
  },
};
const https = require('https');

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!TELEGRAM_TOKEN || !WEBHOOK_URL) {
  console.log('Missing TELEGRAM_TOKEN or WEBHOOK_URL - skipping webhook registration');
  process.exit(0);
}

const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${WEBHOOK_URL}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    if (result.ok) {
      console.log('✅ Telegram webhook registered successfully:', WEBHOOK_URL);
    } else {
      console.log('❌ Webhook registration failed:', result);
    }
  });
}).on('error', (err) => {
  console.log('❌ Error registering webhook:', err.message);
});
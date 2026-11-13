// ==========================================================================
//  ARIYAK STORE - TELEGRAM BOT SERVER (Zero Dependencies - Pure Node.js)
//  Bot Token: 9174197595:AAFy9sSS8DiGEjVwJee2OTAHdP45bsDVJIE
// ==========================================================================

const https = require('https');

const BOT_TOKEN = '9174197595:AAFy9sSS8DiGEjVwJee2OTAHdP45bsDVJIE';
// Replace with your public HTTPS URL (e.g. GitHub Pages or Cloudflare Pages URL)
const WEBAPP_URL = 'https://yourusername.github.io/ariyak_store/'; 

let lastUpdateId = 0;

/**
 * Calls Telegram Bot API methods
 */
function callApi(method, data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${BOT_TOKEN}/${method}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    resolve({ ok: false, error: e.message });
                }
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

/**
 * Configure the Persistent Telegram Menu Button to launch Mini App
 */
async function setupMenuButton() {
    try {
        const res = await callApi('setChatMenuButton', {
            menu_button: {
                type: 'web_app',
                text: '🛍️ Open Store',
                web_app: { url: WEBAPP_URL }
            }
        });
        console.log('📌 Menu Button Configuration:', res.ok ? 'Success' : res.description);
    } catch(e) {
        console.error('Failed to configure menu button:', e.message);
    }
}

/**
 * Long-polling loop to listen for incoming Telegram messages
 */
async function pollUpdates() {
    try {
        const data = await callApi('getUpdates', {
            offset: lastUpdateId + 1,
            timeout: 30
        });

        if (data.ok && Array.isArray(data.result)) {
            for (const update of data.result) {
                lastUpdateId = update.update_id;

                if (update.message && update.message.text) {
                    const chatId = update.message.chat.id;
                    const text = update.message.text;
                    const userName = update.message.from.first_name || 'អតិថិជន';

                    console.log(`📩 Message from ${userName} (Chat ID: ${chatId}): ${text}`);

                    if (text === '/start') {
                        // Send Welcome message with Mini App WebApp Button
                        await callApi('sendMessage', {
                            chat_id: chatId,
                            text: `👋 សួស្តី *${userName}*!\n\nសូមស្វាគមន៍មកកាន់ *Ariyak Store* 💎\nយើងខ្ញុំមានលក់គណនី AI & Creative Premium (CapCut, Gemini, ChatGPT, Claude...) ជាមួយតម្លៃពិសេសបំផុត និងស្កេនទូទាត់តាម KHQR / ABA Mobile ស្វ័យប្រវត្តិ។\n\n👇 ចុចប៊ូតុងខាងក្រោមដើម្បីបើកមើលទំនិញ៖`,
                            parse_mode: 'Markdown',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: '🛍️ បើកទិញទំនិញ (Open Ariyak Store)',
                                            web_app: { url: WEBAPP_URL }
                                        }
                                    ],
                                    [
                                        {
                                            text: '💬 ជជែកជាមួយ Admin',
                                            url: 'https://web.telegram.org/k/'
                                        }
                                    ]
                                ]
                            }
                        });
                    }
                }
            }
        }
    } catch(e) {
        console.error('Polling error:', e.message);
    }

    setTimeout(pollUpdates, 1000);
}

// Start Bot
console.log('🚀 Ariyak Store Telegram Bot is starting...');
callApi('getMe', {}).then(bot => {
    if (bot.ok) {
        console.log(`✅ Bot Connected: @${bot.result.username} (${bot.result.first_name})`);
        setupMenuButton();
        pollUpdates();
    } else {
        console.error('❌ Invalid Bot Token:', bot.description);
    }
});
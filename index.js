require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Importar comandos
require('./commands/dev')(bot);
require('./commands/media')(bot);
require('./commands/social')(bot);
require('./commands/tools')(bot);
require('./commands/games')(bot);
require('./commands/crypto')(bot);
require('./commands/info')(bot);

// Iniciar bot
bot.launch();
console.log('Bot iniciado!');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
const axios = require('axios');
const crypto = require('crypto');
const math = require('mathjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (bot) => {
  // /ip
  bot.command('ip', async (ctx) => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json', { timeout: 15000 });
      const ip = ipResponse.data.ip;

      const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`, { timeout: 15000 });
      const geo = geoResponse.data;

      const text = `*Seu IP: ${ip}*\nPaís: ${geo.country_name}\nCidade: ${geo.city}\nRegião: ${geo.region}\nISP: ${geo.org}\nFuso horário: ${geo.timezone}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter IP.', { parse_mode: 'Markdown' });
    }
  });

  // /ping <host>
  bot.command('ping', async (ctx) => {
    try {
      const host = ctx.message.text.split(' ')[1];
      if (!host) return ctx.reply('❌ Use: /ping <host>', { parse_mode: 'Markdown' });

      const start = Date.now();
      const response = await axios.get(`http://${host}`, { timeout: 10000 });
      const time = Date.now() - start;

      const status = response.status === 200 ? '✅ Online' : '❌ Offline';
      ctx.reply(`${status}\nCódigo HTTP: ${response.status}\nTempo: ${time}ms`, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Offline ou erro.', { parse_mode: 'Markdown' });
    }
  });

  // /hash <texto>
  bot.command('hash', (ctx) => {
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) return ctx.reply('❌ Use: /hash <texto>', { parse_mode: 'Markdown' });

    const md5 = crypto.createHash('md5').update(text).digest('hex');
    const sha256 = crypto.createHash('sha256').update(text).digest('hex');
    const sha512 = crypto.createHash('sha512').update(text).digest('hex');

    const block = `\`\`\`\nMD5: ${md5}\nSHA-256: ${sha256}\nSHA-512: ${sha512}\n\`\`\``;
    ctx.reply(block, { parse_mode: 'Markdown' });
  });

  // /b64 <texto>
  bot.command('b64', (ctx) => {
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) return ctx.reply('❌ Use: /b64 <texto>', { parse_mode: 'Markdown' });

    const encoded = Buffer.from(text).toString('base64');
    ctx.reply(`\`${encoded}\``, { parse_mode: 'Markdown' });
  });

  // /b64d <texto>
  bot.command('b64d', (ctx) => {
    const text = ctx.message.text.split(' ')[1];
    if (!text) return ctx.reply('❌ Use: /b64d <texto>', { parse_mode: 'Markdown' });

    try {
      const decoded = Buffer.from(text, 'base64').toString('utf8');
      ctx.reply(`\`${decoded}\``, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Texto não é Base64 válido.', { parse_mode: 'Markdown' });
    }
  });

  // /encurtar <url>
  bot.command('encurtar', async (ctx) => {
    try {
      const url = ctx.message.text.split(' ').slice(1).join(' ');
      if (!url) return ctx.reply('❌ Use: /encurtar <url>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { timeout: 15000 });
      ctx.reply(`🔗 URL encurtada: ${response.data}`, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao encurtar URL.', { parse_mode: 'Markdown' });
    }
  });

  // /expandir <url>
  bot.command('expandir', async (ctx) => {
    try {
      const url = ctx.message.text.split(' ').slice(1).join(' ');
      if (!url) return ctx.reply('❌ Use: /expandir <url>', { parse_mode: 'Markdown' });

      const response = await axios.get(url, { maxRedirects: 0, timeout: 15000, validateStatus: () => true });
      const location = response.headers.location;
      ctx.reply(`🔗 Destino: ${location || 'Não redirecionado'}`, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao expandir URL.', { parse_mode: 'Markdown' });
    }
  });

  // /qr <texto>
  bot.command('qr', async (ctx) => {
    try {
      const text = ctx.message.text.split(' ').slice(1).join(' ');
      if (!text) return ctx.reply('❌ Use: /qr <texto>', { parse_mode: 'Markdown' });

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
      await ctx.replyWithPhoto(qrUrl);
    } catch (error) {
      ctx.reply('❌ Erro ao gerar QR Code.', { parse_mode: 'Markdown' });
    }
  });

  // /calc <expressão>
  bot.command('calc', (ctx) => {
    const expr = ctx.message.text.split(' ').slice(1).join(' ');
    if (!expr) return ctx.reply('❌ Use: /calc <expressão>', { parse_mode: 'Markdown' });

    try {
      const result = math.evaluate(expr);
      ctx.reply(`Resultado: \`${result}\``, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Expressão inválida.', { parse_mode: 'Markdown' });
    }
  });

  // /uuid
  bot.command('uuid', (ctx) => {
    const uuid = uuidv4();
    ctx.reply(`\`${uuid}\``, { parse_mode: 'Markdown' });
  });

  // /password <tamanho>
  bot.command('password', (ctx) => {
    const size = parseInt(ctx.message.text.split(' ')[1]) || 16;
    if (size < 4 || size > 128) return ctx.reply('❌ Tamanho entre 4 e 128.', { parse_mode: 'Markdown' });

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    const bytes = crypto.randomBytes(size);
    for (let i = 0; i < size; i++) {
      password += chars[bytes[i] % chars.length];
    }
    ctx.reply(`\`${password}\``, { parse_mode: 'Markdown' });
  });

  // /whois <dominio>
  bot.command('whois', (ctx) => {
    const domain = ctx.message.text.split(' ')[1];
    if (!domain) return ctx.reply('❌ Use: /whois <dominio>', { parse_mode: 'Markdown' });

    const link = `https://who.is/whois/${domain}`;
    ctx.reply(`🔍 [Ver WHOIS de ${domain}](${link})`, { parse_mode: 'Markdown' });
  });

  // /timestamp
  bot.command('timestamp', (ctx) => {
    const now = Date.now();
    const utc = new Date().toISOString();
    const local = new Date().toLocaleString('pt-BR');
    const text = `*Unix Timestamp: ${now}*\nUTC: ${utc}\nLocal: ${local}`;
    ctx.reply(text, { parse_mode: 'Markdown' });
  });
};
const axios = require('axios');
const cheerio = require('cheerio');
const { XMLParser } = require('fast-xml-parser');
const feedService = require('../services/feed.service');

module.exports = (bot) => {
  // /tempo <cidade>
  bot.command('tempo', async (ctx) => {
    try {
      const cidade = ctx.message.text.split(' ').slice(1).join(' ');
      if (!cidade) return ctx.reply('❌ Use: /tempo <cidade>', { parse_mode: 'Markdown' });

      // Geocoding
      const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt`, { timeout: 15000 });
      if (!geoResponse.data.results || geoResponse.data.results.length === 0) return ctx.reply('❌ Cidade não encontrada.', { parse_mode: 'Markdown' });

      const { latitude, longitude, name } = geoResponse.data.results[0];

      // Clima
      const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, { timeout: 15000 });
      const weather = weatherResponse.data.current_weather;

      const temp = weather.temperature;
      const wind = weather.windspeed;
      const code = weather.weathercode;
      const condition = getWeatherDescription(code);
      const emoji = getWeatherEmoji(code);

      const text = `*${name}*\n🌡️ Temperatura: ${temp}°C\n💨 Vento: ${wind} km/h\n${emoji} ${condition}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter clima.', { parse_mode: 'Markdown' });
    }
  });

  // /trending
  bot.command('trending', async (ctx) => {
    try {
      const response = await axios.get('https://github.com/trending', { timeout: 15000 });
      const $ = cheerio.load(response.data);
      const repos = [];

      $('.Box-row').each((i, el) => {
        if (i >= 10) return;
        const title = $(el).find('h2 a').text().trim().replace(/\s+/g, ' ');
        const desc = $(el).find('p').text().trim();
        const lang = $(el).find('[itemprop="programmingLanguage"]').text().trim();
        const stars = $(el).find('.octicon-star + span').text().trim();
        repos.push({ title, desc, lang, stars });
      });

      let text = '*🔥 Repos GitHub Trending*\n\n';
      repos.forEach((repo, i) => {
        text += `${i + 1}. *${repo.title}*\n   ${repo.lang} ⭐ ${repo.stars}\n   ${repo.desc}\n\n`;
      });
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter trending.', { parse_mode: 'Markdown' });
    }
  });

  // /news
  bot.command('news', async (ctx) => {
    try {
      const response = await axios.get('https://news.ycombinator.com/rss', { timeout: 15000 });
      const parser = new XMLParser();
      const xml = parser.parse(response.data);
      const items = xml.rss.channel.item.slice(0, 8);

      let text = '*📰 Notícias Hacker News*\n\n';
      items.forEach((item, i) => {
        text += `${i + 1}. [${item.title}](${item.link})\n`;
      });
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter notícias.', { parse_mode: 'Markdown' });
    }
  });

  // /pais <nome>
  bot.command('pais', async (ctx) => {
    try {
      const nome = ctx.message.text.split(' ').slice(1).join(' ');
      if (!nome) return ctx.reply('❌ Use: /pais <nome>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(nome)}`, { timeout: 15000 });
      const pais = response.data[0];

      const text = `*${pais.name.official}*\n🏛️ Capital: ${pais.capital?.[0] || 'N/A'}\n👥 População: ${pais.population.toLocaleString('pt-BR')}\n🗣️ Idiomas: ${Object.values(pais.languages || {}).join(', ')}\n💰 Moeda: ${Object.values(pais.currencies || {}).map(c => c.name).join(', ')}\n🌍 Região: ${pais.region}\n🏴 Bandeira: ${pais.flag}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter info do país.', { parse_mode: 'Markdown' });
    }
  });

  // /fuso <cidade>
  bot.command('fuso', async (ctx) => {
    try {
      const cidade = ctx.message.text.split(' ').slice(1).join(' ');
      if (!cidade) return ctx.reply('❌ Use: /fuso <cidade>', { parse_mode: 'Markdown' });

      const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt`, { timeout: 15000 });
      if (!geoResponse.data.results || geoResponse.data.results.length === 0) return ctx.reply('❌ Cidade não encontrada.', { parse_mode: 'Markdown' });

      const { latitude, longitude, timezone } = geoResponse.data.results[0];
      const now = new Date();
      const time = new Intl.DateTimeFormat('pt-BR', { timeZone: timezone, dateStyle: 'full', timeStyle: 'long' }).format(now);

      ctx.reply(`🕒 Hora atual em ${cidade}: ${time}`, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter fuso horário.', { parse_mode: 'Markdown' });
    }
  });

  // /feed
  bot.command('feed', (ctx) => {
    const chatId = ctx.chat.id;
    const message = feedService.startFeed(chatId, bot);
    ctx.reply(message, { parse_mode: 'Markdown' });
  });

  // /parar
  bot.command('parar', (ctx) => {
    const chatId = ctx.chat.id;
    const message = feedService.stopFeed(chatId);
    ctx.reply(message, { parse_mode: 'Markdown' });
  });
};

function getWeatherDescription(code) {
  const descriptions = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Névoa',
    48: 'Névoa com geada',
    51: 'Garoa leve',
    53: 'Garoa moderada',
    55: 'Garoa intensa',
    56: 'Garoa congelante leve',
    57: 'Garoa congelante intensa',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    66: 'Chuva congelante leve',
    67: 'Chuva congelante forte',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve forte',
    77: 'Grãos de neve',
    80: 'Chuva leve',
    81: 'Chuva moderada',
    82: 'Chuva forte',
    85: 'Neve leve',
    86: 'Neve forte',
    95: 'Tempestade',
    96: 'Tempestade com granizo leve',
    99: 'Tempestade com granizo forte'
  };
  return descriptions[code] || 'Desconhecido';
}

function getWeatherEmoji(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '❄️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}
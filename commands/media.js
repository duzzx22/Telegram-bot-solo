const downloader = require('../services/downloader.service');

module.exports = (bot) => {
  // /video <link>
  bot.command('video', async (ctx) => {
    try {
      const url = ctx.message.text.split(' ').slice(1).join(' ');
      if (!url) return ctx.reply('❌ Use: /video <link>', { parse_mode: 'Markdown' });

      await ctx.reply('⏳ Baixando vídeo...', { parse_mode: 'Markdown' });
      const filePath = await downloader.downloadVideo(url);
      await ctx.replyWithVideo({ source: filePath });
      downloader.deleteFile(filePath);
    } catch (error) {
      ctx.reply('❌ Erro ao baixar vídeo. Link inválido ou privado.', { parse_mode: 'Markdown' });
    }
  });

  // /audio <link>
  bot.command('audio', async (ctx) => {
    try {
      const url = ctx.message.text.split(' ').slice(1).join(' ');
      if (!url) return ctx.reply('❌ Use: /audio <link>', { parse_mode: 'Markdown' });

      await ctx.reply('⏳ Baixando áudio...', { parse_mode: 'Markdown' });
      const filePath = await downloader.downloadAudio(url);
      const title = url.split('/').pop() || 'Áudio';
      await ctx.replyWithAudio({ source: filePath }, { caption: title });
      downloader.deleteFile(filePath);
    } catch (error) {
      ctx.reply('❌ Erro ao baixar áudio. Link inválido ou privado.', { parse_mode: 'Markdown' });
    }
  });

  // /thumbnail <link>
  bot.command('thumbnail', async (ctx) => {
    try {
      const url = ctx.message.text.split(' ').slice(1).join(' ');
      if (!url) return ctx.reply('❌ Use: /thumbnail <link>', { parse_mode: 'Markdown' });

      // Para YouTube
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (!match) return ctx.reply('❌ Apenas links do YouTube suportados.', { parse_mode: 'Markdown' });

      const videoId = match[1];
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      await ctx.replyWithPhoto(thumbnailUrl);
    } catch (error) {
      ctx.reply('❌ Erro ao obter thumbnail.', { parse_mode: 'Markdown' });
    }
  });
};
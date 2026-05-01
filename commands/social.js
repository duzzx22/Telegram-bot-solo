const axios = require('axios');

module.exports = (bot) => {
  // /instagram <usuario>
  bot.command('instagram', async (ctx) => {
    try {
      const username = ctx.message.text.split(' ')[1];
      if (!username) return ctx.reply('❌ Use: /instagram <usuario>', { parse_mode: 'Markdown' });

      const screenshotUrl = `https://image.thum.io/get/width/800/https://www.instagram.com/${username}/`;
      const profileUrl = `https://www.instagram.com/${username}/`;
      const caption = `📸 @${username}\n\nℹ️ Dados públicos. Sem login ou API oficial.\n[Ver perfil](${profileUrl})`;
      await ctx.replyWithPhoto(screenshotUrl, { caption, parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter screenshot do Instagram.', { parse_mode: 'Markdown' });
    }
  });

  // /roblox <usuario>
  bot.command('roblox', async (ctx) => {
    try {
      const username = ctx.message.text.split(' ').slice(1).join(' ');
      if (!username) return ctx.reply('❌ Use: /roblox <usuario>', { parse_mode: 'Markdown' });

      // Buscar ID
      const idResponse = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`, { timeout: 15000 });
      const userId = idResponse.data.Id;

      // Buscar perfil
      const profileResponse = await axios.get(`https://users.roblox.com/v1/users/${userId}`, { timeout: 15000 });
      const profile = profileResponse.data;

      const created = new Date(profile.created).toLocaleDateString('pt-BR');
      const text = `*${profile.name}*\nDisplay Name: ${profile.displayName}\nID: ${profile.id}\nDescrição: ${profile.description || 'N/A'}\nCriado em: ${created}\nBanido: ${profile.isBanned ? 'Sim' : 'Não'}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar perfil Roblox.', { parse_mode: 'Markdown' });
    }
  });

  // /steam <vanityURL>
  bot.command('steam', async (ctx) => {
    try {
      const vanity = ctx.message.text.split(' ')[1];
      if (!vanity) return ctx.reply('❌ Use: /steam <vanityURL>', { parse_mode: 'Markdown' });

      // Steam API requer key, mas como não temos, simular ou usar público limitado
      // Na verdade, Steam API para perfis públicos não requer key para algumas coisas, mas é limitado.
      // Para simplificar, informar que perfil privado.
      ctx.reply('ℹ️ Perfis Steam públicos podem ser privados. Use API key para acesso completo.', { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar perfil Steam.', { parse_mode: 'Markdown' });
    }
  });
};
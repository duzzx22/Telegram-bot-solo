const axios = require('axios');

module.exports = (bot) => {
  // /btc
  bot.command('btc', async (ctx) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl&include_24hr_change=true', { timeout: 15000 });
      const data = response.data.bitcoin;
      const usd = data.usd;
      const brl = data.brl;
      const change = data.usd_24h_change;
      const arrow = change >= 0 ? '▲' : '▼';
      const text = `*Bitcoin (BTC)*\n💵 USD: $${usd.toFixed(2)}\n🇧🇷 BRL: R$${brl.toFixed(2)}\n${arrow} 24h: ${change.toFixed(2)}%`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter preço do Bitcoin.', { parse_mode: 'Markdown' });
    }
  });

  // /eth
  bot.command('eth', async (ctx) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,brl&include_24hr_change=true', { timeout: 15000 });
      const data = response.data.ethereum;
      const usd = data.usd;
      const brl = data.brl;
      const change = data.usd_24h_change;
      const arrow = change >= 0 ? '▲' : '▼';
      const text = `*Ethereum (ETH)*\n💵 USD: $${usd.toFixed(2)}\n🇧🇷 BRL: R$${brl.toFixed(2)}\n${arrow} 24h: ${change.toFixed(2)}%`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter preço do Ethereum.', { parse_mode: 'Markdown' });
    }
  });

  // /crypto <symbol>
  bot.command('crypto', async (ctx) => {
    try {
      const symbol = ctx.message.text.split(' ')[1]?.toLowerCase();
      if (!symbol) return ctx.reply('❌ Use: /crypto <symbol> (BTC, ETH, SOL, etc.)', { parse_mode: 'Markdown' });

      const ids = {
        btc: 'bitcoin',
        eth: 'ethereum',
        sol: 'solana',
        bnb: 'binancecoin',
        ada: 'cardano',
        doge: 'dogecoin',
        xrp: 'ripple',
        avax: 'avalanche-2',
        dot: 'polkadot',
        matic: 'matic-network'
      };
      const id = ids[symbol];
      if (!id) return ctx.reply('❌ Cripto não suportada.', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd,brl&include_24hr_change=true`, { timeout: 15000 });
      const data = response.data[id];
      const usd = data.usd;
      const brl = data.brl;
      const change = data.usd_24h_change;
      const arrow = change >= 0 ? '▲' : '▼';
      const text = `*${symbol.toUpperCase()}*\n💵 USD: $${usd.toFixed(2)}\n🇧🇷 BRL: R$${brl.toFixed(2)}\n${arrow} 24h: ${change.toFixed(2)}%`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter preço da cripto.', { parse_mode: 'Markdown' });
    }
  });

  // /dolar
  bot.command('dolar', async (ctx) => {
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL', { timeout: 15000 });
      const data = response.data.USDBRL;
      const compra = parseFloat(data.bid);
      const venda = parseFloat(data.ask);
      const variacao = parseFloat(data.pctChange);
      const arrow = variacao >= 0 ? '▲' : '▼';
      const text = `*Dólar (USD/BRL)*\n💵 Compra: R$${compra.toFixed(2)}\n💰 Venda: R$${venda.toFixed(2)}\n${arrow} Variação: ${variacao.toFixed(2)}%\n📅 ${data.create_date}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter cotação do dólar.', { parse_mode: 'Markdown' });
    }
  });

  // /euro
  bot.command('euro', async (ctx) => {
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/EUR-BRL', { timeout: 15000 });
      const data = response.data.EURBRL;
      const compra = parseFloat(data.bid);
      const venda = parseFloat(data.ask);
      const variacao = parseFloat(data.pctChange);
      const arrow = variacao >= 0 ? '▲' : '▼';
      const text = `*Euro (EUR/BRL)*\n💶 Compra: R$${compra.toFixed(2)}\n💰 Venda: R$${venda.toFixed(2)}\n${arrow} Variação: ${variacao.toFixed(2)}%\n📅 ${data.create_date}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao obter cotação do euro.', { parse_mode: 'Markdown' });
    }
  });
};
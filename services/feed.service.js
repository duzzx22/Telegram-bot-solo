const { v4: uuidv4 } = require('uuid');

class FeedService {
  constructor() {
    this.feeds = new Map(); // chatId => intervalId
    this.messages = [
      // Curiosidades
      "🧠 Sabia que o coração de um camarão está localizado na sua cabeça?",
      "🌍 A Terra é o único planeta conhecido que tem vida.",
      "🐙 Polvos têm três corações!",
      // Cotações (simuladas, pois /btc etc são comandos)
      "💰 Mantenha-se informado sobre criptomoedas com /btc e /eth!",
      // Piadas
      "Por que o computador foi ao médico? Porque estava com vírus! 😂",
      "O que o zero disse para o oito? Belo cinto! 😄"
      // Adicionar mais conforme necessário
    ];
  }

  startFeed(chatId, bot) {
    if (this.feeds.has(chatId)) {
      return "Feed já está ativo para este chat.";
    }
    const intervalId = setInterval(() => {
      const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
      bot.telegram.sendMessage(chatId, randomMessage, { parse_mode: 'Markdown' });
    }, 5 * 60 * 1000); // 5 minutos
    this.feeds.set(chatId, intervalId);
    return "Feed automático iniciado! Mensagens a cada 5 minutos.";
  }

  stopFeed(chatId) {
    if (this.feeds.has(chatId)) {
      clearInterval(this.feeds.get(chatId));
      this.feeds.delete(chatId);
      return "Feed parado com sucesso.";
    }
    return "Nenhum feed ativo para este chat.";
  }
}

module.exports = new FeedService();
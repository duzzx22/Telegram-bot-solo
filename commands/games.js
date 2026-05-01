module.exports = (bot) => {
  // /dado <NdN>
  bot.command('dado', (ctx) => {
    const input = ctx.message.text.split(' ')[1];
    if (!input || !/^\d+d\d+$/.test(input)) return ctx.reply('❌ Use: /dado <NdN> (ex: 2d6)', { parse_mode: 'Markdown' });

    const [n, d] = input.split('d').map(Number);
    if (n > 20 || d > 100) return ctx.reply('❌ Máximo 20 dados de 100 faces.', { parse_mode: 'Markdown' });

    let results = [];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const roll = Math.floor(Math.random() * d) + 1;
      results.push(roll);
      sum += roll;
    }
    const text = `🎲 Rolando ${n}d${d}: ${results.join(' + ')} = *${sum}*`;
    ctx.reply(text, { parse_mode: 'Markdown' });
  });

  // /moeda
  bot.command('moeda', (ctx) => {
    const result = Math.random() < 0.5 ? 'Cara' : 'Coroa';
    const emoji = result === 'Cara' ? '🪙' : '👑';
    ctx.reply(`${emoji} ${result}!`, { parse_mode: 'Markdown' });
  });

  // /8ball <pergunta>
  bot.command('8ball', (ctx) => {
    const pergunta = ctx.message.text.split(' ').slice(1).join(' ');
    if (!pergunta) return ctx.reply('❌ Use: /8ball <pergunta>', { parse_mode: 'Markdown' });

    const respostas = [
      'Com certeza!',
      'Não conte com isso.',
      'Pergunte mais tarde.',
      'Sim, definitivamente.',
      'Minha resposta é não.',
      'Você pode contar com isso.',
      'Melhor não te dizer agora.',
      'Perspectivas não tão boas.',
      'Sim.',
      'Concentre-se e pergunte novamente.',
      'Duvidoso.',
      'Sem dúvida.',
      'Minha fontes dizem não.',
      'Provavelmente.',
      'Não é possível prever agora.',
      'Muito duvidoso.',
      'Sinais apontam que sim.',
      'Resposta nebulosa, tente novamente.',
      'Pode apostar que sim.',
      'Não.'
    ];
    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    ctx.reply(`🎱 ${resposta}`, { parse_mode: 'Markdown' });
  });

  // /piada
  bot.command('piada', (ctx) => {
    const piadas = [
      'Por que o computador foi ao médico? Porque estava com vírus! 😂',
      'O que o zero disse para o oito? Belo cinto! 😄',
      'Por que o livro de matemática estava triste? Porque tinha muitos problemas! 📖',
      'O que é um fantasma que gosta de matemática? Um espírito geométrico! 👻',
      'Por que o tomate ficou vermelho? Porque viu a salada se vestindo! 🍅',
      'O que o pato disse para a pata? Vem quá! 🦆',
      'Por que o elefante não usa computador? Porque tem medo do mouse! 🐘',
      'O que é um vampiro que joga tênis? Drácula! 🧛',
      'Por que o café foi ao psicólogo? Porque estava ground! ☕',
      'O que o oceano disse para a praia? Nada, só acenou! 🌊',
      'Por que o esqueleto não brigou? Porque não tinha estômago para isso! 💀',
      'O que é um polvo inteligente? Um cefalópode! 🐙',
      'Por que o relógio foi ao terapeuta? Porque tinha ponteiros! 🕰️',
      'O que o pão disse para a manteiga? Você é minha metade! 🍞',
      'Por que o foguete não estuda? Porque já sabe lançar! 🚀',
      'O que é um urso sem dente? Um ursinho de pelúcia! 🧸',
      'Por que o leite foi ao espaço? Para se tornar leite cósmico! 🥛',
      'O que o zero disse para o um? Você é o meu herói! 0️⃣',
      'Por que o abacaxi não entra na festa? Porque é muito espinhoso! 🍍',
      'O que o sapo disse quando viu a mosca? Já era! 🐸',
      'Por que o computador foi à escola? Para melhorar seu byte! 💻',
      'O que é um cachorro mágico? Um labracadabrador! 🐶',
      'Por que o sol não usa óculos? Porque tem raios-X! ☀️',
      'O que o mel disse para a abelha? Você é o meu doce! 🍯',
      'Por que o trem elétrico foi ao médico? Porque estava com choques! 🚂',
      'O que é um peixe que joga piano? Um peixe-piano! 🐟',
      'Por que o livro de história estava sempre atrasado? Porque tinha muitas datas! 📚',
      'O que o vento disse para a árvore? Folhas à vista! 🌳',
      'Por que o bolo foi ao dentista? Porque tinha caries! 🍰',
      'O que é um gato que gosta de matemática? Um felino-métrico! 🐱'
    ];
    const piada = piadas[Math.floor(Math.random() * piadas.length)];
    ctx.reply(piada, { parse_mode: 'Markdown' });
  });

  // /curiosidade
  bot.command('curiosidade', (ctx) => {
    const curiosidades = [
      '🧠 O coração de um camarão está localizado na sua cabeça.',
      '🌍 A Terra é o único planeta conhecido que tem vida.',
      '🐙 Polvos têm três corações!',
      '🐝 Abelhas podem reconhecer rostos humanos.',
      '🌕 A Lua se afasta da Terra cerca de 4 cm por ano.',
      '🐌 Lesmas têm cerca de 25.000 dentes.',
      '🌊 O oceano Pacífico é maior que todos os continentes juntos.',
      '🦉 Corujas não conseguem mover os olhos, apenas a cabeça.',
      '🌈 Arco-íris podem ser vistos à noite durante chuvas.',
      '🐧 Pinguins podem saltar até 2 metros de altura.',
      '🌟 Estrelas cadentes são meteoros queimando na atmosfera.',
      '🐝 Abelhas dançam para comunicar localização de comida.',
      '🌍 A Antártida tem mais água doce que todos os rios do mundo.',
      '🐢 Tartarugas podem viver mais de 100 anos.',
      '🌞 O Sol produz mais energia em um segundo que toda a humanidade em um ano.',
      '🐙 Polvos têm um senso de humor e jogam objetos.',
      '🌊 Ondas sonoras viajam mais rápido na água que no ar.',
      '🦋 Borboletas provam com os pés.',
      '🌍 A Groenlândia tem mais icebergs que qualquer outro lugar.',
      '🐝 Abelhas visitam cerca de 5.000 flores por dia.',
      '🌕 A Lua é o mesmo tamanho que a Austrália.',
      '🐌 Lesmas dormem por até 3 anos.',
      '🌊 O oceano Atlântico produz 70% do oxigênio do mundo.',
      '🦉 Corujas têm asas silenciosas para caçar.',
      '🌈 Arco-íris são círculos completos, mas vemos apenas metade.',
      '🐧 Pinguins deslizam no gelo para economizar energia.',
      '🌟 Meteoros podem ser menores que um grão de areia.',
      '🐝 Abelhas têm 5 olhos: 2 compostos e 3 simples.',
      '🌍 A África tem 54 países.',
      '🐢 Tartarugas respiram pela cloaca.',
      '🌞 O Sol é 333.000 vezes maior que a Terra.'
    ];
    const curiosidade = curiosidades[Math.floor(Math.random() * curiosidades.length)];
    ctx.reply(curiosidade, { parse_mode: 'Markdown' });
  });

  // /quote
  bot.command('quote', (ctx) => {
    const quotes = [
      { text: 'A vida é o que acontece enquanto você está ocupado fazendo outros planos.', author: 'John Lennon' },
      { text: 'Seja a mudança que você deseja ver no mundo.', author: 'Mahatma Gandhi' },
      { text: 'O único modo de fazer um excelente trabalho é amar o que você faz.', author: 'Steve Jobs' },
      { text: 'Acredite que você pode e você já está no meio do caminho.', author: 'Theodore Roosevelt' },
      { text: 'O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.', author: 'Winston Churchill' },
      { text: 'A mente é tudo. Você se torna o que você pensa.', author: 'Buda' },
      { text: 'Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.', author: 'Charles Darwin' },
      { text: 'A felicidade não é algo pronto. Ela vem de suas próprias ações.', author: 'Dalai Lama' },
      { text: 'O futuro pertence àqueles que acreditam na beleza de seus sonhos.', author: 'Eleanor Roosevelt' },
      { text: 'A única maneira de fazer um grande trabalho é amar o que você faz.', author: 'Steve Jobs' },
      { text: 'Viva como se você fosse morrer amanhã. Aprenda como se você fosse viver para sempre.', author: 'Mahatma Gandhi' },
      { text: 'O pessimista vê dificuldade em cada oportunidade. O otimista vê oportunidade em cada dificuldade.', author: 'Winston Churchill' },
      { text: 'Não deixe que o barulho das opiniões dos outros abafe sua voz interior.', author: 'Steve Jobs' },
      { text: 'A melhor maneira de prever o futuro é criá-lo.', author: 'Peter Drucker' },
      { text: 'Você perde 100% das chances que você não aproveita.', author: 'Wayne Gretzky' },
      { text: 'O fracasso é uma oportunidade de recomeçar com mais inteligência.', author: 'Henry Ford' },
      { text: 'A vida é 10% do que acontece com você e 90% de como você reage a isso.', author: 'Charles R. Swindoll' },
      { text: 'Se você quer ir rápido, vá sozinho. Se você quer ir longe, vá acompanhado.', author: 'Provérbio Africano' },
      { text: 'A criatividade é a inteligência se divertindo.', author: 'Albert Einstein' },
      { text: 'O conhecimento fala, mas a sabedoria escuta.', author: 'Jimi Hendrix' },
      { text: 'A jornada de mil milhas começa com um único passo.', author: 'Lao Tzu' },
      { text: 'Não é sobre ter tempo, é sobre priorizar.', author: 'Provérbio' },
      { text: 'A persistência é o caminho do êxito.', author: 'Charles Chaplin' },
      { text: 'O que não te mata te fortalece.', author: 'Friedrich Nietzsche' },
      { text: 'A simplicidade é a sofisticação máxima.', author: 'Leonardo da Vinci' },
      { text: 'Tudo o que você sempre quis está do outro lado do medo.', author: 'George Addair' },
      { text: 'O amor é a força mais poderosa do mundo.', author: 'Provérbio' },
      { text: 'A gratidão transforma o que temos em suficiente.', author: 'Provérbio' },
      { text: 'O tempo é o fogo no qual nos queimamos.', author: 'Gene Roddenberry' },
      { text: 'A liberdade é o direito de dizer duas mais duas são quatro.', author: 'George Orwell' }
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    ctx.reply(`_"${quote.text}"_\n— ${quote.author}`, { parse_mode: 'Markdown' });
  });

  // /sorte
  bot.command('sorte', (ctx) => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    numbers.sort((a, b) => a - b);
    const emojis = ['🎱', '🎲', '⚽', '🏀', '🎯', '🎪'];
    const result = numbers.map((n, i) => `${emojis[i]} ${n}`).join(' ');
    ctx.reply(`Números da sorte: ${result}`, { parse_mode: 'Markdown' });
  });
};
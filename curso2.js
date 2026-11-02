// Unidades 7 a 12: fim do A1 e A2. Mesmo formato de curso.js; conteúdo original.
(function (C) {
  C.unidades.push(
    {
      id: 'u7', titulo: 'Agora mesmo', objetivo: 'Dizer o que está acontecendo neste momento', cor: 'teal',
      guia: [
        ['Presente contínuo', 'To be mais verbo com ing mostra o que acontece agora: I am working.'],
        ['Rotina ou agora', 'I work é hábito. I am working é neste momento. O português aceita "trabalho" nos dois casos; o inglês não.'],
        ['Now', 'Now significa agora e costuma ficar no fim da frase.']
      ],
      licoes: [
        { id: 'u7l1', titulo: 'Neste momento',
          palavras: [['now', 'agora', 'relogio'], ['working', 'trabalhando'], ['studying', 'estudando', 'livro'], ['eating', 'comendo', 'pao'], ['sleeping', 'dormindo', 'lua'], ['waiting', 'esperando']],
          frases: [
            { en: 'I am working now.', pt: 'Eu estou trabalhando agora.', alt: ["I'm working now."], ptAlt: ['Estou trabalhando agora.'], dica: 'Para o que acontece agora, use to be mais ing: I am working, não I work.' },
            { en: 'She is studying now.', pt: 'Ela está estudando agora.', alt: ["She's studying now."] },
            { en: 'We are eating.', pt: 'Nós estamos comendo.', alt: ["We're eating."], ptAlt: ['Estamos comendo.'] },
            { en: 'The baby is sleeping.', pt: 'O bebê está dormindo.', alt: ["The baby's sleeping."] },
            { en: 'They are waiting here.', pt: 'Eles estão esperando aqui.', alt: ["They're waiting here."], ptAlt: ['Elas estão esperando aqui.'] }
          ] },
        { id: 'u7l2', titulo: 'O que você está fazendo?',
          palavras: [['doing', 'fazendo'], ['reading', 'lendo', 'livro'], ['cooking', 'cozinhando'], ['driving', 'dirigindo', 'carro'], ['listening', 'ouvindo', 'musica'], ['calling', 'ligando']],
          frases: [
            { en: 'What are you doing?', pt: 'O que você está fazendo?', dica: 'Na pergunta, are vem antes de you.' },
            { en: 'I am reading a book.', pt: 'Eu estou lendo um livro.', alt: ["I'm reading a book."], ptAlt: ['Estou lendo um livro.'] },
            { en: 'He is driving to work.', pt: 'Ele está dirigindo para o trabalho.', alt: ["He's driving to work."], dica: 'Verbo terminado em e perde o e antes de ing: drive, driving.' },
            { en: 'I am listening to music.', pt: 'Eu estou ouvindo música.', alt: ["I'm listening to music."], ptAlt: ['Estou ouvindo música.'], dica: 'Listen pede to: listen to music.' },
            { en: 'Are you cooking?', pt: 'Você está cozinhando?' }
          ] },
        { id: 'u7l3', titulo: 'Hoje não',
          palavras: [['not', 'não'], ['raining', 'chovendo'], ['sunny', 'ensolarado', 'sol'], ['hot', 'quente', 'sol'], ['cold', 'frio'], ['weather', 'tempo']],
          frases: [
            { en: 'I am not working today.', pt: 'Eu não estou trabalhando hoje.', alt: ["I'm not working today."], ptAlt: ['Não estou trabalhando hoje.'] },
            { en: 'It is raining.', pt: 'Está chovendo.', alt: ["It's raining."], dica: 'Fenômenos do tempo usam it como sujeito: it is raining.' },
            { en: 'It is not cold today.', pt: 'Não está frio hoje.', alt: ["It's not cold today.", "It isn't cold today."], ptAlt: ['Hoje não está frio.'] },
            { en: 'It is hot in Fortaleza.', pt: 'Está quente em Fortaleza.', alt: ["It's hot in Fortaleza."], ptAlt: ['Faz calor em Fortaleza.'] },
            { en: 'How is the weather?', pt: 'Como está o tempo?', alt: ["How's the weather?"], dica: 'Weather é o clima do dia. Time é hora ou tempo no relógio.' }
          ] }
      ],
      historia: 'h7'
    },
    {
      id: 'u8', titulo: 'Compras', objetivo: 'Comprar, perguntar preço e pagar', cor: 'magenta',
      guia: [
        ['This e that', 'This aponta para o que está perto; that, para o que está longe. No plural viram these e those.'],
        ['Preço', 'How much is it serve para uma coisa. How much are they serve para várias.'],
        ['Comparação', 'Palavra curta recebe er: cheaper. Palavra longa usa more: more expensive.']
      ],
      licoes: [
        { id: 'u8l1', titulo: 'Na loja',
          palavras: [['store', 'loja', 'predio'], ['shirt', 'camisa'], ['shoes', 'sapatos'], ['buy', 'comprar'], ['want', 'querer'], ['size', 'tamanho']],
          frases: [
            { en: 'I want to buy a shirt.', pt: 'Eu quero comprar uma camisa.', ptAlt: ['Quero comprar uma camisa.'], dica: 'Want vem seguido de to quando há outro verbo: want to buy.' },
            { en: 'This shirt is small.', pt: 'Esta camisa é pequena.', ptAlt: ['Essa camisa é pequena.', 'Esta camisa está pequena.', 'Essa camisa está pequena.'] },
            { en: 'These shoes are new.', pt: 'Estes sapatos são novos.', ptAlt: ['Esses sapatos são novos.'], dica: 'These é o plural de this.' },
            { en: 'What size do you need?', pt: 'De que tamanho você precisa?', ptAlt: ['Qual tamanho você precisa?', 'Que tamanho você precisa?'] },
            { en: 'The store is closed today.', pt: 'A loja está fechada hoje.' }
          ] },
        { id: 'u8l2', titulo: 'Quanto custa',
          palavras: [['price', 'preço'], ['expensive', 'caro'], ['cheap', 'barato'], ['dollars', 'dólares'], ['cost', 'custar'], ['money', 'dinheiro', 'moeda']],
          frases: [
            { en: 'How much is this bag?', pt: 'Quanto custa esta bolsa?', ptAlt: ['Quanto custa essa bolsa?', 'Quanto é esta bolsa?', 'Quanto é essa bolsa?'] },
            { en: 'How much are these shoes?', pt: 'Quanto custam estes sapatos?', ptAlt: ['Quanto custam esses sapatos?'] },
            { en: 'It costs ten dollars.', pt: 'Custa dez dólares.', dica: 'It costs recebe s por causa de it.' },
            { en: 'That is too expensive.', pt: 'Isso é caro demais.', alt: ["That's too expensive."], ptAlt: ['Isso está caro demais.', 'Isso é muito caro.', 'Isso está muito caro.'], dica: 'Too indica excesso. Very apenas reforça, sem dizer que passou do limite.' },
            { en: 'This one is cheaper.', pt: 'Este é mais barato.', ptAlt: ['Esse é mais barato.', 'Esta é mais barata.', 'Essa é mais barata.'], dica: 'Cheaper já significa "mais barato". Não use more cheaper.' }
          ] },
        { id: 'u8l3', titulo: 'No caixa',
          palavras: [['pay', 'pagar'], ['card', 'cartão'], ['cash', 'dinheiro vivo'], ['receipt', 'recibo'], ['change', 'troco'], ['sale', 'liquidação']],
          frases: [
            { en: 'Can I pay by card?', pt: 'Posso pagar com cartão?', ptAlt: ['Posso pagar no cartão?'], dica: 'Pagar com cartão é pay by card; em dinheiro, pay in cash.' },
            { en: 'I will pay in cash.', pt: 'Vou pagar em dinheiro.', alt: ["I'll pay in cash."], ptAlt: ['Eu vou pagar em dinheiro.', 'Pagarei em dinheiro.'] },
            { en: 'Here is your change.', pt: 'Aqui está o seu troco.', alt: ["Here's your change."], ptAlt: ['Aqui está seu troco.'] },
            { en: 'Can I have the receipt, please?', pt: 'Pode me dar o recibo, por favor?', ptAlt: ['Posso pegar o recibo, por favor?', 'Me dá o recibo, por favor?'], dica: 'Receipt se pronuncia sem o p: re-CEET.' },
            { en: 'Everything is on sale.', pt: 'Tudo está em liquidação.', ptAlt: ['Está tudo em liquidação.'], dica: 'On sale é em liquidação. For sale significa à venda.' }
          ] }
      ],
      historia: 'h8'
    },
    {
      id: 'u9', titulo: 'Ontem', objetivo: 'Contar o que já aconteceu', cor: 'coral',
      guia: [
        ['Passado com ed', 'Verbos regulares recebem ed: work, worked. O ed de worked não vira sílaba extra: fala-se "workt".'],
        ['Was e were', 'I, he, she e it usam was. You, we e they usam were.'],
        ['Did', 'Negativa e pergunta usam did, e o verbo volta à forma básica: I did not work, did you work.']
      ],
      licoes: [
        { id: 'u9l1', titulo: 'Onde eu estava',
          palavras: [['yesterday', 'ontem'], ['was', 'estava'], ['were', 'estavam'], ['last night', 'ontem à noite', 'lua'], ['tired', 'cansado'], ['busy', 'ocupado']],
          frases: [
            { en: 'I was tired yesterday.', pt: 'Eu estava cansado ontem.', ptAlt: ['Eu estava cansada ontem.', 'Estava cansado ontem.', 'Estava cansada ontem.'] },
            { en: 'She was at home last night.', pt: 'Ela estava em casa ontem à noite.' },
            { en: 'We were very busy.', pt: 'Nós estávamos muito ocupados.', ptAlt: ['Estávamos muito ocupados.', 'Nós estávamos muito ocupadas.', 'Estávamos muito ocupadas.'] },
            { en: 'Where were you yesterday?', pt: 'Onde você estava ontem?', dica: 'You usa were, mesmo falando com uma pessoa só.' },
            { en: 'It was not my fault.', pt: 'Não foi culpa minha.', alt: ["It wasn't my fault."], ptAlt: ['Não foi minha culpa.', 'A culpa não foi minha.'] }
          ] },
        { id: 'u9l2', titulo: 'O que eu fiz',
          palavras: [['worked', 'trabalhei'], ['studied', 'estudei', 'livro'], ['watched', 'assisti'], ['called', 'liguei'], ['visited', 'visitei'], ['movie', 'filme']],
          frases: [
            { en: 'I worked yesterday.', pt: 'Eu trabalhei ontem.', ptAlt: ['Trabalhei ontem.'] },
            { en: 'We watched a movie last night.', pt: 'Nós assistimos a um filme ontem à noite.', ptAlt: ['Assistimos a um filme ontem à noite.', 'Nós assistimos um filme ontem à noite.', 'Assistimos um filme ontem à noite.'], dica: 'Watched soa "wotcht", com uma sílaba só.' },
            { en: 'She called her mother.', pt: 'Ela ligou para a mãe dela.', ptAlt: ['Ela ligou para a mãe.', 'Ela ligou para sua mãe.'] },
            { en: 'He studied English last year.', pt: 'Ele estudou inglês no ano passado.', ptAlt: ['Ele estudou inglês ano passado.'] },
            { en: 'They visited my family.', pt: 'Eles visitaram a minha família.', ptAlt: ['Elas visitaram a minha família.', 'Eles visitaram minha família.', 'Elas visitaram minha família.'] }
          ] },
        { id: 'u9l3', titulo: 'Verbos irregulares',
          palavras: [['went', 'fui'], ['ate', 'comi', 'maca'], ['had', 'tive'], ['saw', 'vi'], ['did', 'fiz'], ['bought', 'comprei']],
          frases: [
            { en: 'I went to the beach.', pt: 'Eu fui à praia.', ptAlt: ['Fui à praia.', 'Eu fui para a praia.', 'Fui para a praia.'], dica: 'Go é irregular: no passado vira went, sem ed.' },
            { en: 'She bought a new car.', pt: 'Ela comprou um carro novo.' },
            { en: 'We had a good time.', pt: 'Nós nos divertimos.', ptAlt: ['Nos divertimos.', 'Nós nos divertimos muito.'], dica: 'Have a good time significa divertir-se. Não tem nada a ver com hora.' },
            { en: 'I did not see the message.', pt: 'Eu não vi a mensagem.', alt: ["I didn't see the message."], ptAlt: ['Não vi a mensagem.'], dica: 'Depois de did not o verbo fica na forma básica: see, não saw.' },
            { en: 'Did you eat today?', pt: 'Você comeu hoje?', dica: 'Pergunta no passado começa com did, e eat não muda.' }
          ] }
      ],
      historia: 'h9'
    },
    {
      id: 'u10', titulo: 'Planos', objetivo: 'Falar do futuro, convidar e combinar', cor: 'azul',
      guia: [
        ['Going to', 'Use para planos já decididos: I am going to travel.'],
        ['Will', 'Use para decisão na hora e promessa: I will call you.'],
        ['Convite', 'Would you like to é um convite educado. Want to é mais informal, entre amigos.']
      ],
      licoes: [
        { id: 'u10l1', titulo: 'Meus planos',
          palavras: [['next', 'próximo'], ['travel', 'viajar', 'aviao'], ['month', 'mês'], ['year', 'ano'], ['weekend', 'fim de semana'], ['plan', 'plano']],
          frases: [
            { en: 'I am going to travel next month.', pt: 'Eu vou viajar no mês que vem.', alt: ["I'm going to travel next month."], ptAlt: ['Vou viajar no mês que vem.', 'Eu vou viajar no próximo mês.', 'Vou viajar no próximo mês.'] },
            { en: 'What are you going to do this weekend?', pt: 'O que você vai fazer neste fim de semana?', ptAlt: ['O que você vai fazer nesse fim de semana?', 'O que você vai fazer este fim de semana?'] },
            { en: 'She is going to study tonight.', pt: 'Ela vai estudar hoje à noite.', alt: ["She's going to study tonight."] },
            { en: 'We are not going to work tomorrow.', pt: 'Nós não vamos trabalhar amanhã.', alt: ["We're not going to work tomorrow.", "We aren't going to work tomorrow."], ptAlt: ['Não vamos trabalhar amanhã.'] },
            { en: 'I have a plan for next year.', pt: 'Eu tenho um plano para o ano que vem.', ptAlt: ['Tenho um plano para o ano que vem.', 'Eu tenho um plano para o próximo ano.', 'Tenho um plano para o próximo ano.'] }
          ] },
        { id: 'u10l2', titulo: 'Eu prometo',
          palavras: [['will', 'vou'], ['help', 'ajudar'], ['later', 'mais tarde'], ['soon', 'em breve'], ['promise', 'prometo'], ['maybe', 'talvez']],
          frases: [
            { en: 'I will call you later.', pt: 'Eu ligo para você mais tarde.', alt: ["I'll call you later."], ptAlt: ['Ligo para você mais tarde.', 'Vou ligar para você mais tarde.', 'Eu vou ligar para você mais tarde.', 'Eu te ligo mais tarde.', 'Te ligo mais tarde.'] },
            { en: 'I will help you.', pt: 'Eu vou ajudar você.', alt: ["I'll help you."], ptAlt: ['Vou ajudar você.', 'Eu ajudo você.', 'Eu te ajudo.', 'Vou te ajudar.'] },
            { en: 'See you soon!', pt: 'Até breve!', ptAlt: ['Até logo!'] },
            { en: 'Maybe I will go.', pt: 'Talvez eu vá.', alt: ["Maybe I'll go."] },
            { en: 'I promise.', pt: 'Eu prometo.', ptAlt: ['Prometo.'] }
          ] },
        { id: 'u10l3', titulo: 'Combinando',
          palavras: [['party', 'festa', 'musica'], ['free', 'livre'], ['together', 'juntos'], ['come', 'vir'], ['invite', 'convidar'], ['sure', 'claro']],
          frases: [
            { en: 'Would you like to come?', pt: 'Você gostaria de vir?', dica: 'Would you like to é um convite educado.' },
            { en: 'Are you free on Saturday?', pt: 'Você está livre no sábado?', dica: 'Free aqui significa disponível. Também pode significar grátis.' },
            { en: 'Sure, I would love to.', pt: 'Claro, eu adoraria.', alt: ["Sure, I'd love to."], ptAlt: ['Claro, adoraria.'] },
            { en: "Let's go together.", pt: 'Vamos juntos.', alt: ['Let us go together.'], ptAlt: ['Vamos juntas.'], dica: "Let's é a forma curta de let us e é a que se usa para convidar." },
            { en: "Sorry, I can't go to the party.", pt: 'Desculpe, eu não posso ir à festa.', alt: ['Sorry, I cannot go to the party.'], ptAlt: ['Desculpe, não posso ir à festa.', 'Desculpa, não posso ir à festa.', 'Desculpa, eu não posso ir à festa.'] }
          ] }
      ],
      historia: 'h10'
    },
    {
      id: 'u11', titulo: 'No trabalho', objetivo: 'Reuniões, e-mails e pedidos no escritório', cor: 'indigo',
      guia: [
        ['Pedido educado', 'Could you é a forma educada de pedir algo: could you send me the file?'],
        ['Falsos cognatos', 'Actually é "na verdade". Eventually é "com o tempo". Assist é ajudar; assistir a um filme é watch.'],
        ['Meeting', 'Have a meeting é ter uma reunião. Não se diz make a meeting.']
      ],
      licoes: [
        { id: 'u11l1', titulo: 'Escritório',
          palavras: [['office', 'escritório', 'predio'], ['boss', 'chefe'], ['meeting', 'reunião'], ['job', 'emprego'], ['company', 'empresa'], ['coworker', 'colega de trabalho']],
          frases: [
            { en: 'I have a meeting at ten.', pt: 'Eu tenho uma reunião às dez.', ptAlt: ['Tenho uma reunião às dez.'], dica: 'Diga have a meeting, não make a meeting.' },
            { en: 'My boss is in the office.', pt: 'Meu chefe está no escritório.', ptAlt: ['Minha chefe está no escritório.', 'O meu chefe está no escritório.', 'A minha chefe está no escritório.'] },
            { en: 'I work for a small company.', pt: 'Eu trabalho para uma empresa pequena.', ptAlt: ['Trabalho para uma empresa pequena.', 'Eu trabalho em uma empresa pequena.', 'Trabalho em uma empresa pequena.', 'Eu trabalho numa empresa pequena.', 'Trabalho numa empresa pequena.'] },
            { en: 'She has a new job.', pt: 'Ela tem um emprego novo.', ptAlt: ['Ela tem um novo emprego.'] },
            { en: 'Actually, the meeting is tomorrow.', pt: 'Na verdade, a reunião é amanhã.', dica: 'Falso cognato: actually é "na verdade". Atualmente é currently.' }
          ] },
        { id: 'u11l2', titulo: 'E-mails e pedidos',
          palavras: [['email', 'e-mail'], ['send', 'enviar'], ['file', 'arquivo'], ['could', 'poderia'], ['attached', 'em anexo'], ['question', 'pergunta']],
          frases: [
            { en: 'Could you send me the file?', pt: 'Você poderia me enviar o arquivo?', ptAlt: ['Poderia me enviar o arquivo?', 'Você pode me enviar o arquivo?', 'Pode me enviar o arquivo?'], dica: 'Could you é mais educado que can you.' },
            { en: 'The file is attached.', pt: 'O arquivo está em anexo.', ptAlt: ['O arquivo está anexado.', 'O arquivo segue em anexo.'] },
            { en: 'I have a question.', pt: 'Eu tenho uma pergunta.', ptAlt: ['Tenho uma pergunta.'] },
            { en: 'I will send the email today.', pt: 'Eu vou enviar o e-mail hoje.', alt: ["I'll send the email today."], ptAlt: ['Vou enviar o e-mail hoje.', 'Eu envio o e-mail hoje.', 'Envio o e-mail hoje.'] },
            { en: 'Could you help me, please?', pt: 'Você poderia me ajudar, por favor?', ptAlt: ['Poderia me ajudar, por favor?', 'Você pode me ajudar, por favor?', 'Pode me ajudar, por favor?'] }
          ] },
        { id: 'u11l3', titulo: 'Prazos',
          palavras: [['deadline', 'prazo'], ['late', 'atrasado'], ['early', 'cedo'], ['finish', 'terminar'], ['ready', 'pronto'], ['schedule', 'agenda']],
          frases: [
            { en: 'The deadline is on Friday.', pt: 'O prazo é na sexta-feira.', ptAlt: ['O prazo é na sexta.', 'O prazo vence na sexta-feira.', 'O prazo vence na sexta.'] },
            { en: 'Sorry, I am late.', pt: 'Desculpe, estou atrasado.', alt: ["Sorry, I'm late."], ptAlt: ['Desculpe, estou atrasada.', 'Desculpa, estou atrasado.', 'Desculpa, estou atrasada.', 'Desculpe, eu estou atrasado.', 'Desculpe, eu estou atrasada.'] },
            { en: 'Is the report ready?', pt: 'O relatório está pronto?' },
            { en: 'I need to finish this today.', pt: 'Eu preciso terminar isto hoje.', ptAlt: ['Preciso terminar isto hoje.', 'Eu preciso terminar isso hoje.', 'Preciso terminar isso hoje.'], dica: 'Need vem seguido de to quando há outro verbo.' },
            { en: 'I arrived early.', pt: 'Eu cheguei cedo.', ptAlt: ['Cheguei cedo.'] }
          ] }
      ],
      historia: 'h11'
    },
    {
      id: 'u12', titulo: 'Saúde e imprevistos', objetivo: 'Explicar um problema e pedir ajuda', cor: 'ambar',
      guia: [
        ['Dor', 'Headache é dor de cabeça; stomachache, dor de barriga. Para o resto, use my back hurts.'],
        ['Have para sintomas', 'Sintomas usam have, com artigo: I have a fever, I have a cold.'],
        ['Should', 'Should dá conselho: you should rest. O verbo seguinte não leva to.']
      ],
      licoes: [
        { id: 'u12l1', titulo: 'Como me sinto',
          palavras: [['sick', 'doente'], ['headache', 'dor de cabeça'], ['fever', 'febre'], ['hurts', 'dói'], ['feel', 'sentir'], ['better', 'melhor']],
          frases: [
            { en: 'I feel sick.', pt: 'Eu me sinto mal.', ptAlt: ['Me sinto mal.', 'Estou me sentindo mal.', 'Eu estou me sentindo mal.', 'Estou passando mal.'] },
            { en: 'I have a headache.', pt: 'Eu estou com dor de cabeça.', ptAlt: ['Estou com dor de cabeça.', 'Eu tenho dor de cabeça.', 'Tenho dor de cabeça.'], dica: 'Sintomas usam have com artigo: I have a headache.' },
            { en: 'She has a fever.', pt: 'Ela está com febre.', ptAlt: ['Ela tem febre.'] },
            { en: 'My back hurts.', pt: 'Minhas costas doem.', ptAlt: ['Estou com dor nas costas.', 'Minha coluna dói.'], dica: 'Back está no singular em inglês, por isso hurts tem s.' },
            { en: 'I feel better today.', pt: 'Eu me sinto melhor hoje.', ptAlt: ['Me sinto melhor hoje.', 'Estou me sentindo melhor hoje.', 'Eu estou me sentindo melhor hoje.'] }
          ] },
        { id: 'u12l2', titulo: 'Na farmácia',
          palavras: [['pharmacy', 'farmácia', 'cruz'], ['medicine', 'remédio', 'cruz'], ['should', 'deveria'], ['rest', 'descansar'], ['appointment', 'consulta'], ['hospital', 'hospital', 'cruz']],
          frases: [
            { en: 'I need some medicine.', pt: 'Eu preciso de um remédio.', ptAlt: ['Preciso de um remédio.', 'Eu preciso de remédio.', 'Preciso de remédio.'] },
            { en: 'You should rest.', pt: 'Você deveria descansar.', ptAlt: ['Você devia descansar.', 'Você deve descansar.'], dica: 'Depois de should o verbo vem direto, sem to.' },
            { en: 'Where is the pharmacy?', pt: 'Onde fica a farmácia?', alt: ["Where's the pharmacy?"], ptAlt: ['Onde é a farmácia?', 'Onde está a farmácia?'] },
            { en: 'I have an appointment at three.', pt: 'Eu tenho uma consulta às três.', ptAlt: ['Tenho uma consulta às três.'], dica: 'Appointment é hora marcada. A palavra não significa apontamento.' },
            { en: 'He is at the hospital.', pt: 'Ele está no hospital.', alt: ["He's at the hospital."] }
          ] },
        { id: 'u12l3', titulo: 'Deu problema',
          palavras: [['problem', 'problema'], ['lost', 'perdi', 'chave'], ['broken', 'quebrado'], ['wallet', 'carteira'], ['police', 'polícia'], ['understand', 'entender']],
          frases: [
            { en: 'I lost my wallet.', pt: 'Eu perdi a minha carteira.', ptAlt: ['Perdi a minha carteira.', 'Eu perdi minha carteira.', 'Perdi minha carteira.'] },
            { en: 'My phone is broken.', pt: 'Meu celular está quebrado.', ptAlt: ['O meu celular está quebrado.', 'Meu telefone está quebrado.', 'O meu telefone está quebrado.'] },
            { en: 'I do not understand.', pt: 'Eu não entendo.', alt: ["I don't understand."], ptAlt: ['Não entendo.', 'Eu não entendi.', 'Não entendi.'] },
            { en: 'Could you speak more slowly?', pt: 'Você poderia falar mais devagar?', ptAlt: ['Poderia falar mais devagar?', 'Pode falar mais devagar?', 'Você pode falar mais devagar?'] },
            { en: 'Can you call the police?', pt: 'Você pode chamar a polícia?', ptAlt: ['Pode chamar a polícia?', 'Você pode ligar para a polícia?', 'Pode ligar para a polícia?'] }
          ] }
      ],
      historia: 'h12'
    }
  );

  Object.assign(C.historias, {
    h7: { titulo: 'Ligação na chuva', linhas: [
      { quem: 'Nina', en: 'Hi, Leo! What are you doing?', pt: 'Oi, Leo! O que você está fazendo?' },
      { quem: 'Leo', en: 'I am waiting for the bus. It is raining.', pt: 'Estou esperando o ônibus. Está chovendo.',
        q: { p: 'O que Leo está fazendo?', o: ['Dirigindo', 'Esperando o ônibus', 'Cozinhando'], c: 1 } },
      { quem: 'Nina', en: 'Here it is sunny and hot!', pt: 'Aqui está ensolarado e quente!' },
      { quem: 'Leo', en: 'Are you working today?', pt: 'Você está trabalhando hoje?' },
      { quem: 'Nina', en: 'No. I am reading a book at the beach.', pt: 'Não. Estou lendo um livro na praia.',
        q: { p: 'Onde Nina está?', o: ['No escritório', 'Em casa', 'Na praia'], c: 2 } }
    ] },
    h8: { titulo: 'A camisa cara', linhas: [
      { quem: 'Vendedor', en: 'Good afternoon! Can I help you?', pt: 'Boa tarde! Posso ajudar?' },
      { quem: 'Sofia', en: 'Yes. How much is this shirt?', pt: 'Sim. Quanto custa esta camisa?' },
      { quem: 'Vendedor', en: 'It costs eighty dollars.', pt: 'Custa oitenta dólares.' },
      { quem: 'Sofia', en: 'That is too expensive! Is that one cheaper?', pt: 'É caro demais! Aquela é mais barata?',
        q: { p: 'O que Sofia acha do preço?', o: ['Justo', 'Caro demais', 'Barato'], c: 1 } },
      { quem: 'Vendedor', en: 'Yes, it is on sale. Twenty dollars.', pt: 'Sim, está em liquidação. Vinte dólares.' },
      { quem: 'Sofia', en: 'Great! Can I pay by card?', pt: 'Ótimo! Posso pagar com cartão?',
        q: { p: 'Quanto custa a segunda camisa?', o: ['Dez dólares', 'Vinte dólares', 'Oitenta dólares'], c: 1 } }
    ] },
    h9: { titulo: 'Segunda-feira cansada', linhas: [
      { quem: 'Ana', en: 'You look tired. What did you do yesterday?', pt: 'Você parece cansado. O que você fez ontem?' },
      { quem: 'Beto', en: 'I went to the beach and I watched a movie.', pt: 'Fui à praia e assisti a um filme.',
        q: { p: 'Onde Beto foi ontem?', o: ['À praia', 'Ao hospital', 'À loja'], c: 0 } },
      { quem: 'Ana', en: 'Did you sleep well?', pt: 'Você dormiu bem?' },
      { quem: 'Beto', en: 'No. The movie was very long.', pt: 'Não. O filme era muito longo.' },
      { quem: 'Ana', en: 'I had a good weekend too. I visited my family.', pt: 'Eu também tive um bom fim de semana. Visitei minha família.',
        q: { p: 'O que Ana fez no fim de semana?', o: ['Trabalhou', 'Visitou a família', 'Comprou um carro'], c: 1 } }
    ] },
    h10: { titulo: 'O convite', linhas: [
      { quem: 'Duda', en: 'Are you free on Saturday?', pt: 'Você está livre no sábado?' },
      { quem: 'Enzo', en: 'I think so. Why?', pt: 'Acho que sim. Por quê?' },
      { quem: 'Duda', en: 'I am going to have a party. Would you like to come?', pt: 'Vou dar uma festa. Você gostaria de vir?',
        q: { p: 'O que Duda vai fazer no sábado?', o: ['Viajar', 'Dar uma festa', 'Trabalhar'], c: 1 } },
      { quem: 'Enzo', en: 'Sure, I would love to! I will bring some juice.', pt: 'Claro, eu adoraria! Vou levar um pouco de suco.' },
      { quem: 'Duda', en: 'Great. See you soon!', pt: 'Ótimo. Até breve!',
        q: { p: 'O que Enzo promete levar?', o: ['Música', 'Suco', 'Pão'], c: 1 } }
    ] },
    h11: { titulo: 'O relatório', linhas: [
      { quem: 'Paula', en: 'Is the report ready? The deadline is today.', pt: 'O relatório está pronto? O prazo é hoje.' },
      { quem: 'Marcos', en: 'Actually, I need one more hour.', pt: 'Na verdade, preciso de mais uma hora.',
        q: { p: 'De quanto tempo Marcos precisa?', o: ['Mais uma hora', 'Mais um dia', 'Mais uma semana'], c: 0 } },
      { quem: 'Paula', en: 'OK. Could you send me the file at two?', pt: 'Certo. Você poderia me enviar o arquivo às duas?' },
      { quem: 'Marcos', en: 'Sure. I will send the email before the meeting.', pt: 'Claro. Vou enviar o e-mail antes da reunião.',
        q: { p: 'Quando Marcos vai enviar o e-mail?', o: ['Amanhã', 'Antes da reunião', 'Na sexta-feira'], c: 1 } }
    ] },
    h12: { titulo: 'Sem carteira', linhas: [
      { quem: 'Turista', en: 'Excuse me, can you help me? I lost my wallet.', pt: 'Com licença, pode me ajudar? Perdi minha carteira.' },
      { quem: 'Guarda', en: 'Where were you this morning?', pt: 'Onde você estava hoje de manhã?' },
      { quem: 'Turista', en: 'Sorry, I do not understand. Could you speak more slowly?', pt: 'Desculpe, não entendo. Poderia falar mais devagar?',
        q: { p: 'O que a turista pede ao guarda?', o: ['Dinheiro', 'Que fale mais devagar', 'Um remédio'], c: 1 } },
      { quem: 'Guarda', en: 'Where... were... you?', pt: 'Onde... você... estava?' },
      { quem: 'Turista', en: 'At the pharmacy. I had a headache.', pt: 'Na farmácia. Eu estava com dor de cabeça.' },
      { quem: 'Guarda', en: 'Look, the pharmacy called. They have your wallet!', pt: 'Olha, a farmácia ligou. Sua carteira está com eles!',
        q: { p: 'Onde estava a carteira?', o: ['No hotel', 'Na farmácia', 'No ônibus'], c: 1 } }
    ] }
  });
})(window.CURSO);

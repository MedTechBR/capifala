// Conteúdo original do curso de inglês para brasileiros (A1).
// Palavra: [inglês, português, ícone opcional]. Frase: en, pt, alt (aceitas em inglês), ptAlt (aceitas em português), dica.
window.CURSO = {
  unidades: [
    {
      id: 'u1', titulo: 'Primeiro contato', objetivo: 'Cumprimentar, agradecer e se despedir', cor: 'coral',
      guia: [
        ['Hi e hello', 'Os dois significam "oi" ou "olá". Hi é mais informal; hello serve em qualquer situação.'],
        ['Good morning', 'Vale até o meio-dia. Depois vem good afternoon e, à noite, good evening. Good night é só para despedida ou hora de dormir.'],
        ['Please e thank you', 'Please é "por favor". Thank you é "obrigado" ou "obrigada", sem mudar por gênero.']
      ],
      licoes: [
        { id: 'u1l1', titulo: 'Cumprimentos',
          palavras: [['hello', 'olá'], ['hi', 'oi'], ['good', 'bom'], ['morning', 'manhã', 'sol'], ['night', 'noite', 'lua'], ['bye', 'tchau']],
          frases: [
            { en: 'Hello, Anna!', pt: 'Olá, Anna!', ptAlt: ['Oi, Anna!'] },
            { en: 'Hi, Pedro!', pt: 'Oi, Pedro!', ptAlt: ['Olá, Pedro!'] },
            { en: 'Good morning!', pt: 'Bom dia!', dica: 'Morning é manhã, mas good morning se traduz como "bom dia".' },
            { en: 'Good night!', pt: 'Boa noite!', dica: 'Good night é usado ao se despedir à noite. Ao chegar, diga good evening.' },
            { en: 'Bye, Anna!', pt: 'Tchau, Anna!' }
          ] },
        { id: 'u1l2', titulo: 'Educação',
          palavras: [['please', 'por favor'], ['thank you', 'obrigado'], ['sorry', 'desculpa'], ['yes', 'sim'], ['no', 'não'], ['welcome', 'bem-vindo']],
          frases: [
            { en: 'Thank you, Pedro!', pt: 'Obrigado, Pedro!', ptAlt: ['Obrigada, Pedro!'] },
            { en: 'Yes, please.', pt: 'Sim, por favor.' },
            { en: 'No, thank you.', pt: 'Não, obrigado.', ptAlt: ['Não, obrigada.'] },
            { en: 'Sorry, Anna.', pt: 'Desculpa, Anna.', ptAlt: ['Desculpe, Anna.'] },
            { en: 'You are welcome.', pt: 'De nada.', alt: ["You're welcome."], dica: 'A resposta a thank you é you are welcome. Ao pé da letra seria "você é bem-vindo".' }
          ] },
        { id: 'u1l3', titulo: 'Como vai?',
          palavras: [['how', 'como'], ['are', 'está'], ['you', 'você'], ['fine', 'bem'], ['and', 'e'], ['today', 'hoje']],
          frases: [
            { en: 'How are you?', pt: 'Como você está?', ptAlt: ['Como vai você?', 'Como vai?', 'Como está?', 'Tudo bem?'], dica: 'Em inglês o verbo vem antes de you nas perguntas: how are you, nunca how you are.' },
            { en: 'I am fine.', pt: 'Eu estou bem.', alt: ["I'm fine."], ptAlt: ['Estou bem.'] },
            { en: 'I am fine, thank you.', pt: 'Eu estou bem, obrigado.', alt: ["I'm fine, thank you."], ptAlt: ['Estou bem, obrigado.', 'Eu estou bem, obrigada.', 'Estou bem, obrigada.'] },
            { en: 'And you?', pt: 'E você?' },
            { en: 'How are you today?', pt: 'Como você está hoje?', ptAlt: ['Como vai você hoje?', 'Como está hoje?'] }
          ] }
      ],
      historia: 'h1'
    },
    {
      id: 'u2', titulo: 'Quem é você', objetivo: 'Dizer nome, idade, profissão e de onde vem', cor: 'azul',
      guia: [
        ['Idade usa to be', 'Em português a gente "tem" 30 anos. Em inglês a gente "é" 30 anos: I am 30 years old. I have 30 years está errado.'],
        ['Contrações', "I am vira I'm, you are vira you're, she is vira she's. Na fala, a forma curta é a mais comum."],
        ['A e an na profissão', 'Em inglês a profissão pede artigo: I am a doctor. Use an antes de som de vogal: an engineer.']
      ],
      licoes: [
        { id: 'u2l1', titulo: 'Meu nome',
          palavras: [['name', 'nome'], ['my', 'meu'], ['your', 'seu'], ['what', 'qual'], ['is', 'é'], ['I am', 'eu sou']],
          frases: [
            { en: 'My name is Pedro.', pt: 'Meu nome é Pedro.', ptAlt: ['O meu nome é Pedro.'] },
            { en: 'What is your name?', pt: 'Qual é o seu nome?', alt: ["What's your name?"], ptAlt: ['Qual é seu nome?', 'Qual o seu nome?', 'Qual seu nome?'], dica: 'What também significa "o que". Aqui se traduz como "qual".' },
            { en: 'I am Anna.', pt: 'Eu sou a Anna.', alt: ["I'm Anna."], ptAlt: ['Eu sou Anna.', 'Sou a Anna.', 'Sou Anna.'] },
            { en: 'Nice to meet you.', pt: 'Prazer em conhecer você.', ptAlt: ['Prazer em te conhecer.', 'Prazer em conhecê-lo.', 'Prazer em conhecê-la.', 'Prazer.'] }
          ] },
        { id: 'u2l2', titulo: 'Idade e origem',
          palavras: [['old', 'velho'], ['years', 'anos'], ['from', 'de'], ['where', 'onde'], ['Brazil', 'Brasil'], ['city', 'cidade', 'predio']],
          frases: [
            { en: 'I am thirty years old.', pt: 'Eu tenho trinta anos.', alt: ["I'm thirty years old.", 'I am thirty.', "I'm thirty."], ptAlt: ['Tenho trinta anos.'], dica: 'Armadilha de brasileiro: idade usa to be. Diga I am thirty, nunca I have thirty years.' },
            { en: 'I am from Brazil.', pt: 'Eu sou do Brasil.', alt: ["I'm from Brazil."], ptAlt: ['Sou do Brasil.'] },
            { en: 'Where are you from?', pt: 'De onde você é?', ptAlt: ['Você é de onde?'], dica: 'A preposição from fica no fim da pergunta, ao contrário do português.' },
            { en: 'How old are you?', pt: 'Quantos anos você tem?', ptAlt: ['Qual é a sua idade?'], dica: 'A pergunta também usa to be: how old are you. Nada de how many years do you have.' },
            { en: 'She is from Fortaleza.', pt: 'Ela é de Fortaleza.', alt: ["She's from Fortaleza."] }
          ] },
        { id: 'u2l3', titulo: 'Profissões',
          palavras: [['doctor', 'médico', 'cruz'], ['teacher', 'professor', 'livro'], ['student', 'estudante'], ['engineer', 'engenheiro'], ['he', 'ele'], ['she', 'ela']],
          frases: [
            { en: 'I am a doctor.', pt: 'Eu sou médico.', alt: ["I'm a doctor."], ptAlt: ['Eu sou médica.', 'Sou médico.', 'Sou médica.'], dica: 'A profissão em inglês pede artigo: a doctor. Sem o a, a frase fica errada.' },
            { en: 'She is a teacher.', pt: 'Ela é professora.', alt: ["She's a teacher."] },
            { en: 'He is an engineer.', pt: 'Ele é engenheiro.', alt: ["He's an engineer."], dica: 'Use an porque engineer começa com som de vogal.' },
            { en: 'Are you a student?', pt: 'Você é estudante?' },
            { en: 'Yes, I am a student.', pt: 'Sim, eu sou estudante.', alt: ["Yes, I'm a student."], ptAlt: ['Sim, sou estudante.'] }
          ] }
      ],
      historia: 'h2'
    },
    {
      id: 'u3', titulo: 'Família e casa', objetivo: 'Falar das pessoas próximas e de onde você mora', cor: 'magenta',
      guia: [
        ['Parents é pais', 'Parents significa pai e mãe. Parentes em geral, em inglês, são relatives.'],
        ['Posse com apóstrofo', "Anna's brother é o irmão da Anna. A ordem é o dono primeiro, depois a coisa."],
        ['Have para posse', 'Have indica o que você tem: I have a dog. Com he e she vira has: she has a dog.']
      ],
      licoes: [
        { id: 'u3l1', titulo: 'Família',
          palavras: [['mother', 'mãe'], ['father', 'pai'], ['brother', 'irmão'], ['sister', 'irmã'], ['parents', 'pais'], ['family', 'família', 'casa']],
          frases: [
            { en: 'This is my mother.', pt: 'Esta é minha mãe.', ptAlt: ['Essa é minha mãe.', 'Esta é a minha mãe.', 'Essa é a minha mãe.'] },
            { en: 'My father is a doctor.', pt: 'Meu pai é médico.', ptAlt: ['O meu pai é médico.'] },
            { en: 'My parents are from Ceará.', pt: 'Meus pais são do Ceará.', ptAlt: ['Os meus pais são do Ceará.'], dica: 'Falso cognato: parents são pai e mãe, não "parentes". Parentes são relatives.' },
            { en: 'She is my sister.', pt: 'Ela é minha irmã.', alt: ["She's my sister."], ptAlt: ['Ela é a minha irmã.'] },
            { en: "Anna's brother is a student.", pt: 'O irmão da Anna é estudante.', dica: "O apóstrofo com s indica posse: Anna's brother é o irmão da Anna." }
          ] },
        { id: 'u3l2', titulo: 'O que eu tenho',
          palavras: [['have', 'tenho'], ['has', 'tem'], ['dog', 'cachorro', 'cachorro'], ['cat', 'gato', 'gato'], ['house', 'casa', 'casa'], ['car', 'carro', 'carro']],
          frases: [
            { en: 'I have a dog.', pt: 'Eu tenho um cachorro.', ptAlt: ['Tenho um cachorro.', 'Eu tenho um cão.', 'Tenho um cão.'] },
            { en: 'She has a cat.', pt: 'Ela tem um gato.', dica: 'Com he, she e it, have vira has.' },
            { en: 'We have a house.', pt: 'Nós temos uma casa.', ptAlt: ['Temos uma casa.'] },
            { en: 'He has a new car.', pt: 'Ele tem um carro novo.', dica: 'O adjetivo vem antes do substantivo: new car, carro novo.' },
            { en: 'They have two dogs.', pt: 'Eles têm dois cachorros.', ptAlt: ['Elas têm dois cachorros.', 'Eles têm dois cães.', 'Elas têm dois cães.'] }
          ] },
        { id: 'u3l3', titulo: 'Em casa',
          palavras: [['big', 'grande'], ['small', 'pequeno'], ['new', 'novo'], ['here', 'aqui'], ['there', 'lá'], ['there is', 'tem']],
          frases: [
            { en: 'My house is small.', pt: 'Minha casa é pequena.', ptAlt: ['A minha casa é pequena.'] },
            { en: 'There is a cat here.', pt: 'Tem um gato aqui.', ptAlt: ['Há um gato aqui.'], dica: 'Para dizer que algo existe num lugar, o "tem" do português vira there is. Have é só para posse.' },
            { en: 'There are two cars there.', pt: 'Tem dois carros lá.', ptAlt: ['Há dois carros lá.'], dica: 'No plural, there is vira there are.' },
            { en: 'The city is big.', pt: 'A cidade é grande.' },
            { en: 'Your family is here.', pt: 'Sua família está aqui.', ptAlt: ['A sua família está aqui.'] }
          ] }
      ],
      historia: 'h3'
    },
    {
      id: 'u4', titulo: 'Na mesa', objetivo: 'Pedir comida e bebida em um café', cor: 'ambar',
      guia: [
        ['Pedido educado', 'I would like é a forma educada de "eu gostaria". Na fala vira I\'d like. I want soa direto demais para um pedido.'],
        ['Lunch não é lanche', 'Lunch é almoço. Lanche é snack.'],
        ['Some', 'Use some para quantidade indefinida: some water, some bread. Em português muitas vezes nem se traduz.']
      ],
      licoes: [
        { id: 'u4l1', titulo: 'Bebidas',
          palavras: [['water', 'água', 'agua'], ['coffee', 'café', 'cafe'], ['milk', 'leite'], ['juice', 'suco'], ['tea', 'chá'], ['drink', 'beber']],
          frases: [
            { en: 'I drink water.', pt: 'Eu bebo água.', ptAlt: ['Bebo água.'] },
            { en: 'I like coffee with milk.', pt: 'Eu gosto de café com leite.', ptAlt: ['Gosto de café com leite.'], dica: 'Like não leva preposição: I like coffee, não I like of coffee.' },
            { en: 'She drinks tea.', pt: 'Ela bebe chá.', dica: 'Com he, she e it o verbo ganha s: she drinks.' },
            { en: 'Do you drink juice?', pt: 'Você bebe suco?', dica: 'Perguntas no presente começam com do: do you drink.' },
            { en: 'We do not drink milk.', pt: 'Nós não bebemos leite.', alt: ["We don't drink milk."], ptAlt: ['Não bebemos leite.'] }
          ] },
        { id: 'u4l2', titulo: 'Comida',
          palavras: [['bread', 'pão', 'pao'], ['apple', 'maçã', 'maca'], ['egg', 'ovo', 'ovo'], ['rice', 'arroz'], ['beans', 'feijão'], ['eat', 'comer']],
          frases: [
            { en: 'I eat rice and beans.', pt: 'Eu como arroz e feijão.', ptAlt: ['Como arroz e feijão.'] },
            { en: 'He eats an apple.', pt: 'Ele come uma maçã.', dica: 'Antes de som de vogal use an: an apple, an egg.' },
            { en: 'The bread is good.', pt: 'O pão é bom.', ptAlt: ['O pão está bom.'] },
            { en: 'I eat an egg in the morning.', pt: 'Eu como um ovo de manhã.', ptAlt: ['Como um ovo de manhã.', 'Eu como um ovo pela manhã.', 'Como um ovo pela manhã.'] },
            { en: 'We eat lunch at home.', pt: 'Nós almoçamos em casa.', ptAlt: ['Almoçamos em casa.'], dica: 'Lunch é almoço, não lanche. Lanche é snack.' }
          ] },
        { id: 'u4l3', titulo: 'No café',
          palavras: [['would like', 'gostaria'], ['some', 'um pouco de'], ['menu', 'cardápio'], ['check', 'conta'], ['how much', 'quanto custa'], ['table', 'mesa']],
          frases: [
            { en: 'I would like a coffee, please.', pt: 'Eu gostaria de um café, por favor.', alt: ["I'd like a coffee, please."], ptAlt: ['Gostaria de um café, por favor.'], dica: 'I would like é o jeito educado de pedir. I want soa como ordem.' },
            { en: 'Can I have the menu, please?', pt: 'Posso ver o cardápio, por favor?', ptAlt: ['Pode me trazer o cardápio, por favor?'] },
            { en: 'The check, please.', pt: 'A conta, por favor.', dica: 'No inglês britânico, a conta do restaurante é the bill.' },
            { en: 'How much is the juice?', pt: 'Quanto custa o suco?', alt: ["How much's the juice?"], ptAlt: ['Quanto é o suco?'] },
            { en: 'A table for two, please.', pt: 'Uma mesa para dois, por favor.', ptAlt: ['Mesa para dois, por favor.'] }
          ] }
      ],
      historia: 'h4'
    },
    {
      id: 'u5', titulo: 'Em viagem', objetivo: 'Passar pelo aeroporto, pelo hotel e pedir direções', cor: 'teal',
      guia: [
        ['Pretend não é pretender', 'Pretend significa fingir. Pretender, no sentido de ter intenção, é to intend ou to plan.'],
        ['Push e pull', 'Push é empurrar e pull é puxar. A porta que diz pull não é para empurrar, mesmo com o som parecido.'],
        ['Going to', 'I am going to indica plano próximo: I am going to London.']
      ],
      licoes: [
        { id: 'u5l1', titulo: 'Aeroporto',
          palavras: [['airport', 'aeroporto', 'aviao'], ['passport', 'passaporte'], ['ticket', 'passagem'], ['flight', 'voo', 'aviao'], ['bag', 'mala', 'mala'], ['gate', 'portão']],
          frases: [
            { en: 'Here is my passport.', pt: 'Aqui está o meu passaporte.', alt: ["Here's my passport."], ptAlt: ['Aqui está meu passaporte.'] },
            { en: 'Where is the gate?', pt: 'Onde fica o portão?', alt: ["Where's the gate?"], ptAlt: ['Onde está o portão?', 'Onde é o portão?'] },
            { en: 'My flight is at nine.', pt: 'Meu voo é às nove.', ptAlt: ['O meu voo é às nove.'] },
            { en: 'This is my bag.', pt: 'Esta é a minha mala.', ptAlt: ['Essa é a minha mala.', 'Esta é minha mala.', 'Essa é minha mala.'] },
            { en: 'I am going to London.', pt: 'Eu vou para Londres.', alt: ["I'm going to London."], ptAlt: ['Vou para Londres.', 'Eu vou a Londres.', 'Vou a Londres.', 'Estou indo para Londres.', 'Eu estou indo para Londres.'] }
          ] },
        { id: 'u5l2', titulo: 'Hotel',
          palavras: [['hotel', 'hotel', 'predio'], ['room', 'quarto'], ['key', 'chave', 'chave'], ['reservation', 'reserva'], ['need', 'preciso'], ['nights', 'noites', 'lua']],
          frases: [
            { en: 'I have a reservation.', pt: 'Eu tenho uma reserva.', ptAlt: ['Tenho uma reserva.'], dica: 'Reservation é a reserva do hotel. Booking é sinônimo muito usado.' },
            { en: 'I need a room for two nights.', pt: 'Eu preciso de um quarto para duas noites.', ptAlt: ['Preciso de um quarto para duas noites.'], dica: 'Need não leva preposição: I need a room, sem of.' },
            { en: 'Here is your key.', pt: 'Aqui está a sua chave.', alt: ["Here's your key."], ptAlt: ['Aqui está sua chave.'] },
            { en: 'The room is small.', pt: 'O quarto é pequeno.', ptAlt: ['O quarto está pequeno.'] },
            { en: 'Is there a room for tonight?', pt: 'Tem um quarto para esta noite?', ptAlt: ['Há um quarto para hoje à noite?', 'Tem quarto para hoje à noite?', 'Tem um quarto para hoje à noite?'] }
          ] },
        { id: 'u5l3', titulo: 'Direções',
          palavras: [['left', 'esquerda'], ['right', 'direita'], ['street', 'rua'], ['near', 'perto'], ['far', 'longe'], ['subway', 'metrô']],
          frases: [
            { en: 'Excuse me, where is the subway?', pt: 'Com licença, onde fica o metrô?', alt: ["Excuse me, where's the subway?"], ptAlt: ['Com licença, onde é o metrô?', 'Com licença, onde está o metrô?'], dica: 'Excuse me chama a atenção de alguém. Sorry pede desculpa por algo que já aconteceu.' },
            { en: 'Turn left.', pt: 'Vire à esquerda.', ptAlt: ['Vire a esquerda.', 'Vira à esquerda.', 'Vira a esquerda.'] },
            { en: 'Turn right on this street.', pt: 'Vire à direita nesta rua.', ptAlt: ['Vire a direita nesta rua.', 'Vira à direita nessa rua.', 'Vire à direita nessa rua.'] },
            { en: 'The hotel is near here.', pt: 'O hotel fica perto daqui.', ptAlt: ['O hotel é perto daqui.', 'O hotel está perto daqui.'] },
            { en: 'The airport is far.', pt: 'O aeroporto é longe.', ptAlt: ['O aeroporto fica longe.', 'O aeroporto está longe.'] }
          ] }
      ],
      historia: 'h5'
    },
    {
      id: 'u6', titulo: 'Meu dia', objetivo: 'Contar sua rotina, horários e o que gosta de fazer', cor: 'indigo',
      guia: [
        ['Presente simples', 'Usado para rotina. Só muda com he, she e it, que recebem s: I work, she works.'],
        ['Negativa e pergunta', 'Use do e does: I do not work, she does not work, do you work, does she work. Depois de does o verbo perde o s.'],
        ['Actually', 'Actually significa "na verdade", não "atualmente". Atualmente é currently ou nowadays.']
      ],
      licoes: [
        { id: 'u6l1', titulo: 'Rotina',
          palavras: [['work', 'trabalhar'], ['study', 'estudar', 'livro'], ['sleep', 'dormir', 'lua'], ['every day', 'todo dia', 'sol'], ['wake up', 'acordar'], ['go', 'ir']],
          frases: [
            { en: 'I work every day.', pt: 'Eu trabalho todo dia.', ptAlt: ['Trabalho todo dia.', 'Eu trabalho todos os dias.', 'Trabalho todos os dias.'] },
            { en: 'She studies English.', pt: 'Ela estuda inglês.', dica: 'Verbo terminado em consoante mais y troca por ies: study, studies.' },
            { en: 'I wake up at six.', pt: 'Eu acordo às seis.', ptAlt: ['Acordo às seis.'] },
            { en: 'He goes to work by bus.', pt: 'Ele vai ao trabalho de ônibus.', ptAlt: ['Ele vai para o trabalho de ônibus.', 'Ele vai trabalhar de ônibus.'], dica: 'Go vira goes com he, she e it.' },
            { en: 'We do not work today.', pt: 'Nós não trabalhamos hoje.', alt: ["We don't work today."], ptAlt: ['Não trabalhamos hoje.'] }
          ] },
        { id: 'u6l2', titulo: 'Horas e dias',
          palavras: [['time', 'hora', 'relogio'], ["o'clock", 'em ponto', 'relogio'], ['Monday', 'segunda-feira'], ['Friday', 'sexta-feira'], ['week', 'semana'], ['tomorrow', 'amanhã']],
          frases: [
            { en: 'What time is it?', pt: 'Que horas são?', dica: 'A resposta usa it: it is nine o\'clock.' },
            { en: "It is nine o'clock.", pt: 'São nove horas.', alt: ["It's nine o'clock.", 'It is nine.', "It's nine."], ptAlt: ['São nove em ponto.'], dica: 'Horas em inglês ficam sempre no singular com it is.' },
            { en: 'I work on Monday.', pt: 'Eu trabalho na segunda-feira.', ptAlt: ['Trabalho na segunda-feira.', 'Eu trabalho na segunda.', 'Trabalho na segunda.'], dica: 'Dias da semana usam on e começam com letra maiúscula.' },
            { en: 'See you tomorrow!', pt: 'Até amanhã!' },
            { en: 'See you on Friday!', pt: 'Até sexta-feira!', ptAlt: ['Até sexta!'] }
          ] },
        { id: 'u6l3', titulo: 'Do que eu gosto',
          palavras: [['like', 'gostar'], ['love', 'amar'], ['music', 'música', 'musica'], ['read', 'ler', 'livro'], ['does', 'faz'], ['because', 'porque']],
          frases: [
            { en: 'I like music.', pt: 'Eu gosto de música.', ptAlt: ['Gosto de música.'], dica: 'Like vai direto ao objeto, sem of.' },
            { en: 'I love to read.', pt: 'Eu amo ler.', ptAlt: ['Amo ler.', 'Eu adoro ler.', 'Adoro ler.'] },
            { en: 'She does not like coffee.', pt: 'Ela não gosta de café.', alt: ["She doesn't like coffee."], dica: 'Depois de does not o verbo perde o s: she does not like.' },
            { en: 'Does he study English?', pt: 'Ele estuda inglês?', dica: 'A pergunta começa com does e o verbo fica sem s.' },
            { en: 'I study because I like English.', pt: 'Eu estudo porque gosto de inglês.', alt: ['I study because I like English'], ptAlt: ['Estudo porque gosto de inglês.', 'Eu estudo porque eu gosto de inglês.'] }
          ] }
      ],
      historia: 'h6'
    }
  ],

  historias: {
    h1: { titulo: 'O vizinho novo', linhas: [
      { quem: 'Anna', en: 'Hi! Good morning!', pt: 'Oi! Bom dia!' },
      { quem: 'Pedro', en: 'Hello! How are you?', pt: 'Olá! Como você está?' },
      { quem: 'Anna', en: 'I am fine, thank you. And you?', pt: 'Estou bem, obrigada. E você?' },
      { quem: 'Pedro', en: 'I am fine too.', pt: 'Eu também estou bem.',
        q: { p: 'Como Pedro está?', o: ['Bem', 'Cansado', 'Doente'], c: 0 } },
      { quem: 'Anna', en: 'Welcome to the building!', pt: 'Bem-vindo ao prédio!' },
      { quem: 'Pedro', en: 'Thank you! Bye, Anna!', pt: 'Obrigado! Tchau, Anna!',
        q: { p: 'O que Anna diz a Pedro sobre o prédio?', o: ['Que é velho', 'Que ele é bem-vindo', 'Que está fechado'], c: 1 } }
    ] },
    h2: { titulo: 'Primeiro dia no curso', linhas: [
      { quem: 'Laura', en: 'Hi, what is your name?', pt: 'Oi, qual é o seu nome?' },
      { quem: 'Tiago', en: 'My name is Tiago. Nice to meet you.', pt: 'Meu nome é Tiago. Prazer.' },
      { quem: 'Laura', en: 'I am Laura. Where are you from?', pt: 'Eu sou a Laura. De onde você é?' },
      { quem: 'Tiago', en: 'I am from Sobral. I am an engineer.', pt: 'Sou de Sobral. Sou engenheiro.',
        q: { p: 'Qual é a profissão de Tiago?', o: ['Médico', 'Professor', 'Engenheiro'], c: 2 } },
      { quem: 'Laura', en: 'I am a student. I am twenty years old.', pt: 'Sou estudante. Tenho vinte anos.',
        q: { p: 'Quantos anos Laura tem?', o: ['Vinte', 'Trinta', 'Doze'], c: 0 } }
    ] },
    h3: { titulo: 'A foto na parede', linhas: [
      { quem: 'Marta', en: 'This is my family.', pt: 'Esta é a minha família.' },
      { quem: 'João', en: 'Is she your sister?', pt: 'Ela é sua irmã?' },
      { quem: 'Marta', en: 'No, she is my mother!', pt: 'Não, ela é minha mãe!',
        q: { p: 'Quem é a mulher na foto?', o: ['A irmã de Marta', 'A mãe de Marta', 'A amiga de Marta'], c: 1 } },
      { quem: 'João', en: 'And the dog?', pt: 'E o cachorro?' },
      { quem: 'Marta', en: 'That is Bob. We have two dogs and a cat.', pt: 'Esse é o Bob. Temos dois cachorros e um gato.',
        q: { p: 'Quantos cachorros a família tem?', o: ['Um', 'Dois', 'Três'], c: 1 } }
    ] },
    h4: { titulo: 'Café da manhã atrasado', linhas: [
      { quem: 'Garçom', en: 'Good morning! A table for two?', pt: 'Bom dia! Uma mesa para dois?' },
      { quem: 'Clara', en: 'Yes, please. Can I have the menu?', pt: 'Sim, por favor. Posso ver o cardápio?' },
      { quem: 'Garçom', en: 'Here you are.', pt: 'Aqui está.' },
      { quem: 'Clara', en: 'I would like a coffee and some bread.', pt: 'Eu gostaria de um café e um pouco de pão.',
        q: { p: 'O que Clara pede?', o: ['Chá e ovos', 'Café e pão', 'Suco e maçã'], c: 1 } },
      { quem: 'Garçom', en: 'Sorry, there is no bread today.', pt: 'Desculpe, hoje não tem pão.' },
      { quem: 'Clara', en: 'Oh no! An egg, then. And the check, please.', pt: 'Ah, não! Um ovo, então. E a conta, por favor.',
        q: { p: 'Por que Clara muda o pedido?', o: ['Não tem pão', 'O café está frio', 'Ela está sem dinheiro'], c: 0 } }
    ] },
    h5: { titulo: 'A mala errada', linhas: [
      { quem: 'Rafael', en: 'Excuse me, this is my bag.', pt: 'Com licença, esta é a minha mala.' },
      { quem: 'Helen', en: 'No, this is my bag!', pt: 'Não, esta é a minha mala!' },
      { quem: 'Rafael', en: 'Oh, my bag is small. Sorry!', pt: 'Ah, a minha mala é pequena. Desculpe!',
        q: { p: 'Como é a mala de Rafael?', o: ['Grande', 'Pequena', 'Nova'], c: 1 } },
      { quem: 'Helen', en: 'No problem. Where are you going?', pt: 'Sem problema. Para onde você vai?' },
      { quem: 'Rafael', en: 'I am going to London. My flight is at nine.', pt: 'Vou para Londres. Meu voo é às nove.',
        q: { p: 'A que horas é o voo?', o: ['Às seis', 'Às nove', 'Às onze'], c: 1 } }
    ] },
    h6: { titulo: 'Quem acorda cedo', linhas: [
      { quem: 'Bia', en: 'What time do you wake up?', pt: 'A que horas você acorda?' },
      { quem: 'Davi', en: 'I wake up at six. I work every day.', pt: 'Acordo às seis. Trabalho todo dia.' },
      { quem: 'Bia', en: 'Every day? On Sunday too?', pt: 'Todo dia? No domingo também?',
        q: { p: 'A que horas Davi acorda?', o: ['Às seis', 'Às oito', 'Às dez'], c: 0 } },
      { quem: 'Davi', en: 'No! On Sunday I sleep and I read.', pt: 'Não! No domingo eu durmo e leio.' },
      { quem: 'Bia', en: 'I do not like to wake up early.', pt: 'Eu não gosto de acordar cedo.',
        q: { p: 'O que Davi faz no domingo?', o: ['Trabalha', 'Dorme e lê', 'Viaja'], c: 1 } }
    ] }
  }
};

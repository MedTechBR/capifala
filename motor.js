// Motor das lições: normaliza e corrige respostas, gera exercícios e agenda a revisão.
// Sem acesso à tela, para poder ser testado no Node (ver teste-motor.js).
(function (raiz) {
  const CONTRACOES = {
    "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
    "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "what's": 'what is', "where's": 'where is',
    "here's": 'here is', "i'd": 'i would', "i'll": 'i will', "you'll": 'you will', "he'll": 'he will', "she'll": 'she will', "we'll": 'we will', "they'll": 'they will',
    "can't": 'cannot', "didn't": 'did not', "wasn't": 'was not', "weren't": 'were not', "let's": 'let us', "won't": 'will not', "how's": 'how is', "that's": 'that is', "there's": 'there is', "much's": 'much is'
  };

  function semAcento(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function normaliza(s, idioma) {
    let t = String(s).toLowerCase().replace(/[’`]/g, "'").replace(/[.,!?;:"]/g, ' ').replace(/\s+/g, ' ').trim();
    if (idioma === 'en') t = t.split(' ').map(p => CONTRACOES[p] || p).join(' ');
    return semAcento(t);
  }

  function distancia(a, b) {
    const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) m[i][j] = Math.min(m[i][j], m[i - 2][j - 2] + 1); // letras trocadas
    }
    return m[a.length][b.length];
  }

  // Retorna 'certo', 'quase' (um erro de digitação em frase longa) ou 'errado'.
  function corrige(resposta, aceitas, idioma, tolerante) {
    const r = normaliza(resposta, idioma);
    if (!r) return 'errado';
    const lista = aceitas.map(a => normaliza(a, idioma));
    if (lista.includes(r)) return 'certo';
    if (tolerante && lista.some(a => a.length >= 8 && distancia(a, r) === 1)) return 'quase';
    return 'errado';
  }

  // Fala reconhecida: conta as palavras da frase-alvo que apareceram.
  function notaFala(ouvido, alvo) {
    const a = normaliza(alvo, 'en').split(' ');
    const o = new Set(normaliza(ouvido, 'en').split(' '));
    return a.filter(p => o.has(p)).length / a.length;
  }

  function embaralha(v, rnd) {
    const r = rnd || Math.random, c = v.slice();
    for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
    return c;
  }

  function fichas(s) { return s.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean); }

  function chaveFrase(f) { return 's:' + f.en; }
  function chavePalavra(p) { return 'w:' + p[0]; }

  function todasPalavras(curso) { return curso.unidades.flatMap(u => u.licoes.flatMap(l => l.palavras)); }
  function todasFrases(curso) { return curso.unidades.flatMap(u => u.licoes.flatMap(l => l.frases)); }

  function fichasIntrusas(curso, certas, idioma, n, rnd) {
    const base = new Set(certas.map(x => x.toLowerCase()));
    const banco = todasFrases(curso).flatMap(f => fichas(idioma === 'en' ? f.en : f.pt));
    const unicas = [...new Set(banco)].filter(x => !base.has(x.toLowerCase()));
    return embaralha(unicas, rnd).slice(0, n);
  }

  function opcoesPalavra(curso, palavra, campo, rnd, pool) {
    // Palavra de mesmo sentido fica fora para não haver duas respostas certas (has e there is = tem).
    const outroCampo = campo === 0 ? 1 : 0, certa = palavra[campo];
    const validas = v => v.filter(p => p[outroCampo] !== palavra[outroCampo]).map(p => p[campo]);
    const candidatos = [...new Set(embaralha(validas(pool || []), rnd).concat(embaralha(validas(todasPalavras(curso)), rnd)))].filter(x => x !== certa);
    return embaralha([certa].concat(candidatos.slice(0, 3)), rnd);
  }

  const criar = {
    imagem(curso, p, rnd, pool) {
      const comIcone = [...pool, ...todasPalavras(curso)].filter(x => x[2] && x[2] !== p[2]);
      const vistos = new Set([p[2]]), outros = [];
      for (const x of embaralha(comIcone, rnd)) { if (!vistos.has(x[2])) { vistos.add(x[2]); outros.push(x); } if (outros.length === 3) break; }
      return { tipo: 'imagem', chave: chavePalavra(p), enunciado: 'Qual imagem mostra "' + p[1] + '"?', falar: p[0],
        opcoes: embaralha([p].concat(outros), rnd).map(x => ({ texto: x[0], icone: x[2], certa: x[0] === p[0] })), certa: p[0] };
    },
    escolhaPt(curso, p, rnd, pool) {
      return { tipo: 'escolha', chave: chavePalavra(p), enunciado: 'O que significa esta palavra?', destaque: p[0], falar: p[0],
        opcoes: opcoesPalavra(curso, p, 1, rnd, pool).map(t => ({ texto: t, certa: t === p[1] })), certa: p[1] };
    },
    escolhaEn(curso, p, rnd, pool) {
      return { tipo: 'escolha', chave: chavePalavra(p), enunciado: 'Como se diz "' + p[1] + '" em inglês?', falarAoAcertar: p[0],
        opcoes: opcoesPalavra(curso, p, 0, rnd, pool).map(t => ({ texto: t, certa: t === p[0], ingles: true })), certa: p[0] };
    },
    pares(palavras, rnd) {
      const usadas = palavras.slice(0, 5);
      return { tipo: 'pares', chave: null, enunciado: 'Ligue os pares',
        esquerda: embaralha(usadas.map(p => ({ id: p[0], texto: p[0] })), rnd),
        direita: embaralha(usadas.map(p => ({ id: p[0], texto: p[1] })), rnd), palavras: usadas };
    },
    montarEn(curso, f, rnd) {
      const certas = fichas(f.en);
      return { tipo: 'montar', chave: chaveFrase(f), enunciado: 'Traduza para o inglês', origem: f.pt, idioma: 'en',
        fichas: embaralha(certas.concat(fichasIntrusas(curso, certas, 'en', 3, rnd)), rnd),
        aceitas: [f.en].concat(f.alt || []), certa: f.en, dica: f.dica, falarAoAcertar: f.en };
    },
    montarPt(curso, f, rnd) {
      const certas = fichas(f.pt);
      return { tipo: 'montar', chave: chaveFrase(f), enunciado: 'Traduza para o português', origem: f.en, falar: f.en, idioma: 'pt',
        fichas: embaralha(certas.concat(fichasIntrusas(curso, certas, 'pt', 3, rnd)), rnd),
        aceitas: [f.pt].concat(f.ptAlt || []), certa: f.pt, dica: f.dica };
    },
    ouvirMontar(curso, f, rnd) {
      const certas = fichas(f.en);
      return { tipo: 'montar', chave: chaveFrase(f), enunciado: 'Toque no que você ouviu', soAudio: true, falar: f.en, idioma: 'en', exige: 'audio',
        fichas: embaralha(certas.concat(fichasIntrusas(curso, certas, 'en', 3, rnd)), rnd),
        aceitas: [f.en].concat(f.alt || []), certa: f.en, dica: f.dica, traducao: f.pt };
    },
    ouvirDigitar(f) {
      return { tipo: 'digitar', chave: chaveFrase(f), enunciado: 'Escreva o que você ouviu', soAudio: true, falar: f.en, idioma: 'en', exige: 'audio',
        aceitas: [f.en].concat(f.alt || []), certa: f.en, dica: f.dica, traducao: f.pt };
    },
    digitarEn(f) {
      return { tipo: 'digitar', chave: chaveFrase(f), enunciado: 'Escreva em inglês', origem: f.pt, idioma: 'en',
        aceitas: [f.en].concat(f.alt || []), certa: f.en, dica: f.dica, falarAoAcertar: f.en };
    },
    digitarPt(f) {
      return { tipo: 'digitar', chave: chaveFrase(f), enunciado: 'Escreva em português', origem: f.en, falar: f.en, idioma: 'pt',
        aceitas: [f.pt].concat(f.ptAlt || []), certa: f.pt, dica: f.dica };
    },
    lacuna(curso, f, rnd) {
      const palavras = fichas(f.en);
      const longas = palavras.map((p, i) => [p, i]).filter(([p]) => p.length > 2);
      const [alvo, i] = longas.length ? longas[Math.floor((rnd || Math.random)() * longas.length)] : [palavras[0], 0];
      const antes = palavras.slice(0, i).join(' '), depois = palavras.slice(i + 1).join(' ');
      const intrusas = fichasIntrusas(curso, [alvo], 'en', 3, rnd);
      return { tipo: 'lacuna', chave: chaveFrase(f), enunciado: 'Complete a frase', antes, depois, traducao: f.pt, falarAoAcertar: f.en,
        opcoes: embaralha([alvo].concat(intrusas), rnd).map(t => ({ texto: t, certa: t === alvo, ingles: true })), certa: f.en, dica: f.dica };
    },
    falar(f) {
      return { tipo: 'falar', chave: chaveFrase(f), enunciado: 'Fale esta frase', alvo: f.en, traducao: f.pt, falar: f.en, exige: 'mic', certa: f.en };
    }
  };

  // Primeira rodada reconhece; a segunda exige produzir a frase.
  function sessaoLicao(curso, licao, rodada, cfg, rnd) {
    const P = embaralha(licao.palavras, rnd), F = embaralha(licao.frases, rnd);
    const fr = i => F[i % F.length], pl = i => P[i % P.length];
    const comIcone = P.filter(p => p[2]);
    const seq = [];
    if (rodada === 0) {
      if (comIcone.length) seq.push(criar.imagem(curso, comIcone[0], rnd, P));
      seq.push(criar.escolhaPt(curso, pl(0), rnd, P), criar.escolhaEn(curso, pl(1), rnd, P), criar.escolhaPt(curso, pl(2), rnd, P));
      seq.push(criar.pares(P, rnd));
      seq.push(criar.montarPt(curso, fr(0), rnd), criar.lacuna(curso, fr(1), rnd), criar.montarEn(curso, fr(2), rnd));
      seq.push(criar.ouvirMontar(curso, fr(3), rnd), criar.falar(fr(4)), criar.montarEn(curso, fr(0), rnd));
    } else {
      seq.push(criar.escolhaEn(curso, pl(3), rnd, P), criar.lacuna(curso, fr(0), rnd), criar.pares(P, rnd));
      seq.push(criar.digitarEn(fr(1)), criar.ouvirDigitar(fr(2)), criar.montarEn(curso, fr(3), rnd));
      seq.push(criar.digitarPt(fr(4)), criar.falar(fr(0)), criar.digitarEn(fr(2)), criar.ouvirMontar(curso, fr(1), rnd), criar.falar(fr(3)));
    }
    return filtra(seq, cfg);
  }

  function filtra(seq, cfg) {
    return seq.filter(e => !(e.exige === 'audio' && !cfg.audio) && !(e.exige === 'mic' && !cfg.mic));
  }

  function acharItem(curso, chave) {
    if (chave.startsWith('w:')) { const p = todasPalavras(curso).find(x => x[0] === chave.slice(2)); return p ? { palavra: p } : null; }
    const f = todasFrases(curso).find(x => x.en === chave.slice(2)); return f ? { frase: f } : null;
  }

  // Revisão: itens vencidos ou mais fracos.
  function sessaoRevisao(curso, itens, agora, cfg, n, rnd) {
    const chaves = Object.keys(itens).filter(k => acharItem(curso, k)).sort((a, b) => {
      const ia = itens[a], ib = itens[b];
      const va = ia.proximo <= agora ? 0 : 1, vb = ib.proximo <= agora ? 0 : 1;
      return va - vb || ia.forca - ib.forca || ia.proximo - ib.proximo;
    }).slice(0, n || 10);
    const seq = embaralha(chaves, rnd).map(k => {
      const it = acharItem(curso, k);
      if (it.palavra) return (rnd || Math.random)() < 0.5 ? criar.escolhaEn(curso, it.palavra, rnd, []) : criar.escolhaPt(curso, it.palavra, rnd, []);
      const tipos = [() => criar.montarEn(curso, it.frase, rnd), () => criar.digitarEn(it.frase), () => criar.lacuna(curso, it.frase, rnd), () => criar.ouvirDigitar(it.frase)];
      return tipos[Math.floor((rnd || Math.random)() * tipos.length)]();
    });
    return filtra(seq, cfg);
  }

  function sessaoUnidade(curso, unidade, cfg, rnd) {
    const F = embaralha(unidade.licoes.flatMap(l => l.frases), rnd).slice(0, 12);
    const P = embaralha(unidade.licoes.flatMap(l => l.palavras), rnd);
    const seq = [criar.pares(P, rnd)];
    F.forEach((f, i) => {
      const op = [() => criar.montarEn(curso, f, rnd), () => criar.digitarEn(f), () => criar.lacuna(curso, f, rnd), () => criar.ouvirDigitar(f), () => criar.digitarPt(f)];
      seq.push(op[i % op.length]());
    });
    return filtra(seq, cfg);
  }

  function sessaoPratica(curso, modo, frases, cfg, rnd) {
    const F = embaralha(frases, rnd).slice(0, 8);
    if (modo === 'ouvir') return filtra(F.map((f, i) => i % 2 ? criar.ouvirDigitar(f) : criar.ouvirMontar(curso, f, rnd)), cfg);
    if (modo === 'falar') return filtra(F.map(f => criar.falar(f)), cfg);
    return filtra(F.map(f => criar.digitarEn(f)), cfg);
  }

  const INTERVALOS = [0.5, 1, 3, 7, 16, 35]; // dias
  function agendaItem(item, acertou, agora) {
    const i = item || { forca: 0, proximo: agora, erros: 0, acertos: 0 };
    if (acertou) { i.forca = Math.min(5, i.forca + 1); i.acertos++; i.proximo = agora + INTERVALOS[i.forca] * 864e5; }
    else { i.forca = Math.max(0, i.forca - 2); i.erros++; i.proximo = agora; }
    return i;
  }

  function dataLocal(ms) { const d = new Date(ms); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function diasEntre(a, b) { const [x, y] = [a, b].map(s => { const [Y, M, D] = s.split('-').map(Number); return Date.UTC(Y, M - 1, D); }); return Math.round((y - x) / 864e5); }

  // Falta sem folga zera a ofensiva; cada folga cobre um dia perdido.
  function ajustaOfensiva(of, hoje) {
    if (!of.ultimo) return of;
    const perdidos = diasEntre(of.ultimo, hoje) - 1;
    if (perdidos <= 0) return of;
    if (of.folgas >= perdidos) { of.folgas -= perdidos; of.folgasUsadas = (of.folgasUsadas || 0) + perdidos; const d = new Date(hoje + 'T12:00'); d.setDate(d.getDate() - 1); of.ultimo = dataLocal(d.getTime()); }
    else { of.dias = 0; of.ultimo = null; }
    return of;
  }

  function registraDia(of, hoje) {
    ajustaOfensiva(of, hoje);
    if (of.ultimo === hoje) return false;
    of.dias = (of.dias || 0) + 1; of.ultimo = hoje; of.recorde = Math.max(of.recorde || 0, of.dias);
    return true;
  }

  function xpDaSessao(total, erros, comboMax, dobro) {
    const base = 10 + Math.min(5, Math.floor(comboMax / 5)) * 2 + (erros === 0 && total > 0 ? 5 : 0);
    return dobro ? base * 2 : base;
  }

  const api = { normaliza, corrige, notaFala, embaralha, fichas, sessaoLicao, sessaoRevisao, sessaoUnidade, sessaoPratica,
    agendaItem, ajustaOfensiva, registraDia, xpDaSessao, dataLocal, diasEntre, chaveFrase, chavePalavra, todasFrases, todasPalavras };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else raiz.Motor = api;
})(typeof window !== 'undefined' ? window : globalThis);

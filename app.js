// Interface do CapiFala: estado salvo no aparelho, navegação, trilha, sessões de exercício e recompensas.
(function () {
  const C = window.CURSO, M = window.Motor;
  const CHAVE = 'englivara-v1';
  const VIDAS_MAX = 5, MS_VIDA = 60 * 60 * 1000, PRECO_VIDAS = 350, PRECO_FOLGA = 200, PRECO_DOBRO = 100, RODADAS = 2;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hoje = () => M.dataLocal(Date.now());

  /* Ícones próprios */
  const tr = (d, t = 24) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const cheio = (d, t = 24) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>`;
  const I = {
    trilha: t => tr('<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>', t),
    praticar: t => tr('<path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/>', t),
    missoes: t => tr('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', t),
    liga: t => tr('<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 20h8"/>', t),
    loja: t => tr('<path d="M4 9h16l-1 11H5z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/>', t),
    perfil: t => tr('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>', t),
    mais: t => tr('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>', t),
    fechar: t => tr('<path d="M6 6l12 12M18 6L6 18"/>', t),
    ok: t => tr('<path d="M5 13l5 5L20 7"/>', t),
    livro: t => tr('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 7h6"/>', t),
    bau: t => tr('<path d="M4 11a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v9H4z"/><path d="M4 12h16M12 10v5"/>', t),
    historia: t => tr('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>', t),
    bandeira: t => tr('<path d="M6 21V4M6 5c5-3 8 3 13 0v9c-5 3-8-3-13 0"/>', t),
    audio: t => tr('<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>', t),
    lento: t => tr('<path d="M4 16h13a3 3 0 0 0 3-3v-1l-2-2M6 16a6 6 0 0 1 11-3"/><path d="M7 16l-1 3M14 16l1 3"/><circle cx="19" cy="9" r="1.5"/>', t),
    mic: t => tr('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', t),
    escrever: t => tr('<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>', t),
    raio: t => cheio('<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>', t),
    fogo: t => cheio('<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-2 1-4 2-5 0 2 1 3 2 3 1-3 0-6 2-10z"/>', t),
    vida: t => cheio('<path d="M12 21C5 15.5 2.5 12 2.5 8.5A5 5 0 0 1 12 6a5 5 0 0 1 9.500 2.500C21.500 12 19 15.500 12 21z"/>', t),
    moeda: t => cheio('<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/>', t),
    gelo: t => tr('<path d="M12 2v20M3.300 7l17.400 10M20.700 7L3.300 17"/>', t)
  };

  const FIG = {
    sol: '<circle cx="32" cy="32" r="13" fill="#F2A007"/><g stroke="#F2A007" stroke-width="5" stroke-linecap="round"><path d="M32 6v7M32 51v7M6 32h7M51 32h7M14 14l5 5M45 45l5 5M50 14l-5 5M19 45l-5 5"/></g>',
    lua: '<path d="M44 42a20 20 0 0 1-22-29 22 22 0 1 0 29 27 20 20 0 0 1-7 2z" fill="#5C63D8"/><circle cx="46" cy="16" r="3" fill="#F2A007"/><circle cx="53" cy="28" r="2" fill="#F2A007"/>',
    predio: '<rect x="14" y="10" width="36" height="46" rx="4" fill="#5B7FC7"/><g fill="#FFE29A"><rect x="21" y="17" width="8" height="8" rx="1"/><rect x="35" y="17" width="8" height="8" rx="1"/><rect x="21" y="30" width="8" height="8" rx="1"/><rect x="35" y="30" width="8" height="8" rx="1"/></g><rect x="27" y="44" width="10" height="12" fill="#2C3D66"/>',
    cruz: '<circle cx="32" cy="32" r="26" fill="#E5384F"/><path d="M27 15h10v12h12v10H37v12H27V37H15V27h12z" fill="#fff"/>',
    livro: '<path d="M10 14c8-3 15-2 22 3v35c-7-5-14-6-22-3z" fill="#2F9E8F"/><path d="M54 14c-8-3-15-2-22 3v35c7-5 14-6 22-3z" fill="#1F7F72"/>',
    casa: '<path d="M32 8L6 32h8v24h36V32h8z" fill="#D9663B"/><rect x="26" y="38" width="12" height="18" fill="#FFE29A"/>',
    cachorro: '<rect x="14" y="16" width="36" height="40" rx="18" fill="#B57B45"/><rect x="6" y="14" width="13" height="28" rx="6.500" fill="#7A4E2C"/><rect x="45" y="14" width="13" height="28" rx="6.500" fill="#7A4E2C"/><circle cx="25" cy="32" r="3.500" fill="#20130A"/><circle cx="39" cy="32" r="3.500" fill="#20130A"/><ellipse cx="32" cy="43" rx="6" ry="4.500" fill="#20130A"/>',
    gato: '<path d="M12 8l14 12h12L52 8v32a20 18 0 0 1-40 0z" fill="#8B8FA8"/><circle cx="25" cy="34" r="3.500" fill="#14162B"/><circle cx="39" cy="34" r="3.500" fill="#14162B"/><path d="M32 40l-3 3h6z" fill="#E5688A"/>',
    carro: '<path d="M6 40l5-15a6 6 0 0 1 6-4h30a6 6 0 0 1 6 4l5 15v9H6z" fill="#C9412A"/><path d="M16 25h32l3 11H13z" fill="#BEE3F5"/><circle cx="18" cy="49" r="6" fill="#20233D"/><circle cx="46" cy="49" r="6" fill="#20233D"/>',
    agua: '<path d="M32 6c8 13 18 22 18 33a18 18 0 0 1-36 0c0-11 10-20 18-33z" fill="#2F8FE0"/>',
    cafe: '<path d="M12 22h34v18a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z" fill="#8A5A34"/><path d="M46 26h4a7 7 0 0 1 0 14h-4" fill="none" stroke="#8A5A34" stroke-width="5"/><path d="M22 8v7M32 8v7" stroke="#A7ABC5" stroke-width="4" stroke-linecap="round"/>',
    pao: '<path d="M10 28c0-11 10-16 22-16s22 5 22 16c0 4-3 6-5 7v14a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V35c-2-1-5-3-5-7z" fill="#D9A15A"/>',
    maca: '<path d="M32 20c-6-5-22-3-22 15 0 13 9 23 15 23 3 0 4-2 7-2s4 2 7 2c6 0 15-10 15-23 0-18-16-20-22-15z" fill="#D92D3A"/><path d="M32 20c0-6 3-11 9-13" fill="none" stroke="#6B4A2A" stroke-width="4" stroke-linecap="round"/>',
    ovo: '<path d="M32 6c11 0 20 18 20 30a20 20 0 0 1-40 0C12 24 21 6 32 6z" fill="#EFD9B4" stroke="#C9A877" stroke-width="2"/>',
    aviao: '<path d="M58 8c-4-4-9-2-12 1L34 21 12 15l-5 5 18 11-9 10-8-2-4 4 11 6 6 11 4-4-2-8 10-9 11 18 5-5-6-22L55 20c3-3 7-8 3-12z" fill="#3F7CD6"/>',
    mala: '<rect x="10" y="20" width="44" height="34" rx="6" fill="#B8327F"/><path d="M23 20v-6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6" fill="none" stroke="#7E2157" stroke-width="5"/><path d="M10 34h44" stroke="#7E2157" stroke-width="4"/>',
    chave: '<circle cx="20" cy="22" r="13" fill="none" stroke="#E5A100" stroke-width="7"/><path d="M29 31l25 25M44 46l6-6M51 53l5-5" stroke="#E5A100" stroke-width="7" stroke-linecap="round"/>',
    relogio: '<circle cx="32" cy="32" r="25" fill="#fff" stroke="#3B4266" stroke-width="6"/><path d="M32 17v16l10 6" fill="none" stroke="#E5384F" stroke-width="5" stroke-linecap="round"/>',
    moeda: '<circle cx="32" cy="32" r="25" fill="#E8A200"/><circle cx="32" cy="32" r="17" fill="none" stroke="#fff" stroke-width="4"/>',
    musica: '<path d="M24 12l28-6v36" fill="none" stroke="#7C4DE8" stroke-width="6"/><path d="M24 12v38" stroke="#7C4DE8" stroke-width="6"/><ellipse cx="16" cy="50" rx="10" ry="7" fill="#7C4DE8"/><ellipse cx="44" cy="43" rx="10" ry="7" fill="#7C4DE8"/>'
  };
  const fig = n => `<svg viewBox="0 0 64 64" aria-hidden="true">${FIG[n] || ''}</svg>`;

  // Capi, a capivara com a laranja na cabeça. Desenho próprio do CapiFala.
  function capi(humor = 'feliz', cl = '') {
    const olhos = humor === 'triste'
      ? '<path d="M30 44l10-4M90 44l-10-4" stroke="#20130A" stroke-width="4" stroke-linecap="round"/><circle cx="36" cy="51" r="5" fill="#20130A"/><circle cx="84" cy="51" r="5" fill="#20130A"/>'
      : '<circle cx="36" cy="47" r="5.500" fill="#20130A"/><circle cx="84" cy="47" r="5.500" fill="#20130A"/><circle cx="38" cy="45" r="1.800" fill="#fff"/><circle cx="86" cy="45" r="1.800" fill="#fff"/>';
    const boca = humor === 'triste' ? '<path d="M50 99q10-6 20 0" fill="none" stroke="#20130A" stroke-width="3.500" stroke-linecap="round"/>'
      : '<path d="M60 88v5M47 93q13 9 26 0" fill="none" stroke="#20130A" stroke-width="3.500" stroke-linecap="round"/>';
    return `<svg class="mascote ${cl}" viewBox="0 0 120 120" role="img" aria-label="Capi, a capivara">
      <circle cx="60" cy="15" r="11" fill="#F58A1F"/><path d="M60 5c3-4 7-4 10-3-1 4-6 5-10 3z" fill="#3D9A5B"/>
      <circle cx="27" cy="30" r="7" fill="#7A4E2C"/><circle cx="93" cy="30" r="7" fill="#7A4E2C"/>
      <path d="M26 44c0-14 15-21 34-21s34 7 34 21v30c9 5 12 12 12 19 0 13-20 22-46 22s-46-9-46-22c0-7 3-14 12-19z" fill="#A9713F"/>
      <rect x="22" y="68" width="76" height="43" rx="21" fill="#C89463"/>
      ${olhos}<ellipse cx="48" cy="80" rx="4" ry="3" fill="#20130A"/><ellipse cx="72" cy="80" rx="4" ry="3" fill="#20130A"/>${boca}</svg>`;
  }

  /* Estado. Sincroniza na conta MedTech por mtsync.js: um documento por item (nos, itens, dias) e dois blocos gerais. */
  const COLECOES = { nos: { tipo: 'mapa' }, itens: { tipo: 'mapa' }, xpPorDia: { tipo: 'mapa' }, perfil: { tipo: 'doc' }, jogo: { tipo: 'doc' } };
  const CAMPOS = {
    perfil: ['onboard', 'nome', 'motivo', 'metaXp', 'criado'],
    jogo: ['xpTotal', 'vidas', 'moedas', 'ofensiva', 'missoes', 'liga', 'dobroAte', 'micAte', 'stats', 'cfg', 'conquistas']
  };
  // Antes de concluir as boas-vindas, perfil e jogo não sobem: num aparelho novo, os valores iniciais não podem cobrir os da conta.
  function lerColecao(c) {
    if (!CAMPOS[c]) return E[c];
    if (!E.onboard) return {};
    const o = {}; CAMPOS[c].forEach(k => { o[k] = E[k]; }); return o;
  }
  function gravarColecao(c, v) { if (!CAMPOS[c]) E[c] = v || {}; else if (v) CAMPOS[c].forEach(k => { if (k in v) E[k] = v[k]; }); }
  const novo = () => ({
    v: 1, criado: Date.now(), onboard: false, nome: '', motivo: '', metaXp: 20, xpTotal: 0, xpPorDia: {},
    vidas: { n: VIDAS_MAX, desde: null }, moedas: 100, ofensiva: { dias: 0, ultimo: null, folgas: 1, recorde: 0 },
    nos: {}, itens: {}, missoes: { data: '', lista: [] }, liga: { semana: '', divisao: 0, xp: 0, ultimaPos: null },
    dobroAte: 0, micAte: 0,
    stats: { licoes: 0, perfeitas: 0, historias: 0, baus: 0, comboMax: 0, falas: 0, revisoes: 0, unidades: 0, podios: 0 },
    cfg: { som: true, audio: true, mic: true }, conquistas: []
  });
  let E = carregar();
  function carregar() {
    try { const t = localStorage.getItem(CHAVE); if (t) return Object.assign(novo(), JSON.parse(t)); } catch (e) { /* armazenamento bloqueado: segue só em memória */ }
    return novo();
  }
  function gravaLocal() { try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) { /* sem espaço ou bloqueado */ } }
  function salvar() { gravaLocal(); if (window.MTS && MTS.motor) Object.keys(COLECOES).forEach(c => MTS.mudou(c)); }

  let tela = 'trilha', S = null, H = null;
  const temAudio = 'speechSynthesis' in window;
  const RecCls = window.SpeechRecognition || window.webkitSpeechRecognition;
  const audioOn = () => E.cfg.audio && (!!window.AUDIO || temAudio);
  const micOn = () => E.cfg.mic && !!RecCls && Date.now() > E.micAte;

  /* Tempo: vidas, ofensiva, missões, liga */
  function atualizaVidas() {
    const v = E.vidas;
    if (v.n >= VIDAS_MAX) { v.desde = null; return; }
    if (!v.desde) v.desde = Date.now();
    const ganhas = Math.floor((Date.now() - v.desde) / MS_VIDA);
    if (ganhas > 0) { v.n = Math.min(VIDAS_MAX, v.n + ganhas); v.desde = v.n >= VIDAS_MAX ? null : v.desde + ganhas * MS_VIDA; }
  }
  function minutosProximaVida() { return E.vidas.desde ? Math.max(1, Math.ceil((E.vidas.desde + MS_VIDA - Date.now()) / 60000)) : 0; }
  function perdeVida() { atualizaVidas(); if (E.vidas.n > 0) { E.vidas.n--; if (!E.vidas.desde) E.vidas.desde = Date.now(); } }
  function ganhaVida(n = 1) { E.vidas.n = Math.min(VIDAS_MAX, E.vidas.n + n); if (E.vidas.n >= VIDAS_MAX) E.vidas.desde = null; }

  function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; }

  const MISSOES = [
    { id: 'xp', txt: n => `Ganhe ${n} XP`, metas: [20, 30, 50], premio: 15 },
    { id: 'licoes', txt: n => `Conclua ${n} ${n > 1 ? 'lições' : 'lição'}`, metas: [1, 2, 3], premio: 15 },
    { id: 'perfeita', txt: () => 'Termine uma lição sem errar', metas: [1], premio: 20 },
    { id: 'combo', txt: n => `Acerte ${n} seguidas`, metas: [5, 10], premio: 15 },
    { id: 'revisao', txt: () => 'Faça uma revisão', metas: [1], premio: 15 },
    { id: 'historia', txt: () => 'Leia uma história', metas: [1], premio: 15 },
    { id: 'falas', txt: n => `Fale ${n} frases em voz alta`, metas: [2, 4], premio: 20 }
  ];
  function geraMissoes() {
    const d = hoje();
    if (E.missoes.data === d) return;
    const ord = MISSOES.slice().sort((a, b) => hash(d + a.id) - hash(d + b.id)).filter(m => m.id !== 'falas' || micOn()).slice(0, 3);
    E.missoes = { data: d, lista: ord.map(m => ({ id: m.id, meta: m.metas[Math.floor(hash(d + m.id + 'n') * m.metas.length)], feito: 0, premio: m.premio, pago: false })) };
  }
  function avancaMissao(id, n = 1) {
    geraMissoes();
    E.missoes.lista.forEach(m => {
      if (m.id !== id || m.pago) return;
      m.feito = id === 'combo' ? Math.max(m.feito, n) : m.feito + n;
      if (m.feito >= m.meta) { m.pago = true; E.moedas += m.premio; aviso(I.moeda(20), `Missão concluída: +${m.premio} moedas`); }
    });
  }
  const textoMissao = m => MISSOES.find(x => x.id === m.id).txt(m.meta);

  const DIVISOES = ['Cobre', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante'];
  function segundaFeira(ms) { const d = new Date(ms); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return M.dataLocal(d.getTime()); }
  function atualizaLiga() { const sem = segundaFeira(Date.now()); if (E.liga.semana !== sem) { E.liga.semana = sem; E.liga.xp = 0; G = { lista: [], sobem: 0, caem: 0, erro: false, carregou: false }; } }
  // Classificação vem do servidor (função mtLiga). Fica só em memória: é da semana e de outras pessoas.
  let G = { lista: [], sobem: 0, caem: 0, erro: false, carregou: false };
  async function sincronizaLiga() {
    if (!window.MTS || !MTS.usuario) return;
    try {
      const r = await MTS.chamar('mtLiga', { xp: E.liga.xp, nome: E.nome });
      G = { lista: r.lista || [], sobem: r.sobem || 0, caem: r.caem || 0, erro: false, carregou: true };
      E.liga.divisao = r.divisao || 0;
      const u = r.ultima;
      if (u && u.pos && u.semana !== E.liga.fechada) {
        E.liga.fechada = u.semana;
        if (u.pos <= 3 && u.total >= 3) { E.stats.podios++; const p = [100, 60, 40][u.pos - 1]; E.moedas += p; aviso(I.liga(20), `${u.pos}º lugar na semana passada: +${p} moedas`); }
        if (u.divisao > u.divisaoAntes) aviso(I.liga(20), `Você subiu para a Liga ${DIVISOES[u.divisao]}`);
        confereConquistas();
      }
      salvar();
    } catch (e) { G.erro = true; G.carregou = true; }
    if (!S && !H && !$('#folha') && E.onboard) desenha();
  }

  function tique() { atualizaVidas(); M.ajustaOfensiva(E.ofensiva, hoje()); geraMissoes(); atualizaLiga(); salvar(); }

  /* Conquistas */
  const CONQ = [
    { id: 'l1', nome: 'Primeira conversa', d: 'Conclua 1 lição', m: 1, v: s => s.stats.licoes, ic: 'trilha', cor: 'coral' },
    { id: 'l20', nome: 'Pegando o ritmo', d: 'Conclua 20 lições', m: 20, v: s => s.stats.licoes, ic: 'trilha', cor: 'azul' },
    { id: 'o7', nome: 'Uma semana inteira', d: '7 dias de ofensiva', m: 7, v: s => s.ofensiva.recorde, ic: 'fogo', cor: 'coral' },
    { id: 'o30', nome: 'Hábito formado', d: '30 dias de ofensiva', m: 30, v: s => s.ofensiva.recorde, ic: 'fogo', cor: 'magenta' },
    { id: 'x500', nome: 'Meio milhar', d: 'Some 500 XP', m: 500, v: s => s.xpTotal, ic: 'raio', cor: 'indigo' },
    { id: 'x2k', nome: 'Dois mil', d: 'Some 2.000 XP', m: 2000, v: s => s.xpTotal, ic: 'raio', cor: 'teal' },
    { id: 'p5', nome: 'Sem tropeço', d: '5 lições sem errar', m: 5, v: s => s.stats.perfeitas, ic: 'ok', cor: 'teal' },
    { id: 'c20', nome: 'Sequência longa', d: 'Acerte 20 seguidas', m: 20, v: s => s.stats.comboMax, ic: 'raio', cor: 'ambar' },
    { id: 'h6', nome: 'Leitor de histórias', d: 'Leia 6 histórias', m: 6, v: s => s.stats.historias, ic: 'historia', cor: 'magenta' },
    { id: 'f20', nome: 'Boca no mundo', d: 'Fale 20 frases', m: 20, v: s => s.stats.falas, ic: 'mic', cor: 'azul' },
    { id: 'u1', nome: 'Primeira unidade', d: 'Passe em 1 revisão de unidade', m: 1, v: s => s.stats.unidades, ic: 'bandeira', cor: 'indigo' },
    { id: 'u6', nome: 'Metade do caminho', d: 'Passe em 6 unidades', m: 6, v: s => s.stats.unidades, ic: 'bandeira', cor: 'ambar' },
    { id: 'u12', nome: 'Curso completo', d: 'Passe nas 12 unidades', m: 12, v: s => s.stats.unidades, ic: 'bandeira', cor: 'teal' },
    { id: 'pod', nome: 'No pódio', d: 'Fique entre os 3 da liga', m: 1, v: s => s.stats.podios, ic: 'liga', cor: 'ambar' }
  ];
  function confereConquistas() {
    CONQ.forEach(c => {
      if (!E.conquistas.includes(c.id) && c.v(E) >= c.m) { E.conquistas.push(c.id); E.moedas += 25; aviso(I.liga(20), `Conquista: ${c.nome} (+25 moedas)`); }
    });
  }

  /* Trilha */
  function listaNos() {
    const v = [];
    C.unidades.forEach(u => {
      const [a, b, c] = u.licoes, li = l => ({ id: l.id, tipo: 'licao', titulo: l.titulo, un: u, licao: l });
      v.push(li(a), li(b), { id: 'bau-' + u.id, tipo: 'bau', titulo: 'Baú', un: u }, li(c),
        { id: 'hist-' + u.id, tipo: 'historia', titulo: C.historias[u.historia].titulo, un: u },
        { id: 'rev-' + u.id, tipo: 'revisao', titulo: 'Revisão da unidade', un: u });
    });
    return v;
  }
  const NOS = listaNos();
  const feito = id => !!(E.nos[id] && E.nos[id].feito);
  const idxAtual = () => { const i = NOS.findIndex(n => !feito(n.id)); return i < 0 ? NOS.length : i; };
  const liberado = i => i <= idxAtual();
  function licoesFeitas() { return NOS.filter(n => n.tipo === 'licao' && E.nos[n.id] && E.nos[n.id].rodadas > 0); }

  const DESLOC = [0, 44, 68, 44, 0, -44, -68, -44];
  function renderTrilha() {
    const atual = idxAtual();
    let h = `<div class="trilha">`, i = 0;
    C.unidades.forEach((u, ui) => {
      const nos = NOS.filter(n => n.un === u);
      h += `<section data-cor="${u.cor}"><div class="faixa" ${nos.some(n => NOS.indexOf(n) === atual) ? 'id="unidade-atual"' : ''}><div><div class="rot">Unidade ${ui + 1}</div><h2>${esc(u.titulo)}</h2><p>${esc(u.objetivo)}</p></div>
        <button data-a="guia" data-v="${u.id}">${I.livro(18)} Guia</button></div><div class="caminho">`;
      nos.forEach((n, k) => {
        const idx = i++, x = DESLOC[idx % 8], xAnt = DESLOC[(idx + 7) % 8];
        if (k > 0) h += `<svg class="elo ${idx <= atual ? 'feito' : ''}" viewBox="0 0 200 30" aria-hidden="true"><path d="M${100 + xAnt} 0C${100 + xAnt} 15 ${100 + x} 15 ${100 + x} 30" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 11"/></svg>`;
        const fez = feito(n.id), trav = idx > atual, eAtual = idx === atual, rod = (E.nos[n.id] && E.nos[n.id].rodadas) || 0;
        const icone = fez ? I.ok(34) : trav ? ({ licao: I.trilha, bau: I.bau, historia: I.historia, revisao: I.bandeira }[n.tipo])(30)
          : ({ licao: I.raio, bau: I.bau, historia: I.historia, revisao: I.bandeira }[n.tipo])(32);
        const anel = eAtual && n.tipo === 'licao' && rod > 0 ? ` <span class="pequeno"> ${rod}/${RODADAS}</span>` : '';
        h += `<div class="no-lin" style="transform:translateX(${x}px)">
          ${eAtual ? `<div class="bolha">${rod ? 'Continuar' : 'Começar'}</div>` : ''}
          <button class="no ${trav ? 'travado' : ''} ${eAtual ? 'atual' : ''}" data-a="no" data-v="${idx}" aria-label="${esc(n.titulo)}${trav ? ', bloqueado' : fez ? ', concluído' : ''}">${icone}</button>
          <div class="no-nome">${esc(n.titulo)}${anel}</div></div>`;
      });
      h += `</div></section>`;
    });
    if (atual >= NOS.length) h += `<div class="cartao" style="align-items:center;text-align:center">${capi('feliz', 'p')}<h2>Você terminou as 12 unidades</h2><p class="sutil">As próximas unidades ainda serão escritas. Enquanto isso, a aba Praticar mantém o que você aprendeu.</p></div>`;
    return h + `</div>`;
  }

  function abrirNo(idx) {
    const n = NOS[idx];
    if (!liberado(idx)) return folha(`<div data-cor="${n.un.cor}" style="display:contents"><h2>${esc(n.titulo)}</h2><p class="sutil">Conclua as etapas anteriores da trilha para liberar.</p><button class="bt claro largo" data-a="fecharFolha">Entendi</button></div>`);
    if (n.tipo === 'bau') { if (feito(n.id)) return folha(`<h2>Baú já aberto</h2><p class="sutil">Cada baú da trilha abre uma vez.</p><button class="bt claro largo" data-a="fecharFolha">Fechar</button>`); return abrirBau(n); }
    const rod = (E.nos[n.id] && E.nos[n.id].rodadas) || 0;
    const det = { licao: feito(n.id) ? 'Concluída. Pode refazer para fixar.' : `Rodada ${rod + 1} de ${RODADAS}. ${rod ? 'Agora você escreve e fala as frases.' : 'Primeiro contato com as palavras.'}`,
      historia: 'Um diálogo curto com perguntas de compreensão. Erro aqui não gasta vida.', revisao: 'Mistura toda a unidade em frases para traduzir, ouvir e escrever.' }[n.tipo];
    folha(`<div data-cor="${n.un.cor}" style="display:contents"><h2>${esc(n.titulo)}</h2><p class="sutil">${det}</p><button class="bt largo" data-a="iniciarNo" data-v="${idx}">${feito(n.id) ? 'Refazer' : 'Começar'}</button><button class="link" data-a="fecharFolha">Agora não</button></div>`);
  }

  function abrirBau(n) {
    const v = 15 + Math.floor(Math.random() * 26);
    E.nos[n.id] = { feito: true }; E.moedas += v; E.stats.baus++; salvar();
    bip('fim'); confete();
    folha(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">${capi('feliz', 'mascote-pula')}<h2>Baú aberto</h2><div class="premio"><b class="ind moeda">${I.moeda(20)} ${v}</b>moedas</div><button class="bt largo" data-a="fecharFolha">Continuar</button></div>`);
    desenha();
  }

  /* Telas */
  const NAV = [['trilha', 'Trilha', 'indigo'], ['praticar', 'Praticar', 'teal'], ['missoes', 'Missões', 'coral'], ['liga', 'Liga', 'ambar'], ['loja', 'Loja', 'magenta'], ['perfil', 'Perfil', 'azul']];
  const NAV_CEL = [['trilha', 'Trilha', 'indigo'], ['praticar', 'Praticar', 'teal'], ['missoes', 'Missões', 'coral'], ['perfil', 'Perfil', 'azul'], ['mais', 'Mais', 'ambar']];
  const navItem = ([id, nome, cor]) => `<button class="nav-item ${tela === id || (id === 'mais' && (tela === 'liga' || tela === 'loja' || tela === 'mais')) ? 'ativo' : ''}" data-cor="${cor}" data-a="ir" data-v="${id}"><span class="nav-bola">${I[id](22)}</span><span>${nome}</span></button>`;

  function indicadores() {
    const of = E.ofensiva, feitoHoje = of.ultimo === hoje();
    return `<span class="ind fogo ${feitoHoje ? '' : 'apagado'}" title="Ofensiva">${I.fogo(22)} ${of.dias}</span>
      <span class="ind xp" title="XP de hoje">${I.raio(22)} ${E.xpPorDia[hoje()] || 0}</span>
      <span class="ind moeda" title="Moedas">${I.moeda(22)} ${E.moedas}</span>
      <span class="ind vida" title="Vidas">${I.vida(22)} ${E.vidas.n}</span>`;
  }

  function cartaoMeta() {
    const x = E.xpPorDia[hoje()] || 0, p = Math.min(100, x / E.metaXp * 100);
    return `<div class="cartao" data-cor="indigo"><h3>Meta de hoje</h3><div class="barra-prog"><i style="width:${p}%"></i></div><p class="sutil pequeno">${x} de ${E.metaXp} XP${x >= E.metaXp ? '. Meta cumprida.' : ''}</p></div>`;
  }
  function listaMissoes() {
    return E.missoes.lista.map(m => `<div><div style="display:flex;justify-content:space-between;gap:8px;font-weight:700"><span>${esc(textoMissao(m))}</span><span class="ind moeda pequeno">${m.pago ? I.ok(18) : I.moeda(16) + ' ' + m.premio}</span></div>
      <div class="barra-prog" style="margin-top:6px"><i style="width:${Math.min(100, m.feito / m.meta * 100)}%"></i></div></div>`).join('');
  }

  function renderPainel() {
    const pos = G.lista.findIndex(x => x.eu) + 1;
    return `<div class="linha-ind">${indicadores()}</div>${cartaoMeta()}
      <div class="cartao" data-cor="coral"><h3>Missões do dia</h3>${listaMissoes()}</div>
      <button class="item" data-cor="ambar" data-a="ir" data-v="liga"><span class="bola">${I.liga(24)}</span><div><h3>Liga ${DIVISOES[E.liga.divisao]}</h3><p class="sutil pequeno">${pos ? `Você está em ${pos}º lugar com ${E.liga.xp} XP` : 'Termine uma lição para entrar na liga desta semana'}</p></div></button>`;
  }

  function renderPraticar() {
    const itens = Object.keys(E.itens), vencidos = itens.filter(k => E.itens[k].proximo <= Date.now()).length;
    const palavras = itens.filter(k => k.startsWith('w:')).sort((a, b) => E.itens[a].forca - E.itens[b].forca);
    const sem = !licoesFeitas().length;
    const card = (a, ic, cor, t, d, dis) => `<button class="item" data-cor="${cor}" data-a="pratica" data-v="${a}" ${dis ? 'disabled' : ''}><span class="bola">${ic}</span><div><h3>${t}</h3><p class="sutil pequeno">${d}</p></div></button>`;
    return `<div class="tela" data-cor="teal"><h1>Praticar</h1>
      <p class="sutil">Praticar não gasta vida, e cada sessão terminada devolve uma.</p>
      ${sem ? `<div class="cartao" style="align-items:center;text-align:center">${capi('feliz', 'p')}<p>Conclua a primeira lição para liberar a prática.</p></div>` : ''}
      ${card('revisao', I.praticar(24), 'teal', 'Revisão do dia', vencidos ? `${vencidos} ${vencidos > 1 ? 'itens vencidos' : 'item vencido'} para rever` : 'Nada vencido. Treine os itens mais fracos.', !itens.length)}
      ${card('ouvir', I.audio(24), 'azul', 'Ouvir', audioOn() ? 'Escreva o que escutou' : 'Ative o áudio no Perfil', sem || !audioOn())}
      ${card('falar', I.mic(24), 'magenta', 'Falar', micOn() ? 'Repita frases em voz alta' : 'Reconhecimento de voz indisponível neste navegador', sem || !micOn())}
      ${card('escrever', I.escrever(24), 'indigo', 'Escrever', 'Traduza frases digitando', sem)}
      ${palavras.length ? `<div class="cartao"><h3>Palavras que você já viu (${palavras.length})</h3>${palavras.slice(0, 40).map(k => { const it = M.todasPalavras(C).find(p => p[0] === k.slice(2)); return it ? `<div style="display:flex;align-items:center;gap:12px"><span style="flex:1;min-width:0"><b>${esc(it[0])}</b> <span class="sutil">${esc(it[1])}</span></span><div class="barra-prog" style="width:80px;flex:none"><i style="width:${E.itens[k].forca * 20}%"></i></div></div>` : ''; }).join('')}</div>` : ''}
    </div>`;
  }

  function renderMissoes() {
    return `<div class="tela" data-cor="coral"><h1>Missões do dia</h1><p class="sutil">Trocam à meia-noite. As moedas caem na hora em que você completa.</p>
      ${cartaoMeta()}<div class="cartao">${listaMissoes()}</div>
      <h2>Conquistas</h2>${CONQ.map(c => { const v = Math.min(c.m, c.v(E)), ok = E.conquistas.includes(c.id); return `<div class="item" data-cor="${c.cor}"><span class="bola" style="${ok ? '' : 'background:var(--travado);color:var(--travadoTxt)'}">${I[c.ic](24)}</span><div><h3>${c.nome}</h3><p class="sutil pequeno">${c.d}</p><div class="barra-prog" style="margin-top:6px"><i style="width:${v / c.m * 100}%"></i></div></div><span class="pequeno sutil" style="font-variant-numeric:tabular-nums">${v}/${c.m}</span></div>`; }).join('')}</div>`;
  }

  function renderLiga() {
    const L = G.lista, n = L.length, restam = 7 - ((new Date().getDay() + 6) % 7);
    const regra = G.sobem ? `Neste grupo, ${G.sobem === 1 ? 'o primeiro sobe' : `os ${G.sobem} primeiros sobem`} de divisão${G.caem ? ` e os ${G.caem} últimos descem` : ''}.` : 'Com pelo menos 3 pessoas no grupo, os primeiros sobem de divisão.';
    const corpo = !G.carregou && window.MTS ? '<p class="sutil">Carregando a classificação...</p>'
      : G.erro && !n ? `<p class="sutil">Não consegui abrir a liga. Confira a internet e tente de novo.</p><button class="bt claro" data-a="ligaTentar">Tentar de novo</button>`
      : !n ? `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">${capi('feliz', 'p')}<p>Termine uma lição para entrar em um grupo desta semana.</p></div>`
      : L.map((x, i) => `${G.sobem && i === G.sobem && n > G.sobem ? '<div class="corte">Zona de subida acima</div>' : ''}${G.caem && i === n - G.caem ? '<div class="corte">Zona de queda abaixo</div>' : ''}<div class="rank ${x.eu ? 'eu' : ''}"><b>${i + 1}</b><span>${esc(x.nome)}</span><span>${x.xp} XP</span></div>`).join('');
    return `<div class="tela" data-cor="ambar"><h1>Liga ${DIVISOES[E.liga.divisao]}</h1>
      <p class="sutil">${regra} ${restam === 1 ? 'Fecha hoje.' : `Fecha em ${restam} dias.`}</p>
      <p class="pequeno sutil">Na liga aparecem só o nome que você escolheu no Perfil e o seu XP.</p>
      <div class="cartao" style="gap:2px">${corpo}</div></div>`;
  }

  function renderLoja() {
    atualizaVidas();
    const dobroAtivo = E.dobroAte > Date.now();
    const linha = (a, ic, cor, t, d, preco, dis, rotulo = 'Cheio') => `<div class="item" data-cor="${cor}"><span class="bola">${ic}</span><div><h3>${t}</h3><p class="sutil pequeno">${d}</p></div><button class="bt mini" data-a="comprar" data-v="${a}" ${dis || E.moedas < preco ? 'disabled' : ''}>${dis ? rotulo : preco}</button></div>`;
    return `<div class="tela" data-cor="magenta"><h1>Loja</h1><div class="ind moeda" style="font-size:20px">${I.moeda(24)} ${E.moedas} moedas</div>
      ${linha('vidas', I.vida(24), 'coral', 'Recarregar vidas', E.vidas.n >= VIDAS_MAX ? 'Suas vidas estão cheias.' : `Você tem ${E.vidas.n}. A próxima volta em ${minutosProximaVida()} min.`, PRECO_VIDAS, E.vidas.n >= VIDAS_MAX)}
      ${linha('folga', I.gelo(24), 'azul', 'Folga da ofensiva', `Protege a ofensiva em um dia sem estudo. Você tem ${E.ofensiva.folgas} de 2.`, PRECO_FOLGA, E.ofensiva.folgas >= 2)}
      ${linha('dobro', I.raio(24), 'indigo', 'XP em dobro por 15 min', dobroAtivo ? `Ativo por mais ${Math.ceil((E.dobroAte - Date.now()) / 60000)} min.` : 'Vale para tudo que você concluir nesse tempo.', PRECO_DOBRO, dobroAtivo, 'Ativo')}
    </div>`;
  }

  function renderMais() {
    return `<div class="tela"><h1>Mais</h1>
      <button class="item" data-cor="ambar" data-a="ir" data-v="liga"><span class="bola">${I.liga(24)}</span><div><h3>Liga</h3><p class="sutil pequeno">Classificação da semana</p></div></button>
      <button class="item" data-cor="magenta" data-a="ir" data-v="loja"><span class="bola">${I.loja(24)}</span><div><h3>Loja</h3><p class="sutil pequeno">Vidas, folgas e XP em dobro</p></div></button></div>`;
  }

  function renderPerfil() {
    const of = E.ofensiva, dias = [];
    const agora = new Date(); agora.setHours(12, 0, 0, 0);
    const inicio = new Date(agora); inicio.setDate(agora.getDate() - ((agora.getDay() + 6) % 7) - 21);
    for (let i = 0; i < 28; i++) { const d = new Date(inicio); d.setDate(inicio.getDate() + i); dias.push(d); }
    const ult7 = []; for (let i = 6; i >= 0; i--) { const d = new Date(agora); d.setDate(agora.getDate() - i); ult7.push(d); }
    const maxX = Math.max(E.metaXp, ...ult7.map(d => E.xpPorDia[M.dataLocal(d.getTime())] || 0));
    const sigla = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const palavras = Object.keys(E.itens).filter(k => k.startsWith('w:')).length;
    const ch = (id, t, sub) => `<button class="interruptor" data-a="cfg" data-v="${id}" role="switch" aria-checked="${E.cfg[id]}"><span>${t}${sub ? `<br><span class="sutil pequeno" style="font-weight:400">${sub}</span>` : ''}</span><span class="chave ${E.cfg[id] ? 'on' : ''}"></span></button>`;
    return `<div class="tela" data-cor="azul"><div style="display:flex;align-items:center;gap:14px">${capi('feliz', 'p')}<div style="flex:1;min-width:0"><label class="sutil pequeno" for="nome">Nome na liga</label><input type="text" id="nome" value="${esc(E.nome)}" placeholder="Estudante" maxlength="24" autocomplete="off"></div></div>
      <div class="grade2">
        <div class="cartao"><span class="num ind fogo">${I.fogo(22)} ${of.dias}</span><span class="sutil pequeno">Dias de ofensiva (recorde ${of.recorde})</span></div>
        <div class="cartao"><span class="num ind xp">${I.raio(22)} ${E.xpTotal}</span><span class="sutil pequeno">XP no total</span></div>
        <div class="cartao"><span class="num">${E.stats.licoes}</span><span class="sutil pequeno">Lições concluídas</span></div>
        <div class="cartao"><span class="num">${palavras}</span><span class="sutil pequeno">Palavras vistas</span></div>
      </div>
      <div class="cartao"><h3>Últimas 4 semanas</h3><div class="calendario">${dias.map(d => { const k = M.dataLocal(d.getTime()); return `<div class="dia ${E.xpPorDia[k] ? 'fez' : ''} ${k === hoje() ? 'hoje' : ''}">${d.getDate()}</div>`; }).join('')}</div></div>
      <div class="cartao"><h3>XP dos últimos 7 dias</h3><div class="colunas">${ult7.map(d => { const v = E.xpPorDia[M.dataLocal(d.getTime())] || 0; return `<div class="coluna"><span>${v || ''}</span><i style="height:${Math.max(3, v / maxX * 70)}%"></i><span>${sigla[d.getDay()]}</span></div>`; }).join('')}</div></div>
      <div class="cartao"><h3>Meta diária</h3><div class="seg">${[10, 20, 30, 50].map(x => `<button class="${E.metaXp === x ? 'ativo' : ''}" data-a="meta" data-v="${x}">${x} XP</button>`).join('')}</div></div>
      <div class="cartao"><h3>Ajustes</h3>${ch('som', 'Sons de acerto e erro')}${ch('audio', 'Áudio em inglês', 'Frases gravadas com voz neural.')}${ch('mic', 'Exercícios de fala', RecCls ? 'Pede acesso ao microfone na primeira vez.' : 'Este navegador não reconhece voz. No computador, use o Chrome.')}</div>
      <div class="cartao"><h3>Conta</h3>${window.MTS && MTS.usuario ? `<p>${esc(MTS.usuario.email || '')}</p><p class="sutil pequeno" id="contaSit"></p><button class="bt claro" data-a="sair_conta">Sair</button>` : '<p class="sutil pequeno">Sem conta neste modo.</p>'}</div></div>`;
  }

  function desenha() {
    if (!E.onboard) { $('#lateral').innerHTML = ''; $('#painel').innerHTML = ''; $('#barra').innerHTML = ''; return renderOnboard(); }
    $('#lateral').innerHTML = `<div class="marca">${capi('feliz').replace('class="mascote ', 'width="38" height="38" class="')}<span>CapiFala</span></div>${NAV.map(navItem).join('')}`;
    $('#barra').innerHTML = NAV_CEL.map(navItem).join('');
    $('#painel').innerHTML = renderPainel();
    const conteudo = { trilha: renderTrilha, praticar: renderPraticar, missoes: renderMissoes, liga: renderLiga, loja: renderLoja, perfil: renderPerfil, mais: renderMais }[tela]();
    $('#principal').innerHTML = `<div class="topo">${indicadores()}</div>${conteudo}`;
  }

  function vaiParaAtual() {
    if (tela !== 'trilha') return;
    const n = document.querySelector('.no.atual');
    if (n) n.scrollIntoView({ block: 'center' });
  }

  /* Boas-vindas */
  let onb = { passo: 0 };
  function renderOnboard() {
    const op = (a, v, t, d) => `<button class="op" data-a="${a}" data-v="${v}"><span><b>${t}</b>${d ? `<br><span class="sutil pequeno" style="font-weight:400">${d}</span>` : ''}</span></button>`;
    const passos = [
      () => `${capi('feliz', 'mascote-pula')}<h1>Inglês em lições curtas</h1><p class="sutil" style="max-width:380px">Sou a Capi. Em poucos minutos por dia você aprende a se virar em inglês, com explicações em português sobre os erros que brasileiro mais comete.</p><button class="bt" data-a="onbPasso" data-v="1">Começar</button>`,
      () => `${capi('feliz', 'p')}<h2>Para que você quer inglês?</h2><div class="onb-ops">${op('onbMotivo', 'viagem', 'Viajar')}${op('onbMotivo', 'trabalho', 'Trabalho')}${op('onbMotivo', 'estudo', 'Estudo e provas')}${op('onbMotivo', 'lazer', 'Filmes, música e lazer')}</div>`,
      () => `${capi('feliz', 'p')}<h2>Quanto você já sabe?</h2><div class="onb-ops">${op('onbNivel', '0', 'Estou começando do zero', 'A trilha começa em cumprimentos.')}${op('onbNivel', '1', 'Sei o básico', 'Pula a Unidade 1. Você pode voltar a ela quando quiser.')}</div>`,
      () => `${capi('feliz', 'p')}<h2>Qual é a sua meta diária?</h2><div class="onb-ops">${op('onbMeta', '10', 'Leve', '10 XP, cerca de 3 minutos')}${op('onbMeta', '20', 'Regular', '20 XP, cerca de 6 minutos')}${op('onbMeta', '30', 'Firme', '30 XP, cerca de 10 minutos')}${op('onbMeta', '50', 'Intensa', '50 XP, cerca de 15 minutos')}</div>`
    ];
    $('#camada').innerHTML = `<div class="sessao"><div class="final" data-cor="indigo">${passos[onb.passo]()}</div></div>`;
  }

  /* Folha, avisos, som, confete */
  function folha(html) { fecharFolha(); const f = document.createElement('div'); f.className = 'fundo'; f.id = 'folha'; f.innerHTML = `<div class="folha" role="dialog" aria-modal="true">${html}</div>`; f.addEventListener('click', e => { if (e.target === f && !f.dataset.fixa) fecharFolha(); }); document.body.appendChild(f); return f; }
  function fecharFolha() { const f = $('#folha'); if (f) f.remove(); }
  function aviso(ic, txt) { const a = document.createElement('div'); a.className = 'aviso'; a.innerHTML = `${ic}<span>${esc(txt)}</span>`; $('#avisos').appendChild(a); setTimeout(() => a.remove(), 3200); }
  let ctx = null;
  function bip(tipo) {
    if (!E.cfg.som) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const notas = { certo: [[660, 0], [880, .09]], erro: [[220, 0], [180, .12]], fim: [[523, 0], [659, .1], [784, .2], [1047, .3]], par: [[740, 0]] }[tipo];
      notas.forEach(([f, t]) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.12, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + t + .22); o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + .24); });
    } catch (e) { /* sem áudio */ }
  }
  function confete() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cores = ['#C9412A', '#1F6FD1', '#B8327F', '#E8A200', '#0E7C7B', '#5145D6'];
    for (let i = 0; i < 44; i++) { const c = document.createElement('i'); c.className = 'confete'; c.style.left = Math.random() * 100 + 'vw'; c.style.background = cores[i % 6]; c.style.animationDelay = Math.random() * .4 + 's'; c.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px'); document.body.appendChild(c); setTimeout(() => c.remove(), 2200); }
  }

  /* Voz: arquivos gerados pela voz neural; a voz do aparelho só entra se o arquivo falhar */
  let vozEscolhida = null, tocador = null;
  function melhorVoz() {
    if (vozEscolhida) return vozEscolhida;
    const v = speechSynthesis.getVoices().filter(x => /^en[-_]/i.test(x.lang));
    vozEscolhida = v.find(x => /premium|enhanced|neural|natural|google us/i.test(x.name)) || v.find(x => /samantha|ava|allison/i.test(x.name)) || v.find(x => /en[-_]us/i.test(x.lang)) || v[0] || null;
    return vozEscolhida;
  }
  function vozDoAparelho(t, lento) {
    if (!temAudio) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; const v = melhorVoz(); if (v) u.voice = v; u.rate = lento ? .6 : .92; speechSynthesis.speak(u); } catch (e) { /* sem voz */ }
  }
  function falar(t, lento) {
    if (!audioOn() || !t) return;
    if (tocador) { tocador.pause(); tocador = null; }
    const arq = window.AUDIO && window.AUDIO[t];
    if (!arq) return; // ficha solta sem gravação fica em silêncio
    const a = new Audio('audio/' + arq);
    a.playbackRate = lento ? .7 : 1; a.preservesPitch = true;
    let caiu = false; const cai = () => { if (!caiu) { caiu = true; vozDoAparelho(t, lento); } };
    a.onerror = cai; tocador = a;
    const p = a.play(); if (p) p.catch(e => { if (e.name !== 'AbortError') cai(); });
  }

  /* Sessão de exercícios */
  function comecar(fila, opcoes) {
    if (!fila.length) return aviso(I.praticar(20), 'Nada para praticar agora.');
    S = Object.assign({ fila, total: fila.length, certos: 0, erros: 0, combo: 0, comboMax: 0, inicio: Date.now(), semVida: false, falas: 0 }, opcoes);
    novoExercicio();
  }
  function cfgEx() { return { audio: audioOn(), mic: micOn() }; }

  function novoExercicio() {
    const e = S.fila[0];
    S.resp = null; S.fase = 'responder'; S.tentFala = 0; S.fichasUsadas = []; S.parSel = null; S.paresFeitos = new Set();
    renderSessao();
    if (e.soAudio) setTimeout(() => falar(e.falar), 260);
  }

  function coracoes() { return S.semVida ? `<span class="ind sutil pequeno">Prática</span>` : `<span class="ind vida">${I.vida(22)} ${E.vidas.n}</span>`; }

  function renderSessao() {
    const e = S.fila[0], pct = S.certos / S.total * 100;
    $('#camada').innerHTML = `<div class="sessao" data-cor="${S.cor || 'indigo'}">
      <div class="s-topo"><button class="fechar" data-a="sair" aria-label="Sair da lição">${I.fechar(26)}</button><div class="barra-prog" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>${coracoes()}</div>
      <div class="s-corpo"><div class="s-miolo"><div class="combo">${S.combo >= 3 ? `${S.combo} seguidas` : ''}</div><div class="enunciado">${esc(e.enunciado)}</div>${corpoExercicio(e)}</div></div>
      <div class="s-pe" id="pe">${rodape(e)}</div></div>`;
    const area = $('#digitado'); if (area) { area.value = S.resp || ''; area.focus(); }
  }

  function blocoOrigem(e) {
    if (e.soAudio) return `<div class="central"><button class="falante grande" data-a="ouvir" aria-label="Ouvir de novo">${I.audio(40)}</button><button class="falante lento" data-a="ouvirLento" aria-label="Ouvir devagar">${I.lento(28)}</button></div>`;
    if (e.origem) return `<div class="origem">${e.falar ? `<button class="falante" data-a="ouvir" aria-label="Ouvir">${I.audio(24)}</button>` : ''}<div class="frase" ${e.falar ? 'lang="en"' : ''}>${esc(e.origem)}</div></div>`;
    return '';
  }

  function corpoExercicio(e) {
    if (e.tipo === 'imagem') return `<div class="imagens">${e.opcoes.map((o, i) => `<button class="img-op" data-a="escolhe" data-v="${i}"><span>${fig(o.icone)}</span><span lang="en">${esc(o.texto)}</span></button>`).join('')}</div>`;
    if (e.tipo === 'escolha') return `${e.destaque ? `<div class="origem">${audioOn() ? `<button class="falante" data-a="ouvir" aria-label="Ouvir">${I.audio(24)}</button>` : ''}<div class="frase" lang="en" style="font-size:26px;font-weight:800">${esc(e.destaque)}</div></div>` : ''}<div class="opcoes">${e.opcoes.map((o, i) => `<button class="op" data-a="escolhe" data-v="${i}"><kbd>${i + 1}</kbd><span ${o.ingles ? 'lang="en"' : ''}>${esc(o.texto)}</span></button>`).join('')}</div>`;
    if (e.tipo === 'lacuna') return `<div class="lacuna" lang="en">${esc(e.antes)} <span class="buraco" id="buraco">&nbsp;</span> ${esc(e.depois)}</div><p class="sutil">${esc(e.traducao)}</p><div class="opcoes">${e.opcoes.map((o, i) => `<button class="op" data-a="escolhe" data-v="${i}"><kbd>${i + 1}</kbd><span lang="en">${esc(o.texto)}</span></button>`).join('')}</div>`;
    if (e.tipo === 'montar') return `${blocoOrigem(e)}<div class="resposta" id="resposta">${S.fichasUsadas.map(i => `<button class="ficha" data-a="tiraFicha" data-v="${i}">${esc(e.fichas[i])}</button>`).join('')}</div><div class="banco">${e.fichas.map((t, i) => `<button class="ficha ${S.fichasUsadas.includes(i) ? 'usada' : ''}" data-a="poeFicha" data-v="${i}">${esc(t)}</button>`).join('')}</div>`;
    if (e.tipo === 'digitar') return `${blocoOrigem(e)}<textarea class="area" id="digitado" rows="3" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="${e.idioma === 'en' ? 'Escreva em inglês' : 'Escreva em português'}" aria-label="Sua resposta"></textarea>`;
    if (e.tipo === 'pares') return `<div class="pares"><div>${e.esquerda.map(x => `<button class="par" lang="en" data-a="par" data-v="e:${esc(x.id)}">${esc(x.texto)}</button>`).join('')}</div><div>${e.direita.map(x => `<button class="par" data-a="par" data-v="d:${esc(x.id)}">${esc(x.texto)}</button>`).join('')}</div></div>`;
    if (e.tipo === 'falar') return `<div class="origem"><button class="falante" data-a="ouvir" aria-label="Ouvir">${I.audio(24)}</button><div><div class="frase" lang="en">${esc(e.alvo)}</div><div class="sutil">${esc(e.traducao)}</div></div></div><button class="mic" id="mic" data-a="gravar" aria-label="Gravar sua fala">${I.mic(40)}</button><p class="sutil" id="micMsg" style="text-align:center">Toque e fale a frase</p>`;
    return '';
  }

  function rodape(e) {
    if (e.tipo === 'pares') return `<div class="s-pe-in"><p class="sutil pequeno" style="text-align:center">Toque em uma palavra de cada coluna.</p></div>`;
    if (e.tipo === 'falar') return `<div class="s-pe-in"><button class="bt claro largo" data-a="pularFala">Não posso falar agora</button></div>`;
    return `<div class="s-pe-in"><button class="bt largo" id="verificar" data-a="verificar" ${temResposta(e) ? '' : 'disabled'}>Verificar</button></div>`;
  }
  function temResposta(e) {
    if (e.tipo === 'montar') return S.fichasUsadas.length > 0;
    if (e.tipo === 'digitar') return !!(S.resp && S.resp.trim());
    return S.resp !== null && S.resp !== undefined;
  }
  function liberaVerificar() { const b = $('#verificar'); if (b) b.disabled = !temResposta(S.fila[0]); }

  function verificar() {
    if (!S || S.fase !== 'responder') return;
    const e = S.fila[0];
    if (!temResposta(e)) return;
    let res = 'errado';
    if (e.opcoes) res = e.opcoes[S.resp].certa ? 'certo' : 'errado';
    else if (e.tipo === 'montar') res = M.corrige(S.fichasUsadas.map(i => e.fichas[i]).join(' '), e.aceitas, e.idioma, false);
    else if (e.tipo === 'digitar') res = M.corrige(S.resp, e.aceitas, e.idioma, true);
    if (e.opcoes) marcaOpcoes(e);
    registra(e, res !== 'errado');
    mostraRetorno(e, res);
  }
  function marcaOpcoes(e) {
    document.querySelectorAll('.op, .img-op').forEach((b, i) => { b.disabled = true; b.classList.remove('sel'); if (e.opcoes[i].certa) b.classList.add('bom'); else if (i === S.resp) b.classList.add('ruim'); });
    if (e.tipo === 'lacuna') { const o = e.opcoes.find(x => x.certa); $('#buraco').textContent = o.texto; }
  }

  function registra(e, ok) {
    if (e.chave) E.itens[e.chave] = M.agendaItem(E.itens[e.chave], ok, Date.now());
    if (ok) {
      S.certos++; S.combo++; S.comboMax = Math.max(S.comboMax, S.combo); S.fila.shift();
      if (S.comboMax > E.stats.comboMax) E.stats.comboMax = S.comboMax;
    } else {
      S.erros++; S.combo = 0; S.fila.push(S.fila.shift());
      if (!S.semVida) perdeVida();
    }
    salvar();
  }

  function mostraRetorno(e, res) {
    S.fase = 'retorno';
    const ok = res !== 'errado';
    bip(ok ? 'certo' : 'erro');
    const texto = ok && e.falarAoAcertar ? e.falarAoAcertar : ok && e.soAudio ? e.falar : null;
    if (texto) falar(texto);
    const tit = res === 'quase' ? 'Quase perfeito' : ok ? 'Isso mesmo' : 'Não foi dessa vez';
    const mostraCerta = res === 'quase' || !ok || e.soAudio;
    const corpo = `${mostraCerta ? `<p><b>${ok ? 'Forma correta' : 'Resposta certa'}:</b> ${esc(e.certa)}</p>` : ''}${e.soAudio && e.traducao ? `<p class="pequeno">${esc(e.traducao)}</p>` : ''}${e.dica && (!ok || res === 'quase') ? `<p class="pequeno">${esc(e.dica)}</p>` : ''}`;
    const p = $('#pe'); p.className = 's-pe ' + (ok ? 'certo' : 'errado');
    p.innerHTML = `<div class="s-pe-in"><div class="retorno"><h3>${tit}</h3>${corpo}</div><button class="bt largo ${ok ? 'certo' : 'erro'}" id="continuar" data-a="continuar">Continuar</button></div>`;
    const b = document.querySelector('.s-topo .barra-prog i'); if (b) b.style.width = (S.certos / S.total * 100) + '%';
    const v = document.querySelector('.s-topo .ind.vida'); if (v) v.innerHTML = `${I.vida(22)} ${E.vidas.n}`;
    document.querySelectorAll('.ficha').forEach(f => { f.disabled = true; });
    const area = $('#digitado'); if (area) area.readOnly = true;
    const cont = $('#continuar'); if (cont) cont.focus();
  }

  function continuar() {
    if (!S) return;
    if (!S.semVida && E.vidas.n <= 0) return semVidas();
    if (!S.fila.length) return terminar();
    novoExercicio();
  }

  function semVidas() {
    const f = folha(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">${capi('triste', 'p')}<h2>Suas vidas acabaram</h2><p class="sutil">A próxima volta em ${minutosProximaVida()} min. Uma sessão de prática também devolve uma vida.</p>
      <button class="bt largo" data-a="recarregaSessao" ${E.moedas < PRECO_VIDAS ? 'disabled' : ''}>${I.moeda(20)} Recarregar por ${PRECO_VIDAS}</button>
      <button class="bt claro largo" data-a="praticarSemVida">Praticar agora</button><button class="link" data-a="sairDeVez">Sair da lição</button></div>`);
    f.dataset.fixa = '1';
  }

  /* Pares */
  function tocarPar(el) {
    const e = S.fila[0], [lado, id] = [el.dataset.v.slice(0, 1), el.dataset.v.slice(2)];
    if (el.classList.contains('feito')) return;
    if (lado === 'e') falar(id);
    if (!S.parSel || S.parSel.lado === lado) {
      document.querySelectorAll('.par.sel').forEach(x => x.classList.remove('sel'));
      el.classList.add('sel'); S.parSel = { lado, id, el }; return;
    }
    const a = S.parSel; S.parSel = null;
    if (a.id === id) {
      [a.el, el].forEach(x => { x.classList.remove('sel'); x.classList.add('feito'); });
      S.paresFeitos.add(id); bip('par');
      const palavra = e.palavras.find(p => p[0] === id);
      E.itens[M.chavePalavra(palavra)] = M.agendaItem(E.itens[M.chavePalavra(palavra)], true, Date.now());
      if (S.paresFeitos.size === e.palavras.length) { S.certos++; S.combo++; S.comboMax = Math.max(S.comboMax, S.combo); S.fila.shift(); salvar(); mostraRetorno({ tipo: 'pares', certa: '' }, 'certo'); }
    } else {
      a.el.classList.remove('sel'); [a.el, el].forEach(x => { x.classList.add('ruim'); setTimeout(() => x.classList.remove('ruim'), 400); });
      S.combo = 0; bip('erro');
    }
  }

  /* Fala */
  let rec = null;
  function gravar() {
    if (!RecCls) return pularFala();
    const e = S.fila[0], botao = $('#mic'), msg = $('#micMsg');
    if (rec) { try { rec.stop(); } catch (x) { /* já parado */ } return; }
    rec = new RecCls(); rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 3;
    botao.classList.add('ouvindo'); msg.textContent = 'Ouvindo...';
    let houve = false;
    rec.onresult = ev => {
      houve = true;
      const alt = Array.from(ev.results[0]).map(r => r.transcript);
      const nota = Math.max(...alt.map(a => M.notaFala(a, e.alvo)));
      if (nota >= .7) { E.stats.falas++; avancaMissao('falas'); registra(e, true); mostraRetorno({ certa: e.alvo, tipo: 'falar' }, 'certo'); return; }
      S.tentFala++;
      if (S.tentFala >= 3) { aviso(I.mic(20), 'Sem problema. Essa frase volta em outra hora.'); S.fila.shift(); S.total = Math.max(1, S.total - 1); S.fila.length ? novoExercicio() : terminar(); return; }
      msg.textContent = `Entendi "${alt[0]}". Tente de novo.`; bip('erro');
    };
    rec.onerror = ev => { if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') { aviso(I.mic(20), 'Microfone bloqueado. Exercícios de fala pausados por 1 hora.'); pularFala(); } else if (msg) msg.textContent = 'Não ouvi. Toque e tente de novo.'; };
    rec.onend = () => { rec = null; const b = $('#mic'); if (b) b.classList.remove('ouvindo'); const m = $('#micMsg'); if (m && !houve && m.textContent === 'Ouvindo...') m.textContent = 'Não ouvi. Toque e tente de novo.'; };
    try { rec.start(); } catch (x) { rec = null; pularFala(); }
  }
  function pularFala() {
    // Sem custo de vida: tira a fala da sessão e pausa esse tipo de exercício por 1 hora.
    E.micAte = Date.now() + 36e5; salvar();
    const antes = S.fila.length; S.fila = S.fila.filter(x => x.tipo !== 'falar'); S.total = Math.max(1, S.total - (antes - S.fila.length));
    S.fila.length ? novoExercicio() : terminar();
  }

  /* Fim de sessão */
  function ganhaXp(x) {
    const d = hoje();
    const antes = E.xpPorDia[d] || 0;
    E.xpPorDia[d] = antes + x; E.xpTotal += x; E.liga.xp += x;
    avancaMissao('xp', x);
    return antes < E.metaXp && E.xpPorDia[d] >= E.metaXp;
  }

  function terminar() {
    const seg = Math.round((Date.now() - S.inicio) / 1000), dobro = E.dobroAte > Date.now();
    const precisao = Math.round(S.certos / (S.certos + S.erros) * 100) || 0;
    const xp = M.xpDaSessao(S.total, S.erros, S.comboMax, dobro);
    const bateuMeta = ganhaXp(xp);
    const subiu = M.registraDia(E.ofensiva, hoje());
    if (S.comboMax) avancaMissao('combo', S.comboMax);
    let moedas = 0, extra = '';
    if (S.noId) {
      const n = E.nos[S.noId] || { rodadas: 0, feito: false };
      if (S.tipoNo === 'licao') { n.rodadas = (n.rodadas || 0) + 1; if (n.rodadas >= RODADAS) n.feito = true; }
      else { if (!n.feito) { E.stats.unidades++; moedas += 50; extra = 'Unidade concluída.'; } n.feito = true; }
      E.nos[S.noId] = n;
    }
    if (S.tipoNo === 'licao' || S.tipoNo === 'revisao') { E.stats.licoes++; avancaMissao('licoes'); if (S.erros === 0) { E.stats.perfeitas++; avancaMissao('perfeita'); moedas += 5; } }
    if (S.semVida) { ganhaVida(1); E.stats.revisoes++; avancaMissao('revisao'); }
    if (bateuMeta) { moedas += 10; }
    E.moedas += moedas;
    confereConquistas(); salvar();
    bip('fim'); confete();
    const min = Math.floor(seg / 60), tempo = min ? `${min}min ${seg % 60}s` : `${seg}s`;
    const titulo = S.semVida ? 'Prática concluída' : S.erros === 0 ? 'Lição sem nenhum erro' : 'Lição concluída';
    const of = E.ofensiva;
    $('#camada').innerHTML = `<div class="sessao"><div class="final" data-cor="${S.cor || 'indigo'}">${capi('feliz', 'mascote-pula')}<h1>${titulo}</h1>
      ${extra ? `<p class="sutil">${extra}</p>` : ''}${S.semVida ? '<p class="sutil">Você recuperou uma vida.</p>' : ''}
      <div class="premios"><div class="premio"><b class="ind xp">${I.raio(20)} ${xp}</b>XP${dobro ? ' em dobro' : ''}</div><div class="premio"><b>${precisao}%</b>Acertos</div><div class="premio"><b>${tempo}</b>Tempo</div>${moedas ? `<div class="premio"><b class="ind moeda">${I.moeda(20)} ${moedas}</b>Moedas</div>` : ''}</div>
      ${subiu ? `<div class="premio" style="min-width:220px"><b class="ind fogo">${I.fogo(24)} ${of.dias}</b>${of.dias === 1 ? 'Primeiro dia de ofensiva' : `${of.dias} dias seguidos`}</div>` : ''}
      ${bateuMeta ? `<p class="ac-texto" style="font-weight:800">Meta de hoje cumprida</p>` : ''}
      <button class="bt" style="min-width:240px" id="continuar" data-a="fimSessao">Continuar</button></div></div>`;
    S = null;
    const c = $('#continuar'); if (c) c.focus();
  }

  /* Histórias */
  function abrirHistoria(idx) {
    const n = NOS[idx];
    H = { no: n, dados: C.historias[n.un.historia], i: 0, pergunta: false, resp: null, respondeu: false, abertas: new Set(), quem: null };
    H.quem = H.dados.linhas[0].quem;
    renderHistoria(); falar(H.dados.linhas[0].en);
  }
  function renderHistoria() {
    const d = H.dados, vis = d.linhas.slice(0, H.i + 1), atual = d.linhas[H.i];
    const q = H.pergunta ? atual.q : null, pct = (H.i + (H.pergunta && H.respondeu ? 1 : 0)) / d.linhas.length * 100;
    const pe = q ? (H.respondeu ? `<button class="bt largo" id="continuar" data-a="histProx">Continuar</button>` : `<p class="sutil pequeno" style="text-align:center">Escolha uma resposta.</p>`)
      : `<button class="bt largo" id="continuar" data-a="histProx">Continuar</button>`;
    $('#camada').innerHTML = `<div class="sessao" data-cor="${H.no.un.cor}"><div class="s-topo"><button class="fechar" data-a="sairHist" aria-label="Sair da história">${I.fechar(26)}</button><div class="barra-prog"><i style="width:${pct}%"></i></div></div>
      <div class="s-corpo" id="rolagem"><div class="s-miolo"><h2>${esc(d.titulo)}</h2><p class="sutil pequeno">Toque em uma fala para ver a tradução.</p>
      ${vis.map((l, i) => `<div class="fala ${l.quem === H.quem ? '' : 'dir'}"><span class="avatar">${esc(l.quem[0])}</span><button class="balao" data-a="histFala" data-v="${i}"><small>${esc(l.quem)}</small><span lang="en">${esc(l.en)}</span>${H.abertas.has(i) ? `<span class="tr">${esc(l.pt)}</span>` : ''}</button></div>`).join('')}
      ${q ? `<div class="enunciado" style="margin-top:6px">${esc(q.p)}</div><div class="opcoes">${q.o.map((t, i) => `<button class="op ${H.respondeu ? (i === q.c ? 'bom' : i === H.resp ? 'ruim' : '') : ''}" data-a="histResp" data-v="${i}" ${H.respondeu ? 'disabled' : ''}><kbd>${i + 1}</kbd><span>${esc(t)}</span></button>`).join('')}</div>` : ''}
      </div></div><div class="s-pe"><div class="s-pe-in">${pe}</div></div></div>`;
    const r = $('#rolagem'); r.scrollTop = r.scrollHeight;
  }
  function histProx() {
    const atual = H.dados.linhas[H.i];
    if (atual.q && !H.pergunta) { H.pergunta = true; H.respondeu = false; H.resp = null; return renderHistoria(); }
    H.pergunta = false; H.i++;
    if (H.i >= H.dados.linhas.length) return fimHistoria();
    renderHistoria(); falar(H.dados.linhas[H.i].en);
  }
  function fimHistoria() {
    const id = H.no.id, primeira = !feito(id), dobro = E.dobroAte > Date.now(), xp = dobro ? 30 : 15;
    if (primeira) { E.nos[id] = { feito: true }; E.stats.historias++; }
    const bateu = ganhaXp(xp); const subiu = M.registraDia(E.ofensiva, hoje());
    if (bateu) E.moedas += 10;
    avancaMissao('historia'); confereConquistas(); salvar(); bip('fim'); confete();
    $('#camada').innerHTML = `<div class="sessao"><div class="final" data-cor="${H.no.un.cor}">${capi('feliz', 'mascote-pula')}<h1>História concluída</h1><div class="premios"><div class="premio"><b class="ind xp">${I.raio(20)} ${xp}</b>XP</div>${subiu ? `<div class="premio"><b class="ind fogo">${I.fogo(20)} ${E.ofensiva.dias}</b>Ofensiva</div>` : ''}</div><button class="bt" style="min-width:240px" id="continuar" data-a="fimSessao">Continuar</button></div></div>`;
    H = null;
  }

  /* Ações */
  function iniciarNo(idx) {
    fecharFolha();
    const n = NOS[idx];
    if (n.tipo === 'historia') return abrirHistoria(idx);
    atualizaVidas();
    if (E.vidas.n <= 0) { S = null; return folha(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">${capi('triste', 'p')}<h2>Sem vidas no momento</h2><p class="sutil">A próxima volta em ${minutosProximaVida()} min. Pratique para recuperar uma agora.</p><button class="bt largo" data-a="pratica" data-v="revisao">Praticar</button><button class="bt claro largo" data-a="recarregaFora" ${E.moedas < PRECO_VIDAS ? 'disabled' : ''}>${I.moeda(20)} Recarregar por ${PRECO_VIDAS}</button><button class="link" data-a="fecharFolha">Agora não</button></div>`); }
    if (n.tipo === 'licao') {
      const rod = Math.min(1, (E.nos[n.id] && E.nos[n.id].rodadas) || 0);
      comecar(M.sessaoLicao(C, n.licao, rod, cfgEx()), { noId: n.id, tipoNo: 'licao', cor: n.un.cor });
    } else comecar(M.sessaoUnidade(C, n.un, cfgEx()), { noId: n.id, tipoNo: 'revisao', cor: n.un.cor });
  }

  function iniciarPratica(modo) {
    fecharFolha();
    if (modo === 'revisao') {
      let fila = M.sessaoRevisao(C, E.itens, Date.now(), cfgEx(), 10);
      if (!fila.length) { const u = C.unidades[0].licoes[0]; fila = M.sessaoLicao(C, u, 0, cfgEx()); }
      return comecar(fila, { semVida: true, cor: 'teal' });
    }
    const frases = licoesFeitas().flatMap(n => n.licao.frases);
    if (!frases.length) return aviso(I.praticar(20), 'Conclua uma lição antes.');
    comecar(M.sessaoPratica(C, modo, frases, cfgEx()), { semVida: true, cor: { ouvir: 'azul', falar: 'magenta', escrever: 'indigo' }[modo] });
  }

  const A = {
    ir(v) { tela = v; desenha(); window.scrollTo(0, 0); if (v === 'trilha') vaiParaAtual(); if (v === 'liga') sincronizaLiga(); },
    no(v) { abrirNo(+v); },
    iniciarNo(v) { iniciarNo(+v); },
    guia(v) { const u = C.unidades.find(x => x.id === v); folha(`<div data-cor="${u.cor}" style="display:contents"><h2>Guia: ${esc(u.titulo)}</h2>${u.guia.map(([t, d]) => `<div class="dica-guia"><h3>${esc(t)}</h3><p class="sutil">${esc(d)}</p></div>`).join('')}<button class="bt largo" data-a="fecharFolha">Fechar</button></div>`); },
    fecharFolha() { fecharFolha(); },
    pratica(v) { iniciarPratica(v); },
    comprar(v) {
      if (v === 'vidas' && E.moedas >= PRECO_VIDAS) { E.moedas -= PRECO_VIDAS; ganhaVida(VIDAS_MAX); aviso(I.vida(20), 'Vidas recarregadas'); }
      if (v === 'folga' && E.moedas >= PRECO_FOLGA && E.ofensiva.folgas < 2) { E.moedas -= PRECO_FOLGA; E.ofensiva.folgas++; aviso(I.gelo(20), 'Folga guardada'); }
      if (v === 'dobro' && E.moedas >= PRECO_DOBRO) { E.moedas -= PRECO_DOBRO; E.dobroAte = Date.now() + 15 * 6e4; aviso(I.raio(20), 'XP em dobro por 15 minutos'); }
      salvar(); desenha();
    },
    meta(v) { E.metaXp = +v; salvar(); desenha(); },
    cfg(v) { E.cfg[v] = !E.cfg[v]; if (v === 'mic' && E.cfg.mic) E.micAte = 0; salvar(); desenha(); },
    sair_conta() { MTS.sair(); },
    recarregar() { location.reload(); },
    async enviaConfirmacao(v, el) {
      el.disabled = true;
      const m = $('#acessoMsg');
      try { await MTS.usuario.sendEmailVerification(); m.textContent = 'Link enviado para ' + MTS.usuario.email + '. Confira também o spam.'; }
      catch (e) { el.disabled = false; m.textContent = 'Não consegui enviar agora. Aguarde um pouco e tente de novo.'; }
    },
    ligaTentar() { G.carregou = false; desenha(); sincronizaLiga(); },
    onbPasso(v) { onb.passo = +v; renderOnboard(); },
    onbMotivo(v) { E.motivo = v; onb.passo = 2; renderOnboard(); },
    onbNivel(v) { if (v === '1') NOS.filter(n => n.un.id === 'u1').forEach(n => { E.nos[n.id] = { feito: true, rodadas: RODADAS }; }); onb.passo = 3; renderOnboard(); },
    onbMeta(v) { E.metaXp = +v; E.onboard = true; tique(); $('#camada').innerHTML = ''; desenha(); vaiParaAtual(); },
    ouvir() { falar(S.fila[0].falar || S.fila[0].alvo); },
    ouvirLento() { falar(S.fila[0].falar, true); },
    escolhe(v, el) {
      if (S.fase !== 'responder') return;
      S.resp = +v; document.querySelectorAll('.op, .img-op').forEach(b => b.classList.remove('sel')); el.classList.add('sel');
      const e = S.fila[0]; if (e.tipo === 'lacuna') $('#buraco').textContent = e.opcoes[+v].texto;
      if (e.opcoes[+v].ingles || e.tipo === 'imagem') falar(e.opcoes[+v].texto);
      liberaVerificar();
    },
    poeFicha(v) { if (S.fase !== 'responder') return; S.fichasUsadas.push(+v); redesenhaFichas(); },
    tiraFicha(v) { if (S.fase !== 'responder') return; S.fichasUsadas = S.fichasUsadas.filter(i => i !== +v); redesenhaFichas(); },
    par(v, el) { if (S.fase === 'responder') tocarPar(el); },
    verificar() { verificar(); },
    continuar() { continuar(); },
    gravar() { gravar(); },
    pularFala() { pularFala(); },
    sair() {
      folha(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center">${capi('triste', 'p')}<h2>Sair agora?</h2><p class="sutil">O progresso desta sessão será perdido.</p><button class="bt largo" data-a="fecharFolha">Continuar a lição</button><button class="link" data-a="sairDeVez">Sair</button></div>`);
    },
    sairDeVez() { fecharFolha(); if (rec) { try { rec.abort(); } catch (x) { /* já parado */ } rec = null; } S = null; $('#camada').innerHTML = ''; desenha(); vaiParaAtual(); },
    recarregaSessao() { if (E.moedas < PRECO_VIDAS) return; E.moedas -= PRECO_VIDAS; ganhaVida(VIDAS_MAX); salvar(); fecharFolha(); S.fila.length ? novoExercicio() : terminar(); },
    recarregaFora() { if (E.moedas < PRECO_VIDAS) return; E.moedas -= PRECO_VIDAS; ganhaVida(VIDAS_MAX); salvar(); fecharFolha(); desenha(); aviso(I.vida(20), 'Vidas recarregadas'); },
    praticarSemVida() { fecharFolha(); S = null; $('#camada').innerHTML = ''; iniciarPratica('revisao'); },
    fimSessao() { $('#camada').innerHTML = ''; tela = 'trilha'; desenha(); vaiParaAtual(); sincronizaLiga(); },
    histFala(v) { const i = +v; if (H.abertas.has(i)) H.abertas.delete(i); else H.abertas.add(i); falar(H.dados.linhas[i].en); renderHistoria(); },
    histResp(v) { if (H.respondeu) return; H.resp = +v; H.respondeu = true; bip(+v === H.dados.linhas[H.i].q.c ? 'certo' : 'erro'); renderHistoria(); },
    histProx() { histProx(); },
    sairHist() { H = null; $('#camada').innerHTML = ''; desenha(); vaiParaAtual(); }
  };

  function redesenhaFichas() {
    const e = S.fila[0];
    $('#resposta').innerHTML = S.fichasUsadas.map(i => `<button class="ficha" data-a="tiraFicha" data-v="${i}">${esc(e.fichas[i])}</button>`).join('');
    document.querySelectorAll('.banco .ficha').forEach((b, i) => b.classList.toggle('usada', S.fichasUsadas.includes(i)));
    liberaVerificar();
  }

  document.addEventListener('click', ev => {
    const el = ev.target.closest('[data-a]');
    if (!el || el.disabled) return;
    const f = A[el.dataset.a]; if (f) f(el.dataset.v, el);
  });
  document.addEventListener('input', ev => {
    if (ev.target.id === 'digitado' && S) { S.resp = ev.target.value; liberaVerificar(); }
    if (ev.target.id === 'nome') { E.nome = ev.target.value.trim(); salvar(); }
  });
  document.addEventListener('keydown', ev => {
    if ($('#folha')) return;
    if (ev.key === 'Enter') {
      const c = $('#continuar'); if (c) { ev.preventDefault(); c.click(); return; }
      const v = $('#verificar'); if (v && !v.disabled) { ev.preventDefault(); v.click(); }
      return;
    }
    if (ev.target.matches('textarea, input')) return;
    const n = +ev.key;
    if (n >= 1 && n <= 9) { const ops = document.querySelectorAll('.op, .img-op'); if (ops[n - 1] && !ops[n - 1].disabled) ops[n - 1].click(); }
  });
  if (temAudio) speechSynthesis.onvoiceschanged = () => { vozEscolhida = null; };
  if ('serviceWorker' in navigator && location.protocol === 'https:') { try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) { /* sem service worker aqui */ } }

  /* Acesso: quem decide é o servidor (mtLiga). Sem rede, vale a última liberação desta conta neste aparelho. */
  async function verificaAcesso(u) {
    try {
      await u.getIdToken(true); // token novo: a confirmação do e-mail só aparece nele depois de renovado
      const r = await MTS.chamar('mtLiga', { acao: 'acesso' });
      try { if (r.ok) localStorage.setItem('eg_acesso', u.uid); else localStorage.removeItem('eg_acesso'); } catch (e) { /* armazenamento bloqueado */ }
      if (!r.ok) telaAcesso(r.motivo);
      return !!r.ok;
    } catch (e) {
      let ok = false; try { ok = localStorage.getItem('eg_acesso') === u.uid; } catch (x) { /* armazenamento bloqueado */ }
      if (!ok) telaAcesso('rede');
      return ok;
    }
  }
  function telaAcesso(motivo) {
    const T = {
      negado: ['Acesso restrito', 'O CapiFala é de uso restrito, e esta conta não tem acesso.', ''],
      confirmar: ['Confirme seu e-mail', 'Para abrir o CapiFala, confirme o e-mail desta conta. Depois do link, toque em "Já confirmei".', '<button class="bt" data-a="enviaConfirmacao">Enviar link de confirmação</button><button class="bt claro" data-a="recarregar">Já confirmei</button>'],
      rede: ['Sem conexão', 'Não consegui conferir o acesso desta conta. Confira a internet e tente de novo.', '<button class="bt" data-a="recarregar">Tentar de novo</button>']
    }[motivo] || ['Acesso restrito', 'Esta conta não tem acesso.', ''];
    let p = $('#mtsPortao');
    if (!p) { p = document.createElement('div'); p.id = 'mtsPortao'; document.body.appendChild(p); }
    p.innerHTML = `<div class="mts-cx"><div style="display:flex;flex-direction:column;gap:12px">${capi(motivo === 'negado' ? 'triste' : 'feliz', 'p')}<h1 id="mtsTit">${T[0]}</h1><p class="sub" id="acessoMsg">${T[1]}</p>${T[2]}<button class="link" data-a="sair_conta">Sair desta conta</button></div></div>`;
  }

  window.CapiFala = { get sessao() { return S; }, get estado() { return E; }, get liga() { return G; } }; // leitura para os testes no navegador
  tique(); desenha(); vaiParaAtual();
  if (window.MTS) MTS.iniciar({
    // A chave interna continua englivara: renomear moveria os dados já salvos na conta.
    app: 'englivara', nome: 'CapiFala', pref: 'eg_', vendor: 'vendor/',
    cores: { cor: '#5145D6', sobrecor: '#ffffff', fundo: '#F5F6FB', texto: '#1B1E3A', suave: '#565C80', borda: '#DFE2F1', campo: '#ffffff' },
    colecoes: COLECOES,
    ler: lerColecao,
    gravar: gravarColecao,
    aoReceber() {
      if (S || H) { gravaLocal(); return; }
      atualizaVidas(); M.ajustaOfensiva(E.ofensiva, hoje()); gravaLocal();
      if (E.onboard) { $('#camada').innerHTML = ''; }
      desenha(); if (E.onboard && tela === 'trilha') vaiParaAtual();
    },
    limparLocal() {
      // Progresso é da conta: ao sair ou trocar de conta, o aparelho fica limpo e a nuvem não muda.
      try { localStorage.setItem('englivara-reserva', JSON.stringify(E)); localStorage.removeItem(CHAVE); localStorage.removeItem('eg_acesso'); } catch (e) { /* armazenamento bloqueado */ }
      E = novo();
    },
    verificarAcesso: verificaAcesso,
    aoEntrar() { desenha(); sincronizaLiga(); }
  });
  setInterval(() => { if (!S && !H && E.onboard && !$('#folha')) { const n = E.vidas.n; atualizaVidas(); if (n !== E.vidas.n) { salvar(); desenha(); } } }, 60000);
})();

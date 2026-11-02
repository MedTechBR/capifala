// node ferramentas/teste-liga.js : testa a função da liga contra um Firestore falso em memória.
const assert = require('assert'), path = require('path'), Module = require('module');
const pasta = path.join(process.env.HOME, 'Documents/Claude/MedTech/backend/functions');
const original = Module._load;
Module._load = function (pedido, pai, ...r) {
  if (pedido === './acesso') return { accessToken: async () => 'tk' };
  return original.call(this, pedido, pai, ...r);
};
const L = require(path.join(pasta, 'liga.js'));

const banco = new Map();
const idDe = url => decodeURIComponent(url.split('/documents/')[1].split('?')[0]);
global.fetch = async (url, op) => {
  const resp = (status, corpo) => ({ status, ok: status < 400, json: async () => corpo });
  const corpo = op.body ? JSON.parse(op.body) : null;
  if (url.endsWith(':beginTransaction')) return resp(200, { transaction: 't' });
  if (url.endsWith(':commit')) { corpo.writes.forEach(w => banco.set(w.update.name.split('/documents/')[1], { fields: w.update.fields })); return resp(200, {}); }
  if (url.endsWith(':runQuery')) {
    const q = corpo.structuredQuery, col = q.from[0].collectionId, v = q.where.fieldFilter.value.stringValue;
    const linhas = [...banco.entries()].filter(([k, d]) => k.startsWith(col + '/') && d.fields.grupo && d.fields.grupo.stringValue === v).map(([k, d]) => ({ document: { name: k, fields: d.fields } }));
    return resp(200, linhas);
  }
  const id = idDe(url);
  if (op.method === 'GET') return banco.has(id) ? resp(200, banco.get(id)) : resp(404, {});
  if (op.method === 'PATCH') { banco.set(id, { fields: corpo.fields }); return resp(200, {}); }
  throw new Error('rota ' + url);
};

(async () => {
  const seg = Date.UTC(2026, 10, 2, 15), prox = seg + 7 * 864e5; // segundas-feiras 02/11 e 09/11
  assert.equal(L.semanaDe(seg), '2026-11-02');
  assert.equal(L.semanaDe(Date.UTC(2026, 10, 2, 2)), '2026-10-26', 'domingo 23h em Brasília ainda é a semana anterior');
  assert.equal(L.nomeLimpo('  <b>Ana</b>  '), 'bAna/b');
  assert.equal(L.nomeLimpo(''), 'Estudante');
  assert.equal(L.xpLimpo(999999), 5000);
  assert.equal(L.xpLimpo('abc'), 0);
  assert.deepEqual(L.cortes(2), { sobem: 0, caem: 0 });
  assert.deepEqual(L.cortes(15), { sobem: 5, caem: 3 });

  // Sem XP não ocupa vaga
  let r = await L.executar({ uid: 'zero' }, { xp: 0 }, seg);
  assert.equal(r.lista.length, 0);
  assert.ok(![...banco.keys()].some(k => k.startsWith('ligaEnglivaraVagas')));

  // 16 pessoas: a 16ª abre um novo grupo
  for (let i = 1; i <= 16; i++) r = await L.executar({ uid: 'u' + i }, { xp: i * 10, nome: 'P' + i }, seg);
  assert.equal(r.lista.length, 1, 'a 16ª pessoa fica no grupo 2');
  r = await L.executar({ uid: 'u15' }, { xp: 150, nome: 'P15' }, seg);
  assert.equal(r.lista.length, 15);
  assert.equal(r.lista[0].nome, 'P15');
  assert.equal(r.lista[0].eu, true);
  assert.ok(r.lista.every(x => !('uid' in x) && !('email' in x)), 'resposta não traz identificador');

  // XP não diminui se o aparelho mandar menos
  r = await L.executar({ uid: 'u15' }, { xp: 3, nome: 'P15' }, seg);
  assert.equal(r.lista[0].xp, 150);

  // Virada: primeiro sobe, último desce, e a posição antiga vem na resposta
  r = await L.executar({ uid: 'u15' }, { xp: 5, nome: 'P15' }, prox);
  assert.deepEqual([r.ultima.pos, r.ultima.total, r.ultima.divisao, r.divisao], [1, 15, 1, 1]);
  await L.executar({ uid: 'u2' }, { xp: 5 }, prox); // u1 foi o último; u2 é o 14º, zona de queda, mas já está na divisão mínima
  const u = await L.executar({ uid: 'u1' }, { xp: 0 }, prox);
  assert.deepEqual([u.ultima.pos, u.divisao, u.lista.length], [15, 0, 0]);
  const again = await L.executar({ uid: 'u15' }, { xp: 9 }, prox);
  assert.equal(again.ultima, null, 'o fechamento só é informado uma vez');
  console.log('liga: todas as verificações ok');
})().catch(e => { console.error(e); process.exit(1); });

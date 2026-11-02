// node teste-motor.js : confere regras do motor e consistência do curso inteiro.
const assert = require('assert');
const fs = require('fs'), vm = require('vm');
const M = require('./motor.js');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/curso.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync(__dirname + '/curso2.js', 'utf8'), ctx);
const C = ctx.window.CURSO;
let n = 0; const ok = (nome, f) => { f(); n++; };

ok('contração equivale à forma longa', () => assert.equal(M.corrige("I'm fine", ['I am fine.'], 'en'), 'certo'));
ok('pontuação e maiúscula não contam', () => assert.equal(M.corrige('how are YOU', ['How are you?'], 'en'), 'certo'));
ok('acento não reprova em português', () => assert.equal(M.corrige('voce', ['você'], 'pt'), 'certo'));
ok('um erro de digitação em frase longa é quase', () => assert.equal(M.corrige('I am fien', ['I am fine.'], 'en', true), 'quase'));
ok('errado continua errado', () => assert.equal(M.corrige('I have thirty years', ['I am thirty years old.'], 'en', true), 'errado'));
ok('vazio é errado', () => assert.equal(M.corrige('  ', ['Yes.'], 'en', true), 'errado'));
ok('nota de fala', () => assert.equal(M.notaFala('i am fine', 'I am fine, thank you.'), 0.6));

ok('ofensiva sobe em dia seguido', () => { const o = { dias: 3, ultimo: '2026-11-01', folgas: 0 }; M.registraDia(o, '2026-11-02'); assert.equal(o.dias, 4); });
ok('mesmo dia não conta duas vezes', () => { const o = { dias: 3, ultimo: '2026-11-02', folgas: 0 }; M.registraDia(o, '2026-11-02'); assert.equal(o.dias, 3); });
ok('falta sem folga zera', () => { const o = { dias: 9, ultimo: '2026-10-30', folgas: 0 }; M.registraDia(o, '2026-11-02'); assert.equal(o.dias, 1); });
ok('folga cobre a falta', () => { const o = { dias: 9, ultimo: '2026-10-31', folgas: 1 }; M.registraDia(o, '2026-11-02'); assert.equal(o.dias, 10); assert.equal(o.folgas, 0); });
ok('virada de mês', () => assert.equal(M.diasEntre('2026-10-31', '2026-11-01'), 1));

ok('revisão: acerto adia, erro volta para agora', () => {
  const t = 1e12; const a = M.agendaItem(null, true, t); assert.ok(a.proximo > t); const b = M.agendaItem(a, false, t); assert.equal(b.proximo, t);
});
ok('xp', () => { assert.equal(M.xpDaSessao(10, 0, 10, false), 19); assert.equal(M.xpDaSessao(10, 2, 3, true), 20); });

const cfg = { audio: true, mic: true };
for (const u of C.unidades) for (const l of u.licoes) for (const r of [0, 1]) {
  ok(l.id + ' rodada ' + r, () => {
    for (let vez = 0; vez < 30; vez++) {
      const s = M.sessaoLicao(C, l, r, cfg);
      assert.ok(s.length >= 9);
      for (const e of s) {
        if (e.opcoes) {
          assert.equal(e.opcoes.filter(o => o.certa).length, 1, l.id + ' ' + e.tipo + ' ' + e.enunciado);
          assert.equal(new Set(e.opcoes.map(o => o.texto)).size, e.opcoes.length, 'opção repetida em ' + e.enunciado);
        }
        // Toda frase tem de ser montável só com as fichas oferecidas.
        if (e.tipo === 'montar') assert.ok(M.fichas(e.certa).every(x => e.fichas.includes(x)), e.certa);
        if (e.aceitas) assert.equal(M.corrige(e.certa, e.aceitas, e.idioma), 'certo', e.certa);
      }
    }
  });
}
ok('curso sem frase ou palavra repetida', () => {
  const fr = M.todasFrases(C).map(f => f.en); assert.equal(new Set(fr).size, fr.length);
  const hs = Object.keys(C.historias); C.unidades.forEach(u => assert.ok(hs.includes(u.historia)));
});
ok('perguntas das histórias têm resposta válida', () => {
  Object.values(C.historias).forEach(h => h.linhas.forEach(x => { if (x.q) assert.ok(x.q.o[x.q.c]); }));
});
ok('sem áudio nem microfone some o exercício', () => {
  const s = M.sessaoLicao(C, C.unidades[0].licoes[0], 0, { audio: false, mic: false });
  assert.ok(s.every(e => !e.exige));
});
console.log(n + ' verificações ok; ' + M.todasFrases(C).length + ' frases, ' + M.todasPalavras(C).length + ' palavras.');

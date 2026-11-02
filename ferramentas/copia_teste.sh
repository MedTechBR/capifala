#!/bin/bash
# Monta _teste/ (fora do git): cópia do app com Firebase falso, liga falsa e microfone falso. Nunca publicar.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf _teste && mkdir _teste
cp index.html app.js motor.js curso.js curso2.js estilo.css mtsync.js icone.svg icone-180.png manifest.webmanifest _teste/
cp ../_mtsync/fake-firebase.js _teste/
ln -s ../audio _teste/audio
cat > _teste/falsos.js <<'EOF'
window.__falaTexto = 'hello';
window.addEventListener('error', e => {
  const alvo = e.target && e.target.src ? 'carga ' + e.target.src : (e.message + ' ' + e.filename + ':' + e.lineno);
  const log = JSON.parse(localStorage.__erros || '[]'); log.push(alvo + ' motor=' + !!window.Motor); localStorage.__erros = JSON.stringify(log.slice(-8));
}, true);
window.SpeechRecognition = class {
  start() {
    setTimeout(() => {
      if (window.__falaErro) { this.onerror && this.onerror({ error: window.__falaErro }); this.onend && this.onend(); return; }
      this.onresult && this.onresult({ results: [[{ transcript: window.__falaTexto }]] });
      this.onend && this.onend();
    }, 20);
  }
  stop() {} abort() {}
};
window.addEventListener('DOMContentLoaded', () => {
  if (!window.MTS) return;
  window.__ligaChamadas = [];
  MTS.chamar = async (nome, d) => {
    if (d.acao === 'acesso') {
      if (localStorage.__acessoRede) throw new Error('sem rede');
      return JSON.parse(localStorage.__acessoResp || '{"ok":true,"motivo":"ok"}');
    }
    window.__ligaChamadas.push(d);
    if (window.__ligaOff) throw new Error('sem rede');
    return { semana: 'x', divisao: 1, sobem: 2, caem: 0, ultima: window.__ligaUltima || null,
      lista: [{ nome: 'Rival', xp: 40 }, { nome: d.nome || 'Estudante', xp: d.xp, eu: true }, { nome: 'Outra', xp: 1 }] };
  };
});
EOF
python3 - <<'EOF'
s = open('_teste/index.html', encoding='utf8').read()
s = s.replace('<script src="mtsync.js?v=1"></script>', '<script src="fake-firebase.js"></script>\n<script src="falsos.js"></script>\n<script src="mtsync.js?v=1"></script>')
open('_teste/index.html', 'w', encoding='utf8').write(s)
EOF
echo pronto

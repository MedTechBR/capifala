# Gera um mp3 por palavra, frase e fala de história, e o índice audio/indice.js. Só regrava o que falta.
# Uso: ~/.cache/falae-voz/venv/bin/python ferramentas/gera_audio.py [voz]
import hashlib, json, os, subprocess, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BASE = os.path.expanduser('~/.cache/falae-voz/modelo')
VOZ = sys.argv[1] if len(sys.argv) > 1 else 'af_heart'
SAIDA = os.path.join(RAIZ, 'audio')

js = """
const fs=require('fs'),vm=require('vm'),c={window:{}};vm.createContext(c);
for(const f of ['curso.js','curso2.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const C=c.window.CURSO,t=new Set();
C.unidades.forEach(u=>u.licoes.forEach(l=>{l.palavras.forEach(p=>t.add(p[0]));l.frases.forEach(f=>t.add(f.en))}));
Object.values(C.historias).forEach(h=>h.linhas.forEach(x=>t.add(x.en)));
console.log(JSON.stringify([...t]));
"""
textos = json.loads(subprocess.run(['node', '-e', js], cwd=RAIZ, capture_output=True, text=True, check=True).stdout)
os.makedirs(SAIDA, exist_ok=True)
k = Kokoro(os.path.join(BASE, 'kokoro-v1.0.int8.onnx'), os.path.join(BASE, 'voices-v1.0.bin'))
indice = {}
for i, t in enumerate(textos):
    nome = hashlib.sha1((VOZ + '|' + t).encode()).hexdigest()[:12] + '.mp3'
    indice[t] = nome
    destino = os.path.join(SAIDA, nome)
    if os.path.exists(destino):
        continue
    a, taxa = k.create(t, voice=VOZ, speed=0.95, lang='en-gb' if VOZ[0] == 'b' else 'en-us')
    a = np.concatenate([np.zeros(int(taxa * 0.06)), a, np.zeros(int(taxa * 0.12))])
    wav = destino[:-4] + '.wav'
    sf.write(wav, a, taxa)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-ac', '1', '-b:a', '48k', destino], check=True)
    os.remove(wav)
    if i % 50 == 0:
        print(i, '/', len(textos), flush=True)
usados = set(indice.values())
for f in os.listdir(SAIDA):
    if f.endswith('.mp3') and f not in usados:
        os.remove(os.path.join(SAIDA, f))
with open(os.path.join(SAIDA, 'indice.js'), 'w', encoding='utf8') as s:
    s.write('// Gerado por ferramentas/gera_audio.py. Voz: ' + VOZ + ' (Kokoro).\nwindow.AUDIO=' + json.dumps(indice, ensure_ascii=False) + ';\n')
print('pronto', len(indice))

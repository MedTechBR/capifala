# Gera uma amostra de cada voz candidata com frases do curso, para aprovar antes do volume.
# Uso: ~/.cache/falae-voz/venv/bin/python ferramentas/amostra_voz.py
import os, subprocess
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

BASE = os.path.expanduser('~/.cache/falae-voz/modelo')
SAIDA = os.path.join(os.path.dirname(__file__), '..', 'amostras-voz')
VOZES = ['af_heart', 'af_bella', 'am_michael', 'am_fenrir', 'bf_emma', 'bm_george']
FRASES = ['Good morning! How are you today?', 'I would like a coffee, please.',
          'Excuse me, where is the subway?', 'She does not like coffee.', 'I am thirty years old.']

os.makedirs(SAIDA, exist_ok=True)
k = Kokoro(os.path.join(BASE, 'kokoro-v1.0.int8.onnx'), os.path.join(BASE, 'voices-v1.0.bin'))
for v in VOZES:
    partes, taxa = [], 24000
    for f in FRASES:
        a, taxa = k.create(f, voice=v, speed=0.95, lang='en-gb' if v[0] == 'b' else 'en-us')
        partes += [a, np.zeros(int(taxa * 0.55))]
    wav = os.path.join(SAIDA, v + '.wav')
    sf.write(wav, np.concatenate(partes), taxa)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-b:a', '96k', wav[:-4] + '.mp3'], check=True)
    os.remove(wav)
    print(v, 'ok')

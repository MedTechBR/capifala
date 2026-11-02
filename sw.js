// Rede primeiro: sem pré-cache, para nunca segurar versão velha. O cache só serve quando está sem internet.
const CACHE = 'englivara-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  // Áudio pede pedaços do arquivo (Range): resposta 206 não entra no cache.
  if (e.request.method !== 'GET' || e.request.headers.has('range') || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.status === 200) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
    return r;
  }).catch(() => caches.match(e.request)));
});

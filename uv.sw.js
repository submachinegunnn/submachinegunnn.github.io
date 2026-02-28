/* Top of your uv.sw.js */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

/* Your existing imports below */
importScripts('/uv/uv.bundle.js');
importScripts('/uv.config.js');
importScripts('/uv/uv.sw.js');

const sw = new UVServiceWorker();
self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

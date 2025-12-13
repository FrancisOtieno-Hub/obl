const CACHE_VERSION = "v2";

const STATIC_CACHE = `obl-static-${CACHE_VERSION}`;
const BOOKS_CACHE = `obl-books-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => !key.includes(CACHE_VERSION))
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // PDFs & covers
    if (url.pathname.endsWith('.pdf') || url.pathname.startsWith('/covers/')) {
        event.respondWith(
            caches.open(BOOKS_CACHE).then(cache =>
                fetch(request)
                    .then(response => {
                        cache.put(request, response.clone());
                        return response;
                    })
                    .catch(() => cache.match(request))
            )
        );
        return;
    }

    // App shell
    event.respondWith(
        caches.match(request).then(response =>
            response || fetch(request)
        )
    );
});







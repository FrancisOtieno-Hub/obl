const CACHE_NAME = "obl-cache-v1";
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/books/Leverage by Francis Otieno.pdf',
    '/books/Come As You Are by Francis Otieno.pdf',
    '/books/The Girl from the Forest by Francis Otieno.pdf'
];

// Install SW and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Serve cached content
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

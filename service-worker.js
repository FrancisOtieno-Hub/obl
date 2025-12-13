const CACHE_NAME = "obl-cache-v1";
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/books/100 Best Motivational Quotes by Francis Otieno.pdf',
    '/books/Alego Air by Francis Otieno.pdf',
    '/books/Avianna by Francis Otieno.pdf',
    '/books/Ayanna by Francis Otieno.pdf',
    '/books/Come As You Are by Francis Otieno.pdf',
    '/books/Crowned with Glory by Francis Otieno.pdf',
    '/books/Forge by Francis Otieno.pdf', 
    '/books/Leverage by Francis Otieno.pdf',
    '/books/Lines on Paper by Francis Otieno.pdf',
    '/books/Mastering AI in 2025 by Francis Otieno.pdf',
    '/books/Mind-Hacking by Francis Otieno.pdf',
    '/books/Overcoming Territorial Spirits by Francis Otieno.pdf',
    '/books/Raising Stars by Francis Otieno.pdf',
    '/books/The Africa We Must Build by Francis Otieno.pdf',
    '/books/The Art of a Lasting Union by Francis Otieno.pdf',
    '/books/The Child I Had to Raise by Francis Otieno.pdf',
    '/books/The Everyday Investor by Francis Otieno.pdf',
    '/books/The Girl from the Forest by Francis Otieno.pdf',
    '/books/The Nine-Month Journey by Francis Otieno.pdf',
    '/books/The Principle of Generosity by Francis Otieno.pdf',
    '/books/The Quiet Strength by Francis Otieno.pdf',
    '/books/Unshakable by Francis Otieno.pdf',
    '/books/When Heaven Walks Our Roads by Francis Otieno.pdf',
    '/books/Wisdom in Managing Resources by Francis Otieno.pdf',
    '/books/Work Less, Earn More by Francis Otieno.pdf',
    '/covers/Come As You Are Cover Book.jpg',
    '/covers/Leverage Cover Book.jpg',
    '/covers/The Girl from the Forest Cover Book.jpg'
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



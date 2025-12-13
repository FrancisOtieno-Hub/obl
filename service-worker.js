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
    '/covers/100 Best Motivational Quotes Cover Book.jpg',
    '/covers/Alego Air Cover Book.jpg',
    '/covers/Avianna Cover Book.jpg',
    '/covers/Ayanna Cover Book.jpg',
    '/covers/Come As You Are Cover Book.jpg',
    '/covers/Crowned with Glory Cover Book.jpg',
    '/covers/Forge Cover Book.jpg',
    '/covers/Leverage Cover Book.jpg',
    '/covers/Lines on Paper Cover Book.jpg',
    '/covers/Mastering AI in 2025 Cover Book.jpg',
    '/covers/Mind Hacking Cover Book.jpg',
    '/covers/Overcoming Territorial Spirits Cover Book.jpg',
    '/covers/Raising Stars Cover Book.jpg',
    '/covers/The Africa We Must Build Cover Book.jpg',
    '/covers/The Art of a Lasting Union Cover Book.jpg',
    '/covers/The Child I Had to Raise Cover Book.jpg',
    '/covers/The Everyday Investor Cover Book.jpg',
    '/covers/The Girl from the Forest Cover Book.jpg',
    '/covers/The Nine-Month Journey Cover Book.jpg',
    '/covers/The Principle of Generosity Cover Book.jpg',
    '/covers/The Quiet Strength Cover Book.jpg',
    '/covers/Unshakable Cover Book.jpg',
    '/covers/When Heaven Walks Our Roads Cover Book.jpg',
    '/covers/Wisdom in Managing Resources Cover Book.jpg',
    '/covers/Work Less, Earn More Cover Book.jpg'
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




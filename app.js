const App = (() => {

    const books = [
        {
            title: "100 Best Motivational Quotes",
            file: "books/100 Best Motivational Quotes by Francis Otieno.pdf",
            categories: ["Motivation"],
            cover: "covers/100 Best Motivational Quotes Cover Book.jpg"
        },
        {
            title: "Alego Air",
            file: "books/Alego Air by Francis Otieno.pdf",
            categories: ["Fiction"],
            cover: "covers/Alego Air Cover Book.jpg"
        },
        {
            title: "Avianna",
            file: "books/Avianna by Francis Otieno.pdf",
            categories: ["Fiction"],
            cover: "covers/Avianna Cover Book.jpg"
        },
        {
            title: "Ayanna",
            file: "books/Ayanna by Francis Otieno.pdf",
            categories: ["Finance"],
            cover: "covers/Ayanna Cover Book.jpg"
        },
        {
            title: "Come As You Are",
            file: "books/Come As You Are by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/Come As You Are Cover Book.jpg"
        },
        {
            title: "Crowned with Glory",
            file: "books/Crowned with Glory by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/Crowned with Glory Cover Book.jpg"
        },
        {
            title: "Forge",
            file: "books/Forge by Francis Otieno.pdf",
            categories: ["Finance"],
            cover: "covers/Forge Cover Book.jpg"
        },
        {
            title: "Leverage",
            file: "books/Leverage by Francis Otieno.pdf",
            categories: ["Finance"],
            cover: "covers/Leverage Cover Book.jpg"
        },
        {
            title: "Lines on Paper",
            file: "books/Lines on Paper by Francis Otieno.pdf",
            categories: ["Fiction"],
            cover: "covers/Lines on Paper Cover Book.jpg"
        },
        {
            title: "Mastering AI in 2025",
            file: "books/Mastering AI in 2025 by Francis Otieno.pdf",
            categories: ["Artificial Intelligence"],
            cover: "covers/Mastering AI in 2025 Cover Book.jpg"
        },
        {
            title: "Mind Hacking",
            file: "books/Mind-Hacking by Francis Otieno.pdf",
            categories: ["Self-Help"],
            cover: "covers/Mind Hacking Cover Book.jpg"
        },
        {
            title: "Overcoming Territorial Spirits",
            file: "books/Overcoming Territorial Spirits by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/Overcoming Territorial Spirits Cover Book.jpg"
        },
        {
            title: "Raising Stars",
            file: "books/Raising Stars by Francis Otieno.pdf",
            categories: ["Parenting"],
            cover: "covers/Raising Stars Cover Book.jpg"
        },
        {
            title: "The Africa We Must Build",
            file: "books/The Africa We Must Build by Francis Otieno.pdf",
            categories: ["Non-Fiction"],
            cover: "covers/The Africa We Must Build Cover Book.jpg"
        },
        {
            title: "The Art of a Lasting Union",
            file: "books/The Art of a Lasting Union by Francis Otieno.pdf",
            categories: ["Relationship"],
            cover: "covers/The Art of a Lasting Union Cover Book.jpg"
        },
        {
            title: "The Child I Had to Raise",
            file: "books/The Child I Had to Raise by Francis Otieno.pdf",
            categories: ["Fiction"],
            cover: "covers/The Child I Had To Raise Cover Book.jpg"
        },
        {
            title: "The Everyday Investor",
            file: "books/The Everyday Investor by Francis Otieno.pdf",
            categories: ["Finance"],
            cover: "covers/The Everyday Investor Cover Book.jpg"
        },
        {
            title: "The Girl from the Forest",
            file: "books/The Girl from the Forest by Francis Otieno.pdf",
            categories: ["Fiction"],
            cover: "covers/The Girl from the Forest Cover Book.jpg"
        },
        {
            title: "The Nine-Month Journey",
            file: "books/The Nine-Month Journey by Francis Otieno.pdf",
            categories: ["Parenting"],
            cover: "covers/The Nine-Month Journey Cover Book.jpg"
        },
        {
            title: "The Principle of Generosity",
            file: "books/The Principle of Generosity by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/The Principle of Generosity Cover Book.jpg"
        },
        {
            title: "The Quiet Strength",
            file: "books/The Quiet Strength by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/The Quiet Strength Cover Book.jpg"
        },
        {
            title: "Unshakable",
            file: "books/Unshakable by Francis Otieno.pdf",
            categories: ["Self-Help"],
            cover: "covers/Unshakable Cover Book.jpg"
        },
        {
            title: "When Heaven Walks Our Roads",
            file: "books/When Heaven Walks Our Roads by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/When Heaven Walks Our Roads Cover Book.jpg"
        },
        {
            title: "Wisdom in Managing Resources",
            file: "books/Wisdom in Managing Resources by Francis Otieno.pdf",
            categories: ["Christianity"],
            cover: "covers/Wisdom in Managing Resources Cover Book.jpg"
        },
        {
            title: "Work Less Earn More",
            file: "books/Work Less Earn More by Francis Otieno.pdf",
            categories: ["Finance"],
            cover: "covers/Work Less Earn More Cover Book.jpg"
        }
    ];

    
    const dom = {
        list: document.getElementById('book-list'),
        search: document.getElementById('search'),
        filter: document.getElementById('category-filter'),
        viewer: document.getElementById('pdf-viewer'),
        frame: document.getElementById('pdf-frame'),
        close: document.getElementById('close-pdf')
    };

    let bookmarkTimer = null;
    let activeBook = null;

    
    function init() {
        populateCategories();
        bindEvents();
        renderBooks(books);
        registerServiceWorker();
    }

    
    function populateCategories() {
        const categories = [...new Set(books.flatMap(b => b.categories))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            dom.filter.appendChild(option);
        });
    }


    
    function renderBooks(list) {
        dom.list.innerHTML = '';
        list.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `<img src="${book.cover}" class="book-cover" alt="${book.title}">`;
            card.addEventListener('click', () => openBook(book));
            dom.list.appendChild(card);
        });
    }


    
    function openBook(book) {
        activeBook = book;
        const page = localStorage.getItem(bookmarkKey(book)) || 1;
        dom.frame.src = `pdfjs/web/viewer.html?file=${encodeURIComponent(book.file)}#page=${page}`;
        dom.viewer.style.display = 'flex';

        bookmarkTimer = setInterval(saveBookmark, 4000);
    }

    function closeBook() {
        clearInterval(bookmarkTimer);
        bookmarkTimer = null;
        activeBook = null;
        dom.frame.src = '';
        dom.viewer.style.display = 'none';
    }

    function saveBookmark() {
        try {
            const hash = dom.frame.contentWindow.location.hash;
            const match = hash.match(/page=(\d+)/);
            if (match && activeBook) {
                localStorage.setItem(bookmarkKey(activeBook), match[1]);
            }
        } catch {
            // Silent failure – cross-origin safety
        }
    }

    function bookmarkKey(book) {
        return `obl-bookmark-${book.title}`;
    }


    function applyFilters() {
        const query = dom.search.value.toLowerCase();
        const category = dom.filter.value;

        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(query) &&
            (category === 'all' || book.categories.includes(category))
        );

        renderBooks(filtered);
    }

    
    function bindEvents() {
        dom.search.addEventListener('input', applyFilters);
        dom.filter.addEventListener('change', applyFilters);
        dom.close.addEventListener('click', closeBook);
    }

    
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('service-worker.js')
                .then(() => console.log('Service Worker registered'))
                .catch(err => console.error('SW failed:', err));
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);



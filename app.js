// List of books
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
        cover: "covers/The Child I Had to Raise Cover Book.jpg"
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
        file: "books/Work Less, Earn More by Francis Otieno.pdf",
        categories: ["Finance"],
        cover: "covers/Work Less, Earn More Cover Book.jpg"
    }
];


const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const pdfViewer = document.getElementById('pdf-viewer');
const pdfFrame = document.getElementById('pdf-frame');
const closeBtn = document.getElementById('close-pdf');

// Populate categories dynamically
const categories = new Set();
books.forEach(book => book.categories.forEach(cat => categories.add(cat)));
categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
});

// Render books
function renderBooks(filteredBooks) {
    bookList.innerHTML = '';
    filteredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';

        card.innerHTML = `
            <img src="${book.cover}" class="book-cover" alt="Cover">
        `;

        card.onclick = () => openPDF(book);
        bookList.appendChild(card);
    });
}


// Open PDF with bookmark memory
function openPDF(book) {
    const lastPage = localStorage.getItem(`book-${book.title}-page`) || '';
    pdfFrame.src = `${book.file}#page=${lastPage}`;
    pdfViewer.style.display = 'flex';

    // Remember page every 5 seconds
    const interval = setInterval(() => {
        const hash = pdfFrame.contentWindow.location.hash;
        const pageMatch = hash.match(/page=(\d+)/);
        if (pageMatch) localStorage.setItem(`book-${book.title}-page`, pageMatch[1]);
    }, 5000);

    closeBtn.onclick = () => {
        clearInterval(interval);
        pdfFrame.src = '';
        pdfViewer.style.display = 'none';
    };
}

// Filter books
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = books.filter(book => {
        const matchTitle = book.title.toLowerCase().includes(searchTerm);
        const matchCategory = category === 'all' || book.categories.includes(category);
        return matchTitle && matchCategory;
    });
    renderBooks(filtered);
}

searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

// Initial render
renderBooks(books);

// Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Failed:', err));
}






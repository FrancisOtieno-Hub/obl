// List of books
const books = [
    { 
        title: "Leverage",
        file: "books/Leverage by Francis Otieno.pdf",
        categories: ["Finance", "Self-Help"],
        cover: "covers/Leverage Cover Book.jpg"
    },
    { 
        title: "Come As You Are",
        file: "books/Come As You Are by Francis Otieno.pdf",
        categories: ["Christianity"],
        cover: "covers/Come As You Are Cover Book.jpg"
    },
    { 
        title: "The Girl from the Forest",
        file: "books/The Girl from the Forest by Francis Otieno.pdf",
        categories: ["Fiction"],
        cover: "covers/The Girl from the Forest Cover Book.jpg"
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



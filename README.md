# **Otieno Book Library (OBL)**

*A calm, offline-first Progressive Web App for reading PDF books.*

---

## **Overview**

**Otieno Book Library (OBL)** is a lightweight, minimalist Progressive Web App designed for focused reading. It allows users to browse, search, and read PDF books directly in the browser while supporting offline access through intelligent caching.

The app is built with simplicity and longevity in mind—fast to load, gentle on device storage, and optimized for uninterrupted reading.

---

## **Core Philosophy**

> A good library loads quickly, remembers what you read, and stays out of the way.

OBL prioritizes:

* Reading immersion
* Offline resilience
* Low memory usage
* Clean, distraction-free design

---

## **Features**

* **Dynamic Book Library**
  Automatically renders available books from a predefined dataset.

* **Search & Category Filtering**
  Instantly search by title and filter books by category.

* **Built-in PDF Reader**
  Reads PDFs inside an embedded viewer without leaving the app.

* **Automatic Reading Memory**
  Remembers the last opened page and resumes reading using `localStorage`.

* **Offline-First Architecture**
  Core app assets are cached on install; books are cached **on demand** when first opened.

* **Installable PWA**
  Includes a manifest for installation on mobile and desktop as a standalone app.

---

## **Project Structure**

```
/
├── index.html
├── style.css
├── app.js
├── service-worker.js
├── manifest.json
├── /books
│     ├── Leverage by Francis Otieno.pdf
│     ├── Come As You Are by Francis Otieno.pdf
│     └── The Girl from the Forest by Francis Otieno.pdf
└── /covers
      ├── Leverage Cover Book.jpg
      ├── Come As You Are Cover Book.jpg
      └── The Girl from the Forest Cover Book.jpg
```

---

## **Installation & Setup**

### **1. Clone the project**

```bash
git clone <your-repo-url>
cd your-repo-folder
```

---

### **2. Start a local server**

Service workers require HTTPS or `localhost`.

#### Using Node.js:

```bash
npm install -g serve
serve .
```

#### Using Python:

```bash
python3 -m http.server
```

---

### **3. Open the app**

Visit the local address shown in your terminal, for example:

```
http://localhost:3000
```

---

## **How the PWA Works**

* The **service worker** caches the app shell (HTML, CSS, JS, icons) during installation.
* PDF books and cover images are **cached only when accessed**, preventing excessive storage use.
* Cached books remain available offline after their first read.
* Old caches are automatically cleaned during updates.
* The **manifest** enables installation and standalone operation.
* The **PDF reader** restores the last read page automatically.

This architecture keeps the app fast, stable, and respectful of device limits.

---

## **Adding or Removing Books**

### **1. Add a PDF**

Place your book inside the `/books` folder:

```
/books/My New Book.pdf
```

### **2. Register it in `app.js`**

```js
{
  title: "My New Book",
  file: "books/My New Book.pdf",
  categories: ["Category"]
}
```

### **3. No service worker edits required**

Books are cached automatically **when opened**, not during installation.

---

## **Offline Behavior Summary**

| Asset Type | Caching Strategy                 |
| ---------- | -------------------------------- |
| App shell  | Cache-first                      |
| PDFs       | Network-first, cached on access  |
| Covers     | Network-first, cached on access  |
| Updates    | Old caches removed automatically |

---

## **License**

This project is free to use and modify for **personal, educational, or non-commercial purposes**.

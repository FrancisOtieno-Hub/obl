# **Otieno’s Book Library (OBL)**
A lightweight Progressive Web App (PWA) for browsing and reading PDF books with offline support.

## **Overview**
OBL is a minimal PWA that allows users to search, filter, and read books directly from their browser. It includes offline capabilities, category filtering, and automatic bookmark memory that resumes a reader from their last opened page.

## **Features**
* **Book List Display** — Automatically renders available books.
* **Search & Filter** — Users can search by title and filter by category.
* **Built-in PDF Viewer** — Opens PDFs inside an iframe viewer.
* **Auto Bookmarking** — Remembers the last opened page using `localStorage`.
* **Offline Support** — Caches assets and books using a Service Worker.
* **Installable PWA** — Includes a manifest for standalone installation.

## **Project Structure**
```
/
├── index.html
├── style.css
├── app.js
├── service-worker.js
├── manifest.json
└── /books
      ├── Leverage by Francis Otieno.pdf
      ├── Come As You Are by Francis Otieno.pdf
      └── The Girl from the Forest by Francis Otieno.pdf
```

## **Installation & Setup**

### **1. Clone the project**
```bash
git clone <your-repo-url>
cd your-repo-folder
```
### **2. Start a local server**
PWA features (like service workers) require HTTPS or localhost.
Use any simple server:

#### Using Node:
```bash
npm install -g serve
serve .
```

#### Using Python:
```bash
python3 -m http.server
```

### **3. Visit the app**
Open:
```
http://localhost:3000
```
(or the port your server shows)

## **How the PWA Works**
* The **service worker** caches core files and PDFs to allow offline access.
* The **manifest** enables installation on mobile and desktop.
* The **PDF viewer** loads books inside an iframe.
* A **bookmark system** stores the last read page and restores it when reopened.

## **Add or Remove Books**
Add your PDFs inside the `/books` folder:
```
/books/My New Book.pdf
```
Then register the file inside `app.js`:
```js
{ title: "My New Book", file: "books/My New Book.pdf", categories: ["Category"] },
```
And add it to the `urlsToCache` list in `service-worker.js`.

## **License**
This project is free to use and modify for personal or educational purposes.


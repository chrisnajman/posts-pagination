# Posts Pagination

A fully accessible, modular JavaScript posts pagination component with screen reader support, dynamic content loading, and URL syncing for seamless navigation.

Posts are divided into pages of 5 items each, with a total of 6 pages generated dynamically using a chunking function for efficient rendering and navigation.

[View on GitPage](https://chrisnajman.github.io/posts-pagination)

---

## Features

- Fully modular ES6+ JavaScript architecture
- Pagination state synced with URL (`?page=3`)
- Keyboard-navigable buttons and skip link support
- Screen reader announcements using ARIA live regions
- Initial page content loads dynamically from JSON
- Automatic focus and ARIA attributes for active page button
- Responsive layout for mobile and desktop
- Loader animation with accessible screen reader announcements
- Ellipsis indicators for skipped page ranges

---

## HTML

## HTML

### Output

Container where the current page's posts are dynamically rendered.

### Live region

Visually hidden `aria-live` region for screen reader announcements about page changes or loading state.

### Paginator

Navigation container where pagination controls are dynamically generated.

### Post template

HTML `<template>` for rendering individual posts with title, body, tags, views, likes, and dislikes, plus decorative and accessibility elements.

```html
<main>
  <h1>Posts</h1>

  <!-- Output -->
  <div
    id="posts-page-container"
    class="posts-page-container"
  ></div>

  <!-- Live region -->
  <div
    id="live-region"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></div>

  <!-- Paginator -->
  <nav
    aria-label="Pagination"
    class="paginator-container"
  >
    <div
      id="paginator"
      class="paginator"
    ></div>
  </nav>

  <!-- Post template -->
  <template id="article-post">
    <article
      class="post flow"
      data-item
    >
      <header class="post-header"></header></article
  ></template>
</main>

        <svg
          height="50"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 504.4 504.4"
          aria-hidden="true"
        >
          <path
            d="M377.6,0.2H126.4C56.8,0.2,0,57,0,126.6v251.6c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6
  C504,57,447.2,0.2,377.6,0.2z M136.8,409c-23.2,0-42-18.8-42-41.6c0-23.2,18.8-41.6,42-41.6c23.2,0,42,18.8,42,41.6
  C178.8,390.2,160,409,136.8,409z M242,408.2c0-40-14.8-76-42.4-103.6c-28-28-63.6-42.4-103.6-42.4v-60.4
  c112,0,206.4,94.4,206.4,206.4H242z M348.8,408.2c0-140-112.8-252.8-252.8-252.8V95c172,0,313.2,141.2,313.2,313.2H348.8z"
          />
        </svg>

        <h2>Post <span data-id></span>: <span data-title></span></h2>
      </header>
      <p data-body></p>
      <ul class="info">
        <li><strong>Tags</strong>: <span data-tags></span></li>
        <li><strong>Views</strong>: <span data-views></span></li>
        <li class="reactions">
          <div class="reaction">
            <span
              class="likes-dislikes likes"
              aria-hidden="true"
            ></span
            ><span class="visually-hidden">Likes</span><span data-likes></span>
          </div>
          <span>|</span>
          <div class="reaction">
            <span
              class="likes-dislikes dislikes"
              aria-hidden="true"
            ></span
            ><span class="visually-hidden">Dislikes</span>
            <span data-dislikes></span>
          </div>
        </li>
      </ul>
      <p class="faux-link">
        <span class="visually-hidden">(Fake link that goes nowhere:) </span>Read
        more...
      </p>
    </article>
  </template>
</main>
```

---

## JavaScript

Built with **vanilla ES6 JavaScript**, focusing on modern syntax and browser APIs, then bundled, transpiled to ES2015, and minified for broad browser compatibility.

The JavaScript has been split into separate modules, improving code modularity:

### Main

- `index.js`: Entry point that initializes the app and imports other scripts like the pagination module, theme toggle, and loader.
- **`js-modules/`**:
  - **`helpers/`**:
    - `set-multiple-attributes.js`: Utility for setting multiple attributes on a DOM element.
  - **`pagination/`**:
    - `pagination.js`: Coordinates pagination logic — importing render functions, managing state, and syncing page changes with the URL.
    - `render-posts.js`: Dynamically injects the current page’s posts into the DOM from a chunked data array.
    - **`components/`**:
      - `posts.js`: Fetches the posts JSON, prepares the data, and triggers the initial rendering process.
      - **`paginator/`**:
        - `paginator.js`: Core pagination module — renders the page buttons, handles next/previous navigation, updates ARIA attributes, and manages button states.
        - **`helpers/`**:
          - `announce-live-region.js`: Announces the page load to screen readers using ARIA live regions.
          - `chunk-posts.js`: Splits the full posts array into smaller arrays (chunks) based on a defined number of posts per page.
          - `paginator-helpers.js`:
            - `focusCurrentPageButton(container, currentPage)`: Focuses the active page button inside the paginator container.
            - `getPageFromURL(totalPages)`: Reads the current page number from the URL query parameter, validating it against total pages.
            - `createEllipsis()`: Creates and returns an ellipsis `<span>` element for pagination UI, marked as aria-hidden.
            - `updatePaginationState(currentId, totalPages, previousBtn, nextBtn)`: Enables or disables previous/next buttons based on the current page.

#### AI (chatGPT)

The greater part of the **pagination** JavaScript was generated by prompting **chatGPT**.

This was an arduous process due to the complexity involved (and not helped by the numerous "hallucinations" experienced by the AI).

### Other

- `loader.js`: Manages the loader animation used for both the **initial page load** and **pagination updates**.
  - On first load, it displays a full-screen loader until the page is rendered, then removes it and announces "Page has loaded" for screen reader users.
  - During pagination, it briefly shows the loader while new content is being injected, providing a smoother visual transition and improved accessibility feedback.
- `theme.js`: Handles theme toggling (light/dark mode) and local storage management.

---

## Accessibility

The site includes the following accessibility enhancements:

- Fully keyboard-navigable using tab keys.
- ARIA roles and attributes are implemented throughout (e.g. for navigation and live announcements).
- A visually hidden skip link is provided for screen reader users.
- An ARIA live region (`<div id="live-region">`) announces new content loaded when navigating between pages.

---

## Theme Toggling

The application includes a dark mode and light mode toggle:

- The current theme state is stored in **local storage** and applied automatically on page reload.
- Accessible buttons with appropriate ARIA attributes are used to improve usability.

---

## Testing and Compatibility

The application has been tested on the following platforms and browsers:

- **Operating System**: Windows 10/11
- **Browsers**:
  - Google Chrome
  - Mozilla Firefox
  - Microsoft Edge

### Device View Testing

The layout and functionality have been verified in both browser and device simulation views to ensure responsiveness and usability.

---

## How to Run

1. Clone or download the repository to your local machine.
2. Open the project folder and start a simple HTTP server (e.g., using `Live Server` in VS Code or Python's `http.server` module).
3. Open the project in a modern browser (e.g., Chrome, Firefox, or Edge).

---

## Build & Deployment Setup for `/docs` Folder

If you want to deploy a minified version of this project to **GitHub Pages**, read on.

### 1. Install Required Packages

Run this once in your project root to install dev dependencies:

```bash
npm install
```

### 2. Run the full build process

In the terminal, run:

```bash
npm run build
```

### 3. Deploy to GitHub Pages

Once you've created a repository and pushed the files,

- go to `https://github.com/[your-name]/[your-project-name]/settings/pages`.
- Under "Build and deployment > Branch" make sure you set the branch to `main` and folder to `/docs`.
- Click "Save".

> [!NOTE]
> For a detailed description of the build process, configuration files and npm packages see my [GitHub Pages Optimised Build](https://github.com/chrisnajman/github-pages-optimised-build).

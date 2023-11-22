import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

class BookFactory {
  constructor(booksPerPage, booksData, authorsData, genresData) {
    this.booksPerPage = booksPerPage;
    this.books = booksData;
    this.authors = authorsData;
    this.genres = genresData;
    this.page = 1;
    this.matches = this.books;
  }

  createBookElement({ id, image, title, author }) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${this.authors[author]}</div>
      </div>
    `;

    return element;
  }

  renderBooks(page, matches) {
    const fragment = document.createDocumentFragment();

    for (const book of matches.slice((page - 1) * this.booksPerPage, page * this.booksPerPage)) {
      const bookElement = this.createBookElement(book);
      fragment.appendChild(bookElement);
    }

    return fragment;
  }

  appendOptionsToDocument(selector, data, defaultOptionText) {
    const elementHtml = document.createDocumentFragment();

    const firstElement = document.createElement("option");
    firstElement.value = "any";
    firstElement.innerText = defaultOptionText;
    elementHtml.appendChild(firstElement);

    for (const [id, name] of Object.entries(data)) {
      const optionElement = document.createElement("option");
      optionElement.value = id;
      optionElement.innerText = name;
      elementHtml.appendChild(optionElement);
    }

    document.querySelector(selector).appendChild(elementHtml);
  }

  setThemeBasedOnMediaQuery() {
    const themeSelector = document.querySelector("[data-settings-theme]");
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkMode) {
      themeSelector.value = "night";
      document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      themeSelector.value = "day";
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty("--color-light", "255, 255, 255");
    }
  }

  updateListButtonContent() {
    const listButton = document.querySelector("[data-list-button]");
    const remainingBooks = this.matches.length - this.page * this.booksPerPage;

    listButton.innerText = `Show more (${remainingBooks > 0 ? remainingBooks : 0})`;
    listButton.disabled = remainingBooks <= 0;

    listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
  }
}
// Event listeners...
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document.querySelector("[data-settings-cancel]").addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }

    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    page = 1;
    matches = result;

    const listMessage = document.querySelector("[data-list-message]");
    listMessage.classList.toggle("list__message_show", result.length < 1);

    document.querySelector("[data-list-items]").innerHTML = "";
    const newItems = factoryFunctions.renderBooks(page, matches);
    document.querySelector("[data-list-items]").appendChild(newItems);

    factoryFunctions.updateListButtonContent();

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

document.querySelector("[data-list-button]").addEventListener("click", () => {
  const fragment = factoryFunctions.renderBooks(++page, matches);
  document.querySelector("[data-list-items]").appendChild(fragment);
});

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      const listActive = document.querySelector("[data-list-active]");
      listActive.open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
  const factoryInstance = new BookFactory(
    BOOKS_PER_PAGE,
    books,
    authors,
    genres
  );

  document
    .querySelector("[data-list-items]")
    .appendChild(
      factoryInstance.renderBooks(factoryInstance.page, factoryInstance.matches)
    );
  factoryInstance.appendOptionsToDocument(
    "[data-search-genres]",
    genres,
    "All Genres"
  );
  factoryInstance.appendOptionsToDocument(
    "[data-search-authors]",
    authors,
    "All Authors"
  );
  factoryInstance.setThemeBasedOnMediaQuery();
  factoryInstance.updateListButtonContent();
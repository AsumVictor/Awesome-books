import BookElement from "./modules/BookELement.js";
import { storeToLocalStorage, getFromLocalStorage } from "./modules/Storage.js";
import {
  titleInput,
  authorInput,
  form,
  booksListElement,
  navigationLinks,
  timeIndicator,
} from "./modules/Valuables.js";

class Main extends BookElement {
  constructor() {
    super();
    this.listOfBooks = [];
  }

  removeElement = (id) => {
    this.listOfBooks = this.listOfBooks.filter((el) => el.id !== id);
    document.getElementById(id).remove();
    storeToLocalStorage("books", this.listOfBooks);
  };

  printElements = () => {
    booksListElement.innerHTML = "";
    this.listOfBooks.forEach((el) => {
      booksListElement.appendChild(
        this.bookElement(el.title, el.author, el.id)
      );
    });
  };

  addToList = (title, author) => {
    this.listOfBooks.push({
      title,
      author,
      id: new Date().toISOString(),
    });

    this.printElements();
    titleInput.value = null;
    authorInput.value = null;
    storeToLocalStorage("books", this.listOfBooks);
  };

  formSubmit = () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        titleInput.value.trim().length === 0 ||
        authorInput.value.trim().length === 0
      ) {
        alert("No value provided");
        return;
      }
      this.addToList(titleInput.value, authorInput.value);
    });
  };

  loadData = () => {
    window.addEventListener("load", async () => {
      const getBooksFromLocalStorage = await getFromLocalStorage("books");
      if (getBooksFromLocalStorage) {
        this.listOfBooks = getBooksFromLocalStorage;
        this.printElements();
      }
    });
  };

  switchPages = (page) => {
    const findActivePage = document.querySelector(".opened");
    findActivePage.classList.remove("opened");
    findActivePage.classList.add("hidden");
    const newActivePage = document.querySelector(`.${page}`);
    newActivePage.classList.remove("hidden");
    newActivePage.classList.add("opened");
  };

  getLocalTime = () => {
    const time = new Date();
    return time;
  };

  getTime = () => {
    setInterval(() => {
      timeIndicator.innerHTML = this.getLocalTime();
    }, 1000);
  };
}

const mainClass = new Main();
mainClass.formSubmit();
mainClass.loadData();
mainClass.getTime();

navigationLinks.forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    el.classList.add("active");
    mainClass.switchPages(el.id);
  });
});

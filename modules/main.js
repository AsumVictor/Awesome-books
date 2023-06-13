import BookElement from "./BookELement.js";
import { storeToLocalStorage, getFromLocalStorage } from "./Storage.js";
import {
  titleInput,
  authorInput,
  form,
  booksListElement,
} from "./Valuables.js";


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
  
    
  }

  export default Main
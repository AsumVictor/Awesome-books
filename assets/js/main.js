const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const form = document.querySelector('form');
const booksListElement = document.querySelector('.listOfBooks');
const navigationLinks = document.querySelectorAll('.nav-link');

class Main {
  constructor() {
    this.listOfBooks = [];
  }

  storeToLocalStorage = () => {
    const listInJson = JSON.stringify(this.listOfBooks);
    localStorage.setItem('books', listInJson);
  };

  bookElement = (title, author, id) => {
    const element = document.createElement('li');
    element.id = id;
    element.innerHTML = `
  
    <div class="">
        <p>${title} by ${author}</p>
    </div>
    <button>
        Delete
        <i class='bx bx-trash'></i>
    </button>

        `;
    element.querySelector('button').addEventListener('click', () => this.removeElement(id));
    return element;
  };

  removeElement = (id) => {
    this.listOfBooks = this.listOfBooks.filter((el) => el.id !== id);
    document.getElementById(id).remove();
    this.storeToLocalStorage();
  };

  printElements = () => {
    booksListElement.innerHTML = '';
    this.listOfBooks.forEach((el) => {
      booksListElement.appendChild(this.bookElement(el.title, el.author, el.id));
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
    this.storeToLocalStorage();
  };

  formSubmit() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (titleInput.value.trim().length === 0 || authorInput.value.trim().length === 0) {
        alert('No value provided');
        return;
      }
      this.addToList(titleInput.value, authorInput.value);
    });
  }

  loadData() {
    window.addEventListener('load', () => {
      const getFromLocalStorage = JSON.parse(localStorage.getItem('books'));
      if (getFromLocalStorage) {
        this.listOfBooks = getFromLocalStorage;
        this.printElements();
      }
    });
  }

  switchPages = (page) => {
    const findActivePage = document.querySelector('.opened');
    findActivePage.classList.remove('opened');
    findActivePage.classList.add('hidden');
    const newActivePage = document.querySelector(`.${page}`);
    newActivePage.classList.remove('hidden');
    newActivePage.classList.add('opened');
  }
}

const mainClass = new Main();
mainClass.formSubmit();
mainClass.loadData();
navigationLinks.forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    el.classList.add('active');
    mainClass.switchPages(el.id);
  });
});
class BookElement {
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
}

export default BookElement;
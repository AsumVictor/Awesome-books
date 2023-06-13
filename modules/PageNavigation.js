const switchPages = (page) => {
  const findActivePage = document.querySelector('.opened');
  findActivePage.classList.remove('opened');
  findActivePage.classList.add('hidden');
  const newActivePage = document.querySelector(`.${page}`);
  newActivePage.classList.remove('hidden');
  newActivePage.classList.add('opened');
};

export default switchPages;
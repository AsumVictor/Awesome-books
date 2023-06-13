import { navigationLinks } from './modules/Valuables.js';
import Main from './modules/main.js';
import getTime from './modules/time.js';
import switchPages from './modules/PageNavigation.js';

const mainClass = new Main();
mainClass.formSubmit();
mainClass.loadData();
getTime();

navigationLinks.forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    el.classList.add('active');
    switchPages(el.id);
  });
});

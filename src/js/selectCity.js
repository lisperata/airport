import { createHtmlTableEv } from './pages/home'

export const clearEvents = () => {
  let eventWrapper = document.querySelectorAll('.table__wrap');
  eventWrapper = Array.from(eventWrapper);
  eventWrapper.forEach (el => {
    el.parentElement.classList.remove('green');
    el.parentElement.innerHTML='';
  });
}


export const showEvents = () => {
  clearEvents();

  const city = document.querySelector('.header__edit-calendar_filter').value;

  let keyArr = [];
  for(let i = 0; i < localStorage.length; i++){
    keyArr.push(localStorage.key(i));
  }
  keyArr.forEach(key => {
    let cit = JSON.parse(localStorage.getItem(key));
    for(let i = 0; i < cit.cities.length; i++){
      if(cit.cities[i] === city ){
        let idElem = '#' + cit.day.substr(0, 2) + cit.time.substr(0, 2);
        createHtmlTableEv(idElem, cit.title);
      } else if (city === 'Все города') {
        let idElem = '#' + cit.day.substr(0, 2) + cit.time.substr(0, 2);
        createHtmlTableEv(idElem, cit.title);
        break;
      }
    }
    
  })
} 
import { goTo } from '../router';
import { closeModal } from '../modal';
import { openModal } from '../modal';
import { showEvents } from '../selectCity';

export const initHome = () => {


  const modalClose = document.querySelectorAll('.close');
  modalClose.forEach(element => {
    element.addEventListener('click', closeModal);
  });
  try{
  showEvents();
  } catch {
    localStorage.clear();
    showEvents();
  }
  const selectCity = document.querySelector('.header__edit-calendar_filter');
  selectCity.addEventListener('change', showEvents);


  const addEvent = document.querySelector('.header__edit-calendar_add');
  addEvent.addEventListener('click', function() {
    goTo('addEvent');
  });


}

export const homePage = () => {
  const home = document.querySelector('.home');
  const addEvPage = document.querySelector('.add-event');

  home.classList.add('show');
  home.classList.remove('hide');

  addEvPage.innerHTML = '';


};



export const createHtmlTableEv = (idElem, title) => {
  const cell = document.querySelector(idElem);
  cell.classList.add('green');
  cell.innerHTML = `<div class='table__wrap'>  
  <div class='title-event'>${title}</div>
  <div class='delete-event'>&#10005;</div>
  </div>`

  const deleteBtn = cell.querySelector('.delete-event');
  deleteBtn.addEventListener('click', () => openModal(cell));
}


export const deleteEvent = (cell) => {
  const day = cell.id.substr(0, 2);
  const time = cell.id.substr(2, 2);
  const title = cell.querySelector('.title-event').innerHTML;

  let keyArr = [];
  for(let i = 0; i < localStorage.length; i++){
    keyArr.push(localStorage.key(i));
  }
  keyArr.forEach(key => {
    let obj = JSON.parse(localStorage.getItem(key));
    if (obj.day.substr(0, 2) === day && obj.time.substr(0, 2) == time && obj.title === title){
      localStorage.removeItem(key);
      cell.innerHTML = '';
      cell.classList.remove('green');
    }
  });
  closeModal();
}
import { goTo } from "../router";
import { handleEvent } from '../handleEvent'
import { createHtmlTableEv } from './home'
import { schedule } from '../schedule';

const getAvailableTime = () => {
  const day = document.querySelector('.day').value;
  const cities = document.querySelectorAll('.check');
  let city ='';
  cities.forEach(el => {
    if(el.checked) {
      city = el.value;
    }
  })
  let sch = schedule();

  document.querySelector('.wrap-time').innerHTML = '';


  sch = sch.filter((el) => {
    if(el.city === city && el.day === day) 
      return city;
  });

  if(sch.length === 0){
    sch = [{time: 'Рейсы отсутствуют!'}]
  }

  sch.sort((a, b) => a.time > b.time ? 1 : -1);

  let select = document.createElement('select');
  const wrap = document.querySelector('.wrap-time');

  select.classList.add('new-event__value', 'time')
  

  sch.forEach(el => {
    let option = document.createElement('option');
    option.innerText = el.time;
    select.appendChild(option);
  });

  wrap.appendChild(select);
}

export function renderAddEventPage () {
  showPage();
  const backBtn = document.querySelector('.back');
  const createBtn = document.querySelector('.create');

  backBtn.addEventListener('click', () => {
    const day = document.querySelector('.day');
    const cities = document.querySelectorAll('.check');
  
    day.removeEventListener('change', getAvailableTime);
    cities.forEach(el => {
      el.removeEventListener('change',getAvailableTime);
    })
    goTo('');
  });

  createBtn.addEventListener('click', () => {
    const city = document.querySelector('.check').value;
    if(city != 'Рейсы отсутствуют!'){
    let partic = handleEvent();
    if (partic){
      goTo('');
  
      let idElem = '#' + partic.day.substr(0, 2) + partic.time.substr(0, 2);
  
      createHtmlTableEv(idElem, partic.title)}
    }
  })
};


const showPage = () => {
  const addEvPage = document.querySelector('.add-event');
  const homePage = document.querySelector('.home');

  homePage.classList.add('hide');
  homePage.classList.remove('show');

  addEvPage.innerHTML = createAddEventPageHtml();
  getAvailableTime();

  const day = document.querySelector('.day');
  const cities = document.querySelectorAll('.check');

  day.addEventListener('change', getAvailableTime);
  cities.forEach(el => {
    el.addEventListener('change',getAvailableTime);
  })
}

const createAddEventPageHtml = (times) => {
  return `  <div><div class="container error-already-booked"></div></div>
  <div class="container">
  <form class='new-event'>
    <div class='new-event__wrapper'>
      <div class='new-event__title'>Назовите причину поездки</div>
      <input type='text' class="new-event__value title" value='Совещание'>
    </div>
    <div class='new-event__wrapper'>
      <div class='new-event__title'>Город</div>
      <input type="radio" class ='check' name="rad" value="Лондон" id="Лондон" checked>
      <label for="Лондон">Лондон</label>
      <input type="radio" class ='check' name="rad" value="Нью Йорк" id="Нью Йорк">
      <label for="Нью Йорк">Нью Йорк</label>
      <input type="radio" class ='check' name="rad" value="Пекин" id="Пекин">
      <label for="Пекин">Пекин</label>
      <input type="radio" class ='check' name="rad" value="Токио" id="Токио">
      <label for="Токио">Токио</label>
    </div>
    <div class='new-event__wrapper'>
      <div class='new-event__title'>День</div>
      <select class="new-event__value day">
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
      </select>
    </div>
    <div class='new-event__wrapper'>
      <div class='new-event__title'>Время</div>
      <div class ='wrap-time'></div>
    </div>
    <div class='new-event__buttons'>
      <button class='btn new-event__btn back'>Cancel</button>
      <button class='btn new-event__btn create'>Create</button>
    </div>
  </form>
</div>`;
}


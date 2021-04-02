export const handleEvent = () => {
  const title = document.querySelector('.new-event__value').value;
  let cities = document.querySelectorAll('.check');
  const day = document.querySelector('.day').value;
  const time = document.querySelector('.time').value;

  cities = Array.from(cities);
  cities = cities.map(city => {
    if(city.checked === true) {
      return city.value;
    }
  });
  cities = cities.filter((city) => {
    if(city !== undefined) 
    return city;
  })

  const data = {
    'title': title,
    'cities': cities,
    'day': day,
    'time': time
  };
  let maxKey = -1;
  for(let i = 0; i < localStorage.length; i++){
    let currentKey = localStorage.key(i)
    let dataFromStorage = JSON.parse(localStorage.getItem(currentKey));

    if (dataFromStorage.day === data.day && dataFromStorage.time === data.time){
      alreadyBooked();
      let closeErrorBtn = document.querySelector('.error-already-booked__close');
      closeErrorBtn.addEventListener('click', () => {
        const errorMassage = document.querySelector('.error-already-booked');
        errorMassage.innerHTML = '';
        errorMassage.parentNode.classList.remove('red');
      })
      return false;
    }

    if(currentKey > maxKey){
      maxKey = currentKey;

    }
  }

  localStorage.setItem(+maxKey + 1, JSON.stringify(data));
  return data;
}


const alreadyBooked = () => {
  const errorMassage = document.querySelector('.error-already-booked');
  errorMassage.parentNode.classList.add('red');
  errorMassage.innerHTML = 
  '<div>Невозможно забронировать место. Время в календаре уже занято.</div><div class="error-already-booked__close">&times;</div>'
}
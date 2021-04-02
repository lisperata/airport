import { deleteEvent } from './pages/home' 

const modal = document.querySelector('.modal');

export function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

export const openModal = (cell) => {
  modal.classList.add('show');
  modal.classList.remove('hide');
  const descr = document.querySelector('.modal__dialog_descr');
  const titleOfEv = cell.querySelector('.title-event');
  descr.innerHTML=`Вы уверены, что хотите отменить бронирование на "${titleOfEv.innerHTML}"?`;

  const delEvent = document.querySelector('.delete-event-btn');
  const callDeleteEvent = () => {
    deleteEvent(cell);
    delEvent.removeEventListener('click', callDeleteEvent);
  };
  delEvent.addEventListener('click', callDeleteEvent);

  const listModalClose = () => {
    delEvent.removeEventListener('click', callDeleteEvent);
    modalClose.forEach(el => {
      el.removeEventListener('click', listModalClose)
    });
  }
  const modalClose = document.querySelectorAll('.close');
  modalClose.forEach(element => element.addEventListener('click', listModalClose));
}
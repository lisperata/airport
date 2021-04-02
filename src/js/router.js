import { homePage } from './pages/home'
import { renderAddEventPage } from './pages/addEvent'
export const goTo = (hash) => {
  window.location.hash = hash;
};

export const handleHash = () => {
  const { hash } = window.location;
  if (!hash || hash === '#') {
    homePage();
  } else if (hash === '#addEvent'){
    renderAddEventPage()
  }
}
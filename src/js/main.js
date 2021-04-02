import { initHome } from './pages/home.js';
import { handleHash } from './router'
window.addEventListener("DOMContentLoaded", function () {
  initHome();
  window.addEventListener('hashchange', handleHash);
  handleHash();
});
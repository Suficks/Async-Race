import { setGaragePage } from './garage/setGaragePage';
import { setWinnersPage } from './winners/setWinnersPage';

export const changePages = () => {
  const template = `
    <div class="buttons_container">
      <button class="garage_btn">to garage</button>
      <button class="winners_btn">to winners</button>
    </div>
    <main class="main"></main>
  `;

  document.body.insertAdjacentHTML('beforeend', template);

  const garageBtn = document.querySelector('.garage_btn');
  const winnersBtn = document.querySelector('.winners_btn');

  garageBtn?.addEventListener('click', setGaragePage);
  winnersBtn?.addEventListener('click', setWinnersPage);
};

changePages();
setGaragePage();

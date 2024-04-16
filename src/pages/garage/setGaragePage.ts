import { filtersGenerator } from 'widgets/filtersGenerator/filtersGenerator';
import { garageGenerator } from 'widgets/garageGenerator/garageGenerator';
import { getData } from 'app/api';
import { state } from 'app/state';
import { updateButtonState } from 'features/pagination';
import './garagePage.scss';

export const setGaragePage = async () => {
  const { winners, cars } = state.getState();
  const container = document.querySelector('.main');
  if (!container) return;

  if (winners.length === 0) {
    await getData('winners');
  }

  if (cars.length === 0) {
    await getData('cars');
  }

  const template = `
    <div class="filters"></div>
    <div class="garage"></div>
    <div class="container">
      <button class="prev_garage_btn">prev</button>
      <button class="next_garage_btn">next</button>
    </div>
  `;
  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', template);

  filtersGenerator();
  garageGenerator();
  updateButtonState();

  const prevBtn = document.querySelector('.prev_garage_btn');
  const nextBtn = document.querySelector('.next_garage_btn');

  prevBtn?.addEventListener('click', () => {
    state.pagination('prev', 'cars');
    state.setIsRacing(false);
  });
  nextBtn?.addEventListener('click', () => {
    state.pagination('next', 'cars');
    state.setIsRacing(false);
  });
};

import { state } from 'app/state';
import { createCar } from 'features/createCar';
import { getRandomCars } from 'features/randomCarGenerator';
import { race } from 'features/race';
import './filters.scss';

export const filtersGenerator = () => {
  const container = document.querySelector('.filters');
  const { isEditing, isRacing } = state.getState();
  const isInputDisabled = isEditing ? '' : 'disabled';
  if (!container) return;

  const template = `
    <div class="wrapper">
      <input type="text" class="create_input">
      <input type="color" value="#ffffff" class="color_input create_color">
      <button class="blue_button create_btn">create</button>
    </div>
    <div class="wrapper">
      <input type="text" class="update_input ${isInputDisabled}">
      <input type="color" value="#ffffff" class="color_input ${isInputDisabled} update_color">
      <button class="blue_button update_btn ${isInputDisabled}">update</button>
    </div>
    <div class="wrapper">
      <button class="race_btn ${isRacing ? 'disabled' : ''}">race</button>
      <button class="reset_btn ${isRacing ? '' : 'disabled'}">reset</button>
      <button class="blue_button generate_btn">generate cars</button>
    </div>
  `;
  container.innerHTML = '';
  container?.insertAdjacentHTML('beforeend', template);

  const generateBtn = document.querySelector('.generate_btn');
  const raceBtn = document.querySelector('.race_btn');
  const resetBtn = document.querySelector('.reset_btn');

  generateBtn?.addEventListener('click', () => getRandomCars());
  raceBtn?.addEventListener('click', () => race(true));
  resetBtn?.addEventListener('click', () => race(false));

  createCar();
};

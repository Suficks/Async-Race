import { raceGenerator } from 'widgets/raceGenerator/raceGenerator';
import { state } from 'app/state';
import { deleteData, carMovement } from 'app/api';
import { changeCar } from 'features/changeCar';
import './garage.scss';

const handleClick = (button: NodeListOf<Element>) => {
  button?.forEach((item) =>
    item.addEventListener('click', async () => {
      const id = Number(item.closest('.race_line')?.getAttribute('data-id'));
      const isSelectBtn = item.classList.contains('select_btn');
      const isRemoveBtn = item.classList.contains('remove_btn');
      const isStartBtn = item.classList.contains('start_btn');
      const isStopBtn = item.classList.contains('stop_btn');

      if (isSelectBtn) {
        const { isEditing } = state.getState();
        state.setIsEditing(!isEditing);
        changeCar(id);
      }
      if (isRemoveBtn) {
        await deleteData(id);
      }
      if (isStartBtn) {
        item.nextElementSibling?.classList.remove('disabled_controller');
        item.classList.add('disabled_controller');
        await carMovement(id, 'started');
      }
      if (isStopBtn) {
        item.previousElementSibling?.classList.remove('disabled_controller');
        item.classList.add('disabled_controller');
        await carMovement(id, 'stopped');
      }
    })
  );
};

export function garageGenerator() {
  const container = document.querySelector('.garage');
  const { cars, currentGaragePage, carsPerPage } = state.getState();
  const carsAmount = cars.length;

  const startIndex = currentGaragePage * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  if (!container) return;

  const template = `
    <h1 class="title">Garage (${carsAmount})</h1>
    <h2 class="page_count">Page # ${currentGaragePage + 1}</h2>
    ${cars
      ?.slice(startIndex, endIndex)
      .map((item) => raceGenerator(item))
      .join('')}
  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', template);

  const removeBtns = document.querySelectorAll('.remove_btn');
  handleClick(removeBtns);

  const selectBtns = document.querySelectorAll('.select_btn');
  handleClick(selectBtns);

  const startBtns = document.querySelectorAll('.start_btn');
  handleClick(startBtns);

  const stopBtns = document.querySelectorAll('.stop_btn');
  handleClick(stopBtns);
}

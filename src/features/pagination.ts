import { state } from 'app/state';

export const updateButtonState = () => {
  const prevGarageBtn = document.querySelector('.prev_garage_btn');
  const nextGarageBtn = document.querySelector('.next_garage_btn');
  const prevWinnersBtn = document.querySelector('.prev_winners_btn');
  const nextWinnersBtn = document.querySelector('.next_winners_btn');

  const { currentGaragePage, currentWinnersPage, cars, carsPerPage, winners, winnersPerPage } = state.getState();

  const totalGaragePages = Math.ceil(cars.length / carsPerPage);
  const isLastGaragePage = totalGaragePages - 1;

  const totalWinnersPages = Math.ceil(winners.length / winnersPerPage);
  const isLastWinnersPage = totalWinnersPages - 1;

  prevGarageBtn?.classList.toggle('disabled', currentGaragePage === 0);
  nextGarageBtn?.classList.toggle('disabled', currentGaragePage === isLastGaragePage);

  prevWinnersBtn?.classList.toggle('disabled', currentWinnersPage === 0);
  nextWinnersBtn?.classList.toggle('disabled', currentWinnersPage === isLastWinnersPage);
};

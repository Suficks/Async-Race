import { state } from 'app/state';
import { addData, updateData } from 'app/api';

export const removeWinnerMessage = () => {
  const winnerElement = document.querySelector('.winner');

  setTimeout(() => {
    winnerElement?.remove();
  }, 2500);
};

export const setWinner = async (id: number) => {
  const { winners, cars, carsTime, isRacing } = state.getState();
  const currentWinner = winners.find((winner) => winner.id === id);
  const currentCar = cars.find((car) => car.id === id);
  const currentTime = carsTime.find((item) => item.id === id)?.time;
  const { wins = 1, time = 0 } = currentWinner || {};
  const { name } = currentCar || {};

  const toFixedTime = Number(currentTime?.toFixed(2));

  if (isRacing) {
    document.body.insertAdjacentHTML('beforeend', `<div class="winner">${name} went first (${toFixedTime}s)!</div>`);
    removeWinnerMessage();

    if (!currentWinner) {
      await addData({ id, wins: 1, time: toFixedTime }, 'winners');
    } else {
      const newData = { wins: wins + 1, time: toFixedTime < time ? toFixedTime : time };
      await updateData(id, newData, 'winners');
    }
  }
};

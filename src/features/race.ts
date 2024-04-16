import { carMovement } from 'app/api';
import { state } from 'app/state';

export const race = (start: boolean) => {
  const raceLines = document.querySelectorAll('.race_line');
  const startBtns = document.querySelectorAll('.start_btn');
  const stopBtns = document.querySelectorAll('.stop_btn');

  raceLines.forEach(async (item) => {
    const id = Number(item.getAttribute('data-id'));
    const action = start ? 'started' : 'stopped';

    state.removeCarsTime();
    state.setIsRacing(start);

    startBtns.forEach((elem) => {
      elem.classList.toggle('disabled_controller', start);
    });

    stopBtns.forEach((elem) => {
      elem.classList.toggle('disabled_controller', !start);
    });

    await carMovement(id, action);
  });
};

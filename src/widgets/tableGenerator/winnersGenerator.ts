import { state } from 'app/state';
import { Winners } from 'shared/types/types';

export const winnersGenerator = ({ wins, time, id }: Winners, index: number) => {
  const { cars } = state.getState();
  const currentCar = cars.find((item) => item.id === id);

  if (currentCar) {
    const { name, color } = currentCar;
    const template = `
      <tr>
        <td>${index + 1}</td>
        <td>
          <svg version="1.0" fill="${color}" xmlns="http://www.w3.org/2000/svg" width="30.000000pt" height="30.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" stroke="none">
              <path d="M102 351 c-16 -23 -38 -42 -54 -46 -40 -9 -49 -28 -46 -87 2 -44 6 -53 23 -57 11 -2 30 -14 42 -27 28 -31 58 -30 87 1 21 22 31 25 96 25 65 0 75
              -3 96 -25 29 -31 59 -32 87 -1 12 13 31 25 42 27 16 3 21 13 23 55 4 60 -7 73 -76 85 -26 5 -53 17 -60 27 -46 62 -46 62 -142 62 l-90 0 -28 -39z m108 -11
              c0 -30 0 -30 -56 -30 -58 0 -60 3 -26 43 9 10 29 17 49 17 30 0 33 -3 33 -30z m118 0 l23 -30 -61 0 -60 0 0 30 c0 28 2 30 38 30 31 0 43 -6 60 -30z m-188
              -145 c15 -18 10 -45 -12 -59 -35 -22 -74 27 -48 59 16 19 44 19 60 0z m280 0 c15 -18 10 -45 -12 -59 -35 -22 -74 27 -48 59 16 19 44 19 60 0z"/>
            </g>
          </svg>
        </td>
        <td>${name}</td>
        <td class="win">${wins}</td>
        <td class="time">${time}</td>
      </tr>
    `;
    return template;
  }
  return null;
};

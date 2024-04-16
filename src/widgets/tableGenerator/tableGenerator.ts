import { state } from 'app/state';
import { SortType } from 'shared/types/types';
import { getData } from 'app/api';
import { winnersGenerator } from './winnersGenerator';
import './table.scss';

const toggleSort = (field: keyof SortType) => {
  const sortType = state.getState().sortType[field];
  const newSortType = sortType === 'ASC' ? 'DESC' : 'ASC';
  state.setSortType(field, newSortType);
  getData('winners', field);
};

export const tableGenerator = () => {
  const container = document.querySelector('.table');
  const { winners, currentWinnersPage, winnersPerPage } = state.getState();
  const { wins, time } = state.getState().sortType;
  if (!container) return;

  const startIndex = currentWinnersPage * winnersPerPage;
  const endIndex = startIndex + winnersPerPage;

  const template = `
    <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="sort wins ${wins === 'ASC' ? 'arrow_up' : 'arrow_down'}">Wins</th>
        <th class="sort times ${time === 'ASC' ? 'arrow_up' : 'arrow_down'}">Best time (seconds)</th>
      </tr>
    </thead>
    <tbody>
    ${winners
      ?.slice(startIndex, endIndex)
      .map((item, index) => winnersGenerator(item, index + startIndex))
      .join('')}
    </tbody>
  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', template);

  const winsBtn = document.querySelector('.wins');
  winsBtn?.addEventListener('click', () => {
    toggleSort('wins');
  });

  const timeBtn = document.querySelector('.times');
  timeBtn?.addEventListener('click', () => {
    toggleSort('time');
  });
};

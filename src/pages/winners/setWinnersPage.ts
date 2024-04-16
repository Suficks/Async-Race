import { state } from 'app/state';
import { tableGenerator } from 'widgets/tableGenerator/tableGenerator';
import { updateButtonState } from 'features/pagination';
import './winnersPage.scss';

export const setWinnersPage = async () => {
  const { winners, currentWinnersPage } = state.getState();
  const container = document.querySelector('.main');

  if (!container) return;

  const template = `
    <h1 class="title">Winners (${winners.length})</h1>
    <h2 class="page_count">Page # ${currentWinnersPage + 1}</h2>
    <table class="table"></table>
    <div class="container winners_container">
      <button class="prev_winners_btn">prev</button>
      <button class="next_winners_btn">next</button>
    </div>    
  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', template);

  const prevBtn = document.querySelector('.prev_winners_btn');
  const nextBtn = document.querySelector('.next_winners_btn');

  prevBtn?.addEventListener('click', () => state.pagination('prev', 'winners'));
  nextBtn?.addEventListener('click', () => state.pagination('next', 'winners'));

  state.setIsRacing(false);
  tableGenerator();
  updateButtonState();
};

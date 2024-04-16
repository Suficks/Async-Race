import { addData } from 'app/api';

export const createCar = () => {
  const input = document.querySelector('.create_input');
  const colorInput = document.querySelector('.create_color');
  const createBtn = document.querySelector('.create_btn');

  const newCar = {
    name: '',
    color: '#fff',
  };

  input?.addEventListener('input', (e) => {
    newCar.name = (e.target as HTMLInputElement).value;
  });

  colorInput?.addEventListener('input', (e) => {
    newCar.color = (e.target as HTMLInputElement).value;
  });

  createBtn?.addEventListener('click', async () => {
    await addData(newCar, 'cars');
    newCar.name = '';
    newCar.color = '#fff';
    (input as HTMLInputElement).value = '';
    (colorInput as HTMLInputElement).value = '#ffffff';
  });
};

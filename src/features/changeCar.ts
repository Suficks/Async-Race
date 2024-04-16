import { updateData } from 'app/api';
import { state } from 'app/state';

export const changeCar = (id: number) => {
  const input = document.querySelector('.update_input');
  const colorInput = document.querySelector('.update_color');
  const updateBtn = document.querySelector('.update_btn');
  const selectedCar = state.getState().cars.find((item) => item.id === id);

  const updatedCar = {
    name: selectedCar?.name || '',
    color: selectedCar?.color || '',
  };

  input?.addEventListener('input', (e) => {
    updatedCar.name = (e.target as HTMLInputElement).value;
  });

  colorInput?.addEventListener('input', (e) => {
    updatedCar.color = (e.target as HTMLInputElement).value;
  });

  updateBtn?.addEventListener('click', async () => {
    await updateData(id, updatedCar, 'cars');
    state.setIsEditing(false);
  });
};
